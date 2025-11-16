import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactForm } from '@/components/contact-form';
import { MapPin, Mail, Phone } from 'lucide-react';


export default function ContactPage() {
  return (
    <>
      <Header />
      <div className="bg-background text-foreground">
        <section className="bg-primary text-primary-foreground py-20 text-center">
            <div className="container">
                <h1 className="text-4xl md:text-6xl font-bold font-headline">Get in Touch</h1>
                <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
                    We're here to help you on your financial journey. Reach out to us with any questions.
                </p>
            </div>
        </section>

        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <Card className="max-w-2xl mx-auto shadow-xl overflow-hidden">
                    <div className="p-8 md:p-12">
                        <h2 className="text-3xl font-bold font-headline text-primary mb-6 text-center">Send us a message</h2>
                        <ContactForm />
                    </div>
                </Card>
            </div>
        </section>
      </div>
    </>
  );
}
