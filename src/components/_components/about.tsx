import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Code, Palette, Zap, LayoutGrid, Code2, Sparkles, Users, BookOpen, GitBranch, ShieldCheck, Heart, Loader2, AlertCircle } from "lucide-react";
import { fetchContributors } from '@/lib/github';
import { siteConfig } from '@/config/site';

// 1. Import Pagination components
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Contributor {
    login: string;
    avatar_url: string;
    html_url: string;
    contributions: number;
}

export default function AboutUs() {
    const [contributors, setContributors] = useState<Contributor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 2. Add Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    
    // Set to 30 to show 5 rows on large screens (5 rows * 6 columns = 30 items)
    // If you literally meant 5 items total per page, change this to 5.
    const ITEMS_PER_PAGE = 30; 

    useEffect(() => {
        const loadContributors = async () => {
            try {
                setIsLoading(true);
                const data = await fetchContributors(siteConfig.githubRepo);
                setContributors(data);
            } catch (err) {
                console.error('Failed to load contributors:', err);
                setError('Failed to load contributors. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        loadContributors();
    }, []);

    const renderContributors = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 mx-auto text-destructive mb-4" />
                    <p className="text-destructive">{error}</p>
                </div>
            );
        }

        if (contributors.length === 0) {
            return (
                <div className="text-center py-8">
                    <p className="text-muted-foreground">No contributors found.</p>
                </div>
            );
        }

        // 3. Calculate Pagination Data
        const totalPages = Math.ceil(contributors.length / ITEMS_PER_PAGE);
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const currentContributors = contributors.slice(startIndex, startIndex + ITEMS_PER_PAGE);

        return (
            <div className="space-y-8">
                {/* 4. Render only the current slice of contributors */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {currentContributors.map((contributor) => (
                        <a
                            key={contributor.login}
                            href={contributor.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                        >
                            <Card className="h-full transition-all hover:shadow-lg hover:border-primary">
                                <CardHeader className="p-4">
                                    <div className="flex flex-col items-center text-center">
                                        <Avatar className="w-16 h-16 mb-3 group-hover:ring-2 group-hover:ring-primary group-hover:ring-offset-2 transition-all">
                                            <AvatarImage src={contributor.avatar_url} />
                                            <AvatarFallback>{contributor.login[0].toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <CardTitle className="text-base font-medium group-hover:text-primary transition-colors">
                                            {contributor.login}
                                        </CardTitle>
                                        <CardDescription className="text-xs">
                                            {contributor.contributions} {contributor.contributions === 1 ? 'contribution' : 'contributions'}
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                            </Card>
                        </a>
                    ))}
                </div>

                {/* 5. Pagination Controls */}
                {totalPages > 1 && (
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious 
                                    href="#" 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage > 1) setCurrentPage(p => p - 1);
                                    }}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                            
                            {/* Render page numbers */}
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink 
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setCurrentPage(i + 1);
                                        }}
                                        isActive={currentPage === i + 1}
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext 
                                    href="#" 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage < totalPages) setCurrentPage(p => p + 1);
                                    }}
                                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        );
    };

    const features = [
        {
            icon: <Code2 className="w-6 h-6" />,
            title: "Beautiful Templates",
            description: "Pre-designed, customizable templates for every type of project"
        },
        {
            icon: <LayoutGrid className="w-6 h-6" />,
            title: "Drag & Drop Editor",
            description: "Intuitive interface for building READMEs without coding"
        },
        {
            icon: <Palette className="w-6 h-6" />,
            title: "Custom Styling",
            description: "Themes and styles to match your project's branding"
        },
        {
            icon: <GitBranch className="w-6 h-6" />,
            title: "Version Control Ready",
            description: "Designed to work seamlessly with Git and GitHub"
        },
        {
            icon: <ShieldCheck className="w-6 h-6" />,
            title: "Open Source",
            description: "Free and open-source, built by and for the developer community"
        },
        {
            icon: <Sparkles className="w-6 h-6" />,
            title: "Rich Elements",
            description: "Pre-built components for badges, tables, code blocks, and more"
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Live Preview",
            description: "Instantly preview your README as it will appear on GitHub"
        },
        {
            icon: <Code className="w-6 h-6" />,
            title: "Export & Download",
            description: "Export README files in Markdown format with a single click"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            {/* Hero Section */}
            <section className="text-center mb-20">
                <Badge variant="outline" className="mb-4 text-sm font-medium">
                    About README Design Kit
                </Badge>
                <h1 className="text-4xl md:text-5xl pb-4 font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Empowering Developers
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                    Create beautiful, professional README files in minutes with our open-source design system and editor.
                </p>
                <div className="flex justify-center gap-4">
                    <Button asChild size="lg" className="gap-2 ">
                        <Link to="/elements">
                            <Zap className="w-4 h-4" /> Get Started
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="gap-2">
                        <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" /> GitHub
                        </a>
                    </Button>
               </div>
            </section>

            <Separator className="my-12" />

            {/* Features Section */}
            <section className="mb-24">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                    Features That Make a Difference
                </h2>
                <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-14">
                    Thoughtfully designed features to guide, support, and empower open-source contributors.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card
                        key={index}
                        tabIndex={0}
                        className="group relative rounded-xl border border-border bg-white dark:bg-neutral-900 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-purple-400/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500  focus-visible:ring-offset-2 focus-visible:ring-offset-background "
                        >
                        <CardHeader>
                            {/* Icon Container */}
                            <div className=" relative p-3 rounded-lg w-fit mb-5 bg-purple-100 text-purple-600 dark:bg-neutral-800 dark:text-purple-400 transition-all duration-300 ease-out group-hover:scale-110 group-hover:-rotate-2">
                            {/* Icon-only glow */}
                            <span className="pointer-events-none absolute inset-0 rounded-lg opacity-0 blur-xl bg-purple-400/30 transition-opacity duration-300 group-hover:opacity-100" />
                            <span className="relative z-10">
                                {feature.icon}
                            </span>
                            </div>

                            <CardTitle className="text-xl text-foreground transition-colors duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                            {feature.title}
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <p className="text-muted-foreground leading-relaxed">
                            {feature.description}
                            </p>
                        </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Mission Section */}
            <section className="bg-muted/50 rounded-3xl p-12 mb-20">
                <div className="max-w-3xl mx-auto text-center">
                    <BookOpen className="w-10 h-10 mx-auto mb-6 text-primary" />
                    <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        We believe that great documentation deserves great design. Our mission is to make it easy for developers to create beautiful, professional README files that showcase their projects in the best possible light.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <Badge variant="secondary" className="px-4 py-2 text-sm">
                            <Heart className="w-4 h-4 mr-2 text-red-500" />
                            Made with love for developers
                        </Badge>
                        <Badge variant="secondary" className="px-4 py-2 text-sm">
                            <Users className="w-4 h-4 mr-2 text-blue-500" />
                            Community-driven
                        </Badge>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="mb-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Our Amazing Contributors</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A big thank you to everyone who has contributed to make README Design Kit better!
                    </p>
                </div>
                {renderContributors()}
                <div className="text-center mt-12">
                    <p className="text-sm text-muted-foreground mb-4">
                        Want to see your face here? Contribute to our project on GitHub!
                    </p>
                    <Button asChild variant="outline" className="gap-2">
                        <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" /> Contribute Now
                        </a>
                    </Button>
                </div>
            </section>

            {/* CTA Section */}
            <section className="text-center">
                <h2 className="text-3xl font-bold mb-6">Ready to Elevate Your Documentation?</h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Join thousands of developers who are creating beautiful README files with our tools.
                </p>
                <div className="flex justify-center gap-4">
                    <Button asChild size="lg" className="gap-2">
                        <Link to="/drag-drop">
                            <Code className="w-4 h-4" /> Start Building
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="gap-2">
                        <a href={`${siteConfig.githubUrl}/blob/main/README.md`} target="_blank" rel="noopener noreferrer">
                            <BookOpen className="w-4 h-4" /> View Documentation
                        </a>   
                    </Button>
                </div>
            </section>
        </div>
    );
}