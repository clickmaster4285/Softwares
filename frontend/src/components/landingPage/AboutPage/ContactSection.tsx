
import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);


// Contact Section with Floating Elements
export const ContactSection = () => {
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
