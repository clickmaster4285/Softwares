"use client";

interface TechCategoryProps {
   title: string;
   items: string[];
   visible: boolean;
   delay: number;
}

export function TechCategory({ title, items, visible, delay }: TechCategoryProps) {
   return (
      <div
         className="mb-6"
         style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(15px)",
            transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
         }}
      >
         <p className="text-xs font-bold uppercase tracking-wider text-accent-500 mb-3">{title}</p>
         <div className="flex flex-wrap gap-2">
            {items.map((tech, idx) => (
               <span
                  key={tech}
                  className="text-[12px] font-medium text-gray-700 bg-gray-100 hover:bg-accent-700 hover:text-white hover:shadow-md transition-all duration-200 px-3 py-1.5 rounded-full cursor-default"
                  style={{
                     transitionDelay: visible ? `${delay + idx * 20}ms` : "0ms",
                     opacity: visible ? 1 : 0,
                     transform: visible ? "translateY(0)" : "translateY(5px)",
                  }}
               >
                  {tech}
               </span>
            ))}
         </div>
      </div>
   );
}