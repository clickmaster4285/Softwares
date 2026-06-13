"use client";
import React from "react";
import Image from "next/image";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

import Link from "next/link";

interface CeoVisionProps {
  slug?: string;
}

export function CeoVision({ slug }: CeoVisionProps) {

  return (
    <section id="case-study" className="w-full overflow-hidden relative bg-[#f5fbfb]">

   {/* SAME BLOBS AS TRUSTED CLIENTS */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#a7f3d0] opacity-30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[#fdba74] opacity-25 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-32 h-[550px] w-[550px] -translate-y-1/2 rounded-full bg-[#93c5fd] opacity-25 blur-3xl" />

      <ContainerScroll
        titleComponent={
          <div className="space-y-6 px-4 sm:px-6 md:px-10 mt-40">
           

            {/* Title */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold">
              CEO{" "}
              <span className="text-primary">
                Vision
              </span>
            </h2>

            {/* Subtitle */}
            <p className="mx-auto max-w-2xl text-base md:text-lg text-gray-900 leading-relaxed px-2 sm:px-0">
           To build scalable, intelligent{" "}
{slug ? (
  <Link
    href={`/${slug}`}
    className="text-primary font-medium hover:underline"
  >
    {slug} 
  </Link>
) : (
  "software development"
)}{" "}
solutions that empower businesses to grow, automate, and transform in a digital-first world.
            </p>
          </div>
        }
      >
        {/* Inner card layout */}
        <div className="flex h-full w-full flex-col md:flex-row overflow-hidden  ">
          {/* Left Image */}
          <div className="relative h-64 sm:h-80 md:h-full md:w-1/2 shrink-0">
            <Image
              src="/images/ceo.jpeg"
              alt="CEO Vision"
              fill
              className="object-cover object-center"
              draggable={false}
              priority
            />
            {/* Overlay gradient for blending */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-900/80 hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent md:hidden" />
          </div>

          {/* Right Text */}
          <div className="flex flex-1 flex-col justify-center gap-6 
                         px-5 py-8 sm:px-6 sm:py-10 
                         md:px-10 md:py-10 bg-white">
            
            {/* Quote mark */}
            <span className="text-6xl leading-none text-primary font-serif select-none">
              &ldquo;
            </span>

            <blockquote className="text-zinc-800 text-base sm:text-lg md:text-xl font-medium leading-relaxed -mt-4">
              We are not building software. We are architecting the infrastructure 
              of tomorrow systems that think, adapt, and grow alongside the 
              businesses they power. Our mission is to make cutting-edge technology 
              accessible to every ambitious team on the planet.
            </blockquote>

            <div className="flex items-center gap-4 mt-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
                AK
              </div>
              <div>
                <p className="font-semibold text-zinc-900">Amjad Khan</p>
                <p className="text-sm text-zinc-500 uppercase tracking-widest">CEO</p>
              </div>
            </div>

            {/* Stats row */}
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-zinc-100 pt-6">
              {[
                { value: "12+", label: "Years" },
                { value: "300+", label: "Projects" },
                { value: "98%", label: "Retention" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-xl md:text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}