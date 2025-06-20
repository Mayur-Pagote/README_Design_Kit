import { ArrowRight, TrendingUp } from 'lucide-react';
import Aurora from '@/components/LandingComponents/Aurora';
import LiquidChrome from '@/components/LandingComponents/LiquidChrome';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'motion/react';

const Hero = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <section className="relative overflow-hidden min-h-[80vh] flex items-center justify-center">
      {/* Animated Aurora/LiquidChrome Background */}
      <div className="absolute inset-0 -z-10 rounded-b-4xl overflow-hidden opacity-90">
        {isDark ? (
          <Aurora 
            colorStops={["#4338ca", "#6366f1", "#8b5cf6"]}
            amplitude={1.5}
            speed={1.0}
          />
        ) : (
          <LiquidChrome
            color={[0.96, 0.97, 0.98]}
            mouseReact={true}
            amplitude={0.08}
            speed={0.6}
          />
        )}
      </div>
      {/* Content */}
      <div className="relative w-full">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto"
            >
              <h1 className="text-center text-[25px] leading-none sm:text-[80px] lg:text-[70px] font-bold bg-gradient-to-r from-foreground via-primary to-primary bg-clip-text text-transparent">
                Exceptional <span className="text-primary drop-shadow-sm">Projects</span>
              </h1>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl mb-8 text-white/90 font-light"
            >
              Built with README Design Kit
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="max-w-4xl mx-auto mb-12"
            >
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                Discover a curated collection of outstanding projects showcasing the power of README Design Kit. 
                See how developers are creating beautiful, professional documentation and project showcases.
              </p>
            </motion.div>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => window.location.href = "/projects"}
                className="group bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center space-x-2 border border-white/30 hover:border-white/50"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => window.location.href = "/submit"}
                className="group bg-white text-purple-600 hover:bg-gray-50 px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <span>Submit Your Project</span>
                <TrendingUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
