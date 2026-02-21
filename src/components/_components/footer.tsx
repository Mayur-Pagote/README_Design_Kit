import { Link } from 'react-router-dom'
import { BackgroundLines } from './backgroundlines'
import loggd from '../rdkd.svg';
import logg from '../rdk.svg';


const links = [
    { title: 'Templates', to: '/templates' },
    { title: 'Elements', to: '/elements' },
    
    { title: 'Drag & Drop Editor', to: '/drag-drop' },
    { title: 'Readme Generator', to: '/readme-generator' },
    { title: 'Coming Soon', to: '/coming-soon' },
]


export default function Footer() {
    return (
        <div className="relative w-full overflow-hidden border-t border-neutral-300 dark:border-neutral-800/50 bg-white/50 dark:bg-[#0b1020]/60 backdrop-blur-lg">
            
            {/* Background Decoration: Animated lines layer */}

            <div className="absolute inset-0 -z-20 h-full min-h-[500px]">
                <BackgroundLines className="h-1/2 w-full">
                    <div className="absolute inset-0 " />
                </BackgroundLines>
            </div>

            
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-200/30 via-violet-200/20 to-fuchsia-200/10 dark:from-[#0b1020]/60 dark:via-[#0b1020]/40 dark:to-[#0b1020]/20" />


            <footer className="relative z-10 pt-16 pb-8">
                <div className="container mx-auto px-6">
                    
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                        
                        {/* Column 1: Brand / Logo and Description */}
                        <div className="flex flex-col space-y-4">
                            <Link to="/" aria-label="go home" className="block size-fit">
                                <img
                                    src={loggd}
                                    alt="README Design Kit - Light Logo"
                                    className="h-8 object-contain block dark:hidden opacity-90"
                                />
                                <img
                                    src={logg}
                                    alt="README Design Kit - Dark Logo"
                                    className="h-8 object-contain hidden dark:block opacity-90"
                                />
                            </Link>
                            <p className="text-sm text-neutral-600 dark:text-muted-foreground leading-relaxed max-w-xs">
                                Create professional, aesthetic, and highly customizable READMEs for your GitHub projects in seconds. 
                            </p>
                        </div>

                        {/* Column 2: Product Links (Templates and Elements) */}
                        
                        <div className="flex flex-col space-y-4">
                            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Product</h4>
                            <ul className="flex flex-col space-y-2 text-sm">
                                {links.slice(0, 2).map((link, idx) => (
                                    <li key={idx}>
                                        <Link
                                            to={link.to}
                                            className="relative inline-block text-neutral-600 dark:text-muted-foreground hover:text-primary transition-colors duration-200 after:absolute after:left-0 after:-bottom-0.5 after:h-[1px] after:w-0 after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:transition-all after:duration-300 hover:after:w-full"
                                        >
                                            {link.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Tools Links (Drag & Drop Editor, Readme Generator) */}
                        
                        <div className="flex flex-col space-y-4">
                            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Tools</h4>
                            <ul className="flex flex-col space-y-2 text-sm">
                                {links.slice(2).map((link, idx) => (
                                    <li key={idx}>
                                        <Link
                                            to={link.to}
                                            className="relative inline-block text-muted-foreground hover:text-primary transition-colors duration-200 after:absolute after:left-0 after:-bottom-0.5 after:h-[1px] after:w-0 after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:transition-all after:duration-300 hover:after:w-full"
                                        >
                                            {link.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 4: Newsletter Signup */}
                        
                        <div className="flex flex-col space-y-4">
                            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Stay Updated</h4>
                            <p className="text-xs text-muted-foreground">Join our community to get the latest README templates and UI tips.</p>
                        </div>
                    </div>


                    
                    <div className="mt-16 pt-8 border-t border-neutral-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex flex-wrap justify-center md:justify-center text-center w-full gap-x-4 gap-y-2">
                            <span>© {new Date().getFullYear()} README DESIGN KIT</span>
                            <span className="hidden md:inline text-neutral-700">|</span>
                            <Link to="/privacy" className="relative hover:text-primary transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-[1px] after:w-0 after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:transition-all after:duration-300 hover:after:w-full">Privacy Policy</Link>
                            <Link to="/terms" className="relative hover:text-primary transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-[1px] after:w-0 after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:transition-all after:duration-300 hover:after:w-full">Terms of Service</Link>
                            <Link to="/about" className="relative hover:text-primary transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-[1px] after:w-0 after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:transition-all after:duration-300 hover:after:w-full">About</Link>
                        </div>
                        <div className="text-neutral-500 italic whitespace-nowrap">
                            Designed for Developers.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
