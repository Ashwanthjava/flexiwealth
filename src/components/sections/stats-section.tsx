"use client";

import { useEffect, useState, useRef } from 'react';
import { Users, DollarSign, Briefcase, Calendar } from 'lucide-react';

type StatCardProps = {
  icon: React.ElementType;
  value: number;
  label: string;
  unit?: string;
  prefix?: string;
};

function CountUp({ end, duration = 2 }: { end: number, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration * 1000 / frameRate);

  useEffect(() => {
    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentCount = Math.round(end * progress);

      if (ref.current) {
        ref.current.textContent = currentCount.toLocaleString();
      }

      if (frame === totalFrames) {
        clearInterval(counter);
        if (ref.current) {
          ref.current.textContent = end.toLocaleString(); // Ensure final value is accurate
        }
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [end, duration, totalFrames]);

  return <span ref={ref}>0</span>;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label, unit, prefix }) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="bg-background rounded-lg p-6 shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
      <Icon className="h-12 w-12 text-accent mx-auto mb-4" />
      <div className="text-4xl font-bold font-headline text-primary">
        {prefix}{isInView && <CountUp end={value} />}
        {unit && <span className="text-2xl">{unit}</span>}
      </div>
      <p className="text-muted-foreground mt-2 font-medium">{label}</p>
    </div>
  );
};

const stats: StatCardProps[] = [
  { icon: Users, value: 500, unit: '+', label: 'Families Served' },
  { icon: DollarSign, value: 250, unit: ' Cr+', label: 'Assets Under Management' },
  { icon: Briefcase, value: 1200, unit: '+', label: 'Total Investors' },
  { icon: Calendar, value: 15, unit: '+', label: 'Years of Experience' },
];

export function StatsSection({ id }: { id: string }) {
  return (
    <section id={id} className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
            Our Journey in Numbers
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Decades of dedication, trust, and proven results in wealth management.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
