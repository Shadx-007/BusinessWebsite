"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Heart, Clock, Zap } from 'lucide-react'
import Image from "next/image"

const offersData = {
  daily: [
    { id: 1, name: "Fresh Bananas", original: 4.99, deal: 2.99, discount: 40, image: "/placeholder.svg?key=d1", timer: "8h 22m" },
    { id: 2, name: "Organic Tomatoes", original: 3.49, deal: 1.99, discount: 43, image: "/placeholder.svg?key=d2", timer: "5h 15m" },
    { id: 3, name: "Whole Milk", original: 3.29, deal: 2.49, discount: 24, image: "/placeholder.svg?key=d3", timer: "3h 48m" },
    { id: 4, name: "Butter Premium", original: 6.49, deal: 4.99, discount: 23, image: "/placeholder.svg?key=d4", timer: "6h 30m" },
  ],
  bulk: [
    { id: 5, name: "Basmati Rice 10kg", original: 24.99, deal: 18.99, discount: 24, image: "/placeholder.svg?key=d5", extra: "Buy 2 Get 1 Free" },
    { id: 6, name: "Cooking Oil (4L Pack)", original: 27.99, deal: 19.99, discount: 29, image: "/placeholder.svg?key=d6", extra: "Bulk Offer" },
    { id: 7, name: "Wheat Flour (10kg)", original: 17.99, deal: 13.49, discount: 25, image: "/placeholder.svg?key=d7", extra: "Combo Deal" },
    { id: 8, name: "Lentils Pack (5kg)", original: 14.99, deal: 10.99, discount: 27, image: "/placeholder.svg?key=d8", extra: "Bulk Offer" },
  ],
  seasonal: [
    { id: 9, name: "Summer Fruits Basket", original: 19.99, deal: 12.99, discount: 35, image: "/placeholder.svg?key=d9", event: "Summer Special" },
    { id: 10, name: "Monsoon Vegetables", original: 16.99, deal: 10.99, discount: 35, image: "/placeholder.svg?key=d10", event: "Seasonal" },
    { id: 11, name: "Winter Greens Bundle", original: 14.99, deal: 9.99, discount: 33, image: "/placeholder.svg?key=d11", event: "Limited Time" },
    { id: 12, name: "Festival Feast Pack", original: 34.99, deal: 24.99, discount: 29, image: "/placeholder.svg?key=d12", event: "Holiday Special" },
  ],
}

export default function OffersPage() {
  const [activeTab, setActiveTab] = useState("daily")

  const offers = offersData[activeTab as keyof typeof offersData]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-balance">Exclusive Offers & Deals</h1>
        <p className="text-muted-foreground text-lg">Save big on your favorite groceries with our limited-time offers</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full max-w-md">
          <TabsTrigger value="daily" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Daily Deals
          </TabsTrigger>
          <TabsTrigger value="bulk" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Bulk Offers
          </TabsTrigger>
          <TabsTrigger value="seasonal" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Seasonal
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offers.map((offer) => (
              <Card key={offer.id} className="group hover:shadow-xl transition-all">
                <CardHeader className="p-0 relative">
                  <div className="relative overflow-hidden rounded-t-lg bg-gradient-to-br from-red-50 to-orange-50">
                    <Image
                      src={offer.image || "/placeholder.svg"}
                      alt={offer.name}
                      width={200}
                      height={200}
                      className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                      {offer.discount}% OFF
                    </Badge>
                    {"timer" in offer && (
                      <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {offer.timer}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-base mb-2 line-clamp-2">{offer.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-green-600">${offer.deal.toFixed(2)}</span>
                      <span className="text-lg text-muted-foreground line-through">${offer.original.toFixed(2)}</span>
                    </div>
                    {"extra" in offer && (
                      <p className="text-xs font-semibold text-secondary bg-secondary/10 px-2 py-1 rounded w-fit">
                        {offer.extra}
                      </p>
                    )}
                    {"event" in offer && (
                      <p className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded w-fit">
                        {offer.event}
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add Deal
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offers.map((offer) => (
              <Card key={offer.id} className="group hover:shadow-xl transition-all">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="relative overflow-hidden rounded-lg flex-shrink-0">
                      <Image
                        src={offer.image || "/placeholder.svg"}
                        alt={offer.name}
                        width={120}
                        height={120}
                        className="rounded-lg object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="font-bold text-lg line-clamp-2">{offer.name}</h3>
                        <Badge className="mt-2 bg-secondary text-secondary-foreground">
                          {"extra" in offer ? offer.extra : ""}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-600">${offer.deal.toFixed(2)}</span>
                        <span className="text-muted-foreground line-through">${offer.original.toFixed(2)}</span>
                      </div>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-sm" size="sm">
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Add to Cart
                      </Button>
                    </div>
                    <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                      {offer.discount}%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="seasonal" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <Card key={offer.id} className="group hover:shadow-xl transition-all overflow-hidden">
                <div className="relative overflow-hidden h-40 bg-gradient-to-br from-yellow-50 to-orange-50">
                  <Image
                    src={offer.image || "/placeholder.svg"}
                    alt={offer.name}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    {offer.discount}% OFF
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <p className="text-xs font-semibold text-accent mb-2">{"event" in offer ? offer.event : ""}</p>
                  <h3 className="font-bold text-lg mb-3 line-clamp-2">{offer.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-green-600">${offer.deal.toFixed(2)}</span>
                    <span className="text-muted-foreground line-through">${offer.original.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Shop Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Info Section */}
      <Card className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardContent className="p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Zap className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-bold mb-1">Flash Deals</h3>
              <p className="text-sm text-muted-foreground">Limited stock, crazy discounts ending soon</p>
            </div>
            <div className="text-center">
              <Heart className="h-8 w-8 mx-auto mb-2 text-secondary" />
              <h3 className="font-bold mb-1">Save & Share</h3>
              <p className="text-sm text-muted-foreground">Add to wishlist and share with friends for extra savings</p>
            </div>
            <div className="text-center">
              <ShoppingCart className="h-8 w-8 mx-auto mb-2 text-accent" />
              <h3 className="font-bold mb-1">Bulk Savings</h3>
              <p className="text-sm text-muted-foreground">Buy more, save more with our bulk offers</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
