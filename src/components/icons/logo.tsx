import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  const svg = `
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="16" stroke="hsl(var(--primary))" stroke-width="3" stroke-linecap="round" pathLength="1" stroke-dasharray="0.85 0.15" transform="rotate(-90 20 20)"/>
      <line x1="2" y1="20" x2="38" y2="20" stroke="hsl(var(--primary))" stroke-width="2"/>
    </svg>
  `;

  const dataUri = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;

  return (
    <div className={`flex items-center gap-2 ${className}`} aria-label="FlexiWealth Logo">
      <Image src={dataUri} width={32} height={32} alt="FlexiWealth Logo" />
      <span className="font-headline text-2xl font-bold text-primary">
        FlexiWealth
      </span>
    </div>
  );
}
