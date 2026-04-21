'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type FaqItem = {
  question: string;
  answer: string;
};

type BlogFaqSectionProps = {
  title?: string;
  items: FaqItem[];
};

export default function BlogFaqSection({ title, items }: BlogFaqSectionProps) {
  if (!items.length) return null;
  const heading = title?.trim() || 'Frequently Asked Questions';

  return (
    <section id="faq-section" className="mt-10">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{heading}</h2>

      <Accordion type="single" collapsible className="mt-5">
        {items.map((item, idx) => (
          <AccordionItem key={`${item.question}-${idx}`} value={`faq-${idx}`} className="border-slate-200">
            <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="pt-0 text-sm leading-7 text-slate-600">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
