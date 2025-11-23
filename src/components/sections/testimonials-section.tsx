"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getTestimonials, type Testimonial } from "@/lib/testimonials-service";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const staticTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rohan Sharma",
    title: "Tech Entrepreneur",
    quote: "FlexiWealth transformed my approach to investing. Their data-driven advice helped me build a diversified portfolio that has consistently outperformed my expectations. Truly a trustworthy partner.",
    avatar: "https://picsum.photos/seed/101/80/80",
    imageHint: "man portrait"
  },
  {
    id: "2",
    name: "Priya Singh",
    title: "Doctor",
    quote: "As a busy professional, I needed an advisor I could rely on. Anish and his team have been phenomenal, offering clear, jargon-free guidance that secured my family's financial future. I couldn't be happier.",
    avatar: "https://picsum.photos/seed/102/80/80",
    imageHint: "woman portrait"
  },
  {
    id: "3",
    name: "Amit Patel",
    title: "Marketing Manager",
    quote: "The personalized financial plan they created for me was a game-changer. It aligned perfectly with my long-term goals, from my child's education to my own retirement. Their expertise is unmatched.",
    avatar: "https://picsum.photos/seed/103/80/80",
    imageHint: "man portrait"
  },
   {
    id: "4",
    name: "Sunita Reddy",
    title: "Small Business Owner",
    quote: "Working with FlexiWealth has been a fantastic experience. They are not just advisors, but true partners who genuinely care about your financial well-being. Highly recommended for their ethical and knowledgeable approach.",
    avatar: "https://picsum.photos/seed/104/80/80",
    imageHint: "woman portrait"
  },
];

export function TestimonialsSection({ id }: { id: string }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(staticTestimonials);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const fetchedTestimonials = await getTestimonials();
        if (fetchedTestimonials.length > 0) {
          setTestimonials(fetchedTestimonials);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
        // Fallback to static testimonials if fetch fails
        setTestimonials(staticTestimonials);
      }
    }
    fetchTestimonials();
  }, []);

  return (
    <section id={id} className="py-20 sm:py-28 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from clients who have trusted us with their financial future.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2">
                <div className="p-1 h-full">
                  <Card className="h-full flex flex-col justify-between shadow-lg">
                    <CardContent className="p-6 text-center flex-grow">
                      <Image
                        src={testimonial.avatar}
                        alt={`Avatar of ${testimonial.name}`}
                        width={80}
                        height={80}
                        className="rounded-full mx-auto mb-4 border-4 border-primary/10"
                        data-ai-hint={testimonial.imageHint}
                      />
                      <blockquote className="text-foreground italic">
                        "{testimonial.quote}"
                      </blockquote>
                    </CardContent>
                    <div className="bg-muted p-4 text-center border-t">
                      <p className="font-bold font-headline text-primary">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}