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

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);




// Mission Vision Section with Flip Cards
const MissionVisionSection = () => {
  return (
    <section className="container mx-auto max-w-6xl px-4 mb-16">
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          className="bg-white rounded-xl border border-primary/10 p-8 relative overflow-hidden group"
          initial={{ opacity: 0, rotateY: -90 }}
          whileInView={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 30px 40px -20px rgba(249, 115, 22, 0.4)",
            borderColor: "#f97316"
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <motion.div
            className="w-16 h-16  flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-4xl text-white">🎯</span>
          </motion.div>
          
          <h3 className="text-2xl font-bold text-black mb-4">Our Mission</h3>
          <p className="text-gray-700">
            To deliver innovative, data-driven digital marketing solutions that empower businesses to achieve sustainable growth and dominate their markets.
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl  border border-primary/10  p-8 relative overflow-hidden group"
          initial={{ opacity: 0, rotateY: 90 }}
          whileInView={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 30px 40px -20px rgba(249, 115, 22, 0.4)",
            borderColor: "#f97316"
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <motion.div
            className="w-16 h-16  rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-4xl text-white">👁️</span>
          </motion.div>
          
          <h3 className="text-2xl font-bold text-black mb-4">Our Vision</h3>
          <p className="text-gray-700">
            To become Pakistan's most trusted and innovative digital marketing agency, setting new standards of excellence and helping businesses unlock their full digital potential.
          </p>
        </motion.div>
      </div>
    </section>
  );
};



// Why Choose Section with Slide-up Cards
const WhyChooseSection = () => {
  const reasons = [
    {
      icon: '🤝',
      title: 'Your Dedicated Partner',
      description: 'At ClickMasters, we\'re not just another agency – we\'re your dedicated partner in helping your business grow online.'
    },
    {
      icon: '🎯',
      title: 'Full Range of Services',
      description: 'We offer a broad range of digital marketing services in Pakistan, from social media marketing to SEO, PPC, and more.'
    },
    {
      icon: '⭐',
      title: 'Trusted by Brands',
      description: 'We\'re proud to be recognized as one of the leading digital marketing agencies in Pakistan.'
    }
  ];

  return (
    <section className="container mx-auto max-w-6xl px-4 mt-16 mb-16">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-black text-center mb-12"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Why Choose <span className="text-orange-500">Clickmasters</span>
      </motion.h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl border-2 border-gray-200 p-8 hover:border-orange-500 transition-all group"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 25px 35px -15px rgba(249, 115, 22, 0.3)",
              borderColor: "#f97316"
            }}
          >
            <motion.div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-4xl text-white">{reason.icon}</span>
            </motion.div>
            <h3 className="text-xl font-semibold text-black mb-4">{reason.title}</h3>
            <p className="text-gray-700">{reason.description}</p>
          </motion.div>
        ))}
        
      </div>
  <motion.div
        className="mt-8 border rounded-xl p-8  relative overflow-hidden group"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ scale: 1.02 }}
      >
        <motion.div
          className="absolute inset-0 bg-white/20"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <h3 className="text-xl font-semibold mb-4 relative z-10">
          Customized Strategies for Every Business
        </h3>
        <p className="relative z-10">
          At Clickmasters, we understand that each business has unique needs. As a leading digital marketing agency, we create custom strategies that help your brand stand out online.
        </p>
      </motion.div>
    
    </section>
  );
};

// Team Section with 3D Cards
const TeamSection = () => {
  const team = [
    { icon: '👨‍💼', title: 'SEO Specialists', description: 'Experts in organic search optimization with proven track records.' },
    { icon: '🎨', title: 'Creative Designers', description: 'Award-winning designers who create stunning visuals that drive engagement.' },
    { icon: '📊', title: 'Data Analysts', description: 'Data-driven professionals who turn insights into actionable strategies.' }
  ];

  return (
    <section className="bg-gray-50 py-16 mb-16">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-black text-center mb-6"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Meet Our Expert <span className="text-orange-500">Team</span>
        </motion.h2>
        
        <motion.p
          className="text-center text-gray-700 max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Our talented team of digital marketing experts brings together diverse skills and experiences to deliver exceptional results for our clients.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8 perspective-1000">
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-6 text-center group"
              initial={{ opacity: 0, rotateX: 90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{
                rotateY: 10,
                scale: 1.05,
                boxShadow: "0 30px 40px -20px rgba(249, 115, 22, 0.4)",
                transition: { duration: 0.3 }
              }}
            >
              <motion.div
                className="w-20 h-20  rounded-full mx-auto mb-4 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-4xl text-white group-hover:scale-110 transition-transform">
                  {member.icon}
                </span>
              </motion.div>
              <h3 className="text-lg font-semibold text-black mb-2">{member.title}</h3>
              <p className="text-sm text-gray-600">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


// Contact Section with Floating Elements
const ContactSection = () => {
  const contactInfo = [
    { icon: '📍', title: 'Address', value: 'Main PWD Rd, PWD Housing Society Sector A PWD Society, Islamabad, Punjab 45700, Pakistan' },
    { icon: '📧', title: 'Email', value: 'marketing@clickmasters.pk' },
    { icon: '📞', title: 'Customer Support', value: '0332-5394285' },
    { icon: '💬', title: 'Consultation', value: '0333-1116842' }
  ];

  return (
    <section className="bg-black py-16 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Feel Free to <span className="text-orange-500">Contact Us</span> Anytime!
          </motion.h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Whether you need expert advice on SEO, PPC, social media, or any other digital marketing services, our team is here to help.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl border-2 border-orange-500 p-6 group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 30px -10px rgba(249, 115, 22, 0.5)",
                backgroundColor: "#fff9f5"
              }}
            >
              <motion.h3
                className="font-semibold text-black mb-3 flex items-center"
                whileHover={{ x: 10 }}
              >
                <motion.span
                  className="text-orange-500 mr-2 text-xl"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                >
                  {info.icon}
                </motion.span>
                {info.title}
              </motion.h3>
              <p className="text-sm text-gray-700">{info.value}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
        >
          <motion.button
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10">Schedule a Free Consultation</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// ==================== MAIN PAGE COMPONENT ====================

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
      <main className="pt-24 ">
        <HeroSection />
        <StatsSection />
        <TrustedPartnerSection />
        <StorySection />
        <TopCompanySection />
        <MissionVisionSection />
        <CoreValuesSection />
        <WhyChooseSection />
        <TeamSection />
   
        <ContactSection />
      </main>
      <Footer />
    </motion.div>
  );
};

export default About;