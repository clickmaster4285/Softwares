'use client';

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  Building,
  User,
  DollarSign,
  Briefcase
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  message: string;
  company?: string;
  phone?: string;
  services?: string;
  budget?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    company: '',
    phone: '',
    services: '',
    budget: ''
  });

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setSuccess(true);

      setFormData({
        name: '',
        email: '',
        message: '',
        company: '',
        phone: '',
        services: '',
        budget: ''
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 bg-accent-50 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition text-sm";

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-24">
        <div className="container max-w-6xl mx-auto px-4">

          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Contact Us
            </h1>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              Let’s discuss your project. Fill the form and our team will get back within 24 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 pb-20">

            {/* FORM */}
            <div className="border border-gray-200 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-black" />
                <h3 className="text-xl text-accent font-semibold">Send a message</h3>
              </div>

              {error && (
                <div className="mb-4 text-sm text-red-600">
                  {error}
                </div>
              )}

              {success ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="w-10 h-10 mx-auto text-green-600 mb-3" />
                  <h4 className="font-semibold text-lg">Message sent</h4>
                  <p className="text-sm text-gray-600">
                    We’ll contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name *"
                      className={inputClasses}
                      required
                    />
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email *"
                      className={inputClasses}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                      className={inputClasses}
                    />
                    <input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company"
                      className={inputClasses}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <select
                      name="services"
                      value={formData.services}
                      onChange={handleChange}
                      className={inputClasses}
                    >
                      <option value="">Select Service</option>
                      <option value="web">Web Development</option>
                      <option value="app">Mobile Apps</option>
                      <option value="seo">SEO</option>
                    </select>

                    <input
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="Budget"
                      className={inputClasses}
                    />
                  </div>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Your message..."
                    className={inputClasses}
                    required
                  />

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-accent text-white py-3 rounded-lg text-sm font-medium hover:bg-accent-800 transition"
                  >
                    {sending ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6">

              {/* Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <ContactInfoCard icon={Phone} title="Call" details={['+92 333-1116842']} />
                <ContactInfoCard icon={Mail} title="Email" details={['info@clickmasters.pk']} />
                <ContactInfoCard icon={MapPin} title="Location" details={['Islamabad, Pakistan']} />
                <ContactInfoCard icon={Clock} title="Hours" details={['Mon-Sat 9AM - 6PM']} />
              </div>

              {/* Map */}
              <div className="border border-gray-200 rounded-2xl overflow-hidden h-[280px]">
                <iframe
                  src="https://www.google.com/maps?q=Islamabad&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const ContactInfoCard = ({ icon: Icon, title, details }: any) => {
  return (
    <div className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition">
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 text-black mt-1" />
        <div>
          <h4 className="font-medium text-black text-sm">{title}</h4>
          {details.map((d: string, i: number) => (
            <p key={i} className="text-xs text-gray-600 mt-1">{d}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;