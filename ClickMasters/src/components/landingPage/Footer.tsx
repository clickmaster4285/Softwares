'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Twitter, Linkedin, Github, Youtube, Mail, Send } from "lucide-react";
import { motion, Variants, HTMLMotionProps } from "framer-motion";

// Type definitions
interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.ElementType;
  href: string;
  label: string;
  color: string;
}

interface FooterLinks {
  services: FooterLink[];
  company: FooterLink[];
  resources: FooterLink[];
  legal: FooterLink[];
}

const footerLinks: FooterLinks = {
  services: [
    { label: "Custom Software", href: "/about-us" },
    { label: "Web Development", href: "/about-us" },
    { label: "Mobile App Development", href: "/about-us" },
    { label: "ERP & Business Apps", href: "/about-us" },
    { label: "Our Projects", href: "/#apps" },
  ],
  company: [
    { label: "About Us", href: "/about-us" },
    { label: "Contact", href: "/contact-us" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Industries", href: "/#industries" },
    { label: "Support", href: "/#help" },
  ],
  resources: [
    { label: "Help & FAQ", href: "/#help" },
    { label: "Why Choose Us", href: "/#community" },
    { label: "Case Studies", href: "/#apps" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const socialLinks: SocialLink[] = [
  { icon: Twitter, href: "#", label: "Twitter", color: "hover:bg-[#1DA1F2]" },
  { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:bg-[#0A66C2]" },
  { icon: Github, href: "#", label: "GitHub", color: "hover:bg-[#333]" },
  { icon: Youtube, href: "#", label: "YouTube", color: "hover:bg-[#FF0000]" },
];

// Animation variants with proper typing
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
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const linkVariants: Variants = {
  hover: {
    x: 5,
    color: "#ffffff",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

const backgroundVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 0.1,
    transition: { duration: 1.5 }
  },
};

const footerVariants: Variants = {
  hidden: { backgroundColor: "#000000" },
  visible: { 
    backgroundColor: "#0a0a0a",
    transition: { duration: 0.8 }
  },
};

export function Footer(): JSX.Element {
  const currentYear: number = new Date().getFullYear();

  return (
    <motion.footer 
      variants={footerVariants}
      initial="hidden"
      animate="visible"
      className="bg-foreground text-background relative overflow-hidden"
    >
      {/* Animated background pattern */}
      <motion.div
        variants={backgroundVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 py-16 relative z-10">
        {/* Top Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-12 mb-12 pb-12 border-b border-background/20"
        >
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href="/" className="flex items-center gap-2">
                <img src="/logo-white.png" className="w-36 h-auto" alt="Logo" />
              </Link>
            </motion.div>
            <motion.p 
              variants={itemVariants}
              className="text-background/70 max-w-md mb-6"
            >
              ClickMasters is a software development company. We build custom software, web applications, mobile apps, and ERP solutions for businesses worldwide.
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="flex gap-4"
            >
              {socialLinks.map((social: SocialLink, index: number) => {
                const Icon = social.icon;
                return (
                  <motion.div
                    key={social.label}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={social.href}
                      className={`h-10 w-10 rounded-full bg-background/10 flex items-center justify-center transition-colors duration-300 ${social.color}`}
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5 text-background" />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.h3 
              variants={itemVariants}
              className="text-lg font-semibold text-background mb-4 flex items-center gap-2"
            >
              <Mail className="h-5 w-5" />
              Subscribe to our newsletter
            </motion.h3>
            <motion.p 
              variants={itemVariants}
              className="text-background/70 mb-4"
            >
              Get product updates, tech insights, and company news from your software development partner.
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="flex gap-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="relative flex-1">
                <Input 
                  placeholder="Enter your email" 
                  className="bg-background/10 border-background/20 text-background placeholder:text-background/50 focus:border-primary pr-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                  type="email"
                  aria-label="Email for newsletter"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <Send className="h-4 w-4 text-background/30" />
                </motion.div>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap relative overflow-hidden group"
                  aria-label="Subscribe to newsletter"
                >
                  <span className="relative z-10">Subscribe</span>
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Links Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
        >
          {(Object.entries(footerLinks) as [keyof FooterLinks, FooterLink[]][]).map(([category, links]) => (
            <motion.div key={category} variants={itemVariants}>
              <motion.h4 
                className="font-semibold text-background mb-4 capitalize relative inline-block"
                whileHover={{ scale: 1.05 }}
              >
                {category}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.h4>
              <ul className="space-y-3">
                {links.map((link: FooterLink) => (
                  <motion.li 
                    key={link.label}
                    variants={linkVariants}
                    whileHover="hover"
                    className="origin-left"
                  >
                    <Link 
                      href={link.href} 
                      className="text-background/70 hover:text-background transition-colors inline-block"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-background/20"
        >
          <motion.p 
            className="text-sm text-background/60"
            whileHover={{ color: "#ffffff" }}
          >
            © {currentYear} ClickMasters. All rights reserved.
          </motion.p>
          <motion.div 
            className="flex items-center gap-6 text-sm text-background/60"
            whileHover={{ color: "#ffffff" }}
          >
            <motion.span 
              className="cursor-pointer"
              whileHover={{ scale: 1.1 }}
              role="button"
              tabIndex={0}
              aria-label="Change language"
            >
              English (US)
            </motion.span>
            <motion.span 
              className="cursor-pointer"
              whileHover={{ scale: 1.1 }}
              role="button"
              tabIndex={0}
              aria-label="Change currency"
            >
              USD ($)
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
}