
"use client";

import { Lightbulb, Rocket, ShieldCheck, Headphones, ArrowRight, Sparkles } from "lucide-react";
import { StackedCards, type GlassCardItem } from "@/components/ui/glass-cards";

const values: GlassCardItem[] = [
  {
    id: 1,
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Agile Software Development",
    description:
      "Sprint-based delivery with full transparency. Our software developers ship faster, iterate smarter, and keep you in control at every milestone. We follow agile methodologies to ensure continuous improvement, faster feedback loops, and predictable delivery cycles for every project.",
    color: "rgba(156, 163, 175, 0.8)",
    cta: { label: "Learn more", href: "#" },
  },
  {
    id: 2,
    icon: <Rocket className="h-6 w-6" />,
    title: "Scalable & Future-Proof Architecture",
    description:
      "We engineer software solutions on proven stacks React, Node.js, and cloud-native infrastructure built to scale without costly rewrites. Our architecture is designed to handle growth, high traffic, and evolving business needs while maintaining performance and stability.",
    color: "rgba(156, 163, 175, 0.8)",
    cta: { label: "Learn more", href: "#" },
  },
  {
    id: 3,
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Enterprise Security & Compliance",
    description:
      "Every product from our software house follows OWASP standards, GDPR best practices, and rigorous QA so your business and users stay protected. We implement multi-layer security, encrypted data handling, and continuous vulnerability testing to ensure maximum protection.",
    color: "rgba(156, 163, 175, 0.8)",
    cta: { label: "Learn more", href: "#" },
  },
  {
    id: 4,
    icon: <Headphones className="h-6 w-6" />,
    title: "24/7 Dedicated Support",
    description:
      "Our software development company stays with you post-launch monitoring performance, deploying updates, and resolving issues around the clock. We ensure uninterrupted operations, proactive maintenance, and fast response support whenever you need assistance.",
    color: "rgba(156, 163, 175, 0.8)",
    cta: { label: "Learn more", href: "#" },
  },
];

export function AboutSection() {
  return (
    <section className="relative w-full ">

      {/* Header */}
       <div className="mx-auto max-w-5xl px-6 pt-24 pb-12 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[2px] w-8 rounded-full bg-primary" />
            
            <div className="inline-flex items-center gap-1.5">
              
              <p className="text-lg font-bold uppercase tracking-[0.2em] text-primary">
               About ClickMasters
              </p>
            </div>

            <span className="h-[2px] w-8 rounded-full bg-primary" />
          </div>

          {/* <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-2xl lg:text-3xl leading-tight">
         Who We Are
          </h2> */}

          <p className="mx-auto max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
           A results-driven <span className="font-semibold text-foreground">software house</span> building custom web apps, mobile apps, and enterprise software that powers real business growth.
          </p>
        </div>





      


      {/* MAIN GRID */}
      <div className="mx-auto lg:px-24 px-6 pb-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* LEFT COPY (sticky) */}
          <div className="lg:sticky lg:top-24 lg:self-start lg:pt-8 space-y-5 max-w-2xl">
            

               <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-2xl lg:text-3xl leading-tight">
          We Don't Just Build Software {" "}
          <span className="relative inline-block text-primary">
            We Build Revenue Systems
            <span className="absolute -bottom-2 left-0 h-[3px] w-full rounded-md bg-gradient-to-r from-primary/60 to-primary" />
          </span>

          </h2>

         
            


  <p className="text-lg leading-relaxed text-justify text-foreground/80">
    ClickMasters is a{" "}
    <span className="font-semibold text-primary">
      professional software development company
    </span>{" "}
    with a proven track record delivering custom software solutions across
    manufacturing, healthcare, retail, real estate, and education sectors.
  </p>

  <p className="text-base leading-relaxed text-justify text-foreground/80">
    Our team of experienced{" "}
    <span className="font-semibold">software developers</span> works as a
    seamless extension of your business translating complex requirements into
    reliable, scalable digital products that perform under real-world
    conditions.
  </p>

  <p className="text-base leading-relaxed text-justify text-foreground/80">
    As a full-service <span className="font-semibold">software house</span>,
    we handle everything from discovery and UI/UX design to backend
    development, QA testing, cloud deployment, and long-term maintenance end
    to end, under one roof.
  </p>



            
            <p className="text-base leading-relaxed text-justify text-foreground/80">
  We focus on building long-term partnerships by delivering quality-driven solutions that scale with your business.  
  Every project is crafted with performance, security, and user experience in mind.
            </p>

              <p className="text-base leading-relaxed text-justify text-foreground/80">
    Explore our{" "}
    <a
      className="text-primary underline-offset-2 hover:underline"
      href="#"
    >
      web application development
    </a>
    ,{" "}
    <a
      className="text-primary underline-offset-2 hover:underline"
      href="#"
    >
      mobile app development
    </a>
    , and{" "}
    <a
      className="text-primary underline-offset-2 hover:underline"
      href="#"
    >
      custom software development
    </a>{" "}
    services, or browse the{" "}
    <a
      className="text-primary underline-offset-2 hover:underline"
      href="#"
    >
      software solutions portfolio
    </a>{" "}
    by industry.
  </p>
            
  <div className="flex flex-wrap gap-3 pt-3">
    <a
      href="#"
      className="group inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-primary to-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:shadow-xl hover:shadow-primary/30"
    >
      Start Your Project
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </a>

    <a
      href="#"
      className="inline-flex items-center gap-2 rounded-md border border-primary/50 bg-white px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-[#fff5ef]"
    >
      View Our Work
      <ArrowRight className="h-4 w-4" />
    </a>
            </div>
            


            
</div>


          
          {/* RIGHT GLASS STACKED CARDS */}
          <div>
            <StackedCards items={values} />
          </div>
        </div>
      </div>



      

    </section>
  );
}

export default AboutSection;
