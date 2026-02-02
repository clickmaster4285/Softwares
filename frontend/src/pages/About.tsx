import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-24 container mx-auto max-w-4xl px-4">
      <div className="bg-card rounded-2xl shadow-sm p-10 border border-border/70 flex flex-col gap-6">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground text-center">
          About 
        </h1>
        <p className="text-lg text-muted-foreground text-center">
           is a professional portfolio platform built to showcase modern digital work with clarity, performance, and polish.
        </p>
        <div className="grid gap-6 md:grid-cols-2 mt-4">
          <div className="rounded-xl border border-border/60 bg-secondary/40 p-6">
            <h2 className="font-semibold text-foreground mb-2">What we do</h2>
            <p className="text-sm text-muted-foreground">
              We craft web experiences with clean UI, strong UX patterns, and production-ready structure for real-world delivery.
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-secondary/40 p-6">
            <h2 className="font-semibold text-foreground mb-2">Built with</h2>
            <p className="text-sm text-muted-foreground">
              React, Tailwind CSS, Node.js, and MongoDB for a fast, scalable, and maintainable portfolio workflow.
            </p>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default About;
