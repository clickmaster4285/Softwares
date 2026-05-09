"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { resolveImageUrl } from "@/lib/utils";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface BlogPost {
  _id: string;
  slug?: string;
  published: boolean;
  title: string;
  excerpt: string;
  thumbnail?: string;
  category?: string;
  tags?: string[];
  createdAt?: string;
}

interface CaseStudy {
  _id: string;
  slug?: string;
  published?: boolean;
  title: string;
  excerpt: string;
  client?: string;
  thumbnail?: string;
  industry?: string;
  technologies?: string[];
  createdAt?: string;
}

interface InsightCard {
  id: string;
  type: "Case Study" | "Blog";
  title: string;
  thumbnail: string;
  href: string;
  index: number;
}

// ─── Unsplash image generator based on title and type ─────────────────────────

const getUnsplashImage = (type: string, title: string, index: number): string => {
  // Categories for variety
  const categories = {
    tech: ["technology", "computer", "coding", "software", "ai", "digital"],
    business: ["business", "office", "meeting", "startup", "corporate"],
    design: ["design", "creative", "ui", "ux", "web-design"],
    data: ["data", "analytics", "dashboard", "statistics"],
    cloud: ["cloud", "server", "network", "infrastructure"],
    mobile: ["mobile", "app", "smartphone", "ios", "android"],
    fintech: ["finance", "banking", "money", "crypto", "blockchain"],
    ecommerce: ["shopping", "ecommerce", "retail", "store", "marketplace"],
  };

  // Select category based on title keywords
  let selectedCategory = categories.tech;
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes("fintech") || lowerTitle.includes("finance") || lowerTitle.includes("banking")) {
    selectedCategory = categories.fintech;
  } else if (lowerTitle.includes("ecommerce") || lowerTitle.includes("shop") || lowerTitle.includes("retail")) {
    selectedCategory = categories.ecommerce;
  } else if (lowerTitle.includes("cloud") || lowerTitle.includes("infrastructure")) {
    selectedCategory = categories.cloud;
  } else if (lowerTitle.includes("design") || lowerTitle.includes("ui") || lowerTitle.includes("ux")) {
    selectedCategory = categories.design;
  } else if (lowerTitle.includes("data") || lowerTitle.includes("analytics")) {
    selectedCategory = categories.data;
  } else if (lowerTitle.includes("mobile") || lowerTitle.includes("app")) {
    selectedCategory = categories.mobile;
  } else if (lowerTitle.includes("business") || lowerTitle.includes("startup")) {
    selectedCategory = categories.business;
  }

  // Pick a keyword from the category
  const keyword = selectedCategory[index % selectedCategory.length];
  
  // Unsplash image URL with specific dimensions (800x600 for landscape, 800x1000 for portrait)
  const width = 800;
  const height = type === "Case Study" && index === 0 ? 1000 : 600;
  
  return `https://source.unsplash.com/featured/${width}x${height}/?${keyword}&sig=${index}`;
};

// ─── Helpers ───────────────────────────────────────────────────────────────────

function thumb(raw: string | undefined, type: string, title: string, index: number): string {
  if (raw?.trim()) {
    return resolveImageUrl(raw);
  }
  return getUnsplashImage(type, title, index);
}

function blogHref(post: BlogPost): string {
  const slug = post.slug?.trim() || post._id;
  return `/blog/${encodeURIComponent(slug)}`;
}

function caseStudyHref(cs: CaseStudy): string {
  const slug = cs.slug?.trim() || cs._id;
  return `/case-studies/${encodeURIComponent(slug)}`;
}

// ─── Animated card ─────────────────────────────────────────────────────────────

interface InsightCardItemProps {
  card: InsightCard;
  tall?: boolean;
}

const InsightCardItem = ({ card, tall = false }: InsightCardItemProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>("");

  useEffect(() => {
    // Set image source after mount to avoid hydration issues
    setImgSrc(card.thumbnail);
  }, [card.thumbnail]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), card.index * 80);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [card.index]);

  return (
    <Link
      ref={ref}
      href={card.href}
      className={[
        "relative rounded-2xl overflow-hidden cursor-pointer group block",
        "transition-all duration-500 ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
      ].join(" ")}
    >
      <div
        className={[
          "w-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900",
          tall ? "aspect-[4/5]" : "aspect-[16/10]"
        ].join(" ")}
      >
        {imgSrc && (
          <img
            src={imgSrc}
            alt={card.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 p-3"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
        }}
      >
        <p className="text-[11px] font-medium mb-1" style={{ color: "#4ee8c0" }}>
          {card.type}
        </p>
        <p className="text-white text-[13px] font-medium leading-snug line-clamp-2">
          {card.title}
        </p>
      </div>

      <div className="absolute inset-0 rounded-2xl transition-shadow duration-300 group-hover:shadow-[0_20px_48px_rgba(0,0,0,0.35)] pointer-events-none" />
    </Link>
  );
};

// ─── Skeleton ──────────────────────────────────────────────────────────────────

const SkeletonCard = ({ tall = false }: { tall?: boolean }) => (
  <div
    className={[
      "rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse",
      tall ? "aspect-[4/5]" : "aspect-[16/10]"
    ].join(" ")}
  />
);

// ─── Text Section Component ────────────────────────────────────────────────────

const InsightsHeader = () => {
  return (
    <div className="flex flex-col gap-5 lg:sticky lg:top-24">
      <p
        className="text-xs tracking-widest uppercase font-medium"
        style={{ color: "#0f9e7e" }}
      >
        Featured Insights
      </p>
      <h2
        className="text-3xl xl:text-4xl font-medium leading-tight"
        style={{ color: "#0c2a2a" }}
      >
        Stories of our transformations{" "}
        <span style={{ color: "#0f9e7e" }}>
          across Services and Industries
        </span>
      </h2>
    
      <p className="text-base" style={{ color: "#3a5a5a" }}>
        From Concept to Completion. We deliver enterprise-grade solutions for modern  
      </p>
      <p className="text-base" style={{ color: "#3a5a5a" }}>
        businesses, combining innovative technology with strategic execution. With a 
      </p>
      <p className="text-base" style={{ color: "#3a5a5a" }}>
        proven track record of successful deliveries across industries worldwide, 
      </p>
      <p className="text-base" style={{ color: "#3a5a5a" }}>
        we transform ideas into impactful digital experiences that drive real growth.
      </p>

      <Link
        href="/blog"
        className="w-fit px-6 py-2.5 rounded-full text-white text-sm font-medium transition-opacity hover:opacity-90"
        style={{ background: "#0f9e7e" }}
      >
        Explore More
      </Link>
    </div>
  );
};

// ─── Cards Section Component ───────────────────────────────────────────────────

interface InsightsCardsProps {
  cards: InsightCard[];
  isLoading: boolean;
}

const InsightsCards = ({ cards, isLoading }: InsightsCardsProps) => {
  
  const col1Cards = cards.slice(0, 2);
  const col2Cards = cards.slice(2, 5);
  const col3Cards = cards.slice(5, 8);

  return (
    <>
      {/* Column 1 - 2 cards */}
      <div className="flex flex-col gap-4 w-[220px] xl:w-[260px]">
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          col1Cards.map((card, idx) => (
            <InsightCardItem key={card.id} card={card} tall={false} />
          ))
        )}
      </div>

      {/* Column 2 - 3 cards */}
      <div className="flex flex-col gap-4 w-[220px] xl:w-[260px]">
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          col2Cards.map((card) => (
            <InsightCardItem key={card.id} card={card} />
          ))
        )}
      </div>

      {/* Column 3 - 3 cards */}
      <div className="flex flex-col gap-4 w-[220px] xl:w-[260px]">
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          col3Cards.map((card) => (
            <InsightCardItem key={card.id} card={card} />
          ))
        )}
      </div>
    </>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────

export default function FeaturedInsights() {
  const { data: blogs = [], isLoading: blogsLoading } = useQuery<BlogPost[]>({
    queryKey: ["featured-insights-blogs"],
    queryFn: async () => {
      const res = await apiFetch("/api/blog");
      if (!res.ok) throw new Error("Failed to fetch blogs");
      return res.json();
    },
  });

  const { data: caseStudies = [], isLoading: csLoading } = useQuery<CaseStudy[]>({
    queryKey: ["featured-insights-case-studies"],
    queryFn: async () => {
      const res = await apiFetch("/api/case-studies");
      if (!res.ok) throw new Error("Failed to fetch case studies");
      return res.json();
    },
  });

  const isLoading = blogsLoading || csLoading;

  const publishedCS = caseStudies.filter((c) => c.published !== false).slice(0, 4);
  const publishedBlogs = blogs.filter((b) => b.published !== false).slice(0, 4);

  // Layout order to achieve: Col1 (2 cards), Col2 (3 cards), Col3 (3 cards)
  const slotOrder: Array<"cs" | "blog"> = [
    "cs", "blog",  // First column
    "cs", "blog", "cs",  // Second column  
    "blog", "cs", "blog"  // Third column
  ];

  const cards: InsightCard[] = [];
  let csIdx = 0;
  let blogIdx = 0;

  for (const slot of slotOrder) {
    if (slot === "cs" && csIdx < publishedCS.length) {
      const cs = publishedCS[csIdx++];
      cards.push({
        id: cs._id,
        type: "Case Study",
        title: cs.title,
        thumbnail: thumb(cs.thumbnail, "Case Study", cs.title, cards.length),
        href: caseStudyHref(cs),
        index: cards.length,
      });
    } else if (slot === "blog" && blogIdx < publishedBlogs.length) {
      const blog = publishedBlogs[blogIdx++];
      cards.push({
        id: blog._id,
        type: "Blog",
        title: blog.title,
        thumbnail: thumb(blog.thumbnail, "Blog", blog.title, cards.length),
        href: blogHref(blog),
        index: cards.length,
      });
    }
  }

return (
  <section
    className="w-full min-h-screen px-4 sm:px-6 lg:px-8 xl:px-12 pt-16 overflow-hidden"
    style={{
      background:
        "linear-gradient(135deg, #f0fdfb 0%, #e0f7f4 40%, #ccf2ff 100%)",
    }}
  >
    {/* Mobile layout: 2 columns grid */}
    <div className="lg:hidden">
      <div className="mb-10">
        <InsightsHeader />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {isLoading ? (
          <>
            <SkeletonCard tall />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          cards.map((card) => (
            <InsightCardItem key={card.id} card={card} tall={card.index === 0} />
          ))
        )}
      </div>
    </div>

    {/* Desktop layout: 3 columns with exact distribution (2, 3, 3) */}
    <div className="hidden lg:flex justify-between gap-6 xl:gap-8">
      {/* Header - left side */}
      <div className="sticky top-24 flex-shrink-0 w-[280px] xl:w-[520px]">
        <InsightsHeader />
      </div>

      {/* Cards wrapper - 3 columns with exact distribution */}
      <div className="flex gap-6 xl:gap-8 flex-1 justify-end">
        <InsightsCards cards={cards} isLoading={isLoading} />
      </div>
    </div>
  </section>
);
}