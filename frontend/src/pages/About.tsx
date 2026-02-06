import {Navbar} from '@/components/landingPage/navbar';
import {Footer} from '@/components/landingPage/Footer';

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="container mx-auto max-w-6xl px-4 mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Clickmasters – Where Marketing Meets Innovation
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            Leading Digital Marketing Agency in Pakistan
          </p>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            Clickmasters – The Leading and Best Digital Marketing Agency in Pakistan, offering a complete range of services to grow your business. We specialize in all digital marketing services, including SEO, PPC, Social Media Marketing, Content Creation, Email marketing, Web Design & Development, Online Reputation Management, Conversion Rate Optimization (CRO), E-commerce Solutions, Video Marketing, and Influencer Marketing.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <div className="bg-card rounded-xl border border-border/60 p-6 text-center">
            <div className="text-4xl font-bold text-foreground mb-2">1,860+</div>
            <div className="text-sm text-muted-foreground">Current Projects</div>
          </div>
          <div className="bg-card rounded-xl border border-border/60 p-6 text-center">
            <div className="text-4xl font-bold text-foreground mb-2">3,500+</div>
            <div className="text-sm text-muted-foreground">Happy Clients</div>
          </div>
          <div className="bg-card rounded-xl border border-border/60 p-6 text-center">
            <div className="text-4xl font-bold text-foreground mb-2">75+</div>
            <div className="text-sm text-muted-foreground">Awards Winning</div>
          </div>
          <div className="bg-card rounded-xl border border-border/60 p-6 text-center">
            <div className="text-4xl font-bold text-foreground mb-2">5+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
        </div>
      </section>

      {/* Your Trusted Digital Partner */}
      <section className="bg-secondary/30 py-16 mb-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your Trusted Digital Partner
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We empower businesses with Advanced Digital Marketing Solutions for sustained growth and success. We are dedicated to helping you achieve your business goals with advanced digital marketing strategies for rapid changes.
            </p>
          </div>
        </div>
      </section>

      {/* Top Digital Marketing Company */}
      <section className="container mx-auto max-w-6xl px-4 mb-16">
        <div className="bg-card rounded-2xl border border-border/60 p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Top Digital Marketing Company in Pakistan
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Clickmasters is the top digital marketing agency in Pakistan specializing in SEO, PPC, Social Media Marketing, Web Design, Content Creation, and more.
            </p>
            <p>
              As one of Pakistan's best digital marketing agencies, we are committed to supporting businesses in improving their online presence and driving growth. Whether you're looking to grow your business in Islamabad, Rawalpindi, Lahore, Karachi, or anywhere else in Pakistan.
            </p>
            <p>
              Our expert team delivers effective, results-driven solutions. Choose Clickmasters for innovative strategies and comprehensive digital marketing services in Pakistan to stay ahead of the competition.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Clickmasters */}
      <section className="container mx-auto max-w-6xl px-4 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
          Why Choose Clickmasters for Your Digital Marketing Services
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card rounded-xl border border-border/60 p-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Your Dedicated Partner
            </h3>
            <p className="text-muted-foreground">
              At ClickMasters, we're not just another agency – we're your dedicated partner in helping your business grow online. With years of experience, we've built a solid reputation as one of Pakistan's top agencies.
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border/60 p-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Full Range of Services
            </h3>
            <p className="text-muted-foreground">
              We offer a broad range of digital marketing services in Pakistan, from social media marketing to SEO, PPC, and more. We stay on top of the latest trends and use the best tools to help your business succeed.
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border/60 p-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Trusted by Brands
            </h3>
            <p className="text-muted-foreground">
              We're proud to be recognized as one of the leading digital marketing agencies in Pakistan. We are trusted by businesses of all sizes to increase their online visibility and generate leads.
            </p>
          </div>
        </div>

        <div className="mt-8 bg-secondary/40 rounded-xl border border-border/60 p-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Customized Strategies for Every Business
          </h3>
          <p className="text-muted-foreground">
            At Clickmasters, we understand that each business has unique needs. As a leading digital marketing agency, we create custom strategies that help your brand stand out online. Whether you're located in Islamabad or looking for digital marketing services in Pakistan, we're committed to ensuring your success in the digital world.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Feel Free to Contact Us Anytime!
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Whether you need expert advice on SEO, PPC, social media, or any other digital marketing services, our team is here to help. Let us take your brand to the next level!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-card rounded-xl border border-border/60 p-6">
              <h3 className="font-semibold text-foreground mb-3">📍 Address</h3>
              <p className="text-sm text-muted-foreground">
                Main PWD Rd, PWD Housing Society Sector A PWD Society, Islamabad, Punjab 45700, Pakistan
              </p>
            </div>

            <div className="bg-card rounded-xl border border-border/60 p-6">
              <h3 className="font-semibold text-foreground mb-3">📧 Email</h3>
              <p className="text-sm text-muted-foreground">
                marketing@clickmasters.pk
              </p>
            </div>

            <div className="bg-card rounded-xl border border-border/60 p-6">
              <h3 className="font-semibold text-foreground mb-3">📞 Customer Support</h3>
              <p className="text-sm text-muted-foreground">
                0332-5394285
              </p>
            </div>

            <div className="bg-card rounded-xl border border-border/60 p-6">
              <h3 className="font-semibold text-foreground mb-3">💬 Consultation</h3>
              <p className="text-sm text-muted-foreground">
                0333-1116842
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default About;