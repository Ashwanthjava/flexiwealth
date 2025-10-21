import { HeroSection } from '@/components/sections/hero-section';
import { StatsSection } from '@/components/sections/stats-section';
import { ServicesSection } from '@/components/sections/services-section';
import { InvestmentCalculator } from '@/components/sections/investment-calculator';
import { FadeIn } from '@/components/fade-in';
import { Header } from '@/components/layout/header';

export default function Home() {
  return (
    <>
      <Header />
      <FadeIn>
        <HeroSection id="home" />
      </FadeIn>
      <FadeIn>
        <StatsSection id="about-us" />
      </FadeIn>
      <FadeIn>
        <ServicesSection id="services" />
      </FadeIn>
      <FadeIn>
        <InvestmentCalculator id="portfolio-review" />
      </FadeIn>
    </>
  );
}
