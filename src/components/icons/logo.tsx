import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)} aria-label="FlexiWealth Logo">
       <svg 
        width="32" 
        height="32" 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <rect width="100" height="100" rx="8" fill="currentColor"/>
        <g stroke="#E5E7EB" strokeWidth="6">
          <path d="M5 95V5H95" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M95 50C95 74.8528 74.8528 95 50 95" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 50C5 25.1472 25.1472 5 50 5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 5L95 95" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 50H95" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      </svg>
      <span className="font-headline text-2xl font-bold">
        FlexiWealth
      </span>
    </div>
  );
}