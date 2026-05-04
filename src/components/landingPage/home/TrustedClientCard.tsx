"use client";

interface TrustedClientCardProps {
   client: {
      name: string;
      logo: string;
      industry: string;
   };
   index: number;
   visible: boolean;
}

export function TrustedClientCard({ client, index, visible }: TrustedClientCardProps) {
   return (
      <div
         className="group flex flex-col items-center justify-center p-6 bg-gray-50/50 hover:bg-white rounded-2xl border border-gray-200 hover:border-primary-200 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-default"
         style={{
            transitionDelay: visible ? `${index * 60}ms` : "0ms",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
         }}
      >
         <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
            {client.logo}
         </div>
         <p className="text-lg font-bold text-gray-800 mb-1">{client.name}</p>
         <p className="text-xs text-gray-600 uppercase tracking-wide">{client.industry}</p>
      </div>
   );
}