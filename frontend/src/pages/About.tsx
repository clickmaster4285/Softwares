import {Navbar} from '@/components/landingPage/navbar';
import {Footer} from '@/components/landingPage/Footer';

const About = () => (
  <div className="min-h-screen bg-white">
    <Navbar />
    <main className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="container mx-auto max-w-6xl px-4 mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
            Clickmasters – Where Marketing Meets <span className="text-orange-500">Innovation</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-4">
            Leading Digital Marketing Agency in Pakistan
          </p>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Clickmasters – The Leading and Best Digital Marketing Agency in Pakistan, offering a complete range of services to grow your business. We specialize in all digital marketing services, including SEO, PPC, Social Media Marketing, Content Creation, Email marketing, Web Design & Development, Online Reputation Management, Conversion Rate Optimization (CRO), E-commerce Solutions, Video Marketing, and Influencer Marketing.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <div className="bg-white rounded-xl border-2 border-orange-500 p-6 text-center hover:bg-orange-50 transition-colors">
            <div className="text-4xl font-bold text-orange-500 mb-2">1,860+</div>
            <div className="text-sm text-gray-700">Current Projects</div>
          </div>
          <div className="bg-white rounded-xl border-2 border-orange-500 p-6 text-center hover:bg-orange-50 transition-colors">
            <div className="text-4xl font-bold text-orange-500 mb-2">3,500+</div>
            <div className="text-sm text-gray-700">Happy Clients</div>
          </div>
          <div className="bg-white rounded-xl border-2 border-orange-500 p-6 text-center hover:bg-orange-50 transition-colors">
            <div className="text-4xl font-bold text-orange-500 mb-2">75+</div>
            <div className="text-sm text-gray-700">Awards Winning</div>
          </div>
          <div className="bg-white rounded-xl border-2 border-orange-500 p-6 text-center hover:bg-orange-50 transition-colors">
            <div className="text-4xl font-bold text-orange-500 mb-2">5+</div>
            <div className="text-sm text-gray-700">Years Experience</div>
          </div>
        </div>
      </section>

      {/* Your Trusted Digital Partner */}
      <section className="bg-orange-500 py-16 mb-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your Trusted Digital Partner
            </h2>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              We empower businesses with Advanced Digital Marketing Solutions for sustained growth and success. We are dedicated to helping you achieve your business goals with advanced digital marketing strategies for rapid changes.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="container mx-auto max-w-6xl px-4 mb-16">
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Our <span className="text-orange-500">Story</span>
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Founded with a vision to transform the digital landscape of Pakistan, Clickmasters has grown from a small startup to one of the most trusted digital marketing agencies in the country. Our journey began with a simple belief: every business deserves exceptional digital marketing services that deliver real results.
            </p>
            <p>
              Over the years, we've helped thousands of businesses across Pakistan - from startups to established enterprises - achieve their digital marketing goals. Our success is built on a foundation of innovation, transparency, and unwavering commitment to our clients' success.
            </p>
            <p>
              Today, we're proud to be recognized as industry leaders, but we remain humble and hungry to continue learning, growing, and helping our clients succeed in the ever-evolving digital world.
            </p>
          </div>
        </div>
      </section>

      {/* Top Digital Marketing Company */}
      <section className="container mx-auto max-w-6xl px-4 mb-16">
        <div className="bg-black rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Top Digital Marketing Company in <span className="text-orange-500">Pakistan</span>
          </h2>
          <div className="space-y-4 text-gray-300">
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

      {/* Our Mission & Vision */}
      <section className="container mx-auto max-w-6xl px-4 mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border-2 border-orange-500 p-8">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl text-white">🎯</span>
            </div>
            <h3 className="text-2xl font-bold text-black mb-4">Our Mission</h3>
            <p className="text-gray-700">
              To deliver innovative, data-driven digital marketing solutions that empower businesses to achieve sustainable growth and dominate their markets. We strive to be the catalyst for our clients' digital transformation through cutting-edge strategies and unwavering dedication.
            </p>
          </div>

          <div className="bg-white rounded-xl border-2 border-orange-500 p-8">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl text-white">👁️</span>
            </div>
            <h3 className="text-2xl font-bold text-black mb-4">Our Vision</h3>
            <p className="text-gray-700">
              To become Pakistan's most trusted and innovative digital marketing agency, setting new standards of excellence and helping businesses of all sizes unlock their full digital potential. We envision a future where every Pakistani business thrives online.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-orange-50 py-16 mb-16">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
            Our Core <span className="text-orange-500">Values</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-lg font-semibold text-black mb-2">Excellence</h3>
              <p className="text-sm text-gray-600">
                We pursue excellence in everything we do, constantly raising the bar for ourselves and the industry.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-lg font-semibold text-black mb-2">Integrity</h3>
              <p className="text-sm text-gray-600">
                We believe in honest, transparent communication and ethical business practices at all times.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-lg font-semibold text-black mb-2">Innovation</h3>
              <p className="text-sm text-gray-600">
                We embrace change and continuously innovate to deliver cutting-edge solutions to our clients.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-lg font-semibold text-black mb-2">Results</h3>
              <p className="text-sm text-gray-600">
                We are obsessed with delivering measurable results that drive real business growth for our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Clickmasters */}
      <section className="container mx-auto max-w-6xl px-4 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
          Why Choose <span className="text-orange-500">Clickmasters</span> for Your Digital Marketing Services
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl border-2 border-gray-200 p-8 hover:border-orange-500 transition-colors">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl text-white">🤝</span>
            </div>
            <h3 className="text-xl font-semibold text-black mb-4">
              Your Dedicated Partner
            </h3>
            <p className="text-gray-700">
              At ClickMasters, we're not just another agency – we're your dedicated partner in helping your business grow online. With years of experience, we've built a solid reputation as one of Pakistan's top agencies.
            </p>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 p-8 hover:border-orange-500 transition-colors">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl text-white">🎯</span>
            </div>
            <h3 className="text-xl font-semibold text-black mb-4">
              Full Range of Services
            </h3>
            <p className="text-gray-700">
              We offer a broad range of digital marketing services in Pakistan, from social media marketing to SEO, PPC, and more. We stay on top of the latest trends and use the best tools to help your business succeed.
            </p>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 p-8 hover:border-orange-500 transition-colors">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl text-white">⭐</span>
            </div>
            <h3 className="text-xl font-semibold text-black mb-4">
              Trusted by Brands
            </h3>
            <p className="text-gray-700">
              We're proud to be recognized as one of the leading digital marketing agencies in Pakistan. We are trusted by businesses of all sizes to increase their online visibility and generate leads.
            </p>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-8 text-white">
          <h3 className="text-xl font-semibold mb-4">
            Customized Strategies for Every Business
          </h3>
          <p>
            At Clickmasters, we understand that each business has unique needs. As a leading digital marketing agency, we create custom strategies that help your brand stand out online. Whether you're located in Islamabad or looking for digital marketing services in Pakistan, we're committed to ensuring your success in the digital world.
          </p>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="bg-gray-50 py-16 mb-16">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-6">
            Meet Our Expert <span className="text-orange-500">Team</span>
          </h2>
          <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12">
            Our talented team of digital marketing experts brings together diverse skills and experiences to deliver exceptional results for our clients.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <div className="w-20 h-20 bg-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl text-white">👨‍💼</span>
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">SEO Specialists</h3>
              <p className="text-sm text-gray-600">
                Experts in organic search optimization with proven track records of ranking businesses on top of Google.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <div className="w-20 h-20 bg-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl text-white">🎨</span>
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">Creative Designers</h3>
              <p className="text-sm text-gray-600">
                Award-winning designers who create stunning visuals that capture attention and drive engagement.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <div className="w-20 h-20 bg-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl text-white">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">Data Analysts</h3>
              <p className="text-sm text-gray-600">
                Data-driven professionals who turn insights into actionable strategies for maximum ROI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Success Stories */}
      <section className="container mx-auto max-w-6xl px-4 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
          Client <span className="text-orange-500">Success Stories</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border-2 border-orange-500 p-8">
            <div className="flex items-start mb-4">
              <div className="text-orange-500 text-5xl leading-none mr-2">"</div>
              <p className="text-gray-700 italic">
                Clickmasters transformed our online presence completely. Our website traffic increased by 300% in just 6 months, and our sales have doubled. Their SEO expertise is unmatched!
              </p>
            </div>
            <div className="flex items-center mt-4">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold">AK</span>
              </div>
              <div>
                <p className="font-semibold text-black">Ahmed Khan</p>
                <p className="text-sm text-gray-600">CEO, Tech Solutions Lahore</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-orange-500 p-8">
            <div className="flex items-start mb-4">
              <div className="text-orange-500 text-5xl leading-none mr-2">"</div>
              <p className="text-gray-700 italic">
                The team at Clickmasters is simply amazing. They understood our business needs perfectly and created a social media strategy that generated real results. Highly recommended!
              </p>
            </div>
            <div className="flex items-center mt-4">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold">SF</span>
              </div>
              <div>
                <p className="font-semibold text-black">Sarah Fatima</p>
                <p className="text-sm text-gray-600">Owner, Fashion Boutique Karachi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-black py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Feel Free to <span className="text-orange-500">Contact Us</span> Anytime!
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
              Whether you need expert advice on SEO, PPC, social media, or any other digital marketing services, our team is here to help. Let us take your brand to the next level!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl border-2 border-orange-500 p-6">
              <h3 className="font-semibold text-black mb-3 flex items-center">
                <span className="text-orange-500 mr-2">📍</span> Address
              </h3>
              <p className="text-sm text-gray-700">
                Main PWD Rd, PWD Housing Society Sector A PWD Society, Islamabad, Punjab 45700, Pakistan
              </p>
            </div>

            <div className="bg-white rounded-xl border-2 border-orange-500 p-6">
              <h3 className="font-semibold text-black mb-3 flex items-center">
                <span className="text-orange-500 mr-2">📧</span> Email
              </h3>
              <p className="text-sm text-gray-700">
                marketing@clickmasters.pk
              </p>
            </div>

            <div className="bg-white rounded-xl border-2 border-orange-500 p-6">
              <h3 className="font-semibold text-black mb-3 flex items-center">
                <span className="text-orange-500 mr-2">📞</span> Customer Support
              </h3>
              <p className="text-sm text-gray-700">
                0332-5394285
              </p>
            </div>

            <div className="bg-white rounded-xl border-2 border-orange-500 p-6">
              <h3 className="font-semibold text-black mb-3 flex items-center">
                <span className="text-orange-500 mr-2">💬</span> Consultation
              </h3>
              <p className="text-sm text-gray-700">
                0333-1116842
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
              Schedule a Free Consultation
            </button>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default About;