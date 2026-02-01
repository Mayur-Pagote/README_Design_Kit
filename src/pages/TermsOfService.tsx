import { Link } from 'react-router-dom';
import { FileText, Home, ChevronRight, Sparkles, Scale, Copyright, Server, GitPullRequest, Mail, } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

function TermsCard({
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

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Terms of Service</span>
          </nav>

          <div className="text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>

            <h1
              id="terms-of-service"
              className="text-3xl md:text-4xl font-bold text-foreground"
            >
              Terms of Service
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before using README Design Kit.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <TermsCard icon={Sparkles} title="Free Developer Tool">
            <p>
              README Design Kit is a free, open-source tool designed to help
              developers create better documentation. We believe in making
              documentation tools accessible to everyone in the developer
              community.
            </p>
          </TermsCard>

          <TermsCard icon={Scale} title="Fair Use Policy">
            <p>While README Design Kit is free to use, we ask that you:</p>
            <ul className="mt-4 space-y-2 border-l-2 border-primary/30 pl-4">
              <li>Use the tool responsibly and ethically</li>
              <li>Respect GitHub&apos;s API rate limits</li>
              <li>Don&apos;t attempt to abuse or overload our services</li>
              <li>Give credit when using our templates in your projects</li>
            </ul>
          </TermsCard>

          <TermsCard icon={Copyright} title="Content Ownership">
            <p>Regarding content created with README Design Kit:</p>
            <ul className="mt-4 space-y-2 border-l-2 border-primary/30 pl-4">
              <li>You retain full ownership of your README content</li>
              <li>Our templates and components are MIT licensed</li>
              <li>You can use generated content for any purpose</li>
              <li>We don&apos;t claim rights to your documentation</li>
            </ul>
          </TermsCard>

          <TermsCard icon={Server} title="Service Availability">
            <p>README Design Kit is provided &quot;as is&quot; with no guarantees of:</p>
            <ul className="mt-4 space-y-2 border-l-2 border-primary/30 pl-4">
              <li>Continuous availability</li>
              <li>Data persistence</li>
              <li>Specific features or functionality</li>
            </ul>
          </TermsCard>

          <TermsCard icon={GitPullRequest} title="Contributions">
            <p>
              As an open-source project, we welcome contributions from the
              community. By contributing, you:
            </p>
            <ul className="mt-4 space-y-2 border-l-2 border-primary/30 pl-4">
              <li>Agree to license your contributions under MIT</li>
              <li>Confirm you have the right to contribute</li>
              <li>Understand we may modify or remove contributions</li>
            </ul>
          </TermsCard>

          <TermsCard icon={Mail} title="Contact">
            <p>
              For questions about these terms, please contact us at{' '}
              <a
                href="mailto:contact@readmedesignkit.com"
                className="text-primary hover:underline"
              >
                contact@readmedesignkit.com
              </a>
            </p>
          </TermsCard>

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
