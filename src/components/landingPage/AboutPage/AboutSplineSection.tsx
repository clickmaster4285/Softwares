'use client';

import { motion } from 'framer-motion';
import { HeroSplinePanel } from '@/components/landingPage/home/hero-spline-panel';

/**
 * Spline robot only no dark band, no copy. Inherits surrounding page background (home / about).
 */
export function AboutSplineSection(): JSX.Element {
  return (
    <section
      className="w-full bg-transparent py-6 md:py-10 lg:py-14"
      aria-label="3D showcase"
    >
      <div className="mx-auto flex w-full max-w-5xl justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45 }}
          className="w-full min-w-0 flex justify-center"
        >
          <HeroSplinePanel className="w-full max-w-3xl lg:max-w-4xl" />
        </motion.div>
      </div>
    </section>
  );
}
