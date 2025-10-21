'use client';

import { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
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

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-background/80 backdrop-blur-sm rounded-lg border shadow-lg">
          <p className="font-bold">{`${payload[0].name}: ${formatCurrency(payload[0].value)}`}</p>
        </div>
      );
    }
    return null;
  };

export function GoalSettingCalculator() {
  const [targetAmount, setTargetAmount] = useState(2500000);
  const [monthlySip, setMonthlySip] = useState(15000);
  const [returnRate, setReturnRate] = useState(12);

  const { yearsRequired, totalInvestment, totalGrowth } = useMemo(() => {
    const i = returnRate / 12 / 100;
    const M = monthlySip;
    const FV = targetAmount;
    
    // n = log( (FV*i/M) + 1 ) / log(1+i)
    const n_months = Math.log((FV * i) / M + 1) / Math.log(1 + i);
    const years = n_months / 12;

    const totalInvested = M * n_months;
    const growth = FV - totalInvested;

    return {
      yearsRequired: isNaN(years) || !isFinite(years) ? 0 : years,
      totalInvestment: totalInvested > 0 ? totalInvested : 0,
      totalGrowth: growth > 0 ? growth : 0,
    };
  }, [targetAmount, monthlySip, returnRate]);

  const pieData = [
    { name: 'Total Investment', value: totalInvestment, color: 'hsl(var(--destructive))' },
    { name: 'Total Growth', value: totalGrowth, color: 'hsl(var(--primary))' },
  ];

  return (
    <div className="bg-background text-foreground">
      <div className="bg-primary text-primary-foreground py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold font-headline">GOAL SETTING CALCULATOR</h1>
          <p className="text-sm mt-2">
            <Link href="/" className="hover:underline">Home</Link> &gt; 
            <Link href="/#calculators" className="hover:underline"> Tools & Calculators</Link> &gt; Goal Setting Calculator
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Target Goal Amount (Rs)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={targetAmount} onChange={(e) => setTargetAmount(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={100000} max={50000000} step={100000} value={[targetAmount]} onValueChange={(vals) => setTargetAmount(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>₹1 Lakh</span><span>₹5 Crores</span></div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Monthly Investment (SIP, Rs)</CardHeader>
              <CardContent>
                <Input type="number" value={monthlySip} onChange={(e) => setMonthlySip(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={500} max={200000} step={500} value={[monthlySip]} onValueChange={(vals) => setMonthlySip(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>₹500</span><span>₹2 Lakhs</span></div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Expected Rate of Return (%)</CardTitle></CardHeader>
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
                <CardHeader className="items-center"><CardTitle>Investment vs. Growth</CardTitle></CardHeader>
                <CardContent>
                    <div className="h-64 w-full">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false}>
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend iconSize={10} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-md text-center">
                <CardHeader><CardTitle className="text-muted-foreground text-md font-medium">Total Investment</CardTitle></CardHeader>
                <CardContent><p className="text-2xl font-bold font-code">{formatCurrency(totalInvestment)}</p></CardContent>
            </Card>
             <Card className="shadow-md text-center bg-primary text-primary-foreground">
                <CardHeader><CardTitle className="text-md font-medium">Time Required</CardTitle></CardHeader>
                <CardContent><p className="text-2xl font-bold font-code">{yearsRequired.toFixed(2)} years</p></CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
