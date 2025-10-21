"use client";

import { useState, useRef } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Upload, FileText, BarChart2, Loader2, CheckCircle } from 'lucide-react';

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

const mockAnalysis = {
  data: [
    { name: 'Equity', value: 65 },
    { name: 'Debt', value: 20 },
    { name: 'Gold', value: 10 },
    { name: 'Cash', value: 5 },
  ],
  summary: {
    totalValue: '₹ 25,48,320',
    riskProfile: 'Aggressive',
    suggestion: 'Your portfolio is heavily weighted towards equities, indicating a high-risk, high-return strategy. Consider diversifying into international markets and increasing debt allocation for better stability.',
  },
};

type Status = 'idle' | 'analyzing' | 'complete';

export function PortfolioEvaluation() {
  const [status, setStatus] = useState<Status>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setStatus('analyzing');
      setTimeout(() => {
        setStatus('complete');
      }, 3000);
    }
  };

  const reset = () => {
    setStatus('idle');
    if(fileInputRef.current) fileInputRef.current.value = "";
  };
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-background/80 backdrop-blur-sm rounded-lg border shadow-lg">
          <p className="font-bold">{`${payload[0].name}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="py-20 sm:py-28 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
            Holistic Portfolio Evaluation
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your Consolidated Account Statement (CAS) to get an instant, AI-powered analysis of your investments.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-xl">
          <CardContent className="p-8">
            {status === 'idle' && (
              <div className="text-center">
                <Upload className="mx-auto h-16 w-16 text-primary" />
                <h3 className="mt-4 text-2xl font-headline font-semibold">Upload Your CAS</h3>
                <p className="mt-2 text-muted-foreground">We support CAMS/KFintech PDFs. Your data is secure and private.</p>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf" />
                <Button size="lg" className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleUploadClick}>
                  <Upload className="mr-2 h-5 w-5" />
                  Select File
                </Button>
              </div>
            )}
            
            {status === 'analyzing' && (
              <div className="text-center flex flex-col items-center justify-center min-h-[300px]">
                <Loader2 className="h-16 w-16 text-primary animate-spin" />
                <h3 className="mt-4 text-2xl font-headline font-semibold">Analyzing Portfolio...</h3>
                <p className="mt-2 text-muted-foreground">Our AI is crunching the numbers. Please wait a moment.</p>
              </div>
            )}

            {status === 'complete' && (
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-headline font-semibold text-primary flex items-center gap-2"><CheckCircle className="text-green-500"/>Analysis Complete</h3>
                    <p className="text-muted-foreground">Here's a summary of your investment portfolio.</p>
                  </div>
                  <Button variant="outline" onClick={reset}>Analyze Another</Button>
                </div>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={mockAnalysis.data}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={110}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {mockAnalysis.data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold font-code">{mockAnalysis.summary.totalValue}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Risk Profile</CardTitle>
                        <BarChart2 className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-destructive">{mockAnalysis.summary.riskProfile}</div>
                      </CardContent>
                    </Card>
                    <p className="text-sm text-foreground bg-secondary p-4 rounded-md">{mockAnalysis.summary.suggestion}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
