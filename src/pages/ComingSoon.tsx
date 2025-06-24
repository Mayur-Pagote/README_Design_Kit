import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Bell, Rocket, Star, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Added navigation

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
    { title: "Advanced Template Library", description: "Pre-built README templates", eta: "Q3 2025", priority: "high" },
    { title: "Real-time Collaboration", description: "Work together on README files", eta: "Q4 2025", priority: "medium" },
    { title: "GitHub Integration", description: "Direct sync with repositories", eta: "Q3 2025", priority: "high" },
    { title: "Custom Components", description: "Reusable components for docs", eta: "Q4 2025", priority: "low" },
    { title: "AI-Powered Suggestions", description: "Smart README content recommendations", eta: "Q1 2026", priority: "medium" },
    { title: "Export Formats", description: "Export README as PDF, HTML, etc.", eta: "Q3 2025", priority: "medium" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

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
            <span>Last updated: June 14, 2025</span>
          </div>
        </div>
      </section>

      {/* Features Roadmap */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Feature Roadmap</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingFeatures.map((feature, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <Badge className={getPriorityColor(feature.priority)}>
                      {feature.priority}
                    </Badge>
                  </div>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>ETA: {feature.eta}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
