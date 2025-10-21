'use client';

import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
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
          <p className="font-bold">{`${label}`}</p>
          <p className="text-primary">{`Required SIP: ${formatCurrency(payload[0].value)}`}</p>
        </div>
      );
    }
    return null;
};

export function FinancialGoalCalculator() {
  const [goalAmount, setGoalAmount] = useState(5000000);
  const [years, setYears] = useState(10);
  const [inflation, setInflation] = useState(6);
  const [returnRate, setReturnRate] = useState(12);

  const { futureValue, requiredSip, chartData } = useMemo(() => {
    const fv = goalAmount * Math.pow(1 + inflation / 100, years);
    const i = returnRate / 12 / 100;
    const n = years * 12;
    const sip = (fv * i) / (Math.pow(1 + i, n) - 1);

    const data = [
      { name: "Today's Cost", value: goalAmount, fill: 'hsl(var(--destructive))' },
      { name: "Future Cost (Inflated)", value: fv, fill: 'hsl(var(--primary))' },
    ];
    
    return { futureValue: fv, requiredSip: sip, chartData: data };
  }, [goalAmount, years, inflation, returnRate]);

  return (
    <div className="bg-background text-foreground">
      <div className="bg-primary text-primary-foreground py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold font-headline">COMPOSITE FINANCIAL GOAL CALCULATOR</h1>
          <p className="text-sm mt-2">
            <Link href="/" className="hover:underline">Home</Link> &gt; 
            <Link href="/#calculators" className="hover:underline"> Tools & Calculators</Link> &gt; Composite Financial Goal Calculator
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Goal Amount (in today's value, Rs)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={goalAmount} onChange={(e) => setGoalAmount(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={100000} max={100000000} step={100000} value={[goalAmount]} onValueChange={(vals) => setGoalAmount(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>₹1 Lakh</span><span>₹10 Crores</span></div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Years to achieve goal</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={1} max={50} step={1} value={[years]} onValueChange={(vals) => setYears(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>1</span><span>50</span></div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Expected Inflation Rate (%)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={inflation} onChange={(e) => setInflation(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={1} max={15} step={0.1} value={[inflation]} onValueChange={(vals) => setInflation(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>1%</span><span>15%</span></div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Expected Return on Investment (%)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={1} max={25} step={0.1} value={[returnRate]} onValueChange={(vals) => setReturnRate(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>1%</span><span>25%</span></div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div className="text-right">
                <Button variant="destructive"><Download className="mr-2 h-4 w-4" /> Download</Button>
            </div>
            <Card className="shadow-lg">
                <CardHeader className="items-center"><CardTitle>Goal Cost Comparison</CardTitle></CardHeader>
                <CardContent>
                    <div className="h-64 w-full">
                        <ResponsiveContainer>
                            <BarChart data={chartData} layout="vertical" margin={{ left: 30 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" tickFormatter={val => formatCurrency.format(val as number).replace('₹', '₹ ')} />
                                <YAxis dataKey="name" type="category" width={100} />
                                <Tooltip cursor={{ fill: 'hsl(var(--secondary))' }} content={({ active, payload, label }) => active && <div className="p-2 bg-background/80 backdrop-blur-sm rounded-lg border shadow-lg"><p className="font-bold">{label}</p><p>{formatCurrency(payload?.[0].value as number)}</p></div>} />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-md text-center">
                <CardHeader><CardTitle className="text-muted-foreground text-md font-medium">Future Value of Goal</CardTitle></CardHeader>
                <CardContent><p className="text-2xl font-bold font-code">{formatCurrency(futureValue)}</p></CardContent>
            </Card>
             <Card className="shadow-md text-center bg-primary text-primary-foreground">
                <CardHeader><CardTitle className="text-md font-medium">Required Monthly SIP</CardTitle></CardHeader>
                <CardContent><p className="text-2xl font-bold font-code">{formatCurrency(requiredSip)}</p></CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
