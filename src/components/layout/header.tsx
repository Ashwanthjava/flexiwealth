"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"

const navItems = [
  { href: '/#home', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/#services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

const calculatorItems = [
    { href: '/calculators/crorepati', label: 'Become A Crorepati' },
    { href: '/calculators/sip-return', label: 'SIP Return Calculator' },
    { href: '/calculators/retirement-planning', label: 'Retirement Planning Calculator' },
    { href: '/calculators/emi', label: 'EMI Calculator' },
    { href: '/calculators/ppf', label: 'PPF Calculator' },
    { href: '/calculators/epf', label: 'Employees PF Calculator' },
    { href: '/calculators/goal-setting', label: 'Goal Setting Calculator' },
    { href: '/calculators/financial-goal', label: 'Composite Financial Goal Calculator' },
    { href: '/calculators/children-education', label: 'Children Education Planner' },
    { href: '/calculators/networth', label: 'Networth Calculator' },
    { href: '/calculators/compounding', label: 'Compounding Calculator' },
    { href: '/calculators/human-life-value', label: 'Human Life Value Calculator' },
    { href: '/calculators/nps', label: 'NPS Calculator' },
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
    <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 transform hover:scale-105 transition-transform">
        <Link
          href={href}
          onClick={() => isMobile && setIsSheetOpen(false)}
        >
          {label}
        </Link>
    </Button>
  );
  
  const CalculatorsDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 transform hover:scale-105 transition-transform">
          Calculators
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" style={{
          animation: 'slide-down 0.3s ease-out'
      }}>
        <DropdownMenuItem asChild>
          <Link href="/#portfolio-review" className="cursor-pointer">Investment Comparison Calculator</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {calculatorItems.map((item) => (
            <DropdownMenuItem key={item.href} asChild>
                <Link href={item.href} className="cursor-pointer">{item.label}</Link>
            </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-background/90 shadow-md backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 h-20 flex justify-between items-center">
        <Link href="/#home" className="text-primary">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
          <CalculatorsDropdown />
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
                <div className="text-primary">
                  <Logo />
                </div>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </SheetClose>
              </div>
              <nav className="mt-6 flex flex-col gap-4 p-4">
                {navItems.map((item) => (
                  <NavLink key={item.href} {...item} isMobile />
                ))}
                 <div className="pt-2">
                    <CalculatorsDropdown />
                 </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
