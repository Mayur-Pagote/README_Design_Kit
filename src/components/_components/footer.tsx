import { Link } from 'react-router-dom'
import { BackgroundLines } from './backgroundlines'
import loggd from '../rdkd.svg';
import logg from '../rdk.svg';


const links = [
    { title: 'Templates', to: '/templates' },
    { title: 'Elements', to: '/elements' },
    // { title: 'Showcase', to: '/showcase' },
    { title: 'Drag & Drop Editor', to: '/drag-drop' },
    { title: 'Readme Generator', to: '/readme-generator' },
    { title: 'Coming Soon', to: '/coming-soon' },
]


export default function Footer() {
    return (
        <div className="relative w-full overflow-hidden border-t border-neutral-800/50 bg-black/20 backdrop-blur-sm">
            {/* Background Animation Layer */}
            <div className="absolute inset-0 -z-10 h-full min-h-[500px]">
                <BackgroundLines className="h-1/2 w-full">
                    <div className="absolute inset-0 " />
                </BackgroundLines>
            </div>


            <footer className="relative z-10 pt-16 pb-8">
                <div className="container mx-auto px-6">
                    {/* Main Footer Grid */}
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                        
                        {/* Column 1: Brand Identity */}
                        <div className="flex flex-col space-y-4">
                            <Link to="/" aria-label="go home" className="block size-fit">
                                <img
                                    src={loggd}
                                    alt="README Design Kit - Light Logo"
                                    className="h-8 object-contain block dark:hidden"
                                />
                                <img
                                    src={logg}
                                    alt="README Design Kit - Dark Logo"
                                    className="h-8 object-contain hidden dark:block"
                                />
                            </Link>
                            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                                Create professional, aesthetic, and highly customizable READMEs for your GitHub projects in seconds. 
                            </p>
                        </div>


                        {/* Column 2: Product */}
                        <div className="flex flex-col space-y-4">
                            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Product</h4>
                            <ul className="flex flex-col space-y-2 text-sm">
                                {links.slice(0, 2).map((link, idx) => (
                                    <li key={idx}>
                                        <Link to={link.to} className="text-muted-foreground hover:text-primary transition-colors duration-150">{link.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>


                        {/* Column 3: Tools */}
                        <div className="flex flex-col space-y-4">
                            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Tools</h4>
                            <ul className="flex flex-col space-y-2 text-sm">
                                {links.slice(2).map((link, idx) => (
                                    <li key={idx}>
                                        <Link to={link.to} className="text-muted-foreground hover:text-primary transition-colors duration-150">{link.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>


                        {/* Column 4: Newsletter/CTA (New Feature) */}
                        <div className="flex flex-col space-y-4">
                            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Stay Updated</h4>
                            <p className="text-xs text-muted-foreground">Join our community to get the latest README templates and UI tips.</p>
                            <div className="flex w-full items-center space-x-2">
                                <div className="h-9 w-full rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-1 text-xs flex items-center text-muted-foreground">
                                    Coming soon...
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Sub-Footer: Copyright and Legal */}
                    <div className="mt-16 pt-8 border-t border-neutral-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2">
                            <span>© {new Date().getFullYear()} README DESIGN KIT</span>
                            <span className="hidden md:inline text-neutral-700">|</span>
                            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
                        </div>
                        <div className="text-neutral-500 italic">
                            Designed for Developers.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
