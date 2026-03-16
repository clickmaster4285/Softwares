'use client';

import React, { useRef, useEffect,useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


import { HeroSection, StatsSection } from './Hero'

import { TrustedPartnerSection } from './TrustedPartnerSection'

import { StorySection } from './StorySection'

import {TopCompanySection} from './TopCompanySection'

import {CoreValuesSection} from './CoreValuesSection'


import { MissionVisionSection } from './MissionVisionSection'

import { WhyChooseSection } from './WhyChooseSection'


import { TeamSection } from './TeamSection'

import {ContactSection}  from './ContactSection'
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
     
    </motion.div>
  );
};

export default About;