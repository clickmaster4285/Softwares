import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Contact = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-24 container mx-auto max-w-4xl px-4 flex flex-col items-center">
      <div className="w-full bg-card/90 rounded-2xl shadow-sm p-10 mb-12 border border-border/70 flex flex-col md:flex-row gap-10">
        <div className="flex-1 flex flex-col gap-8 justify-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-2 text-foreground text-center md:text-left">Contact Us</h1>
          <p className="text-lg text-muted-foreground mb-2 text-center md:text-left">
            Reach out to <span className="font-semibold text-primary"></span> for project inquiries, collaborations, or support. We respond within one business day.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 12a4 4 0 01-8 0m8 0V8a4 4 0 10-8 0v4m8 0v4a4 4 0 01-8 0v-4" /></svg>
              </span>
              <div>
                <div className="font-semibold">Office Email</div>
                <a href="mailto:marketing@clickmasters.pk" className="text-primary underline">marketing@clickmasters.pk</a><br />
                <a href="mailto:info@clickmasters.pk" className="text-primary underline">info@clickmasters.pk</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 5h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.48 19h9.04a2 2 0 001.83-3.3L17 13M7 13l1.5-6h7l1.5 6" /></svg>
              </span>
              <div>
                <div className="font-semibold">Customer Support</div>
                <a href="tel:0332-5394285" className="text-primary underline">0332-5394285</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5a2 2 0 00-2-2H6a2 2 0 00-2 2v7c0 6 8 10 8 10z" /></svg>
              </span>
              <div>
                <div className="font-semibold">Consultation</div>
                <a href="tel:0333-1116842" className="text-primary underline">0333-1116842</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0l-4.243 4.243a8 8 0 1111.314 0z" /></svg>
              </span>
              <div>
                <div className="font-semibold">Office Location</div>
                <span>Main PWD Rd, PWD Housing Society Sector A PWD Society, Islamabad, Punjab 45700, Pakistan</span>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <a href="https://www.facebook.com/clickmasterspvtltd" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/clickmasters-digital-marketing-agency/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
              </a>
              <a href="https://www.pinterest.com/Clickmasters00" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.396 7.634 11.093-.106-.944-.202-2.393.042-3.425.221-.97 1.423-6.178 1.423-6.178s-.363-.726-.363-1.799c0-1.687.98-2.949 2.2-2.949 1.037 0 1.538.779 1.538 1.713 0 1.044-.666 2.601-1.009 4.048-.287 1.217.609 2.211 1.805 2.211 2.166 0 3.834-2.285 3.834-5.581 0-2.918-2.099-4.968-5.099-4.968-3.478 0-5.522 2.609-5.522 5.312 0 1.062.409 2.203.921 2.822.102.123.116.23.085.353-.093.381-.302 1.217-.343 1.385-.053.217-.173.263-.401.159-1.5-.697-2.438-2.885-2.438-4.642 0-3.782 2.747-7.257 7.924-7.257 4.159 0 7.393 2.965 7.393 6.918 0 4.134-2.607 7.211-6.229 7.211-1.246 0-2.417-.646-2.818-1.377l-.767 2.922c-.232.892-.687 2.009-1.025 2.692.771.238 1.584.367 2.436.367 6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
              </a>
              <a href="https://www.youtube.com/@clickmastersofficial" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.386.574A2.994 2.994 0 0 0 .502 6.186C0 8.072 0 12 0 12s0 3.928.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.5 20.5 12 20.5 12 20.5s7.5 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.928 24 12 24 12s0-3.928-.502-5.814zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="w-full h-56 rounded-xl overflow-hidden border border-border bg-muted/30 flex items-center justify-center mb-8">
            <iframe
              title="ProjectHub Location"
              src="https://www.google.com/maps?q=Main+PWD+Rd,+PWD+Housing+Society+Sector+A+PWD+Society,+Islamabad,+Punjab+45700,+Pakistan&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="bg-secondary/30 rounded-xl border border-border/60 p-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Send us a message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input id="name" name="name" type="text" className="w-full rounded-lg border border-border px-4 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Your Name" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input id="email" name="email" type="email" className="w-full rounded-lg border border-border px-4 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="you@email.com" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                <textarea id="message" name="message" rows={4} className="w-full rounded-lg border border-border px-4 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="How can we help you?" required />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Contact;
