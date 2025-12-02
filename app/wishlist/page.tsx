"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

interface WishlistItem {
  id: number
  name: string
  price: number
  originalPrice: number
  weight: string
  image: string
  category: string
  addedDate: string
}

const initialWishlist: WishlistItem[] = [
  {
    id: 2,
    name: "Red Apples",
    price: 4.49,
    originalPrice: 5.99,
    weight: "1 kg",
    image: "/placeholder.svg?key=a1",
    category: "Fresh Fruits",
    addedDate: "2 days ago",
  },
  {
    id: 10,
    name: "Butter Premium",
    price: 4.99,
    originalPrice: 6.49,
    weight: "500g",
    image: "/placeholder.svg?key=a2",
    category: "Dairy",
    addedDate: "1 week ago",
  },
  {
    id: 16,
    name: "Cooking Oil",
    price: 6.99,
    originalPrice: 8.99,
    weight: "1 Liter",
    image: "/placeholder.svg?key=a3",
    category: "Staples",
    addedDate: "3 days ago",
  },
]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(initialWishlist)
  const [removingItem, setRemovingItem] = useState<number | null>(null)

  const removeFromWishlist = (id: number) => {
    setRemovingItem(id)
    setTimeout(() => {
      setWishlistItems((items) => items.filter((item) => item.id !== id))
      setRemovingItem(null)
    }, 300)
  }

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0)

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <Heart className="h-16 w-16 mx-auto mb-6 text-muted-foreground opacity-50" />
          <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-6">Add items to your wishlist to save them for later!</p>
          <Button className="hover:scale-105 transition-transform bg-primary hover:bg-primary/90" asChild>
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
        <p className="text-muted-foreground">{wishlistItems.length} items saved</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {wishlistItems.map((item) => (
            <Card
              key={item.id}
              className={`group hover:shadow-lg transition-all duration-300 ${
                removingItem === item.id ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="relative overflow-hidden rounded-lg">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={120}
                      height={120}
                      className="rounded-lg object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <Badge variant="outline">{item.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Added {item.addedDate}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromWishlist(item.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">${item.price.toFixed(2)}</span>
                      <span className="text-sm text-muted-foreground line-through">${item.originalPrice.toFixed(2)}</span>
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                        {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground">{item.weight}</p>

                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group-hover:scale-105 transition-transform">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Wishlist Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-muted-foreground text-sm">Total items</p>
                <p className="text-2xl font-bold">{wishlistItems.length}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total value</p>
                <p className="text-2xl font-bold text-primary">${totalValue.toFixed(2)}</p>
              </div>
              <div className="pt-4 border-t">
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground group-hover:scale-105 transition-transform">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add All to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
