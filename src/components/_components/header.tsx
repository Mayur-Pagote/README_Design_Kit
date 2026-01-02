import {Link} from 'react-router-dom'
// import { Logo } from '@/components/logo'
import { Menu, Moon, Sun, X, ChevronDown } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'
import { useTheme } from "@/components/theme-provider"
import { GitHubStarsButton } from '../CustomComps/buttons/github-stars'
import logg from '../rdk.svg';
import loggd from '../rdkd.svg';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

const moreItems = [
    { name: 'Templates', to: '/templates' },
    { name: 'Showcase', to: '/showcase' },
    { name: 'Drag & Drop Editor', to: '/drag-drop' },
    { name: 'Readme Generator', to: '/readme-generator'},
    { name: 'Coming Soon', to: '/coming-soon' },
]

export const Header = () => {
    const { theme, setTheme } = useTheme()
    const isDark = theme === "dark"
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-20 w-full px-2" style={{ zIndex: "100000" }}>
                <div className={cn('mx-auto mt-2 max-w-3xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-background/50 max-w-2xl rounded-2xl border backdrop-blur-lg lg:px-5')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                to="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                {/* <Logo /> */}
                                <img 
                                  src={loggd} 
                                  alt="README Design Kit - Light Logo" 
                                  className="h-8 object-contain block dark:hidden"
                                />
                                 {/* Dark Mode Logo */}
                                <img 
                                  src={logg} 
                                  alt="README Design Kit - Dark Logo" 
                                  className="h-8 object-contain hidden dark:block"
                                />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="hidden lg:flex flex-1 justify-center items-center gap-8 text-sm whitespace-nowrap">
                            <Link to="/elements" className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                Elements
                            </Link>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center gap-1 text-muted-foreground hover:text-accent-foreground duration-150 cursor-pointer">
                                        More
                                        <ChevronDown className="w-4 h-4" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="mt-2 w-48 rounded-lg bg-background shadow-lg p-1" sideOffset={7}>
                                    {moreItems.map((item, index) => (
                                        <DropdownMenuItem key={index} asChild>
                                            <Link
                                                to={item.to}
                                                className="block w-full px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-accent-foreground hover:bg-accent/10"
                                            >
                                                {item.name}
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className={cn("bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-center rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent transition-all duration-300 data-[state=active]:absolute data-[state=active]:top-full data-[state=active]:left-0 data-[state=active]:right-0 lg:static mt-1 lg:mt-0 z-10", isScrolled ? "space-y-4 lg:gap-4" : "space-y-8 lg:gap-8")}>
                            <div className="lg:hidden w-full text-center">
                                <ul className="space-y-6 text-base inline-block">
                                    <li>
                                        <Link 
                                            to="/elements"
                                            onClick={() => setMenuState(false)}
                                            className="text-muted-foreground hover:text-accent-foreground block duration-150 text-base"
                                        >
                                            Elements
                                        </Link>
                                    </li>
                                    {moreItems.map((item, index) => (
                                        <li key={index}>
                                            <Link 
                                                to={item.to}
                                                onClick={() => setMenuState(false)}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150 text-base"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={cn("flex w-full flex-col sm:flex-row md:w-fit transition-all duration-300 items-center justify-center lg:justify-end", isScrolled ? "space-y-2 sm:gap-3" : "space-y-3 sm:gap-4")}>
                                <div className="flex items-center justify-center h-10 w-10 -my-1">
                                    <button 
                                        onClick={() => setTheme(isDark ? "light" : "dark")} 
                                        className={`p-2 rounded-full flex items-center justify-center hover:bg-accent/50 transition-colors
                                            ${isDark ? "rotate-180" : "rotate-0"}
                                        `}
                                        aria-label="Toggle theme"
                                    >
                                        {isDark ? (
                                            <Sun className="h-5 w-5 text-yellow-500" />
                                        ) : (
                                            <Moon className="h-5 w-5 text-blue-500" />
                                        )}
                                    </button>
                                </div>
                                <br />
                                <GitHubStarsButton 
                                  username="Mayur-Pagote" 
                                  repo="README_Design_Kit" 
                                  isScrolled={isScrolled}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}