'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, ChevronRight, Phone } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

// Type definitions
interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinks {
  services: FooterLink[];
  company: FooterLink[];
  resources: FooterLink[];
  legal: FooterLink[];
}

const footerLinks: FooterLinks = {
  services: [
    { label: 'Custom Software', href: '/services' },
    { label: 'Web Development', href: '/services' },
    { label: 'Mobile App Development', href: '/services' },
    { label: 'ERP & Business Apps', href: '/services' },
    { label: 'Our Solutions', href: '/software-solutions' },
  ],
  company: [
    { label: 'About Us', href: '/about-us' },
    { label: 'Contact', href: '/contact-us' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Blog', href: '/blog' },
    { label: 'Support', href: '/#help' },
  ],
  resources: [
    { label: 'Help & FAQ', href: '/contact-us' },
    { label: 'Why Choose Us', href: '/#community' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Blog', href: '/blog' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
  ],
};

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

const linkVariants: Variants = {
  hover: {
    x: 5,
    color: '#ffffff',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
};

export function Footer(): JSX.Element {
  const currentYear: number = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ backgroundColor: '#000000' }}
      animate={{ backgroundColor: '#0a0a0a' }}
      transition={{ duration: 0.8 }}
      className="bg-foreground text-background relative overflow-hidden"
    >
      {/* Animated background pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-8 md:py-12 relative z-10">
        {/* Top Section - Stack on mobile */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 mb-8 pb-8 border-b border-background/20"
        >
          {/* Logo and Description */}
          <motion.div variants={itemVariants} className="text-center lg:text-left">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              className="inline-block lg:inline-block"
            >
              <Link href="/" className="flex items-center justify-center lg:justify-start gap-2">
                <Image
                  src="/images/logo-white.webp"
                  alt="ClickMasters"
                  width={600}
                  height={400}
                  className="h-auto w-32 sm:w-40 md:w-48 lg:w-56"
                  loading="lazy"
                />
              </Link>
            </motion.div>
            <motion.p variants={itemVariants} className="text-background/70 max-w-md mx-auto lg:mx-0 mt-4 text-sm sm:text-base">
              ClickMasters is a software development company. We build custom software, web
              applications, mobile apps, and ERP solutions for businesses worldwide.
            </motion.p>
            
            {/* Contact Numbers */}
            <motion.div variants={itemVariants} className="mt-6 space-y-2">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <a 
                    href="tel:+447988576086" 
                    className="text-background/70 hover:text-background transition-colors text-sm"
                  >
                    🇬🇧 UK: +44 7988 576086
                  </a>
                  <span className="hidden sm:inline text-background/30">|</span>
                  <a 
                    href="tel:+13252024074" 
                    className="text-background/70 hover:text-background transition-colors text-sm"
                  >
                    🇺🇸 US: +1 325 202 4074
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div variants={itemVariants} className="text-center lg:text-left">
            <motion.h3
              variants={itemVariants}
              className="text-base sm:text-lg font-semibold text-background mb-3 flex items-center justify-center lg:justify-start gap-2"
            >
              <Mail className="h-5 w-5" />
              Subscribe to our newsletter
            </motion.h3>
            <motion.p variants={itemVariants} className="text-background/70 mb-4 text-sm sm:text-base">
              Get product updates, tech insights, and company news.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <div className="relative flex-1">
                <Input
                  placeholder="Enter your email"
                  className="bg-background/10 border-background/20 text-background placeholder:text-background/50 focus:border-primary transition-all duration-300 focus:ring-2 focus:ring-primary/20 h-11"
                  type="email"
                  aria-label="Email for newsletter"
                />
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap relative overflow-hidden group h-11 px-6 w-full sm:w-auto"
                  aria-label="Subscribe to newsletter"
                >
                  <span className="relative z-10">Subscribe</span>
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Links Grid - Responsive columns */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8"
        >
          {(Object.entries(footerLinks) as [keyof FooterLinks, FooterLink[]][]).map(
            ([category, links]) => (
              <motion.div key={category} variants={itemVariants}>
                <motion.h4
                  className="font-semibold text-background mb-4 capitalize relative inline-block text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                >
                  {category}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.h4>
                <ul className="space-y-2 sm:space-y-3">
                  {links.map((link: FooterLink) => (
                    <motion.li
                      key={link.label}
                      variants={linkVariants}
                      whileHover="hover"
                      className="origin-left flex items-center gap-2 group"
                    >
                      {/* Bullet point */}
                      <ChevronRight className="h-3 w-3 text-primary/60 group-hover:text-primary transition-colors flex-shrink-0" />
                      <Link
                        href={link.href}
                        className="text-background/70 hover:text-background transition-colors text-sm sm:text-base"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )
          )}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-background/20"
        >
          <motion.p className="text-xs sm:text-sm text-background/60 text-center sm:text-left" whileHover={{ color: '#ffffff' }}>
            © {currentYear} ClickMasters. All rights reserved.
          </motion.p>
          
          {/* Optional: Add additional footer links here if needed */}
          <div className="flex gap-4 text-xs sm:text-sm text-background/60">
            <Link href="/privacy-policy" className="hover:text-background transition-colors">
              Privacy
            </Link>
            <Link href="/terms-of-service" className="hover:text-background transition-colors">
              Terms
            </Link>
            <Link href="/sitemap" className="hover:text-background transition-colors">
              Sitemap
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}