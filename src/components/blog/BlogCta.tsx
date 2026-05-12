'use client';

import { useState } from 'react';

export default function BlogCta() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call - replace with your actual form submission logic
    setTimeout(() => {
      console.log('Form submitted with email:', email);
      setIsSubmitting(false);
      setSubmitted(true);
      setEmail('');
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm">
      <div className="tag-sticky-wrap flex items-center gap-2 mb-3">
        <div className="review-img">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" fill="#F97316" stroke="#F97316" strokeWidth="1.5"/>
          </svg>
        </div>
        <div className="review-img star">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 1L12.5 7L19 7.5L14 12L15.5 19L10 15L4.5 19L6 12L1 7.5L7.5 7L10 1Z" fill="#FBBF24" stroke="#FBBF24"/>
          </svg>
        </div>
        <span className="tag-sticky-text text-sm font-medium text-slate-700">| 4.9</span>
      </div>
      <div className="sticky-content-wrap mb-4">
        <div className="sticky-title text-xl font-semibold text-slate-900 leading-tight">
          Your website should be your 24/7 sales machine.
        </div>
        <p className="paragraph text-sm text-slate-500 mt-2">
          We develop websites designed to convert.
        </p>
      </div>
      <div className="form-box">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your work email"
            required
            disabled={isSubmitting}
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 disabled:bg-slate-100 disabled:cursor-not-allowed"
          />
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-primarypx-4 py-3 text-sm font-medium text-white transition hover:bg-primarydisabled:bg-orange-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Start your Project'}
          </button>
        </form>
        {submitted && (
          <p className="text-center text-xs text-green-600 mt-3 animate-in fade-in">
            Thanks! We'll get back to you soon.
          </p>
        )}
        {!submitted && (
          <p className="text-center text-xs text-slate-400 mt-3">
            Built for companies ready to scale
          </p>
        )}
      </div>
    </div>
  );
}