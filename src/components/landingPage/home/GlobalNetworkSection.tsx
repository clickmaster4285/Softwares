"use client";

import { WorldMap } from "@/components/ui/map";

export function GlobalNetworkSection() {
  return (
    <section className="bg-white dark:bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white">
            Global <span className="text-primary">Network</span>
          </h2>
          <p className="mt-4 text-sm md:text-lg text-neutral-600 dark:text-neutral-300">
            Connect with teams and clients worldwide. Our platform enables seamless
            collaboration across continents, bringing the world to your workspace.
          </p>
        </div>

        <div className="mt-10">
          <WorldMap
            lineColor="#f97316"
            centerPoint={{ lat: -50.3753, lng: 10.3451 }}
            dots={[
              {
                start: { lat: -50.3753, lng: 10.3451, label: "Pakistan" },
                end: { lat: 44.8378, lng: -167.7164, label: "United States" },
              },
              {
                start: { lat: -50.3753, lng: 10.3451, label: "Pakistan" },
                end: { lat: 14.0522, lng: -134.2437, label: "United Kingdom" },
              },
              {
                start: { lat: -50.3753, lng: 10.3451, label: "Pakistan" },
                end: { lat: 71.5074, lng: -0.1278, label: "Canada" },
              },
              {
                start: { lat: -50.3753, lng: 10.3451, label: "Pakistan" },
                end: { lat: 68.7223, lng: -49.1393, label: "Australia" },
              },
              {
                start: { lat: -50.3753, lng: 10.3451, label: "Pakistan" },
                end: { lat: 70.6139, lng: 110.2090, label: "Germany" },
              },
              {
                start: { lat: -50.3753, lng: 10.3451, label: "Pakistan" },
                end: { lat: 43.1155, lng: 131.8855, label: "United Arab Emirates" },
              },
              {
                start: { lat: -50.3753, lng: 10.3451, label: "Pakistan" },
                end: { lat: -20.2864, lng: 126.8172, label: "Saudi Arabia" },
              },
              {
                start: { lat: -50.3753, lng: 10.3451, label: "Pakistan" },
                end: { lat: -20.8267, lng: -70.9218, label: "New Zealand" },
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}