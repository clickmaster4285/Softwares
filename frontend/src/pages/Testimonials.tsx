import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/landingPage/navbar";
import { Footer } from "@/components/landingPage/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star, ArrowLeft } from "lucide-react";
import { apiFetch } from "@/lib/api";

interface Testimonial {
  _id: string;
  authorName: string;
  authorRole?: string;
  authorCompany?: string;
  content: string;
  avatarUrl?: string;
  rating: number;
}

const Testimonials = () => {
  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await apiFetch("/api/testimonials");
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      return res.json();
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-10 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="text-center max-w-3xl mx-auto mb-14">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              What our <span className="text-primary">clients say</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Feedback from businesses who chose our software development company for custom software, web apps, and mobile apps.
            </p>
          </div>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="rounded-xl border-border/60">
                  <CardContent className="p-6">
                    <div className="h-10 w-10 bg-muted rounded animate-pulse mb-4" />
                    <div className="h-4 w-full bg-muted rounded animate-pulse mb-2" />
                    <div className="h-4 w-3/4 bg-muted rounded animate-pulse mb-4" />
                    <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-16 rounded-2xl border border-border/60 bg-card/50">
              <Quote className="h-14 w-14 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">No testimonials yet</h2>
              <p className="text-muted-foreground">Check back later for client stories.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <Card
                  key={t._id}
                  className="h-full border-border/60 bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <Quote className="h-10 w-10 text-primary/30 mb-4 shrink-0" />
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i <= (t.rating ?? 5) ? "fill-primary text-primary" : "text-muted"}`}
                        />
                      ))}
                    </div>
                    <p className="text-foreground/90 flex-1 text-pretty leading-relaxed mb-6">
                      &ldquo;{t.content}&rdquo;
                    </p>
                    <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                      <Avatar className="h-12 w-12 border-2 border-primary/20 shrink-0">
                        <AvatarImage src={t.avatarUrl} alt={t.authorName} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {t.authorName.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground truncate">{t.authorName}</p>
                        {(t.authorRole || t.authorCompany) && (
                          <p className="text-sm text-muted-foreground truncate">
                            {[t.authorRole, t.authorCompany].filter(Boolean).join(" · ")}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Testimonials;
