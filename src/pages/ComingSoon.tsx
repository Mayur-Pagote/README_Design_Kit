import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Bell, Rocket, Star, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Added navigation
import { motion } from 'framer-motion';

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // ✅ Enable page transitions

  const handleNotifyClick = () => {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }
    
    console.log("Notify request sent for:", email);
    alert("You'll be notified when new features are released!");
  };

  const upcomingFeatures = [
    { title: "Export Formats", description: "Export README as PDF, HTML, etc.", eta: "Q3 2025", priority: "medium" },
    { title: "Advanced Template Library", description: "Pre-built README templates", eta: "Q3 2025", priority: "high" },
    { title: "GitHub Integration", description: "Direct sync with repositories", eta: "Q3 2025", priority: "high" },
    { title: "Custom Components", description: "Reusable components for docs", eta: "Q4 2025", priority: "low" },
    { title: "Real-time Collaboration", description: "Work together on README files", eta: "Q4 2025", priority: "medium" },
    { title: "AI-Powered Suggestions", description: "Smart README content recommendations", eta: "Q1 2026", priority: "medium" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <div className="container mx-auto">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Rocket className="h-16 w-16 text-primary animate-pulse" />
              <div className="absolute -top-2 -right-2">
                <Bell className="h-6 w-6 text-yellow-500 animate-bounce" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Exciting Features <br /> 
            <span className="text-primary">Coming Soon</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're constantly improving README Design Kit. Here's what's next.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8" onClick={() => document.getElementById("stay-in-loop")?.scrollIntoView({ behavior: 'smooth' })}>
              <Bell className="mr-2 h-5 w-5" />
              Get Notified
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              <Star className="mr-2 h-5 w-5" />
              Follow Progress
            </Button>
            {/* ✅ Navigation Button to Feature Requests */}
            <Button 
              onClick={() => navigate('/feature-requests')} 
              size="lg" 
              className="text-lg px-8 bg-purple-600 text-white hover:bg-purple-700"
            >
              <ArrowRight className="mr-2 h-5 w-5" />
              View Feature Requests
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Last updated: June 30, 2025</span>
          </div>
        </div>
      </section>

      {/* Features Roadmap */}
      <section className="relative py-20 px-6 overflow-hidden transition-colors duration-500 bg-background">
        {/* animated cyber dots background */}
        <div className="absolute inset-0 z-0 pointer-events-none
          bg-[radial-gradient(circle,rgba(8,253,216,0.08)_1px,transparent_1px)]
          dark:bg-[radial-gradient(circle,rgba(8,253,216,0.1)_1px,transparent_1px)]
          bg-[size:40px_40px] animate-[pulse_8s_infinite]" />

        <div className="container mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary glitch">
            Feature Roadmap
          </h2>

          <div className="relative border-l-4 border-primary/30 ml-6">
            {upcomingFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 12 }}
                className={`mb-16 relative ${
                  index % 2 === 0 ? "md:pl-20 md:-ml-4" : "md:pr-20 md:ml-4 md:text-right"
                }`}
              >
                {/* milestone cyber dot */}
                <div
                  className={`absolute w-4 h-4 rounded-full bg-primary border-4 border-background top-2 animate-ping
                  ${index % 2 === 0 ? "-left-8" : "-right-2"}`}
                ></div>

                {/* card */}
                <div className="relative card-group p-6 rounded-none
                  border border-primary/40
                  backdrop-blur-md
                  bg-gradient-to-br
                    from-white/80
                    via-background/50
                    to-muted/30
                  dark:from-[#0f0c29]/60
                  dark:via-[#302b63]/40
                  dark:to-[#24243e]/30
                  shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]
                  transition-transform duration-300"
                >


                  {/* corner accents on the border */}
                  <span className="accent-corner top-left absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary" />
                  <span className="accent-corner top-right absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary" />
                  <span className="accent-corner bottom-left absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary" />
                  <span className="accent-corner bottom-right absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary" />

                  {/* subtle interior animated pattern */}
                  <div className="absolute inset-0 opacity-5 pointer-events-none 
                    bg-[radial-gradient(circle,rgba(8,253,216,0.3)_1px,transparent_1px)] 
                    bg-[size:20px_20px] animate-[pulse_12s_infinite]" />

                  {/* priority label */}
                  <div
                    className={`absolute top-2 ${
                      index % 2 === 0 ? "left-4" : "right-4"
                    } text-xs font-mono uppercase tracking-wider
                    ${
                      feature.priority === "high"
                        ? "text-pink-500"
                        : feature.priority === "medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }
                    animate-[priorityGlow_3s_infinite]`}
                  >
                    <span className="relative z-10">{feature.priority.toUpperCase()}</span>
                    <span className="absolute inset-0 blur-md opacity-50">{feature.priority.toUpperCase()}</span>
                  </div>

                  {/* feature title + desc */}
                  <h3 className="text-xl font-bold text-foreground mb-2 mt-4">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>

                  {/* ETA label */}
                  <div className="relative inline-block font-mono text-primary text-sm tracking-widest">
                    <div className="relative z-10 flex items-center gap-2">
                      <Clock className="h-4 w-4 shrink-0" />
                      <span>{`ETA: ${feature.eta}`}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent
                      animate-[shine_2s_infinite] blur-sm opacity-60"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section id="stay-in-loop" className="py-20 px-6">
        <div className="container mx-auto">
          <Card className="max-w-2xl mx-auto text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Stay in the Loop</CardTitle>
              <CardDescription>Be the first to know when new features are released</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button onClick={handleNotifyClick}>
                  <Bell className="mr-2 h-4 w-4" />
                  Notify Me
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                We'll only send you updates about new features. No spam, ever.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
