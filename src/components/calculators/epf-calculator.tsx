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
          <p className="font-bold">{`Age: ${label}`}</p>
          <p className="text-primary">{`Balance: ${formatCurrency(payload[0].value)}`}</p>
        </div>
      );
    }
    return null;
  };

export function EpfCalculator() {
  const [currentAge, setCurrentAge] = useState(25);
  const [retirementAge, setRetirementAge] = useState(58);
  const [basicSalary, setBasicSalary] = useState(50000);
  const [epfContribution, setEpfContribution] = useState(12);
  const [salaryIncrease, setSalaryIncrease] = useState(5);
  const [interestRate, setInterestRate] = useState(8.1);

  const { totalCorpus, chartData } = useMemo(() => {
    let corpus = 0;
    let currentSalary = basicSalary;
    const data = [];
    const workingYears = retirementAge - currentAge;

    for (let i = 0; i < workingYears; i++) {
        const annualContribution = (currentSalary * 12) * (epfContribution / 100) * 2; // Employee + Employer
        corpus = (corpus + annualContribution) * (1 + interestRate / 100);
        currentSalary *= (1 + salaryIncrease / 100);
        data.push({ age: currentAge + i + 1, balance: corpus });
    }

    return { totalCorpus: corpus, chartData: data };
  }, [currentAge, retirementAge, basicSalary, epfContribution, salaryIncrease, interestRate]);

  return (
    <div className="bg-background text-foreground">
      <div className="bg-primary text-primary-foreground py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold font-headline">EMPLOYEES PF CALCULATOR</h1>
          <p className="text-sm mt-2">
            <Link href="/" className="hover:underline">Home</Link> &gt; 
            <Link href="/#calculators" className="hover:underline"> Tools & Calculators</Link> &gt; Employees PF Calculator
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Current Age</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={18} max={57} step={1} value={[currentAge]} onValueChange={(vals) => setCurrentAge(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>18</span><span>57</span></div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Retirement Age</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={currentAge + 1} max={65} step={1} value={[retirementAge]} onValueChange={(vals) => setRetirementAge(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>{currentAge + 1}</span><span>65</span></div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Monthly Basic Salary + DA (Rs)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={basicSalary} onChange={(e) => setBasicSalary(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={5000} max={200000} step={1000} value={[basicSalary]} onValueChange={(vals) => setBasicSalary(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>₹5,000</span><span>₹2 Lakhs</span></div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Employee EPF Contribution (%)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={epfContribution} onChange={(e) => setEpfContribution(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={12} max={25} step={0.5} value={[epfContribution]} onValueChange={(vals) => setEpfContribution(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>12%</span><span>25%</span></div>
              </CardContent>
            </Card>
             <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Annual Salary Increase (%)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={salaryIncrease} onChange={(e) => setSalaryIncrease(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={0} max={20} step={1} value={[salaryIncrease]} onValueChange={(vals) => setSalaryIncrease(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>0%</span><span>20%</span></div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">EPF Interest Rate (%)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={5} max={12} step={0.1} value={[interestRate]} onValueChange={(vals) => setInterestRate(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>5%</span><span>12%</span></div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div className="text-right">
                <Button variant="destructive"><Download className="mr-2 h-4 w-4" /> Download</Button>
            </div>
            <Card className="shadow-lg">
                <CardHeader className="items-center"><CardTitle>EPF Growth Trajectory</CardTitle></CardHeader>
                <CardContent>
                    <div className="h-96 w-full">
                        <ResponsiveContainer>
                            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="age" label={{ value: 'Age', position: 'insideBottom', offset: -5 }} />
                                <YAxis tickFormatter={val => formatCurrency(val as number).replace('₹', '₹ ')} label={{ value: 'Balance', angle: -90, position: 'insideLeft' }}/>
                                <Tooltip content={<CustomTooltip />} />
                                <Line type="monotone" dataKey="balance" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

             <Card className="shadow-md text-center bg-primary text-primary-foreground">
                <CardHeader><CardTitle className="text-md font-medium">Total EPF Corpus at Retirement</CardTitle></CardHeader>
                <CardContent><p className="text-2xl font-bold font-code">{formatCurrency(totalCorpus)}</p></CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
