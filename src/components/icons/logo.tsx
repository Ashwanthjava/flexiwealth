import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={className} aria-label="FlexiWealth Logo">
      <Image src="/logo.svg" alt="FlexiWealth Logo" width={32} height={32} />
      <span className="font-headline text-2xl font-bold ml-2">
        FlexiWealth
      </span>
    </div>
  );
}