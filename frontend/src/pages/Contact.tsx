'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    CheckCircle2,
    MessageSquare
} from 'lucide-react';
import { Navbar } from '@/components/landingPage/navbar';
import { Footer } from '@/components/landingPage/Footer';

// Define props interface for ContactInfo component
interface ContactInfoProps {
    icon: React.ElementType;
    title: string;
    details: string[];
    gradient: 'orange' | 'blue' | 'purple' | 'emerald';
    delay: number;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ icon: Icon, title, details, gradient, delay }) => {
    const gradients = {
        orange: 'from-gray-100 to-gray-100',
        blue: 'from-blue-500 to-cyan-500',
        purple: 'from-purple-500 to-pink-500',
        emerald: 'from-emerald-500 to-teal-500'
    };

    return (
        <motion.div
            className="relative group h-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
        >
            {/* Glow effect */}
            <motion.div
                className={`absolute -inset-2 bg-gradient-to-r ${gradients[gradient]} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                animate={{
                    scale: [1, 1.05, 1],
                }}
                transition={{ duration: 3, repeat: Infinity, delay }}
            />

            <div className="relative bg-card/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-border/70 h-full">
                <div className="flex items-start gap-4 h-full">
                    <div className={`relative p-3 rounded-xl bg-gradient-to-r ${gradients[gradient]} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-orange-500" />
                        {/* Pulse ring */}
                        <motion.div
                            className={`absolute inset-0 rounded-xl bg-gradient-to-r ${gradients[gradient]} opacity-30`}
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 0, 0.3],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay,
                            }}
                        />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
                        {details.map((detail, idx) => (
                            <p key={idx} className="text-muted-foreground text-sm mb-1">{detail}</p>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
// Define interface for form data
interface FormData {
    name: string;
    email: string;
    message: string;
}

const Contact: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: ''
    });
    const [sending, setSending] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSending(true);
        setError(null);
        
        // Simulate API call
        setTimeout(() => {
            setSending(false);
            setSuccess(true);
            setFormData({ name: '', email: '', message: '' });
            
            // Reset success message after 3 seconds
            setTimeout(() => setSuccess(false), 3000);
        }, 1500);
    };

    const inputClasses = "w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300 text-foreground placeholder-muted-foreground";

    return (
        <div className="min-h-screen bg-white relative ">
               <Navbar />
            {/* Background elements - subtle for light theme */}
            <div className="absolute inset-0">
                <div className="absolute top-40 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-40 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-700" />
            </div>

            {/* Grid pattern - very subtle */}
            <div 
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px),
                                      linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
                    backgroundSize: '4rem 4rem'
                }}
            />

         
            
            <main className="relative z-10 pt-24">
                <div className="container max-w-[1320px] mx-auto px-4">
                    {/* Header */}
                    <motion.div
                        className="max-w-3xl mx-auto text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                      

                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            
                            <span className="text-foreground">
                               Contact Us
                            </span>
                        </h2>

             
              
              <p className="text-xl text-muted-foreground">
            Reach out to <span className="font-semibold text-primary">Click Master Projects</span> for Project Inquiries, Collaborations, or Support. We respond within one business day.
          </p>
                    </motion.div>

                    {/* Contact Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        <ContactInfo
                            icon={Phone}
                            title="Call Us"
                            details={['+92 333-1116842', '+92 332-5394285']}
                            gradient="orange"
                            delay={0.1}
                        />
                        <ContactInfo
                            icon={Mail}
                            title="Email Us"
                            details={['marketing@clickmasters.pk', 'info@clickmasters.pk']}
                            gradient="orange"
                            delay={0.2}
                        />
                        <ContactInfo
                            icon={MapPin}
                            title="Visit Us"
                            details={['Main PWD Rd, PWD Housing Society, Islamabad, Punjab 45700, Pakistan']}
                            gradient="orange"
                            delay={0.3}
                        />
                        <ContactInfo
                            icon={Clock}
                            title="Business Hours"
                            details={['Mon-Sat: 9AM - 6PM', '24/7 Support Available']}
                            gradient="orange"
                            delay={0.4}
                        />
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pb-20">
                        {/* Left Column - Form */}
                        <motion.div
                            className="relative bg-card/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 lg:p-10 border border-border/70"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/5 to-primary/5 rounded-bl-full" />
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-primary/5 to-primary/5 rounded-tr-full" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="">
                                        <MessageSquare className="w-7 h-7 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground">Send us a message</h3>
                                </div>

                                {error && (
                                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm mb-6">
                                        {error}
                                    </div>
                                )}

                                {success ? (
                                    <motion.div
                                        className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                    >
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h4 className="text-xl font-bold text-foreground mb-2">Message Sent!</h4>
                                        <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                                            <input
                                                id="name"
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={inputClasses}
                                                placeholder="John Doe"
                                                required
                                            />
                                        </motion.div>

                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={inputClasses}
                                                placeholder="john@example.com"
                                                required
                                            />
                                        </motion.div>

                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows={5}
                                                className={inputClasses}
                                                placeholder="Tell us about your project, questions, or how we can help..."
                                                required
                                            />
                                        </motion.div>

                                        <motion.button
                                            type="submit"
                                            disabled={sending}
                                            className={`w-full py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 group flex items-center justify-center gap-2 ${
                                                sending
                                                    ? "bg-muted cursor-not-allowed text-muted-foreground"
                                                    : "bg-primary text-white hover:bg-primary/90 hover:shadow-xl"
                                            }`}
                                            whileHover={!sending ? { scale: 1.02 } : {}}
                                            whileTap={!sending ? { scale: 0.98 } : {}}
                                        >
                                            {sending ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                                    </svg>
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <span>Send Message</span>
                                                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </motion.button>
                                    </form>
                                )}
                            </div>
                        </motion.div>

                        {/* Right Column - Map */}
                        <motion.div
                            className="relative bg-card/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 h-[500px] overflow-hidden group border border-border/70"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="absolute top-4 left-4 z-10 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-border/70">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    <span className="text-foreground text-sm font-medium">Our Location</span>
                                </div>
                            </div>
                            <div className="w-full h-full rounded-xl overflow-hidden border-2 border-primary/30 hover:border-primary/50 transition-all duration-300">
                                <iframe
                                title="ProjectHub Location"
                                  src="https://www.google.com/maps?q=Main+PWD+Rd,+PWD+Housing+Society+Sector+A+PWD+Society,+Islamabad,+Punjab+45700,+Pakistan&output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, display: 'block' }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                   
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;