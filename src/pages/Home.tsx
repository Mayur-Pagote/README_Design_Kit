"use client";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Layout } from 'lucide-react';
import { QuickStartGuide } from '@/components/QuickStartGuide';

import { motion } from "motion/react";
import Aurora from "@/components/LandingComponents/Aurora";
import LiquidChrome from "@/components/LandingComponents/LiquidChrome";
import { useTheme } from "@/components/theme-provider";

export default function Home() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div className="w-full min-h-screen flex flex-col mb-5">
      <div className="w-full flex flex-col flex-1 px-4">
        <div className="flex flex-col items-center justify-center flex-1 relative">
          {/* Theme-aware flowing background animations */}
          <div className="absolute inset-0 -z-10 rounded-b-4xl overflow-hidden opacity-90">
            {isDark ? (
              // Dark mode: Flowing Aurora with vibrant purple gradients
              <Aurora 
                colorStops={["#4338ca", "#6366f1", "#8b5cf6"]} 
                amplitude={1.5}
                speed={1.0}
              />
            ) : (
              // Light mode: Subtle LiquidChrome with paper-like colors
              <LiquidChrome
                color={[0.96, 0.97, 0.98]}
                mouseReact={true}
                amplitude={0.08}
                speed={0.6}
              />
            )}
          </div>
<Link to="Elements" className="inline-block">
  <div className="group cursor-pointer">
    <div className="relative rounded-xl bg-background/60 backdrop-blur-md border border-border px-5 py-2.5 transition-all duration-300 hover:bg-background/80 hover:border-primary/50 hover:scale-105 shadow-lg hover:shadow-xl">
      <div className="flex items-center gap-2.5">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-foreground">
          Get Beautiful README Components
        </span>
        <div className="w-2 h-2 bg-primary rounded-full opacity-100 animate-pulse"></div>
      </div>
    </div>
  </div>
</Link>

<motion.div 
  initial={{ opacity: 0, y: 30 }} 
  animate={{ opacity: 1, y: 0 }} 
  transition={{ delay: 0.2, duration: 0.8 }} 
  className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto"
>  <h1 className="text-center text-[52px] leading-none sm:text-[80px] lg:text-[70px] font-bold bg-gradient-to-r from-foreground via-primary to-primary bg-clip-text text-transparent">
    <span>Create,</span>{" "}
    Generate, and{" "}
    <span className="text-primary drop-shadow-sm">Share</span> in Seconds!
  </h1>
</motion.div>          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center px-4 text-lg md:text-xl text-muted-foreground my-10 max-w-2xl"
          >
            Effortlessly generate beautiful README components, badges, and graphics for your projects{" "}
            <span className="text-primary font-semibold">—all at once.</span>
          </motion.h2>          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <Button asChild size="lg" className="flex items-center gap-2">
              <Link to="/templates">
                <Sparkles className="h-5 w-5" />
                Browse Templates
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
              <Button asChild variant="outline" size="lg" className="flex items-center gap-2">
              <Link to="/drag-drop">
                <Layout className="h-5 w-5" />
                Start from Scratch
              </Link>
            </Button>
          </motion.div>

          {/* Quick Start Guide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-6"
          >
            <QuickStartGuide
              onStartWithTemplate={() => navigate('/templates')}
              onStartFromScratch={() => navigate('/drag-drop')}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
