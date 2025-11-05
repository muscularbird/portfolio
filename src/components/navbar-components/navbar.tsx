import { useEffect, useId, useState } from "react"
import { HouseIcon, InboxIcon, SearchIcon, ZapIcon, MoonIcon, SunIcon, ContactIcon } from "lucide-react"

import Logo from "@/components/navbar-components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/projects", label: "Projects", icon: InboxIcon },
  { href: "/about", label: "About Me", icon: ZapIcon },
  { href: "/contact", label: "Contact", icon: ContactIcon, active: false },
]

export default function Navbar() {
  const id = useId()
  // initialize theme: prefer saved preference, fall back to dark by default
  const [darkTheme, setDarkTheme] = useState<boolean>(() => {
    try {
      const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null
      if (saved) return saved === "dark"
    } catch (e) {}
    return true
  })

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add("dark")
      try { localStorage.setItem("theme", "dark") } catch (e) {}
    } else {
      document.documentElement.classList.remove("dark")
      try { localStorage.setItem("theme", "light") } catch (e) {}
    }
  }, [darkTheme])

  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-24 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-135"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-135"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => {
                    const Icon = link.icon
                    return (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavigationMenuLink
                          href={link.href}
                          className="flex-row items-center gap-2 py-1.5"
                          active={link.active}
                        >
                          <Icon
                            size={16}
                            className="text-muted-foreground/80"
                            aria-hidden="true"
                          />
                          <span>{link.label}</span>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-primary hover:text-primary/90">
              <Logo />
            </a>
          </div>
        </div>
        {/* Middle area */}
        <NavigationMenu className="max-md:hidden">
          <NavigationMenuList className="gap-2">
            {navigationLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    active={link.active}
                    href={link.href}
                    className="flex-row items-center gap-2 py-1.5 font-medium text-foreground hover:text-primary"
                  >
                    <Icon
                      size={16}
                      className="text-muted-foreground/80"
                      aria-hidden="true"
                    />
                    <span>{link.label}</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>
        {/* Right side */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <Button size="icon" variant="outline" onClick={() => setDarkTheme(!darkTheme)}>
            {darkTheme ? <SunIcon size={16} /> : <MoonIcon size={16} />}
          </Button>
        </div>
      </div>
    </header>
  )
}
