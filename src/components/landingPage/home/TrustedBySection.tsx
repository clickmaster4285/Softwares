"use client";

import Image from "next/image";

const partners = [
  { name: "Amazon", logo: "/partners/amazon.png" },
  { name: "Bing", logo: "/partners/bing.png" },
  { name: "Buffer", logo: "/partners/buffer.png" },
  { name: "CB", logo: "/partners/cb.png" },
  { name: "Clarity", logo: "/partners/clarity.jpg" },
  { name: "ClickUp", logo: "/partners/clickup.png" },
  { name: "Clutch", logo: "/partners/clutch.png" },
  { name: "Forbes", logo: "/partners/forbes.webp" },
  { name: "Google Analytics", logo: "/partners/google-analytics.png" },
  { name: "Google Tag Manager", logo: "/partners/google-manager.png" },
  { name: "Google", logo: "/partners/google.png" },
  { name: "HubSpot", logo: "/partners/hub-spot.png" },
  { name: "Shopify", logo: "/partners/shopify.png" },
  { name: "SpyFu", logo: "/partners/spyfu.png" },
  { name: "WooCommerce", logo: "/partners/woo-commerence.webp" },
  { name: "Zoho", logo: "/partners/zoho.png" },
];

function PartnerCard({
  item,
}: {
  item: { name: string; logo: string };
}) {
  return (
    <div className="group flex h-32 w-56 flex-shrink-0 items-center justify-center rounded-3xl  bg-white px-8 transition-all duration-300 hover:-translate-y-1 ">
      
      <div className="relative h-16 w-full transition-transform duration-300 group-hover:scale-110">
        <Image
          src={item.logo}
          alt={item.name}
          fill
          className="object-contain"
        />
      </div>

    </div>
  );
}


export default function TrustedBySection() {
  const rowOne = [...partners, ...partners];
  const rowTwo = [...partners.reverse(), ...partners.reverse()];

  return (
    <>
      <style>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .marquee-left {
          animation: marquee-left 45s linear infinite;
        }

        .marquee-right {
          animation: marquee-right 45s linear infinite;
        }

        .marquee-left:hover,
        .marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <div className="mx-auto  px-4 sm:px-6 lg:px-12">

          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-[2px] w-8 rounded-full bg-orange-400" />

              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-800">
                Trusted By Global Brands
              </p>

              <span className="h-[2px] w-8 rounded-full bg-orange-400" />
            </div>

            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
              Our Partners & Platforms
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Trusted technologies, platforms, and ecosystems we work with
              to build scalable digital products and enterprise solutions.
            </p>
          </div>

          {/* Slider Wrapper */}
          <div className="mt-16 space-y-8">

            {/* Row 1 */}
            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent" />

              <div className="marquee-left flex w-max gap-4 md:gap-6">
                {rowOne.map((item, index) => (
                  <PartnerCard
                    key={`${item.name}-${index}`}
                    item={item}
                  />
                ))}
              </div>
            </div>

            {/* Row 2 */}
            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent" />

              <div className="marquee-right flex w-max gap-4 md:gap-6">
                {rowTwo.map((item, index) => (
                  <PartnerCard
                    key={`${item.name}-second-${index}`}
                    item={item}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}