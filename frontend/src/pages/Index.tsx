import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProjectGrid from '@/components/ProjectGrid';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 bg-gradient-to-b from-background to-secondary/20">
        <Hero />
        <div id="projects">
          <ProjectGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
