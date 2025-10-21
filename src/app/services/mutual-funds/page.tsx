import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import Link from 'next/link';

export default function MutualFundsPage() {
  return (
    <>
      <Header />
      <div className="bg-background text-foreground">
        <div className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">
              Invest smart, not hard.
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
              Mutual funds are the easiest way to get your money working for you. Whether you’re chasing long-term growth, steady income, or balanced returns — we handpick funds that match your goals and risk profile.
            </p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-16">
           <Card className="max-w-4xl mx-auto shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Ready to Build Your Portfolio?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                No random tips. No herd mentality. Just data-backed decisions and consistent monitoring. Let us guide you towards a diversified portfolio that stands the test of time.
              </p>
              <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/#contact">
                  Let’s build your portfolio ➜
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
