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

export function CrorepatiCalculator() {
  const [targetAmount, setTargetAmount] = useState(10000000);
  const [years, setYears] = useState(15);
  const [returnRate, setReturnRate] = useState(12);

  const { requiredSip, totalInvestment, totalGrowth } = useMemo(() => {
    const i = returnRate / 12 / 100;
    const n = years * 12;
    const sip = (targetAmount * i) / (Math.pow(1 + i, n) - 1);
    const totalInvested = sip * n;
    const growth = targetAmount - totalInvested;

    return {
      requiredSip: sip,
      totalInvestment: totalInvested,
      totalGrowth: growth > 0 ? growth : 0,
    };
  }, [targetAmount, years, returnRate]);

  const pieData = [
    { name: 'Total Investment', value: totalInvestment, color: 'hsl(var(--destructive))' },
    { name: 'Total Growth', value: totalGrowth, color: 'hsl(var(--primary))' },
  ];

  return (
    <div className="bg-background text-foreground">
      <div className="bg-primary text-primary-foreground py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold font-headline">BECOME A CROREPATI</h1>
          <p className="text-sm mt-2">
            <Link href="/" className="hover:underline">Home</Link> &gt; 
            <Link href="/#calculators" className="hover:underline"> Tools & Calculators</Link> &gt; Become a Crorepati
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Target Amount (Rs)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={targetAmount} onChange={(e) => setTargetAmount(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={10000000} max={100000000} step={1000000} value={[targetAmount]} onValueChange={(vals) => setTargetAmount(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>₹1 Crore</span><span>₹10 Crores</span></div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Time to Target (Years)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={1} max={50} step={1} value={[years]} onValueChange={(vals) => setYears(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>1</span><span>50</span></div>
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
                <CardHeader className="items-center"><CardTitle>Investment Breakdown</CardTitle></CardHeader>
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
                <CardHeader><CardTitle className="text-muted-foreground text-md font-medium">Total Investment Needed</CardTitle></CardHeader>
                <CardContent><p className="text-2xl font-bold font-code">{formatCurrency(totalInvestment)}</p></CardContent>
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
