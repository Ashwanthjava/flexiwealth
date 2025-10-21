'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Download, Info } from 'lucide-react';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const formatCurrency = (value: number) => currencyFormatter.format(value);


export function HumanLifeValueCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [annualIncome, setAnnualIncome] = useState(1000000);
  const [personalExpenses, setPersonalExpenses] = useState(200000);
  const [inflationRate, setInflationRate] = useState(6);
  const [returnRate, setReturnRate] = useState(8);

  const hlv = useMemo(() => {
    const workingYears = retirementAge - currentAge;
    const netIncomeForFamily = annualIncome - personalExpenses;
    
    // Using a simplified formula for Present Value of an Annuity with growth
    // PV = C * [1 - ((1+g)/(1+r))^n] / (r-g)
    // where C is initial cash flow, g is growth rate (inflation), r is discount rate (returns), n is number of years.
    
    const r = returnRate / 100;
    const g = inflationRate / 100;

    if (r <= g) return 0; // Avoid division by zero or negative results

    const factor = (1 - Math.pow((1 + g) / (1 + r), workingYears)) / (r - g);
    const value = netIncomeForFamily * factor;

    return value;

  }, [currentAge, retirementAge, annualIncome, personalExpenses, inflationRate, returnRate]);

  return (
    <TooltipProvider>
    <div className="bg-background text-foreground">
      <div className="bg-primary text-primary-foreground py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold font-headline">HUMAN LIFE VALUE CALCULATOR</h1>
          <p className="text-sm mt-2">
            <Link href="/" className="hover:underline">Home</Link> &gt; 
            <Link href="/#calculators" className="hover:underline"> Tools & Calculators</Link> &gt; Human Life Value Calculator
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Your Current Age</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={18} max={60} step={1} value={[currentAge]} onValueChange={(vals) => setCurrentAge(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>18</span><span>60</span></div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Expected Retirement Age</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={currentAge + 1} max={65} step={1} value={[retirementAge]} onValueChange={(vals) => setRetirementAge(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>{currentAge + 1}</span><span>65</span></div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Your Current Annual Income (Rs)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={100000} max={20000000} step={50000} value={[annualIncome]} onValueChange={(vals) => setAnnualIncome(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>₹1 Lakh</span><span>₹2 Crores</span></div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Your Annual Personal Expenses (Rs)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={personalExpenses} onChange={(e) => setPersonalExpenses(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={50000} max={annualIncome} step={25000} value={[personalExpenses]} onValueChange={(vals) => setPersonalExpenses(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>₹50,000</span><span>{formatCurrency(annualIncome)}</span></div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                    Discount Rate (Return on Investment %)
                    <Tooltip>
                        <TooltipTrigger><Info className="h-4 w-4 ml-2 text-muted-foreground"/></TooltipTrigger>
                        <TooltipContent>The rate of return you expect on the insurance payout.</TooltipContent>
                    </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input type="number" value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={1} max={15} step={0.1} value={[returnRate]} onValueChange={(vals) => setReturnRate(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>1%</span><span>15%</span></div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Expected Inflation Rate (%)</CardTitle></CardHeader>
              <CardContent>
                <Input type="number" value={inflationRate} onChange={(e) => setInflationRate(Number(e.target.value))} className="mb-4 text-lg font-bold" />
                <Slider min={1} max={10} step={0.1} value={[inflationRate]} onValueChange={(vals) => setInflationRate(vals[0])} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2"><span>1%</span><span>10%</span></div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div className="text-right">
                <Button variant="destructive"><Download className="mr-2 h-4 w-4" /> Download</Button>
            </div>
             <Card className="shadow-md text-center bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle className="text-md font-medium flex items-center justify-center">
                    Your Human Life Value
                    <Tooltip>
                        <TooltipTrigger><Info className="h-4 w-4 ml-2 text-primary-foreground/80"/></TooltipTrigger>
                        <TooltipContent>This is the estimated economic value your life provides to your dependents. It represents the amount of life insurance cover you may need.</TooltipContent>
                    </Tooltip>
                  </CardTitle>
                </CardHeader>
                <CardContent><p className="text-3xl font-bold font-code">{formatCurrency(hlv)}</p></CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>What is Human Life Value?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-4">
                    <p>Human Life Value (HLV) is a number that represents the monetary worth of a person's life to their dependents.</p>
                    <p>It helps in determining the amount of life insurance cover one should have to ensure that in their absence, their family can maintain their standard of living and meet their financial goals.</p>
                    <p>This calculator uses the income replacement method, which estimates your future earnings and discounts them to their present value.</p>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </TooltipProvider>
  );
}
