import { Link } from 'react-router-dom'
import { Menu, Moon, Sun, X, ChevronDown } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'
import { useTheme } from "@/components/theme-provider"
import { GitHubStarsButton } from '../CustomComps/buttons/github-stars'
import logg from '../rdk.svg'
import loggd from '../rdkd.svg'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu'

const moreItems = [
  { name: 'Templates', to: '/templates' },
  { name: 'Drag & Drop Editor', to: '/drag-drop' },
  { name: 'Readme Generator', to: '/readme-generator' },
  { name: 'Coming Soon', to: '/coming-soon' },
]

export const Header = () => {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"
  const [menuState, setMenuState] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItemClass =
    "relative flex items-center gap-1 text-[15px] font-medium text-white/85 " +
    "transition-all duration-200 ease-out " +
    "hover:text-white hover:-translate-y-[2px]"

  return (
    <header>
      <nav className="fixed z-20 w-full px-2" style={{ zIndex: "100000" }}>
        <div
          className={cn(
            'mx-auto mt-2 max-w-3xl px-6 transition-all duration-300 lg:px-12',
            isScrolled &&
              'bg-background/60 max-w-2xl rounded-2xl border backdrop-blur-lg lg:px-5'
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between py-3 lg:py-4">

            {/* Logo (unchanged) */}
            <Link to="/" aria-label="home" className="flex items-center">
              <img
                src={loggd}
                alt="README Design Kit Logo"
                className="h-8 dark:hidden"
              />
              <img
                src={logg}
                alt="README Design Kit Logo"
                className="h-8 hidden dark:block"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-1 justify-center items-center gap-10 h-10 tracking-wide">
              <Link to="/elements" className={navItemClass}>
                Elements
              </Link>

              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button className={navItemClass}>
                    More
                    <ChevronDown className="w-4 h-4 opacity-70" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="mt-2 w-48 rounded-lg bg-background shadow-lg p-1"
                  sideOffset={6}
                >
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

            {/* Right Controls */}
            <div className="hidden lg:flex items-center gap-5">
              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-accent/40 transition"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-blue-400" />
                )}
              </button>

              {/* GitHub button visually demoted */}
              <div className="opacity-75 hover:opacity-100 transition-opacity scale-95">
                <GitHubStarsButton
                  username="Mayur-Pagote"
                  repo="README_Design_Kit"
                  isScrolled={isScrolled}
                />
              </div>
            </div>

            {/* Mobile toggle (unchanged) */}
            <button
              onClick={() => setMenuState(!menuState)}
              className="relative z-20 -m-2.5 -mr-4 block p-2.5 lg:hidden"
            >
              <Menu className="size-7" />
              <X className="absolute inset-0 m-auto size-6 opacity-0" />
            </button>

          </div>
        </div>
      </nav>
    </header>
  )
}
