"use client"

import Link from "next/link"
import { Apple, Facebook, Instagram, Twitter, MessageCircle, Heart } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#F6FFF7] to-white border-t border-[#2E8B57]/10">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Apple className="h-6 w-6 text-[#FF7A1A]" />
              <span className="font-bold text-xl bg-gradient-to-r from-[#2E8B57] to-[#FF7A1A] bg-clip-text text-transparent">
                FreshMart+
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your daily source for fresh, premium quality groceries delivered to your doorstep with care.
            </p>
          </div>

          {/* About Section */}
          <div>
            <h3 className="font-semibold text-[#2E8B57] mb-4">About FreshMart+</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-[#2E8B57] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-[#2E8B57] transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-[#2E8B57] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-[#2E8B57] transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support Section */}
          <div>
            <h3 className="font-semibold text-[#FF7A1A] mb-4">Customer Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-[#FF7A1A] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-[#FF7A1A] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-[#FF7A1A] transition-colors">
                  Delivery Info
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-[#FF7A1A] transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="font-semibold text-[#2E8B57] mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-[#2E8B57] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-[#2E8B57] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-[#2E8B57] transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-[#2E8B57] transition-colors">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Download Section */}
          <div>
            <h3 className="font-semibold text-[#FF7A1A] mb-4">Download App</h3>
            <div className="space-y-2">
              <Button className="w-full bg-[#2E8B57] hover:bg-[#1F5F3F] text-sm h-9 transition-all duration-200 transform hover:scale-105">
                Android
              </Button>
              <Button className="w-full bg-[#2E8B57] hover:bg-[#1F5F3F] text-sm h-9 transition-all duration-200 transform hover:scale-105">
                iOS
              </Button>
            </div>
          </div>
        </div>

        {/* Social Links & Divider */}
        <div className="border-t border-[#2E8B57]/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-muted-foreground">
              © 2025 FreshMart+. All rights reserved. Serving fresh produce to your doorstep.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-[#2E8B57] transition-all duration-200 hover:scale-110"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-[#FF7A1A] transition-all duration-200 hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-[#2E8B57] transition-all duration-200 hover:scale-110"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
