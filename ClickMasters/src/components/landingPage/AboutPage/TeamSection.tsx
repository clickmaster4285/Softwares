import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);


// Team Section with 3D Cards
export const TeamSection = () => {
  const team = [
    { icon: '👨‍💼', title: 'SEO Specialists', description: 'Experts in organic search optimization with proven track records.' },
    { icon: '🎨', title: 'Creative Designers', description: 'Award-winning designers who create stunning visuals that drive engagement.' },
    { icon: '📊', title: 'Data Analysts', description: 'Data-driven professionals who turn insights into actionable strategies.' }
  ];

  return (
    <section className="py-16 mb-16">
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
          Our talented team of software developers experts brings together diverse skills and experiences to deliver exceptional results for our clients.
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
