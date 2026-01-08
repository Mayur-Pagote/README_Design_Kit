import { Link } from 'react-router-dom'
import { BackgroundLines } from './backgroundlines'
import loggd from '../rdkd.svg';
import logg from '../rdk.svg';

const links = [
    { title: 'Templates', to: '/templates' },
    { title: 'Elements', to: '/elements' },
    { title: 'Showcase', to: '/showcase' },
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
                            {/* Social Icons Moved Here for Hierarchy */}
                            <div className="flex items-center gap-4 pt-2">
                                <Link to="#" target="_blank" rel="noopener noreferrer" aria-label="X/Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                                    <svg className="size-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"></path></svg>
                                </Link>
                                <Link to="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
                                    <svg className="size-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.89 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.63-.33 2.47-.33c.84 0 1.68.11 2.47.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"></path></svg>
                                </Link>
                                <Link to="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                                    <svg className="size-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"></path></svg>
                                </Link>
                            </div>
                        </div>

                        {/* Column 2: Product */}
                        <div className="flex flex-col space-y-4">
                            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Product</h4>
                            <ul className="flex flex-col space-y-2 text-sm">
                                {links.slice(0, 3).map((link, idx) => (
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
                                {links.slice(3).map((link, idx) => (
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