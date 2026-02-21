import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { Quote, Star } from "lucide-react";
import { apiFetch } from "@/lib/api";

export interface Testimonial {
  _id: string;
  authorName: string;
  authorRole?: string;
  authorCompany?: string;
  content: string;
  avatarUrl?: string;
  rating: number;
}

export function TestimonialsSection() {
  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await apiFetch("/api/testimonials");
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <section id="testimonials" className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">What our clients say</h2>
            <div className="h-4 w-48 bg-muted rounded mx-auto animate-pulse" />
          </div>
          <div className="max-w-4xl mx-auto flex gap-4 justify-center">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 flex-1 max-w-sm bg-muted/50 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  const landingTestimonials = testimonials.slice(0, 4);

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-muted/30 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance font-display">
            Client <span className="text-primary">Testimonials</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            See what clients say about our software development company. Real projects, real feedback.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: landingTestimonials.length > 1,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {landingTestimonials.map((t) => (
                <CarouselItem key={t._id} className="pl-2 md:pl-4 basis-full md:basis-1/2">
                  <Card className="h-full border-border/60 bg-card/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6 lg:p-8 flex flex-col h-full">
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
                        <Avatar className="h-12 w-12 border-2 border-primary/20">
                          <AvatarImage src={t.avatarUrl} alt={t.authorName} />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {t.authorName.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-foreground">{t.authorName}</p>
                          {(t.authorRole || t.authorCompany) && (
                            <p className="text-sm text-muted-foreground">
                              {[t.authorRole, t.authorCompany].filter(Boolean).join(" · ")}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            {landingTestimonials.length > 1 && (
              <>
                <CarouselPrevious className="-left-2 md:-left-12 top-1/2 -translate-y-1/2 border-border bg-background/95 hover:bg-background" />
                <CarouselNext className="-right-2 md:-right-12 top-1/2 -translate-y-1/2 border-border bg-background/95 hover:bg-background" />
              </>
            )}
          </Carousel>
        </div>

        {testimonials.length > 4 && (
          <div className="text-center mt-12">
            <Link
              to="/testimonials"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
            >
              View all testimonials ({testimonials.length})
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
