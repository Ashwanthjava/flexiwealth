'use client';

import { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Download, PlusCircle, Trash2 } from 'lucide-react';
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

type Item = { name: string; value: number };

export function NetworthCalculator() {
  const [assets, setAssets] = useState<Item[]>([{ name: 'Savings Account', value: 500000 }]);
  const [liabilities, setLiabilities] = useState<Item[]>([{ name: 'Credit Card Debt', value: 50000 }]);

  const handleItemChange = (items: Item[], setItems: Function, index: number, field: 'name' | 'value', value: string | number) => {
    const newItems = [...items];
    if (field === 'value') {
        newItems[index][field] = Number(value);
    } else {
        newItems[index][field] = value as string;
    }
    setItems(newItems);
  };

  const addItem = (items: Item[], setItems: Function) => setItems([...items, { name: '', value: 0 }]);
  const removeItem = (items: Item[], setItems: Function, index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const { totalAssets, totalLiabilities, netWorth } = useMemo(() => {
    const ta = assets.reduce((acc, item) => acc + item.value, 0);
    const tl = liabilities.reduce((acc, item) => acc + item.value, 0);
    return { totalAssets: ta, totalLiabilities: tl, netWorth: ta - tl };
  }, [assets, liabilities]);

  const pieData = [
    { name: 'Total Assets', value: totalAssets, color: 'hsl(var(--primary))' },
    { name: 'Total Liabilities', value: totalLiabilities, color: 'hsl(var(--destructive))' },
  ];

  return (
    <div className="bg-background text-foreground">
      <div className="bg-primary text-primary-foreground py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold font-headline">NETWORTH CALCULATOR</h1>
          <p className="text-sm mt-2">
            <Link href="/" className="hover:underline">Home</Link> &gt; 
            <Link href="/#calculators" className="hover:underline"> Tools & Calculators</Link> &gt; Networth Calculator
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-xl">Assets (What you own)</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {assets.map((item, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input placeholder="Asset Name (e.g. Stocks)" value={item.name} onChange={e => handleItemChange(assets, setAssets, index, 'name', e.target.value)} />
                    <Input type="number" placeholder="Amount" value={item.value || ''} onChange={e => handleItemChange(assets, setAssets, index, 'value', e.target.value)} className="w-40" />
                    <Button variant="ghost" size="icon" onClick={() => removeItem(assets, setAssets, index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                ))}
                <Button variant="outline" onClick={() => addItem(assets, setAssets)} className="w-full"><PlusCircle className="mr-2 h-4 w-4" /> Add Asset</Button>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-xl">Liabilities (What you owe)</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {liabilities.map((item, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input placeholder="Liability Name (e.g. Home Loan)" value={item.name} onChange={e => handleItemChange(liabilities, setLiabilities, index, 'name', e.target.value)} />
                    <Input type="number" placeholder="Amount" value={item.value || ''} onChange={e => handleItemChange(liabilities, setLiabilities, index, 'value', e.target.value)} className="w-40" />
                    <Button variant="ghost" size="icon" onClick={() => removeItem(liabilities, setLiabilities, index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                ))}
                <Button variant="outline" onClick={() => addItem(liabilities, setLiabilities)} className="w-full"><PlusCircle className="mr-2 h-4 w-4" /> Add Liability</Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div className="text-right">
                <Button variant="destructive"><Download className="mr-2 h-4 w-4" /> Download</Button>
            </div>
            <Card className="shadow-lg">
                <CardHeader className="items-center"><CardTitle>Assets vs. Liabilities</CardTitle></CardHeader>
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
                <CardHeader><CardTitle className="text-muted-foreground text-md font-medium">Total Assets</CardTitle></CardHeader>
                <CardContent><p className="text-2xl font-bold font-code">{formatCurrency(totalAssets)}</p></CardContent>
            </Card>
            <Card className="shadow-md text-center">
                <CardHeader><CardTitle className="text-muted-foreground text-md font-medium">Total Liabilities</CardTitle></CardHeader>
                <CardContent><p className="text-2xl font-bold font-code">{formatCurrency(totalLiabilities)}</p></CardContent>
            </Card>
             <Card className="shadow-md text-center bg-primary text-primary-foreground">
                <CardHeader><CardTitle className="text-md font-medium">Your Net Worth</CardTitle></CardHeader>
                <CardContent><p className="text-3xl font-bold font-code">{formatCurrency(netWorth)}</p></CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
