import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactForm } from '@/components/contact-form';
import { MapPin, Mail, Phone } from 'lucide-react';

const contactDetails = [
    { icon: MapPin, text: '123 Finance Street, New York, USA' },
    { icon: Mail, text: 'contact@flexiwealth.com' },
    { icon: Phone, text: '+1 (234) 567-890' }
];

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
                <Card className="max-w-6xl mx-auto shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
                    <div className="p-8 md:p-12">
                        <h2 className="text-3xl font-bold font-headline text-primary mb-6">Send us a message</h2>
                        <ContactForm />
                    </div>
                    <div className="bg-secondary p-8 md:p-12 text-secondary-foreground">
                        <h2 className="text-3xl font-bold font-headline text-primary mb-6">Contact Information</h2>
                        <div className="space-y-6">
                            {contactDetails.map((detail, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <detail.icon className="h-6 w-6 text-accent mt-1" />
                                    <p className="text-lg text-foreground">{detail.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        </section>

        <section className="w-full h-[400px] md:h-[500px]">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.608359483329!2d-74.0088204845941!3d40.71426997933182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda22d%3A0x8a5a3c35b8c8a1e!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1620841123456!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                title="Google Map of New York"
            ></iframe>
        </section>
      </div>
    </>
  );
}
