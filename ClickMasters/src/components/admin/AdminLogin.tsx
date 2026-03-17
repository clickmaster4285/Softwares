'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Shield, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await login(email, password);
    setIsLoading(false);
    
    if (success) {
      toast({
        title: 'Welcome back',
        description: 'Successfully logged in',
      });
      router.push('/admin');
    } else {
      toast({
        title: 'Invalid credentials',
        description: 'Please check your email and password',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image - hero.jpg */}
      <Image
        src="/loginImg.jpg"
        alt="Background"
        fill
        className="object-cover opacity-60"
        priority
      />
      
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-white/70 hover:text-white mb-6 transition-colors"
        >
          ← Back to Home
        </Link>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
         
            
            <h1 className="mt-10 text-2xl font-semibold text-white mb-1">
              Admin Login
            </h1>
            <p className="text-sm text-white/60">
              Sign in to access the dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-white/80">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-0 rounded-lg"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-white/80">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-0 rounded-lg"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-primary text-white hover:bg-primary/90 font-medium rounded-lg transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-white/20 text-center">
            <p className="text-xs text-white/40">
              Demo: admin@example.com / admin123
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-white/40 mt-6">
          © 2024 Click Master Projects. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;