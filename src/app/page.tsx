import { HeroSection } from '@/components/sections/hero-section';
import { StatsSection } from '@/components/sections/stats-section';
import { ServicesSection } from '@/components/sections/services-section';
import { InvestmentCalculator } from '@/components/sections/investment-calculator';
import { PortfolioEvaluation } from '@/components/sections/portfolio-evaluation';
import { BlogSection } from '@/components/sections/blog-section';
import { FadeIn } from '@/components/fade-in';

export default function Home() {
  return (
    <>
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
      <FadeIn>
        <PortfolioEvaluation />
      </FadeIn>
      <FadeIn>
        <BlogSection id="blog" />
      </FadeIn>
    </>
  );
}
