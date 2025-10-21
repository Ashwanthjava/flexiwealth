// This is a placeholder file for the Children Education Planner calculator.
// The actual implementation will be added in a future step.

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from 'next/link';

export default function ChildrenEducationPage() {
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
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This calculator is under construction.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
