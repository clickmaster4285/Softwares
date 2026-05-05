import Link from 'next/link';

type FaqItem = {
  question: string;
  answer: string;
  more?: { href: string; label: string };
};

const faqItems: FaqItem[] = [
  {
    question: 'How much does custom software development cost?',
    answer:
      'Custom software development costs vary based on complexity, features, and timeline. A basic web application typically starts from $5,000-$15,000, while enterprise systems range from $30,000-$200,000+. We provide free consultations to give accurate project estimates.',
    more: { href: '/contact-us', label: 'Get a free consultation' },
  },
  {
    question: 'How long does it take to build a custom software application?',
    answer:
      'Development timelines depend on the project scope. An MVP takes 6-12 weeks, a full web or mobile application takes 3-6 months, and enterprise systems can take 6-18 months. We use agile sprints to deliver working software every 2 weeks.',
    more: { href: '/case-studies', label: 'See how we deliver' },
  },
  {
    question: 'What technologies does ClickMasters use?',
    answer:
      "We use modern, proven technologies including React, Next.js, Node.js, Python, Flutter, React Native, PostgreSQL, MongoDB, AWS, Google Cloud, and Azure. We choose the best stack for each project's specific needs.",
    more: { href: '/services', label: 'Explore our services' },
  },
  {
    question: 'Do you provide post-launch support and maintenance?',
    answer:
      'Yes. ClickMasters provides 24/7 post-launch support, security updates, performance monitoring, and feature development. We offer monthly maintenance plans to keep your software running smoothly.',
    more: { href: '/testimonials', label: 'What clients say' },
  },
  {
    question: 'Can ClickMasters work with international clients?',
    answer:
      'Yes. We work with clients across the USA, Europe, Middle East, and worldwide. Our team operates across time zones and uses agile project management tools to ensure seamless collaboration regardless of location.',
    more: { href: '/software-solutions', label: 'Browse solutions by industry' },
  },
];

export function FaqSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-accent-200 via-accent-50/70 to-gold py-24" aria-labelledby="homepage-faq-heading">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="mb-14 text-center">
          <span className="inline-flex items-center rounded-full border border-accent/45 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            FAQ
          </span>
          <h2
            id="homepage-faq-heading"
            className="mt-5 text-3xl font-bold tracking-tight text-accent-700 md:text-5xl"
          >
            Answers before you start
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500 md:text-lg">
            Everything you need to know about our process, timelines, technology stack, and post-launch support.
          </p>
        </div>

        <div className="grid gap-4 md:gap-5">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition-all duration-300 open:border-accent/30 open:shadow-[0_14px_36px_rgba(15,23,42,0.08)]"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 marker:content-none">
                <span className="text-left text-lg font-semibold leading-7 text-slate-900">
                  {item.question}
                </span>
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 text-slate-500 transition group-open:rotate-45 group-open:border-accent/40 group-open:text-accent">
                  +
                </span>
              </summary>
              <p className="mt-4 border-t border-slate-100 pt-4 text-base leading-7 text-slate-600">
                {item.answer}
                {item.more ? (
                  <>
                    {' '}
                    <Link
                      href={item.more.href}
                      className="font-medium text-accent hover:underline"
                      aria-label={`${item.more.label} — ${item.more.href}`}
                    >
                      {item.more.label}
                    </Link>
                  </>
                ) : null}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
