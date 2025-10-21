"use client";

import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const investmentOptions = [
  { name: 'Savings Account', rate: 0.03, color: 'var(--chart-5)' },
  { name: 'Fixed Deposit', rate: 0.065, color: 'var(--chart-2)' },
  { name: 'Gold', rate: 0.08, color: 'var(--chart-4)' },
  { name: 'Mutual Funds', rate: 0.12, color: 'var(--chart-1)' },
  { name: 'Stock Market', rate: 0.15, color: 'var(--chart-3)' },
];

const YEARS = 10;

export function InvestmentCalculator({ id }: { id: string }) {
  const [initialAmount, setInitialAmount] = useState(100000);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setInitialAmount(Number(value));
  };

  const currencyFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const chartData = useMemo(() => {
    return investmentOptions.map(option => {
      const finalAmount = initialAmount * Math.pow(1 + option.rate, YEARS);
      return {
        name: option.name,
        'Projected Value': Math.round(finalAmount),
        fill: option.color,
      };
    }).sort((a, b) => a['Projected Value'] - b['Projected Value']);
  }, [initialAmount]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-4 bg-background/80 backdrop-blur-sm rounded-lg border shadow-lg">
          <p className="font-bold text-lg text-primary">{label}</p>
          <p className="text-foreground">{`Projected Value: ${currencyFormatter.format(payload[0].value)}`}</p>
          <p className="text-muted-foreground text-sm">{`From initial ${currencyFormatter.format(initialAmount)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section id={id} className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
            Investment Growth Calculator
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            See how your investment could grow over {YEARS} years across different asset classes.
          </p>
        </div>
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline">Compare Your Growth</CardTitle>
            <CardDescription>Enter an amount to see its potential future value.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1 space-y-6">
                <div>
                  <Label htmlFor="investment-amount" className="text-lg font-medium">Initial Investment (INR)</Label>
                  <Input
                    id="investment-amount"
                    type="text"
                    value={new Intl.NumberFormat('en-IN').format(initialAmount)}
                    onChange={handleAmountChange}
                    className="mt-2 text-2xl h-14 font-code"
                  />
                </div>
                <div className="space-y-4">
                  <h4 className="font-headline text-lg text-primary">Projected Values in {YEARS} Years:</h4>
                  <ul className="space-y-2">
                    {chartData.map(item => (
                       <li key={item.name} className="flex justify-between items-center text-sm p-2 rounded-md hover:bg-secondary">
                        <span className="flex items-center">
                            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.fill }}></span>
                            {item.name}
                        </span>
                        <span className="font-medium font-code">{currencyFormatter.format(item['Projected Value'])}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:col-span-2 h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" tickFormatter={(value) => currencyFormatter.format(value as number).replace('₹', '₹ ')} />
                    <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--secondary))' }} />
                    <Bar dataKey="Projected Value" barSize={30} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
