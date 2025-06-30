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
        <hr className="my-5" />
      </section>

      {/*Feature Roadmap*/}
      <section className="relative px-6 overflow-hidden">

      <h2 className="text-4xl font-bold text-center mb-12 text-primary tracking-tight">
        Feature Roadmap
      </h2>

      <div className="relative mx-auto max-w-4xl">
        {/*Central Vertical Line */}
        <div className="absolute left-1/2 max-[700px]:left-auto max-[700px]:right-30 w-1 bg-gradient-to-b via-primary rounded-full h-full z-0 animate-pulse"/>

        <div className="space-y-24 relative z-10">
          {upcomingFeatures.map((feature, index) => {
            const alignLeft = index % 2 === 0;

            // Time check for current feature
            let isCurrent = false;
            if (feature.eta === "Q3 2025") {
              isCurrent = true;
            }

            return (
              <motion.div
                key={index}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{once: true}}
                initial={{ opacity: 0, x: alignLeft ? -100 : 100 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 15,
                  delay: index * 0.1,
              }}
                className={`relative w-full flex ${alignLeft ? "justify-start" : "justify-end"} max-[700px]:justify-start`}
              >
                {/*Card*/}
                <div className="w-80 p-4 bg-white/5 border border-primary-500/30 shadow-lg relative -top-5">
                  <h3 className="text-lg font-semibold text-primary mt-4">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>

                  {/* Priority Badge */}
                  <div
                    className={`absolute top-2 ${
                      alignLeft ? "left-4" : "right-4"
                    } text-xs font-mono uppercase tracking-wider ${
                      feature.priority === "high"
                        ? "text-red-500"
                        : feature.priority === "medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                    } animate-[priorityGlow_3s_infinite]`}
                  >
                    <span className="relative z-10">{feature.priority.toUpperCase()}</span>
                    <span className="absolute inset-0 blur-md opacity-50">{feature.priority.toUpperCase()}</span>
                  </div>

                  {/* L-shaped corners — might refactor these into a <Corners /> comp later */}
                  <span className="border-corner absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary" />
                  <span className="corner-top-right absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary" />
                  <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary" />
                  <span className="bottom-right absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary" />

                  {/* Only show at time */}
                  {isCurrent && (
                    <div
                      className={`absolute w-4 h-4 rounded-full bg-primary border-4 border-background top-2 animate-ping ${
                        alignLeft ? "left-73" : "right-73"
                      }`}
                    ></div>
                  )}

                  {/* ETA row */}
                  <div className="flex items-center gap-1 text-x text-primary mt-2">
                    <Clock className="w-4 h-4" />
                    ETA: {feature.eta}
                  </div>
                </div>
              </motion.div>
            );
          })}
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
