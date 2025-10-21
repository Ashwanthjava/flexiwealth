"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about-us', label: 'About Us' },
  { href: '#services', label: 'Services' },
  { href: '#portfolio-review', label: 'Portfolio Review' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLink = ({ href, label, isMobile = false }: { href: string; label: string, isMobile?: boolean }) => (
    <Link
      href={href}
      className={cn(
        "font-medium transition-colors hover:text-primary",
        isMobile ? "block w-full text-lg p-4" : ""
      )}
      onClick={() => isMobile && setIsSheetOpen(false)}
    >
      {label}
    </Link>
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-background/90 shadow-md backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 h-20 flex justify-between items-center">
        <Link href="#home">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background">
              <div className="flex justify-between items-center p-4 border-b">
                <Logo />
                <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </SheetClose>
              </div>
              <nav className="mt-6 flex flex-col gap-2">
                {navItems.map((item) => (
                  <NavLink key={item.href} {...item} isMobile />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
