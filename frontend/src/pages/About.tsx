'use client';

import React, { useRef, useEffect,useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '@/components/landingPage/navbar';
import { Footer } from '@/components/landingPage/Footer';

import { HeroSection, StatsSection } from '@/components/landingPage/AboutPage/Hero'

import { TrustedPartnerSection } from '@/components/landingPage/AboutPage/TrustedPartnerSection'

import { StorySection } from '@/components/landingPage/AboutPage/StorySection'

import {TopCompanySection} from '@/components/landingPage/AboutPage/TopCompanySection'

import {CoreValuesSection} from '@/components/landingPage/AboutPage/CoreValuesSection'


import { MissionVisionSection } from '@/components/landingPage/AboutPage/MissionVisionSection'

import { WhyChooseSection } from '@/components/landingPage/AboutPage/WhyChooseSection'


import { TeamSection } from '@/components/landingPage/AboutPage/TeamSection'

import {ContactSection}  from '@/components/landingPage/AboutPage/ContactSection'
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);







const About = () => {
  useEffect(() => {
    // Initialize ScrollTrigger
    ScrollTrigger.refresh();
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Navbar />
      <main className="">
        <HeroSection />
        <StatsSection />
       
         

  <section className=" mx-auto max-w-6xl mt-16 grid md:grid-cols-2 gap-6">
      <StorySection />
      <TopCompanySection />
    </section>

        <TrustedPartnerSection />
        <MissionVisionSection />
        
 <WhyChooseSection />
      

       
        
        <CoreValuesSection />
     
        <TeamSection />
   
        <ContactSection />
      </main>
      <Footer />
    </motion.div>
  );
};

export default About;