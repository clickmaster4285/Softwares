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
    <div className="group flex h-32 w-56 flex-shrink-0 items-center justify-center rounded-3xl bg-white px-8 transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-16 w-full transition-transform duration-300 group-hover:scale-110">
        <Image
          src={item.logo}
          alt={item.name}
          fill
          className="object-contain"
          sizes="224px"
        />
      </div>
    </div>
  );
}

export default function TrustedBySection() {
  // Duplicate arrays for seamless infinite scroll
  const rowOne = [...partners, ...partners];
  const rowTwo = [...partners.slice().reverse(), ...partners.slice().reverse()];

  return (
    <>
      <style jsx>{`
        @keyframes marquee-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-right {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
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

        @media (max-width: 768px) {
          .marquee-left,
          .marquee-right {
            animation-duration: 70s;
          }
        }
      `}</style>

      <section className="relative w-full overflow-hidden lg:px-10">
        {/* Top fade */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-56 bg-gradient-to-b from-transparent via-white/30 via-white/70 to-white" />

        <div className="relative z-10 w-full">
          <div className="space-y-4 bg-white">

            {/* Row 1 */}
            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />

              <div className="marquee-left flex w-max gap-4 md:gap-6">
                {rowOne.map((item, index) => (
                  <PartnerCard
                    key={`row1-${item.name}-${index}`}
                    item={item}
                  />
                ))}
              </div>
            </div>

            {/* Row 2 */}
            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />

              <div className="marquee-right flex w-max gap-4 md:gap-6">
                {rowTwo.map((item, index) => (
                  <PartnerCard
                    key={`row2-${item.name}-${index}`}
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