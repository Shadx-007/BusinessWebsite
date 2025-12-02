"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart, ArrowRight, Sparkles, Leaf } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { RotatingLogo } from "@/components/rotating-logo"
import { FloatingIcons } from "@/components/floating-icons"
import { products } from "@/lib/products"
import { CouponsSection } from "@/components/coupons-section"

const groceryBanners = [
  { name: "Fresh Fruits", icon: "🍎", color: "from-green-400 to-green-600" },
  { name: "Vegetables", icon: "🥗", color: "from-lime-400 to-green-600" },
  { name: "Daily Essentials", icon: "🛒", color: "from-yellow-400 to-orange-500" },
  { name: "Best Offers", icon: "🏷️", color: "from-orange-400 to-red-500" },
]

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const [dailyDeals, setDailyDeals] = useState<typeof products>([])
  const [recommendedProducts, setRecommendedProducts] = useState<typeof products>([])

  useEffect(() => {
    setIsVisible(true)
    setDailyDeals(products.slice(0, 8))
    setRecommendedProducts(products.slice(8, 16))
  }, [])

  return (
    <div className="space-y-8">
      {/* Premium Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2E8B57] via-emerald-500 to-teal-600 text-white overflow-hidden min-h-[600px]">
        <div className="absolute inset-0 bg-black/10"></div>
        <FloatingIcons />

        <div className="container mx-auto px-4 py-16 md:py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div
              className={`space-y-6 transform transition-all duration-1000 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-6 w-6 text-[#FF7A1A] animate-pulse" />
                <span className="text-[#FF7A1A] font-medium text-lg">Freshness Delivered Daily</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight text-balance">
                FreshMart+
                <br />
                <span className="bg-gradient-to-r from-[#FF7A1A] to-yellow-300 bg-clip-text text-transparent">
                  Freshness Delivered Daily
                </span>
              </h1>
              <p className="text-xl md:text-2xl opacity-90 text-balance">
                Shop fruits, vegetables, dairy, and essentials in one place. Premium quality groceries with lightning-fast delivery to your doorstep.
              </p>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-[#FF7A1A] text-white hover:bg-[#E86B09] font-semibold shadow-lg transform hover:scale-105 transition-all duration-200 group text-lg"
                  asChild
                >
                  <Link href="/products">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white/50 hover:bg-white/10 backdrop-blur-sm transform hover:scale-105 transition-all duration-200"
                >
                  Learn More
                </Button>
              </div>
            </div>

            <div
              className={`relative flex justify-center transform transition-all duration-1000 delay-300 ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A1A] to-orange-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <RotatingLogo />
            </div>
          </div>
        </div>
      </section>

      {/* Grocery Categories Banners */}
      <section className="container mx-auto px-4">
        <div
          className={`text-center mb-8 transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
          <p className="text-muted-foreground">Browse our fresh grocery categories</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {groceryBanners.map((banner, index) => (
            <Card
              key={banner.name}
              className={`hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 overflow-hidden ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`bg-gradient-to-br ${banner.color} p-6 text-white text-center min-h-[150px] flex flex-col items-center justify-center`}>
                <div className="text-4xl mb-2">{banner.icon}</div>
                <h3 className="font-semibold text-lg">{banner.name}</h3>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Daily Deals Section */}
      <section className="container mx-auto px-4">
        <div
          className={`flex justify-between items-center mb-8 transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div>
            <h2 className="text-3xl font-bold mb-2">Today's Daily Deals</h2>
            <p className="text-muted-foreground">Limited time offers on fresh items</p>
          </div>
          <Button variant="outline" className="hover:scale-105 transition-transform" asChild>
            <Link href="/products">View All</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dailyDeals.map((product, index) => (
            <Card
              key={product.id}
              className={`group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                hoveredProduct === product.id ? "shadow-2xl ring-2 ring-[#2E8B57]" : ""
              } ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-110"
                  />
                  <Badge className="absolute top-2 left-2 bg-[#FF7A1A] text-white font-semibold">
                    {product.discount}% OFF
                  </Badge>
                  <Button
                    size="icon"
                    variant="secondary"
                    className={`absolute top-2 right-2 transition-all duration-300 ${
                      hoveredProduct === product.id ? "opacity-100 scale-110" : "opacity-0 scale-90"
                    }`}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-2">{product.category}</div>
                <CardTitle className="text-lg mb-2 line-clamp-2 group-hover:text-[#2E8B57] transition-colors">
                  {product.name}
                </CardTitle>
                <div className="text-sm font-medium text-muted-foreground mb-2">{product.weight}</div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-[#2E8B57]">${product.price.toFixed(2)}</span>
                  <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full bg-[#2E8B57] hover:bg-[#1F5F3F] transition-all duration-200 transform hover:scale-105">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Recommended For You */}
      <section className="container mx-auto px-4">
        <div
          className={`flex justify-between items-center mb-8 transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div>
            <h2 className="text-3xl font-bold mb-2">Recommended For You</h2>
            <p className="text-muted-foreground">Popular items picked just for you</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts.map((product, index) => (
            <Card
              key={product.id}
              className={`group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                hoveredProduct === product.id ? "shadow-2xl ring-2 ring-[#FF7A1A]" : ""
              } ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-110"
                  />
                  <Badge className="absolute top-2 left-2 bg-[#FF7A1A] text-white">{product.discount}% OFF</Badge>
                  <Button
                    size="icon"
                    variant="secondary"
                    className={`absolute top-2 right-2 transition-all duration-300 ${
                      hoveredProduct === product.id ? "opacity-100 scale-110" : "opacity-0 scale-90"
                    }`}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2 line-clamp-2 group-hover:text-[#FF7A1A] transition-colors">
                  {product.name}
                </CardTitle>
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">({product.rating.toFixed(1)})</span>
                </div>
                <div className="text-sm font-medium text-muted-foreground mb-2">{product.weight}</div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-[#2E8B57]">${product.price.toFixed(2)}</span>
                  <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full bg-[#FF7A1A] hover:bg-[#E86B09] transition-all duration-200 transform hover:scale-105">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Coupons Section */}
      <CouponsSection />

      {/* Newsletter Section */}
      <section className="bg-[#F6FFF7] border-t-2 border-[#2E8B57]">
        <div className="container mx-auto px-4 py-16">
          <div
            className={`grid md:grid-cols-2 gap-8 items-center transform transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div>
              <h2 className="text-3xl font-bold mb-4">Weekly Offers & Discounts</h2>
              <p className="text-muted-foreground mb-6">
                Subscribe to our newsletter and get exclusive deals, fresh picks, and organic products straight to your inbox.
              </p>
              <div className="flex gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-md border border-input bg-card transition-all duration-200 focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                />
                <Button className="bg-[#2E8B57] hover:bg-[#1F5F3F]">Subscribe</Button>
              </div>
            </div>
            <div>
              <Image
                src="/grocery-shopping-bags.jpg"
                alt="Weekly Offers"
                width={400}
                height={300}
                className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
