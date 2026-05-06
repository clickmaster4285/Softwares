'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
}

const footerLinks = {
  services: [
    { label: 'Custom Software', href: '/services' },
    { label: 'Web Development', href: '/services' },
    { label: 'Mobile Apps', href: '/services' },
    { label: 'ERP Systems', href: '/services' },
  ],
  company: [
    { label: 'About', href: '/about-us' },
    { label: 'Contact', href: '/contact-us' },
    { label: 'Blog', href: '/blog' },
    { label: 'Testimonials', href: '/testimonials' },
  ],
  resources: [
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Support', href: '/contact-us' },
    { label: 'FAQ', href: '/contact-us' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Cookies', href: '#' },
  ],
};

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0H12v2.2h.1C12.9 8.9 14.6 8 16.6 8 21 8 22 10.7 22 15v9h-5v-8c0-2-.04-4.6-3-4.6s-3.5 2.3-3.5 4.5V24h-5V8z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.1c-3.34.72-4.04-1.6-4.04-1.6-.55-1.4-1.35-1.77-1.35-1.77-1.1-.75.08-.73.08-.73 1.22.1 1.86 1.26 1.86 1.26 1.08 1.85 2.82 1.3 3.5 1 .1-.8.42-1.3.76-1.6-2.66-.3-5.46-1.3-5.46-5.8 0-1.3.47-2.4 1.24-3.2-.12-.3-.54-1.5.12-3.1 0 0 1-.32 3.3 1.23a11.4 11.4 0 0 1 6 0C17 5.6 18 5.9 18 5.9c.66 1.6.24 2.8.12 3.1.77.8 1.24 1.9 1.24 3.2 0 4.5-2.8 5.5-5.5 5.8.43.4.81 1.1.81 2.2v3.3c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
        <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
        <path d="M18 2h3l-7 8 8 12h-6l-5-7-6 7H2l7.5-9L2 2h6l4.5 6L18 2z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-[#05070f] text-white border-t border-white/10">

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">

        <div>
          <Image
            src="/images/logo-white.webp"
            alt="ClickMasters"
            width={210}
            height={50}
          />

          <p className="text-gray-400 mt-4 max-w-md leading-relaxed">
            We design and build scalable software systems, SaaS platforms,
            mobile apps, and AI solutions for global businesses.
          </p>
        </div>

        {/* NEWSLETTER */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center gap-2 mb-3">
            <Mail className="h-5 w-5 text-btn-yellow" />
            <h3 className="text-lg font-semibold">Stay Updated</h3>
          </div>

          <p className="text-gray-400 text-sm mb-4">
            Get insights on software engineering, AI & product growth.
          </p>

          <div className="flex gap-2">
            <Input
              placeholder="Enter email"
              className="bg-white/5 border-white/10 text-white"
            />
            <Button className="bg-gradient-to-r from-btn-blue to-btn-yellow">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      {/* LINKS */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 py-12 border-t border-white/10">
        {Object.entries(footerLinks).map(([key, links]) => (
          <div key={key}>
            <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-4">
              {key}
            </h4>

            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* BOTTOM */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10">

        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} ClickMasters. All rights reserved.
        </p>

        {/* SOCIAL */}
        <div className="flex gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}