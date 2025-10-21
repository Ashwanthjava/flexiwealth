import { Logo } from '@/components/icons/logo';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer id="contact" className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm max-w-xs">
              Guiding your financial journey towards a prosperous future.
            </p>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#home" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="#about-us" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="#blog" className="hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground">Contact Us</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-sm">123 Finance Street, New York, USA</li>
              <li className="text-sm">contact@wealthfrontnav.com</li>
              <li className="text-sm">+1 (234) 567-890</li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground">Follow Us</h3>
            <div className="flex space-x-4 mt-4">
              <Link href="#" aria-label="Facebook"><Facebook className="h-6 w-6 hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="Twitter"><Twitter className="h-6 w-6 hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="LinkedIn"><Linkedin className="h-6 w-6 hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="Instagram"><Instagram className="h-6 w-6 hover:text-primary transition-colors" /></Link>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} WealthFront Navigator. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
