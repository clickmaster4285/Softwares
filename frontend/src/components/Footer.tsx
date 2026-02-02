import { Heart, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="border-t border-border/50 px-4 sm:px-6 bg-gray-700 text-white">
      <div className="container mx-auto max-w-6xl py-10 md:py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/Clickmasters-Digital-Marketing-Agency.webp"
                alt="Click Master Projects"
                className="h-12 w-auto object-contain drop-shadow-sm"
              />
            </div>
            <p className="text-sm text-gray-200 max-w-sm">
              A clean, modern portfolio hub for showcasing products, web apps, and digital work with confidence.
            </p>
            <Button size="sm" className="gap-2 w-fit" asChild>
              <Link to="/contact">
                Start a Project <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-white">Explore</p>
            <div className="grid gap-2 text-sm text-gray-200">
              <Link to="/" className="hover:text-white transition-colors">Projects</Link>
              <Link to="/about" className="hover:text-white transition-colors">About</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-white">Get in touch</p>
            <div className="grid gap-2 text-sm text-gray-200">
              <a href="mailto:marketing@clickmasters.pk" className="hover:text-white transition-colors">marketing@clickmasters.pk</a>
              <a href="mailto:info@clickmasters.pk" className="hover:text-white transition-colors">info@clickmasters.pk</a>
              <a href="tel:0332-5394285" className="hover:text-white transition-colors">0332-5394285</a>
              <a href="tel:0333-1116842" className="hover:text-white transition-colors">0333-1116842</a>
              <span className="text-gray-300">Islamabad, Pakistan</span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-3 border-t border-white/20 pt-6">
          <p className="text-xs text-gray-200 flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-primary" /> for showcasing projects
          </p>
          <p className="text-xs text-gray-200">
            © {new Date().getFullYear()} Click Master Projects. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
