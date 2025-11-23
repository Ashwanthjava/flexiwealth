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
        <g stroke="#E5E7EB" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 80L20 20L80 20" />
            <path d="M50 20C66.5685 20 80 33.4315 80 50" />
            <path d="M20 50C20 66.5685 33.4315 80 50 80" />
            <path d="M20 20L80 80" />
        </g>
      </svg>
      <span className="font-headline text-2xl font-bold">
        FlexiWealth
      </span>
    </div>
  );
}
