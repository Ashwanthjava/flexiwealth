import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BarChart, FileText, Shield, PieChart, TrendingUp, Handshake } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: BarChart,
    title: 'Mutual Funds',
    description: 'Mutual funds are the easiest way to get your money working for you. Whether you’re chasing long-term growth, steady income, or balanced returns — we handpick funds that match your goals and risk profile. No random tips. No herd mentality. Just data-backed decisions and consistent monitoring.',
    cta: 'Let’s build your portfolio',
    href: 'https://flow.assetplus.in/client_onboarding/?advisor=68e200cbee8339b780dd0163',
  },
  {
    icon: Shield,
    title: 'Insurance',
    description: "Insurance isn’t just a checkbox — it’s peace of mind. We help you pick the right cover across life, health, and critical illness plans so your loved ones and goals stay secure, no matter what life throws your way. We don’t sell — we advise. So you only get what you need, nothing extra.",
    cta: 'Secure your future',
    href: 'https://flow.assetplus.in/client_onboarding/?advisor=68e200cbee8339b780dd0163',
  },
  {
    icon: FileText,
    title: 'NPS',
    description: 'Plan for your retirement with the National Pension System for a financially independent future.',
    cta: 'Read More',
    href: '#',
  },
  {
    icon: PieChart,
    title: 'Portfolio Management',
    description: 'Expert-led portfolio management services to optimize your returns and manage risks effectively.',
    cta: 'Read More',
    href: '#',
  },
  {
    icon: TrendingUp,
    title: 'Equity Trading',
    description: 'Access real-time market data and advanced tools for smart and informed equity trading decisions.',
    cta: 'Read More',
    href: '#',
  },
  {
    icon: Handshake,
    title: 'Financial Planning',
    description: 'Holistic financial planning to map your life goals to the right investment strategies.',
    cta: 'Read More',
    href: '#',
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
                <Link 
                  href={service.href} 
                  className="font-semibold text-primary flex items-center group-hover:text-accent transition-colors"
                  target={service.href.startsWith('http') ? '_blank' : '_self'}
                  rel={service.href.startsWith('http') ? 'noopener noreferrer' : ''}
                >
                  {service.cta}
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
