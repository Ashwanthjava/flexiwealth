import type { SVGProps } from 'react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`} aria-label="WealthFront Navigator Logo">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M4 18V12" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 18V7" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 18V14" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 18V4" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 21H22" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="font-headline text-xl font-bold text-foreground">
        WealthFront<span className="text-primary">Navigator</span>
      </span>
    </div>
  );
}
