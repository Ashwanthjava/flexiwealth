import type { SVGProps } from 'react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`} aria-label="FlexiWealth Logo">
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="20" cy="20" r="16" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" pathLength="1" strokeDasharray="0.85 0.15" transform="rotate(-90 20 20)"/>
        <line x1="2" y1="20" x2="38" y2="20" stroke="hsl(var(--primary))" strokeWidth="2"/>
      </svg>
      <span className="font-headline text-2xl font-bold text-primary">
        FlexiWealth
      </span>
    </div>
  );
}