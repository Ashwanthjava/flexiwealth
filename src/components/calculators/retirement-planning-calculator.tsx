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
MaximumFractionDigits: 0,
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

export function RetirementPlanningCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [existingCorpus, setExistingCorpus] = useState(1000000);
  const [inflationRate, setInflationRate] = useState(6);
  const [preRetirementReturn, setPreRetirementReturn] = useState(12);
  const [postRetirementReturn, setPostRetirementReturn] = useState(7);
  const lifeExpectancy = 85;

  const { retirementCorpusNeeded, monthlySipRequired, totalInvestment, totalGrowth } = useMemo(() => {
    const yearsToRetire = retirementAge - currentAge;
    const postRetirementYears = lifeExpectancy - retirementAge;

    // Future value of current monthly expenses at retirement
    const futureMonthlyExpenses = monthlyExpenses * Math.pow(1 + inflationRate / 100, yearsToRetire);
    const annualExpenses = futureMonthlyExpenses * 12;

    // Corpus needed at retirement (using PV formula for annuity with inflation)
    const realReturnRate = ((1 + postRetirementReturn / 100) / (1 + inflationRate / 100)) - 1;
    let corpusNeeded = (annualExpenses / realReturnRate) * (1 - (1 / Math.pow(1 + realReturnRate, postRetirementYears)));
    if (realReturnRate <= 0) { // If inflation is higher than returns
        corpusNeeded = annualExpenses * postRetirementYears;
    }


    // Future value of existing corpus
    const futureValueOfExistingCorpus = existingCorpus * Math.pow(1 + preRetirementReturn / 100, yearsToRetire);

    const shortfall = corpusNeeded - futureValueOfExistingCorpus;

    // SIP required to cover the shortfall
    const i = preRetirementReturn / 12 / 100;
    const n = yearsToRetire * 12;
    const sip = shortfall > 0 ? (shortfall * i) / (Math.pow(1 + i, n) - 1) : 0;
    
    const totalInvested = sip * n + existingCorpus;
    const totalCorpusAtRetirement = futureValueOfExistingCorpus + (sip > 0 ? (sip * (Math.pow(1 + i, n) - 1) / i) : 0);
    const growth = totalCorpusAtRetirement - totalInvested;

    return {
      retirementCorpusNeeded: corpusNeeded,
      monthlySipRequired: sip,
      totalInvestment: totalInvested,
      totalGrowth: growth > 0 ? growth : 0,
    };
  }, [currentAge, retirementAge, monthlyExpenses, existingCorpus, inflationRate, preRetirementReturn, postRetirementReturn]);

  const pieData = [
    { name: 'Total Investment', value: totalInvestment, color: 'hsl(var(--destructive))' },
    { name: 'Total Growth', value: totalGrowth, color: 'hsl(var(--primary))' },
  ];

  return (
    <div className="bg-background text-foreground">
      <div className="bg-primary text-primary-foreground py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold font-headline">RETIREMENT PLANNING CALCULATOR</h1>
          <p className="text-sm mt-2">
            <Link href="/" className="hover:underline">Home</Link> &gt; 
            <Link href="/#calculators" className="hover:underline"> Tools & Calculators</Link> &gt; Retirement Planning Calculator
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
                <Slider min={18} max={59} step={1} value={[currentAge]} onValueChange={(vals) => setCurrentAge(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>18</span><span>59</span></div>
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
              <CardHeader><CardTitle className="text-lg">Current Monthly Expenses (Rs)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={10000} max={300000} step={1000} value={[monthlyExpenses]} onValueChange={(vals) => setMonthlyExpenses(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>₹10,000</span><span>₹3 Lakhs</span></div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Existing Retirement Corpus (Rs)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={existingCorpus} onChange={(e) => setExistingCorpus(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={0} max={50000000} step={100000} value={[existingCorpus]} onValueChange={(vals) => setExistingCorpus(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>₹0</span><span>₹5 Crores</span></div>
              </CardContent>
            </Card>
             <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Expected Inflation Rate (%)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={inflationRate} onChange={(e) => setInflationRate(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={3} max={10} step={0.1} value={[inflationRate]} onValueChange={(vals) => setInflationRate(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>3%</span><span>10%</span></div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Expected Pre-Retirement Return (%)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={preRetirementReturn} onChange={(e) => setPreRetirementReturn(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={5} max={20} step={0.1} value={[preRetirementReturn]} onValueChange={(vals) => setPreRetirementReturn(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>5%</span><span>20%</span></div>
              </CardContent>
            </Card>
             <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Expected Post-Retirement Return (%)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={postRetirementReturn} onChange={(e) => setPostRetirementReturn(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={3} max={12} step={0.1} value={[postRetirementReturn]} onValueChange={(vals) => setPostRetirementReturn(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>3%</span><span>12%</span></div>
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
                <CardHeader><CardTitle className="text-muted-foreground text-md font-medium">Retirement Corpus Needed</CardTitle></CardHeader>
                <CardContent><p className="text-2xl font-bold font-code">{formatCurrency(retirementCorpusNeeded)}</p></CardContent>
            </Card>
             <Card className="shadow-md text-center bg-primary text-primary-foreground">
                <CardHeader><CardTitle className="text-md font-medium">Monthly SIP Required</CardTitle></CardHeader>
                <CardContent><p className="text-2xl font-bold font-code">{formatCurrency(monthlySipRequired)}</p></CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
