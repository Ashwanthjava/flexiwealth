import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const blogPosts = [
  {
    id: 'blog_1',
    title: 'SIP vs. Lumpsum: Which is the Right Investment Strategy for You?',
    excerpt: 'Understanding the nuances of Systematic Investment Plans and lump sum investments is crucial for maximizing your returns...',
    image: PlaceHolderImages.find(p => p.id === 'blog-1'),
  },
  {
    id: 'blog_2',
    title: 'Decoding Debt Funds: A Safer Haven for Your Capital',
    excerpt: 'Debt funds are a popular choice for risk-averse investors. Let\'s explore what they are and how they can fit into your portfolio...',
    image: PlaceHolderImages.find(p => p.id === 'blog-2'),
  },
  {
    id: 'blog_3',
    title: 'Weekly Market Analysis: Trends and Predictions',
    excerpt: 'A deep dive into this week\'s market performance, key indicators, and what to expect in the coming days as an equity trader...',
    image: PlaceHolderImages.find(p => p.id === 'blog-3'),
  },
];

export function BlogSection({ id }: { id: string }) {
  return (
    <section id={id} className="py-20 sm:py-28 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
            Latest Insights
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with our latest financial articles, market analysis, and investment tips.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden flex flex-col transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-2xl">
              {post.image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={post.image.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    data-ai-hint={post.image.imageHint}
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="font-headline text-xl h-20">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{post.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="link" className="p-0 text-primary font-bold">
                  <Link href="#">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
