import { motion } from 'framer-motion';
import { Folder, ArrowDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient effect */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{ background: 'var(--gradient-hero)' }}
      />
      
      {/* Animated glow orb */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px] animate-glow-pulse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Curated product and web work</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="text-foreground">Builds that </span>
          <span className="gradient-text">ship faster</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          A professional portfolio of modern web builds, crafted with performance, accessibility, and design precision in mind.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <Button size="lg" className="shadow-sm" asChild>
            <a href="#projects">View Portfolio</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#projects">
              <Folder className="mr-2 h-4 w-4" />
              Explore Case Studies
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
