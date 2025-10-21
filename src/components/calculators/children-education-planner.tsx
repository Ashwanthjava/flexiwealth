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

export function ChildrenEducationPlanner() {
  const [currentCost, setCurrentCost] = useState(1000000);
  const [years, setYears] = useState(15);
  const [inflationRate, setInflationRate] = useState(6);
  const [returnRate, setReturnRate] = useState(12);

  const { futureCost, requiredSip, totalInvestment, totalGrowth } = useMemo(() => {
    const futureCostValue = currentCost * Math.pow(1 + inflationRate / 100, years);
    const i = returnRate / 12 / 100;
    const n = years * 12;
    const sip = (futureCostValue * i) / (Math.pow(1 + i, n) - 1);
    const totalInvested = sip * n;
    const growth = futureCostValue - totalInvested;

    return {
      futureCost: futureCostValue,
      requiredSip: sip,
      totalInvestment: totalInvested,
      totalGrowth: growth > 0 ? growth : 0,
    };
  }, [currentCost, years, inflationRate, returnRate]);

  const pieData = [
    { name: 'Total Investment', value: totalInvestment, color: 'hsl(var(--destructive))' },
    { name: 'Total Growth', value: totalGrowth, color: 'hsl(var(--primary))' },
  ];

  return (
    <div className="bg-background text-foreground">
      <div className="bg-primary text-primary-foreground py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold font-headline">CHILDREN EDUCATION PLANNER</h1>
          <p className="text-sm mt-2">
            <Link href="/" className="hover:underline">Home</Link> &gt; 
            <Link href="/#calculators" className="hover:underline"> Tools & Calculators</Link> &gt; Children Education Planner
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Current Cost of Education (Rs)</CardTitle>
              </CardHeader>
              <CardContent>
                <Input type="number" value={currentCost} onChange={(e) => setCurrentCost(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={100000} max={10000000} step={100000} value={[currentCost]} onValueChange={(vals) => setCurrentCost(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>₹1 Lakh</span><span>₹1 Crore</span></div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Years to Education</CardTitle>
              </CardHeader>
              <CardContent>
                <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={1} max={30} step={1} value={[years]} onValueChange={(vals) => setYears(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>1</span><span>30</span></div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Expected Inflation Rate (%)</CardTitle>
              </CardHeader>
              <CardContent>
                <Input type="number" value={inflationRate} onChange={(e) => setInflationRate(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={1} max={15} step={0.1} value={[inflationRate]} onValueChange={(vals) => setInflationRate(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>1%</span><span>15%</span></div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Expected Return on Investment (%)</CardTitle>
              </CardHeader>
              <CardContent>
                <Input type="number" value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={1} max={20} step={0.1} value={[returnRate]} onValueChange={(vals) => setReturnRate(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>1%</span><span>20%</span></div>
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
                <CardHeader><CardTitle className="text-muted-foreground text-md font-medium">Future Cost of Education</CardTitle></CardHeader>
                <CardContent><p className="text-2xl font-bold font-code">{formatCurrency(futureCost)}</p></CardContent>
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
