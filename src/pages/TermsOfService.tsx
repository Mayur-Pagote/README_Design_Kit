import { Link } from 'react-router-dom';
import { FileText, Home, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function TermsOfService() {
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
            <span className="text-foreground">Terms of Service</span>
          </nav>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FileText className="h-8 w-8 text-primary" />
              <h1 id="terms-of-service" className="text-3xl md:text-4xl font-bold text-foreground">
                Terms of Service
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before using README Design Kit.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Free Developer Tool</h2>
            <p className="text-muted-foreground">
              README Design Kit is a free, open-source tool designed to help developers create better documentation.
              We believe in making documentation tools accessible to everyone in the developer community.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Fair Use Policy</h2>
            <p className="text-muted-foreground mb-4">
              While README Design Kit is free to use, we ask that you:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Use the tool responsibly and ethically</li>
              <li>Respect GitHub's API rate limits</li>
              <li>Don't attempt to abuse or overload our services</li>
              <li>Give credit when using our templates in your projects</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Content Ownership</h2>
            <p className="text-muted-foreground mb-4">
              Regarding content created with README Design Kit:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>You retain full ownership of your README content</li>
              <li>Our templates and components are MIT licensed</li>
              <li>You can use generated content for any purpose</li>
              <li>We don't claim rights to your documentation</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Service Availability</h2>
            <p className="text-muted-foreground mb-4">
              README Design Kit is provided "as is" with no guarantees of:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Continuous availability</li>
              <li>Data persistence</li>
              <li>Specific features or functionality</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contributions</h2>
            <p className="text-muted-foreground mb-4">
              As an open-source project, we welcome contributions from the community. By contributing, you:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Agree to license your contributions under MIT</li>
              <li>Confirm you have the right to contribute</li>
              <li>Understand we may modify or remove contributions</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact</h2>
            <p className="text-muted-foreground">
              For questions about these terms, please contact us at{' '}
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