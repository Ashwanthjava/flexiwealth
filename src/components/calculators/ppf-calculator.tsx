'use client';

import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
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
          <p className="font-bold">{`Year ${label}`}</p>
          <p className="text-primary">{`Balance: ${formatCurrency(payload[0].value)}`}</p>
        </div>
      );
    }
    return null;
  };

export function PpfCalculator() {
  const [annualInvestment, setAnnualInvestment] = useState(150000);
  const [years, setYears] = useState(15);
  const interestRate = 7.1; // PPF rate is fixed by government, currently 7.1%

  const { totalInvestment, totalInterest, maturityValue, chartData } = useMemo(() => {
    let balance = 0;
    const data = [];
    const r = interestRate / 100;

    for (let i = 0; i < years; i++) {
        balance += annualInvestment;
        balance *= (1 + r);
        data.push({ year: i + 1, balance: balance });
    }
    
    const ti = annualInvestment * years;
    const interest = balance - ti;

    return { totalInvestment: ti, totalInterest: interest, maturityValue: balance, chartData: data };
  }, [annualInvestment, years]);

  return (
    <div className="bg-background text-foreground">
      <div className="bg-primary text-primary-foreground py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold font-headline">PPF CALCULATOR</h1>
          <p className="text-sm mt-2">
            <Link href="/" className="hover:underline">Home</Link> &gt; 
            <Link href="/#calculators" className="hover:underline"> Tools & Calculators</Link> &gt; PPF Calculator
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Annual Investment (Rs)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={annualInvestment} onChange={(e) => setAnnualInvestment(Math.min(Number(e.target.value), 150000))} className="mb-4 text-lg font-bold" />
                <Slider min={500} max={150000} step={500} value={[annualInvestment]} onValueChange={(vals) => setAnnualInvestment(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>₹500</span><span>₹1,50,000</span></div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Time Period (Years)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={15} max={50} step={5} value={[years]} onValueChange={(vals) => setYears(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>15</span><span>50</span></div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Interest Rate (% p.a.)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={interestRate} readOnly className="mb-4 text-lg font-bold bg-muted" />
                <p className="text-sm text-muted-foreground">PPF interest rate is set by the government and is currently fixed at 7.1%.</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div className="text-right">
                <Button variant="destructive"><Download className="mr-2 h-4 w-4" /> Download</Button>
            </div>
            <Card className="shadow-lg">
                <CardHeader className="items-center"><CardTitle>PPF Growth Over Time</CardTitle></CardHeader>
                <CardContent>
                    <div className="h-96 w-full">
                        <ResponsiveContainer>
                            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                                <YAxis tickFormatter={val => formatCurrency(val as number).replace('₹', '₹ ')} label={{ value: 'Balance', angle: -90, position: 'insideLeft' }}/>
                                <Tooltip content={<CustomTooltip />} />
                                <Line type="monotone" dataKey="balance" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-md text-center">
                <CardHeader><CardTitle className="text-muted-foreground text-md font-medium">Total Investment</CardTitle></CardHeader>
                <CardContent><p className="text-2xl font-bold font-code">{formatCurrency(totalInvestment)}</p></CardContent>
            </Card>
            <Card className="shadow-md text-center">
                <CardHeader><CardTitle className="text-muted-foreground text-md font-medium">Total Interest Earned</CardTitle></CardHeader>
                <CardContent><p className="text-2xl font-bold font-code">{formatCurrency(totalInterest)}</p></CardContent>
            </Card>
             <Card className="shadow-md text-center bg-primary text-primary-foreground">
                <CardHeader><CardTitle className="text-md font-medium">Maturity Value</CardTitle></CardHeader>
                <CardContent><p className="text-2xl font-bold font-code">{formatCurrency(maturityValue)}</p></CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
