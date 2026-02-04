import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getProjects } from '@/lib/storage';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    setProjectCount(getProjects().length);
  }, []);
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl shadow-sm border-b border-border/60"
    >
      <div className="container mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3 group">
            <img
              src="/Clickmasters-Digital-Marketing-Agency.webp"
              alt="Click Master Projects"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain drop-shadow-sm"
            />
            {/* <span className="hidden sm:inline font-display text-base md:text-xl font-semibold text-foreground">
              Click Master Projects
            </span> */}
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={e => {
                // If already on home, scroll to projects
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  const el = document.getElementById("projects");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Projects
            </Link>
            <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <span className="hidden sm:inline text-xs text-muted-foreground px-3 py-1 rounded-full border border-border/70 bg-secondary/40">
              {projectCount} Projects
            </span>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link to="/contact">Start a Project</Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
