"use client"

import { useState, useEffect } from "react"
import { Home, Apple, Leaf, Milk, Wheat, Coffee, ShoppingCart, Search, Heart, User, LogOut, LogIn, Settings, BarChart3, Package, Users, Zap } from 'lucide-react'
import Link from "next/link"
import { usePathname, useSearchParams } from 'next/navigation'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"

const customerItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Fruits",
    url: "/products?category=Fruits",
    icon: Apple,
  },
  {
    title: "Vegetables",
    url: "/products?category=Vegetables",
    icon: Leaf,
  },
  {
    title: "Dairy",
    url: "/products?category=Dairy",
    icon: Milk,
  },
  {
    title: "Staples",
    url: "/products?category=Staples",
    icon: Wheat,
  },
  {
    title: "Snacks",
    url: "/products?category=Snacks",
    icon: Coffee,
  },
  {
    title: "Beverages",
    url: "/products?category=Beverages",
    icon: Coffee,
  },
  {
    title: "Bakery",
    url: "/products?category=Bakery",
    icon: Coffee,
  },
  {
    title: "Household",
    url: "/products?category=Household",
    icon: ShoppingCart,
  },
  {
    title: "Personal Care",
    url: "/products?category=Personal Care",
    icon: Heart,
  },
  {
    title: "Baby Care",
    url: "/products?category=Baby Care",
    icon: Heart,
  },
  {
    title: "Pet Supplies",
    url: "/products?category=Pet Supplies",
    icon: Heart,
  },
  {
    title: "Cleaning",
    url: "/products?category=Cleaning",
    icon: ShoppingCart,
  },
  {
    title: "Cart",
    url: "/cart",
    icon: ShoppingCart,
  },
  {
    title: "Wishlist",
    url: "/wishlist",
    icon: Heart,
  },
]

const userItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: User,
  },
  {
    title: "Orders",
    url: "/orders",
    icon: Package,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: Settings,
  },
]

const adminItems = [
  {
    title: "Admin Dashboard",
    url: "/admin",
    icon: BarChart3,
  },
  {
    title: "Manage Products",
    url: "/admin/products",
    icon: Package,
  },
  {
    title: "Manage Orders",
    url: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Manage Users",
    url: "/admin/users",
    icon: Users,
  },
]

export function AppSidebar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2 hover:scale-105 transition-transform cursor-pointer">
          <Apple className="h-6 w-6 text-[#FF7A1A] animate-pulse" />
          <span className="font-bold text-lg text-white">
            FreshMart+
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white font-semibold">Grocery Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {customerItems.map((item) => {
                let isActive = false
                if (item.url === '/') {
                  isActive = pathname === '/'
                } else if (item.url.startsWith('/products?category=')) {
                  const categoryFromUrl = item.url.split('?category=')[1]
                  const categoryFromParams = searchParams.get('category')
                  isActive = pathname === '/products' && categoryFromParams === categoryFromUrl
                } else {
                  isActive = pathname === item.url
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`transition-all duration-200 rounded-full px-4 py-2 font-medium`}
                    >
                      <Link href={item.url}>
                        <item.icon className="transition-all duration-200" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {user && (
          <>
            <SidebarSeparator className="bg-white/20" />
            <SidebarGroup>
              <SidebarGroupLabel className="text-white font-semibold">Account</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {userItems.map((item) => {
                    const isActive = pathname === item.url
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          className={`transition-all duration-200 rounded-full px-4 py-2 font-medium`}
                        >
                          <Link href={item.url}>
                            <item.icon className="transition-all duration-200" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}

        {user?.isAdmin && (
          <>
            <SidebarSeparator className="bg-white/20" />
            <SidebarGroup>
              <SidebarGroupLabel className="text-white font-semibold">Admin</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminItems.map((item) => {
                    const isActive = pathname === item.url
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          className={`transition-all duration-200 rounded-full px-4 py-2 font-medium`}
                        >
                          <Link href={item.url}>
                            <item.icon className="transition-all duration-200" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>

      <SidebarFooter>
        {user ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex flex-col gap-2 p-2">
                <div className="text-sm p-2 rounded-lg bg-white/10 border border-white/20">
                  <div className="font-medium text-white">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-white/60 text-xs">{user.email}</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="w-full text-white hover:scale-105 transition-all duration-200 border-white/30 hover:bg-white/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="text-white hover:scale-105 transition-transform hover:bg-white/10">
                <Link href="/auth/login">
                  <LogIn />
                  <span>Login</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
