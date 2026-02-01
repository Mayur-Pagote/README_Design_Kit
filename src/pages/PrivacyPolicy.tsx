import { Link } from 'react-router-dom';
import { Shield, Home, ChevronRight, Database, UserX, Github, Mail, } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

function PolicyCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-card p-6 space-y-4">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
        <Icon className="h-5 w-5 text-primary" />
        {title}
      </h2>
      <div className="text-muted-foreground leading-relaxed">{children}</div>
    </section>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Privacy Policy</span>
          </nav>

          <div className="text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Privacy Policy
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your data.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <PolicyCard icon={Database} title="Data Collection">
            <p>
              README Design Kit is committed to protecting your privacy. We collect minimal
              data necessary to provide our services:
            </p>
            <ul className="mt-4 space-y-2 border-l-2 border-primary/30 pl-4">
              <li>GitHub API data (only when explicitly authorized)</li>
              <li>Local storage for saving your preferences</li>
              <li>Anonymous usage statistics to improve our service</li>
            </ul>
          </PolicyCard>

          <PolicyCard icon={UserX} title="No Account Required">
            <p>
              We believe in simplicity and privacy. You can use README Design Kit without
              creating an account. All your work is saved locally in your browser.
            </p>
          </PolicyCard>

          <PolicyCard icon={Github} title="GitHub Integration">
            <p>When you choose to use GitHub features:</p>
            <ul className="mt-4 space-y-2 border-l-2 border-primary/30 pl-4">
              <li>We only request necessary permissions</li>
              <li>We never store your GitHub credentials</li>
              <li>You can revoke access at any time</li>
            </ul>
          </PolicyCard>

          <PolicyCard icon={Mail} title="Contact">
            <p>
              If you have any questions about our privacy policy, please contact us at{' '}
              <a
                href="mailto:contact@readmedesignkit.com"
                className="text-primary hover:underline"
              >
                contact@readmedesignkit.com
              </a>
            </p>
          </PolicyCard>

          <Separator />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            <span className="text-sm text-muted-foreground">
              Last updated: March 14, 2024
            </span>

            <Button asChild variant="outline">
              <Link to="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}