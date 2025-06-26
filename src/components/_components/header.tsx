import {Link} from 'react-router-dom'
// import { Logo } from '@/components/logo'
import { Menu, Moon, Sun, Laptop, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { cn } from '@/lib/utils'
import { useTheme } from "@/components/theme-provider"


const menuItems = [
    { name: 'Templates', to: '/templates' },
    { name: 'Elements', to: '/elements' },
    { name: 'Showcase', to: '/showcase' },
    { name: 'Drag & Drop Editor', to: '/drag-drop' },
    { name: 'Coming Soon', to: '/coming-soon' },
]

export const Header = () => {
    const { theme, setTheme } = useTheme()
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
                className="fixed z-20 w-full px-2">
                <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                to="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                {/* <Logo /> */}
                                <h1 className=' dark:text-white hover:text-white duration-150 ease-in-out hover:cursor-pointer' >README DESIGN KIT</h1>
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            to={item.to}
                                            className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                to={item.to}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <div className={cn(isScrolled && 'lg:hidden', 'inline-flex items-center rounded-md  border-border backdrop-blur-lg overflow-hidden')}> 
                                    <Button variant={theme==='light' ? 'default' : 'ghost'} size="sm" aria-label="Light mode" onClick={() => setTheme('light')} className={cn('h-8 w-8 transition-opacity', theme==='light' ? 'bg-primary text-primary-foreground shadow-sm' : 'opacity-75 hover:opacity-100')}>
                                        <Sun className="h-5 w-5" />
                                    </Button>
                                    <Button variant={theme==='dark' ? 'default' : 'ghost'} size="sm" aria-label="Dark mode" onClick={() => setTheme('dark')} className={cn('h-8 w-8 transition-opacity', theme==='dark' ? 'bg-primary text-primary-foreground shadow-sm' : 'opacity-75 hover:opacity-100')}>
                                        <Moon className="h-5 w-5" />
                                    </Button>
                                    <Button variant={theme==='system' ? 'default' : 'ghost'} size="sm" aria-label="System mode" onClick={() => setTheme('system')} className={cn('h-8 w-8 transition-opacity', theme==='system' ? 'bg-primary text-primary-foreground shadow-sm' : 'opacity-75 hover:opacity-100')}>
                                        <Laptop className="h-5 w-5" />
                                    </Button>
                                </div>
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn(isScrolled && 'lg:hidden')}>
                                    <Link to="/elements">
                                        <span>Get Started</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn(isScrolled ? 'lg:inline-flex' : 'hidden')}>
                                    <Link to="/elements">
                                        <span>Get Started</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
