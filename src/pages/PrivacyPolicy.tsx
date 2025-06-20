import { Link } from 'react-router-dom';
import { Shield, Home, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

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

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <h1 id="privacy-policy" className="text-3xl md:text-4xl font-bold text-foreground">
                Privacy Policy
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your data.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Data Collection</h2>
            <p className="text-muted-foreground mb-4">
              README Design Kit is committed to protecting your privacy. We collect minimal data necessary to provide our services:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>GitHub API data (only when explicitly authorized)</li>
              <li>Local storage for saving your preferences</li>
              <li>Anonymous usage statistics to improve our service</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">No Account Required</h2>
            <p className="text-muted-foreground">
              We believe in simplicity and privacy. You can use README Design Kit without creating an account. 
              All your work is saved locally in your browser.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">GitHub Integration</h2>
            <p className="text-muted-foreground mb-4">
              When you choose to use GitHub features:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>We only request necessary permissions</li>
              <li>We never store your GitHub credentials</li>
              <li>You can revoke access at any time</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact</h2>
            <p className="text-muted-foreground">
              If you have any questions about our privacy policy, please contact us at{' '}
              <a href="mailto:contact@readmedesignkit.com" className="text-primary hover:underline">
                contact@readmedesignkit.com
              </a>
            </p>
          </section>

          <div className="flex items-center justify-between pt-8">
            <div className="text-sm text-muted-foreground">
              Last updated: March 14, 2024
            </div>
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