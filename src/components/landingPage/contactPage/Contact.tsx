'use client';

import React, { useState, useEffect } from 'react';
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
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay, duration: 0.5 }}
        >
            <motion.div
                className={`absolute -inset-2 bg-gradient-to-r ${gradients[gradient]} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay }}
            />
            <div className="relative bg-card/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-border/70 h-full">
                <div className="flex items-start gap-4 h-full">
                    <div className={`relative p-3 rounded-xl bg-gradient-to-r ${gradients[gradient]} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-primary" />
                        <motion.div
                            className={`absolute inset-0 rounded-xl bg-gradient-to-r ${gradients[gradient]} opacity-30`}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, delay }}
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
        message: ''
    });
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);
    const [formKey, setFormKey] = useState(0);

    useEffect(() => {
        setMounted(true);
        const timer = setTimeout(() => setFormKey(prev => prev + 1), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

            if (!res.ok) throw new Error(data.message || 'Something went wrong');

            setSuccess(true);
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setSuccess(false), 3000);
        } catch (err: any) {
            setError(err.message || 'Failed to send message');
        } finally {
            setSending(false);
        }
    };

    const inputClasses = "w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300 text-foreground placeholder-muted-foreground";

    if (!mounted) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading contact page...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white relative">
            <main className="relative z-10 pt-24">
                <div className="container max-w-[1320px] mx-auto px-4">
                    <motion.div className="max-w-3xl mx-auto text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.6 }}>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 mt-16">Contact Us</h2>
                        <p className="text-xl text-muted-foreground">
                            Reach out to <span className="font-semibold text-primary">Click Master Projects</span> for inquiries or support.
                        </p>
                    </motion.div>

                    {/* Contact Info Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[
                            { icon: Phone, title: "Call Us", details: ['+92 333-1116842', '+92 332-5394285'], delay: 0.05 },
                            { icon: Mail, title: "Email Us", details: ['marketing@clickmasters.pk', 'info@clickmasters.pk'], delay: 0.1 },
                            { icon: MapPin, title: "Visit Us", details: ['Main PWD Rd, Islamabad, Punjab, Pakistan'], delay: 0.15 },
                            { icon: Clock, title: "Business Hours", details: ['Mon-Sat: 9AM - 6PM', '24/7 Support'], delay: 0.2 },
                        ].map((info, idx) => (
                            <ContactInfo key={idx} {...info} gradient="orange" />
                        ))}
                    </div>

                    {/* Form */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pb-20">
                        <motion.div key={formKey} className="relative bg-card/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 lg:p-10 border border-border/70" initial={{ opacity: 0, x: 30 }} animate={mounted ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }} transition={{ duration: 0.6, delay: 0.3 }}>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <MessageSquare className="w-7 h-7 text-primary" />
                                    <h3 className="text-2xl font-bold text-foreground">Send us a message</h3>
                                </div>

                                {error && <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm mb-6">{error}</div>}

                                {success ? (
                                    <motion.div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h4 className="text-xl font-bold text-foreground mb-2">Message Sent!</h4>
                                        <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className={inputClasses} required />
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className={inputClasses} required />
                                        <textarea name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="Your message..." className={inputClasses} required />
                                        <button type="submit" disabled={sending} className={`w-full py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 ${sending ? 'bg-muted cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90'}`}>
                                            {sending ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>

                        {/* Map */}
                        <motion.div className="relative bg-card/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 h-[500px] overflow-hidden group border border-border/70" initial={{ opacity: 0, x: -30 }} animate={mounted ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }} transition={{ duration: 0.6, delay: 0.5 }} whileHover={{ scale: 1.02 }}>
                            <iframe
                                title="Click Master Projects Location"
                                src="https://www.google.com/maps?q=Main+PWD+Rd,+PWD+Housing+Society+Sector+A+PWD+Society,+Islamabad,+Punjab+45700,+Pakistan&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Contact;