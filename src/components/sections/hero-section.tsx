import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function HeroSection({ id }: { id: string }) {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-1');

  return (
    <section id={id} className="relative h-screen min-h-[600px] flex items-center justify-center text-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-primary/70" />
      <div className="relative z-10 p-4 max-w-4xl mx-auto">
        <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight drop-shadow-lg">
          Navigate Your Path to Financial Freedom
        </h1>
        <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
          At WealthFront Navigator, we empower you with the tools and expertise to build lasting wealth and achieve your most ambitious financial goals.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 transform hover:scale-105 transition-transform">
            <Link href="#portfolio-review">
              Get Free Portfolio Review
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary transition-colors">
            <Link href="#services">
              Explore Our Services
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
