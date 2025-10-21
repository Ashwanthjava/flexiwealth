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

export function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const { emi, totalInterest, totalPayable } = useMemo(() => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenure * 12;

    if (r === 0) { // Handle case where interest rate is 0
      const emiValue = P / n;
      return {
        emi: emiValue,
        totalInterest: 0,
        totalPayable: P,
      };
    }

    const emiValue = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayableValue = emiValue * n;
    const totalInterestValue = totalPayableValue - P;

    return {
      emi: emiValue,
      totalInterest: totalInterestValue,
      totalPayable: totalPayableValue,
    };
  }, [loanAmount, interestRate, tenure]);

  const pieData = [
    { name: 'Principal Amount', value: loanAmount, color: 'hsl(var(--primary))' },
    { name: 'Total Interest', value: totalInterest, color: 'hsl(var(--destructive))' },
  ];

  return (
    <div className="bg-background text-foreground">
      <div className="bg-primary text-primary-foreground py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold font-headline">EMI CALCULATOR</h1>
          <p className="text-sm mt-2">
            <Link href="/" className="hover:underline">Home</Link> &gt; 
            <Link href="/#calculators" className="hover:underline"> Tools & Calculators</Link> &gt; EMI Calculator
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Loan Amount (Rs)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={100000} max={20000000} step={100000} value={[loanAmount]} onValueChange={(vals) => setLoanAmount(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>₹1 Lakh</span><span>₹2 Crores</span></div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Interest Rate (% p.a.)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={1} max={20} step={0.1} value={[interestRate]} onValueChange={(vals) => setInterestRate(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>1%</span><span>20%</span></div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Loan Tenure (Years)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={1} max={30} step={1} value={[tenure]} onValueChange={(vals) => setTenure(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>1</span><span>30</span></div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div className="text-right">
                <Button variant="destructive"><Download className="mr-2 h-4 w-4" /> Download</Button>
            </div>
            <Card className="shadow-lg">
                <CardHeader className="items-center"><CardTitle>Payment Breakdown</CardTitle></CardHeader>
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
                <CardHeader><CardTitle className="text-muted-foreground text-md font-medium">Total Payable Amount</CardTitle></CardHeader>
                <CardContent><p className="text-2xl font-bold font-code">{formatCurrency(totalPayable)}</p></CardContent>
            </Card>
             <Card className="shadow-md text-center bg-primary text-primary-foreground">
                <CardHeader><CardTitle className="text-md font-medium">Monthly EMI</CardTitle></CardHeader>
                <CardContent><p className="text-2xl font-bold font-code">{formatCurrency(emi)}</p></CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
