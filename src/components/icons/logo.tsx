import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)} aria-label="FlexiWealth Logo">
      {/* 
        To use your own logo, replace 'src' with the path to your image file.
        For example, if you add 'logo.svg' to the 'public' folder, 
        you would change src to "/logo.svg".
      */}
      <Image 
        src="/icon.svg" 
        width={32} 
        height={32} 
        alt="FlexiWealth Logo" 
        className="text-primary"
      />
      <span className="font-headline text-2xl font-bold">
        FlexiWealth
      </span>
    </div>
  );
}
