import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const coreValues = [
    { title: 'Client First', description: 'Your financial well-being is our top priority. We listen, we understand, and we act in your best interest.' },
    { title: 'Integrity', description: 'We believe in transparent, honest, and ethical advice. No hidden fees, no confusing jargon.' },
    { title: 'Expertise', description: 'Our strategies are backed by deep market knowledge, continuous research, and years of experience.' },
    { title: 'Long-Term Partnership', description: 'We’re not just advisors; we’re your partners in wealth creation for the long haul.' },
];


export default function AboutPage() {
    const aboutHero = PlaceHolderImages.find(p => p.id === 'about-hero');
    const harshJhaveri = PlaceHolderImages.find(p => p.id === 'harsh-jhaveri');

    return (
        <>
            <Header />
            <div className="bg-background text-foreground">

                <section className="relative py-20 md:py-32 text-center text-white flex items-center justify-center">
                    {aboutHero && (
                         <Image
                            src={aboutHero.imageUrl}
                            alt={aboutHero.description}
                            fill
                            className="object-cover"
                            priority
                            data-ai-hint={aboutHero.imageHint}
                        />
                    )}
                    <div className="absolute inset-0 bg-primary/80" />
                    <div className="relative z-10 p-4">
                        <h1 className="text-4xl md:text-6xl font-bold font-headline">
                            About FlexiWealth
                        </h1>
                        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
                            Your trusted partner in navigating the path to financial freedom.
                        </p>
                    </div>
                </section>

                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-6">Our Mission</h2>
                                <p className="text-lg text-muted-foreground mb-4">
                                    To democratize wealth creation by providing accessible, intelligent, and personalized financial advice. We empower our clients to achieve their life goals with confidence.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-6">Our Vision</h2>
                                <p className="text-lg text-muted-foreground">
                                    To be India’s most trusted financial advisory firm, known for our unwavering commitment to client success, ethical practices, and innovative solutions.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section className="bg-secondary py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
                                Meet the Team
                            </h2>
                            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                                The driving force behind your financial success.
                            </p>
                        </div>
                        <div className="flex justify-center">
                           <Card className="max-w-sm w-full shadow-xl overflow-hidden text-center">
                               {harshJhaveri && (
                                     <div className="relative h-64 w-full">
                                        <Image 
                                            src={harshJhaveri.imageUrl} 
                                            alt={harshJhaveri.description}
                                            fill
                                            className="object-cover"
                                            data-ai-hint={harshJhaveri.imageHint}
                                        />
                                    </div>
                               )}
                                <CardHeader>
                                    <CardTitle className="font-headline text-2xl">Harsh Jhaveri</CardTitle>
                                    <p className="text-primary font-semibold">Founder & Principal Advisor</p>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        With over 15 years of experience in financial markets, Harsh is passionate about helping individuals and families build lasting wealth. His expertise lies in portfolio management and goal-based financial planning.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                             <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
                                Our Core Values
                            </h2>
                            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                                The principles that guide every decision we make.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {coreValues.map((value) => (
                                <div key={value.title} className="text-center p-6">
                                    <CheckCircle className="h-10 w-10 text-accent mx-auto mb-4" />
                                    <h3 className="font-headline text-xl font-semibold mb-2">{value.title}</h3>
                                    <p className="text-muted-foreground text-sm">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4 py-16 text-center">
                        <h2 className="text-3xl font-bold font-headline mb-4">Ready to Start Your Journey?</h2>
                        <p className="max-w-2xl mx-auto text-lg mb-8">
                            Take the first step towards a more secure financial future. Let's talk about your goals.
                        </p>
                        <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 transform hover:scale-105 transition-transform">
                            <Link href="/#portfolio-review">
                                Get Your Free Portfolio Review
                            </Link>
                        </Button>
                    </div>
                </section>
            </div>
        </>
    );
}
