'use client';

import { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components-ui/slider';
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

export function NpsCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [currentAge, setCurrentAge] = useState(30);
  const [returnRate, setReturnRate] = useState(10);
  const [annuityPercent, setAnnuityPercent] = useState(40);
  const [annuityReturnRate, setAnnuityReturnRate] = useState(6);
  const retirementAge = 60;

  const { totalCorpus, annuityValue, lumpsumValue, monthlyPension } = useMemo(() => {
    const n = (retirementAge - currentAge) * 12;
    const i = returnRate / 12 / 100;
    const corpus = monthlyInvestment * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));

    const av = corpus * (annuityPercent / 100);
    const lv = corpus * (1 - annuityPercent / 100);
    const pension = (av * (annuityReturnRate / 100)) / 12;
    
    return {
      totalCorpus: corpus,
      annuityValue: av,
      lumpsumValue: lv,
      monthlyPension: pension,
    };
  }, [monthlyInvestment, currentAge, returnRate, annuityPercent, annuityReturnRate]);

  const pieData = [
    { name: 'Lumpsum Value', value: lumpsumValue, color: 'hsl(var(--primary))' },
    { name: 'Annuity Investment', value: annuityValue, color: 'hsl(var(--destructive))' },
  ];

  return (
    <div className="bg-background text-foreground">
      <div className="bg-primary text-primary-foreground py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold font-headline">NPS CALCULATOR</h1>
          <p className="text-sm mt-2">
            <Link href="/" className="hover:underline">Home</Link> &gt; 
            <Link href="/#calculators" className="hover:underline"> Tools & Calculators</Link> &gt; NPS Calculator
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Monthly Investment (Rs)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={500} max={100000} step={500} value={[monthlyInvestment]} onValueChange={(vals) => setMonthlyInvestment(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>₹500</span><span>₹1 Lakh</span></div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Your Current Age</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={18} max={59} step={1} value={[currentAge]} onValueChange={(vals) => setCurrentAge(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>18</span><span>59</span></div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Expected Return on Investment (%)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={6} max={15} step={0.1} value={[returnRate]} onValueChange={(vals) => setReturnRate(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>6%</span><span>15%</span></div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Percentage to purchase Annuity (%)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={annuityPercent} onChange={(e) => setAnnuityPercent(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={40} max={100} step={5} value={[annuityPercent]} onValueChange={(vals) => setAnnuityPercent(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>40%</span><span>100%</span></div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Expected return on Annuity (%)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={annuityReturnRate} onChange={(e) => setAnnuityReturnRate(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={4} max={10} step={0.1} value={[annuityReturnRate]} onValueChange={(vals) => setAnnuityReturnRate(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>4%</span><span>10%</span></div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div className="text-right">
                <Button variant="destructive"><Download className="mr-2 h-4 w-4" /> Download</Button>
            </div>
            <Card className="shadow-lg">
                <CardHeader className="items-center"><CardTitle>Retirement Fund Split</CardTitle></CardHeader>
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
                <CardHeader><CardTitle className="text-muted-foreground text-md font-medium">Total Corpus</CardTitle></CardHeader>
                <CardContent><p className="text-2xl font-bold font-code">{formatCurrency(totalCorpus)}</p></CardContent>
            </Card>
            <Card className="shadow-md text-center">
                <CardHeader><CardTitle className="text-muted-foreground text-md font-medium">Lumpsum at Retirement</CardTitle></CardHeader>
                <CardContent><p className="text-2xl font-bold font-code">{formatCurrency(lumpsumValue)}</p></CardContent>
            </Card>
             <Card className="shadow-md text-center bg-primary text-primary-foreground">
                <CardHeader><CardTitle className="text-md font-medium">Expected Monthly Pension</CardTitle></CardHeader>
                <CardContent><p className="text-2xl font-bold font-code">{formatCurrency(monthlyPension)}</p></CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
