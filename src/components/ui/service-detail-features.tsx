import { Badge } from '@/components/ui/badge';
import { Marquee } from '@/components/ui/marquee';
import { Layers3, Target, TrendingUp, Handshake } from 'lucide-react';

const marqueeData = [
  'Architecture-first delivery',
  'Clear sprint visibility',
  'Business KPI alignment',
  'Long-term product ownership',
  'Security and compliance mindset',
  'Scalable system design',
  'Reliable post-launch support',
  'Cross-functional execution',
  'Faster time-to-value',
  'Risk-aware implementation',
  'Dedicated technical leadership',
  'Measurable outcomes',
];

const features = [
  {
    description:
      'Clear plans, clear priorities, and clear communication so stakeholders always know what is being built and why.',
    icon: Layers3,
    title: 'Simple execution model',
  },
  {
    description:
      'Every sprint is tied to business outcomes like conversion, efficiency, stability, and delivery velocity.',
    icon: Target,
    title: 'Results-focused delivery',
  },
  {
    description:
      'We design for growth from day one to avoid expensive rework when your product, users, and data volume increase.',
    icon: TrendingUp,
    title: 'Built to scale',
  },
  {
    description:
      'From discovery to post-launch, we stay accountable as an embedded partner rather than a short-term vendor.',
    icon: Handshake,
    title: 'Long-term partnership',
  },
];

export function ServiceDetailFeatures() {
  const m1 = marqueeData.slice(0, marqueeData.length / 3);
  const m2 = marqueeData.slice(
    marqueeData.length / 3,
    (marqueeData.length / 3) * 2
  );
  const m3 = marqueeData.slice((marqueeData.length / 3) * 2);

  return (
    <section className="relative border-y border-slate-200/80 bg-accent-50/50 py-16 sm:py-20">
      <div className="mx-auto max-w-full">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center space-y-4 px-5 text-center md:px-10">
          <h2 className="max-w-3xl text-4xl font-medium text-slate-900 sm:text-5xl lg:text-6xl">
            Removing roadblocks to delivery
          </h2>
          <p className="max-w-xl text-base text-slate-700 md:text-lg">
            We remove the noise, reduce delivery risk, and keep your software roadmap focused on
            outcomes that create measurable business value.
          </p>

          <div className="relative mx-auto mt-3 w-full max-w-3xl overflow-hidden">
            <div className="absolute left-0 z-10 h-full w-16 bg-gradient-to-r from-accent-50/50 to-transparent" />
            <div className="absolute right-0 z-10 h-full w-16 bg-gradient-to-l from-accent-50/50 to-transparent" />

            <div className="-mx-6 flex w-screen flex-col md:-mx-10 lg:-mx-16">
              <Marquee className="[--duration:45s] [--gap:0.75rem]" repeat={4}>
                {m1.map((q) => (
                  <Badge
                    className="rounded-full border-accent-200 bg-accent-100 px-3 py-1 text-slate-700"
                    key={q}
                    variant="outline"
                  >
                    {q}
                  </Badge>
                ))}
              </Marquee>

              <Marquee className="[--duration:50s] [--gap:0.75rem]" repeat={4} reverse>
                {m2.map((q) => (
                  <Badge
                    className="rounded-full border-accent-200 bg-accent-100 px-3 py-1 text-slate-700"
                    key={q}
                    variant="outline"
                  >
                    {q}
                  </Badge>
                ))}
              </Marquee>

              <Marquee className="[--duration:42s] [--gap:0.75rem]" repeat={4}>
                {m3.map((q) => (
                  <Badge
                    className="rounded-full border-accent-200 bg-accent-100 px-3 py-1 text-slate-700"
                    key={q}
                    variant="outline"
                  >
                    {q}
                  </Badge>
                ))}
              </Marquee>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 border-t border-dashed border-slate-300 sm:grid-cols-2 sm:divide-x sm:divide-dashed sm:divide-slate-300 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                className="flex flex-col gap-5 px-5 py-8 lg:px-6 lg:py-10"
                key={feature.title}
              >
                <Icon className="size-10 text-accent" />

                <div className="flex flex-col gap-2 pt-6 lg:pt-12">
                  <h3 className="text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-slate-600">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
