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
      >
        <rect width="100" height="100" rx="8" fill="#2563EB"/>
        <g stroke="#E5E7EB" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="15" y="15" width="70" height="70" rx="4" />
            <path d="M15 85L85 15" />
            <path d="M85 50C85 69.33 69.33 85 50 85" />
            <path d="M15 50C15 30.67 30.67 15 50 15" />
        </g>
      </svg>
      <span className="font-headline text-2xl font-bold">
        FlexiWealth
      </span>
    </div>
  );
}
