"use client"

import { useState, useEffect } from "react"
import { Search, ShoppingCart, User, Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { useTheme } from "@/components/theme-provider"

export function Header() {
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()
  const [searchFocused, setSearchFocused] = useState(false)
  const [cartHovered, setCartHovered] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-14 items-center gap-4 px-4">
        <SidebarTrigger className="hover:scale-110 transition-transform" />

        <div className="flex-1 flex items-center gap-4 max-w-2xl">
          <div className={`relative flex-1 transition-all duration-300 ${searchFocused ? "scale-105" : "scale-100"}`}>
            <Search
              className={`absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground transition-colors ${searchFocused ? "text-primary" : ""}`}
            />
            <Input
              type="search"
              placeholder="Search groceries..."
              className="pl-8 transition-all duration-200 focus:ring-2 focus:ring-primary"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:scale-110 transition-all duration-200"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="hover:scale-110 transition-all duration-200"
            asChild
            onMouseEnter={() => setCartHovered(true)}
            onMouseLeave={() => setCartHovered(false)}
          >
            <Link href="/cart">
              <div className="relative">
                <ShoppingCart
                  className={`h-5 w-5 transition-all duration-200 ${cartHovered ? "text-primary scale-110" : ""}`}
                />
                <Badge
                  className={`absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs transition-all duration-200 ${cartHovered ? "scale-125 bg-primary" : ""}`}
                >
                  3
                </Badge>
              </div>
            </Link>
          </Button>

          {user ? (
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform" asChild>
              <Link href="/dashboard">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button className="hover:scale-105 transition-transform" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button className="hover:scale-105 transition-transform" variant="secondary" asChild>
                <Link href="/auth/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
