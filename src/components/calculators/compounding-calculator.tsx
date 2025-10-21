'use client';

import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import Link from 'next/link';

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const formatCurrency = (value: number) => currencyFormatter.format(value);

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-background/80 backdrop-blur-sm rounded-lg border shadow-lg">
          <p className="font-bold">{`Year ${label}`}</p>
          <p className="text-primary">{`Value: ${formatCurrency(payload[0].value)}`}</p>
        </div>
      );
    }
    return null;
  };

export function CompoundingCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(10);
  const [frequency, setFrequency] = useState(1); // Annually

  const { futureValue, chartData } = useMemo(() => {
    const r = rate / 100;
    const n = frequency;
    const t = years;

    const fv = principal * Math.pow((1 + r / n), n * t);
    
    const data = Array.from({ length: years }, (_, i) => {
      const year = i + 1;
      return {
        year,
        value: principal * Math.pow((1 + r / n), n * year),
      };
    });

    return { futureValue: fv, chartData: data };
  }, [principal, rate, years, frequency]);

  return (
    <div className="bg-background text-foreground">
      <div className="bg-primary text-primary-foreground py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold font-headline">COMPOUNDING CALCULATOR</h1>
          <p className="text-sm mt-2">
            <Link href="/" className="hover:underline">Home</Link> &gt; 
            <Link href="/#calculators" className="hover:underline"> Tools & Calculators</Link> &gt; Compounding Calculator
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Principal Amount (Rs)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={1000} max={10000000} step={1000} value={[principal]} onValueChange={(vals) => setPrincipal(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>₹1,000</span><span>₹1 Crore</span></div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Annual Interest Rate (%)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={1} max={25} step={0.1} value={[rate]} onValueChange={(vals) => setRate(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>1%</span><span>25%</span></div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Time Period (Years)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={1} max={50} step={1} value={[years]} onValueChange={(vals) => setYears(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>1</span><span>50</span></div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Compounding Frequency</CardTitle></CardHeader>
              <CardContent>
                <Select value={String(frequency)} onValueChange={(val) => setFrequency(Number(val))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">Annually</SelectItem>
                        <SelectItem value="2">Half-Yearly</SelectItem>
                        <SelectItem value="4">Quarterly</SelectItem>
                        <SelectItem value="12">Monthly</SelectItem>
                    </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div className="text-right">
                <Button variant="destructive"><Download className="mr-2 h-4 w-4" /> Download</Button>
            </div>
            <Card className="shadow-lg">
                <CardHeader className="items-center"><CardTitle>Growth Over Time</CardTitle></CardHeader>
                <CardContent>
                    <div className="h-96 w-full">
                        <ResponsiveContainer>
                            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                                <YAxis tickFormatter={val => formatCurrency(val as number).replace('₹', '₹ ')} label={{ value: 'Value', angle: -90, position: 'insideLeft' }}/>
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="value" fill="hsl(var(--primary))" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

             <Card className="shadow-md text-center bg-primary text-primary-foreground">
                <CardHeader><CardTitle className="text-md font-medium">Total Future Value</CardTitle></CardHeader>
                <CardContent><p className="text-2xl font-bold font-code">{formatCurrency(futureValue)}</p></CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
