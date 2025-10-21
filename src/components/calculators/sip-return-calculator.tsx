"use client";

import { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

export function SipReturnCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000);
  const [years, setYears] = useState(10);
  const [returnRate, setReturnRate] = useState(12.5);

  const { totalInvestment, totalGrowth, futureValue } = useMemo(() => {
    const i = returnRate / 12 / 100;
    const n = years * 12;
    const M = monthlyInvestment * (((1 + i) ** n - 1) / i) * (1 + i);
    const totalInvested = monthlyInvestment * n;
    const growth = M - totalInvested;

    return {
      totalInvestment: totalInvested,
      totalGrowth: growth,
      futureValue: M,
    };
  }, [monthlyInvestment, years, returnRate]);

  const pieData = [
    { name: 'Total SIP Amount Invested', value: totalInvestment, color: 'hsl(var(--destructive))' },
    { name: 'Total Growth', value: totalGrowth, color: 'hsl(var(--primary))' },
  ];

  return (
    <div className="bg-background text-foreground">
      <div className="bg-primary text-primary-foreground py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold font-headline">SIP RETURN CALCULATOR</h1>
          <p className="text-sm mt-2">
            <Link href="/" className="hover:underline">Home</Link> &gt; 
            <Link href="/#calculators" className="hover:underline"> Tools & Calculators</Link> &gt; SIP Return Calculator
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">How much you can invest through monthly SIP? (Rs)</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="number"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="mb-4 text-lg font-bold"
                />
                <Slider
                  min={500}
                  max={100000}
                  step={500}
                  value={[monthlyInvestment]}
                  onValueChange={(vals) => setMonthlyInvestment(vals[0])}
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>₹500</span>
                  <span>₹1 Lakh</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">How many years will you continue the SIP?</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="mb-4 text-lg font-bold"
                />
                <Slider
                  min={1}
                  max={50}
                  step={1}
                  value={[years]}
                  onValueChange={(vals) => setYears(vals[0])}
                />
                 <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>1</span>
                  <span>50</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">What rate of return do you expect? (% per annum)</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="number"
                  value={returnRate}
                  onChange={(e) => setReturnRate(Number(e.target.value))}
                  className="mb-4 text-lg font-bold"
                />
                <Slider
                  min={1}
                  max={20}
                  step={0.1}
                  value={[returnRate]}
                  onValueChange={(vals) => setReturnRate(vals[0])}
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>1%</span>
                  <span>20%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div className="text-right">
                <Button variant="destructive">
                    <Download className="mr-2 h-4 w-4" /> Download
                </Button>
            </div>
            <Card className="shadow-lg">
                <CardHeader className="items-center">
                    <CardTitle>Investment Breakdown</CardTitle>
                </CardHeader>
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
                <CardHeader>
                    <CardTitle className="text-muted-foreground text-md font-medium">Total SIP Amount Invested</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold font-code">{formatCurrency(totalInvestment)}</p>
                </CardContent>
            </Card>
            <Card className="shadow-md text-center">
                <CardHeader>
                    <CardTitle className="text-muted-foreground text-md font-medium">Total Growth</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold font-code">{formatCurrency(totalGrowth)}</p>
                </CardContent>
            </Card>
             <Card className="shadow-md text-center bg-primary text-primary-foreground">
                <CardHeader>
                    <CardTitle className="text-md font-medium">Total Future Value</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold font-code">{formatCurrency(futureValue)}</p>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
