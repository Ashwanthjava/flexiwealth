import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BarChart, FileText, Shield, PieChart, TrendingUp, Handshake } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: BarChart,
    title: 'Mutual Funds',
    description: 'Diversify your portfolio with our curated list of top-performing mutual funds tailored to your risk appetite.',
  },
  {
    icon: Shield,
    title: 'Life Insurance',
    description: 'Secure your family\'s future with comprehensive life insurance plans from trusted providers.',
  },
  {
    icon: FileText,
    title: 'NPS',
    description: 'Plan for your retirement with the National Pension System for a financially independent future.',
  },
  {
    icon: PieChart,
    title: 'Portfolio Management',
    description: 'Expert-led portfolio management services to optimize your returns and manage risks effectively.',
  },
  {
    icon: TrendingUp,
    title: 'Equity Trading',
    description: 'Access real-time market data and advanced tools for smart and informed equity trading decisions.',
  },
  {
    icon: Handshake,
    title: 'Financial Planning',
    description: 'Holistic financial planning to map your life goals to the right investment strategies.',
  },
];

export function ServicesSection({ id }: { id: string }) {
  return (
    <section id={id} className="py-20 sm:py-28 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
            Our Financial Services
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive suite of services designed to help you build, manage, and protect your wealth.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
              <CardHeader className="flex-grow">
                <div className="mb-4">
                  <service.icon className="h-12 w-12 text-primary group-hover:text-accent transition-colors" />
                </div>
                <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
              <div className="p-6 pt-0">
                <Link href="#" className="font-semibold text-primary flex items-center group-hover:text-accent transition-colors">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
