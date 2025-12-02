"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

interface CartItem {
  id: number
  name: string
  price: number
  weight: string
  quantity: number
  image: string
  inStock: boolean
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Fresh Bananas",
    price: 2.99,
    weight: "1 kg",
    quantity: 2,
    image: "/placeholder.svg?height=100&width=100",
    inStock: true,
  },
  {
    id: 9,
    name: "Whole Milk",
    price: 2.49,
    weight: "1 Liter",
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
    inStock: true,
  },
  {
    id: 13,
    name: "Basmati Rice",
    price: 4.99,
    weight: "2 kg",
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
    inStock: true,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [removingItem, setRemovingItem] = useState<number | null>(null)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setRemovingItem(id)
    setTimeout(() => {
      setCartItems((items) => items.filter((item) => item.id !== id))
      setRemovingItem(null)
    }, 300)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = subtotal > 50 ? 0 : 4.99
  const tax = subtotal * 0.08
  const total = subtotal + deliveryFee + tax

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <ShoppingBag className="h-16 w-16 mx-auto mb-6 text-muted-foreground opacity-50" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Start adding fresh groceries to your cart!</p>
          <Button className="hover:scale-105 transition-transform bg-primary hover:bg-primary/90" asChild>
            <Link href="/products">Browse Groceries</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item, index) => (
            <Card
              key={item.id}
              className={`transition-all duration-300 hover:shadow-lg ${
                removingItem === item.id ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="relative overflow-hidden rounded-lg">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.weight}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive hover:scale-110 transition-all duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <p className="text-2xl font-bold text-primary">${item.price.toFixed(2)}</p>

                    {!item.inStock && <p className="text-destructive text-sm">Out of stock</p>}

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="hover:scale-110 transition-transform"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>

                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                        className="w-20 text-center"
                        min="1"
                      />

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="hover:scale-110 transition-transform"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className={`font-semibold ${deliveryFee === 0 ? "text-green-600" : ""}`}>
                    {deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Input
                  placeholder="Enter coupon code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button variant="outline" className="w-full hover:scale-105 transition-transform">
                  Apply Coupon
                </Button>
              </div>

              {deliveryFee > 0 && (
                <div className="p-3 bg-accent/10 rounded-lg border border-accent/30">
                  <p className="text-sm text-accent-foreground">Add ${(50 - subtotal).toFixed(2)} more for free delivery!</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button
                className="w-full hover:scale-105 transition-transform bg-primary hover:bg-primary/90 text-primary-foreground"
                size="lg"
              >
                Proceed to Checkout
              </Button>
              <Button variant="outline" className="w-full hover:scale-105 transition-transform" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
