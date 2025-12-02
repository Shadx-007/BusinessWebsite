"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { SearchIcon, ShoppingCart, Heart } from 'lucide-react'
import Image from "next/image"

const allGroceries = [
  { id: 1, name: "Fresh Bananas", price: 2.99, weight: "1 kg", category: "Fruits", image: "/placeholder.svg?key=1" },
  { id: 2, name: "Red Apples", price: 4.49, weight: "1 kg", category: "Fruits", image: "/placeholder.svg?key=2" },
  { id: 3, name: "Green Grapes", price: 5.99, weight: "500g", category: "Fruits", image: "/placeholder.svg?key=3" },
  { id: 4, name: "Fresh Oranges", price: 3.49, weight: "1 kg", category: "Fruits", image: "/placeholder.svg?key=4" },
  { id: 5, name: "Organic Tomatoes", price: 1.99, weight: "500g", category: "Vegetables", image: "/placeholder.svg?key=5" },
  { id: 6, name: "Fresh Potatoes", price: 1.49, weight: "1 kg", category: "Vegetables", image: "/placeholder.svg?key=6" },
  { id: 7, name: "Yellow Onions", price: 0.99, weight: "500g", category: "Vegetables", image: "/placeholder.svg?key=7" },
  { id: 8, name: "Fresh Spinach", price: 2.49, weight: "300g", category: "Vegetables", image: "/placeholder.svg?key=8" },
  { id: 9, name: "Whole Milk", price: 2.49, weight: "1 Liter", category: "Dairy", image: "/placeholder.svg?key=9" },
  { id: 10, name: "Butter Premium", price: 4.99, weight: "500g", category: "Dairy", image: "/placeholder.svg?key=10" },
  { id: 11, name: "Greek Yogurt", price: 3.99, weight: "500g", category: "Dairy", image: "/placeholder.svg?key=11" },
  { id: 12, name: "Cheddar Cheese", price: 5.49, weight: "200g", category: "Dairy", image: "/placeholder.svg?key=12" },
  { id: 13, name: "Basmati Rice", price: 4.99, weight: "2 kg", category: "Staples", image: "/placeholder.svg?key=13" },
  { id: 14, name: "Whole Wheat Flour", price: 3.49, weight: "5 kg", category: "Staples", image: "/placeholder.svg?key=14" },
  { id: 15, name: "Lentils (Dal)", price: 2.99, weight: "1 kg", category: "Staples", image: "/placeholder.svg?key=15" },
  { id: 16, name: "Cooking Oil", price: 6.99, weight: "1 Liter", category: "Staples", image: "/placeholder.svg?key=16" },
]

const suggestions = ["fresh bananas", "milk", "rice", "tomatoes", "wheat flour", "cooking oil", "butter"]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)

  const searchResults = allGroceries.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    setShowSuggestions(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl font-bold mb-6 text-center">Search Groceries</h1>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for vegetables, fruits, dairy..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setShowSuggestions(e.target.value.length > 0)
            }}
            onFocus={() => setShowSuggestions(searchQuery.length > 0)}
            className="pl-10 py-6 text-lg"
          />

          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-lg shadow-lg z-10">
              <div className="p-4 space-y-2">
                {suggestions
                  .filter((s) => s.includes(searchQuery.toLowerCase()))
                  .map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="block w-full text-left px-4 py-2 hover:bg-muted rounded-lg transition-colors"
                    >
                      <SearchIcon className="inline h-4 w-4 mr-2 text-muted-foreground" />
                      {suggestion}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {searchQuery && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Search Results{" "}
              <span className="text-muted-foreground text-lg">({searchResults.length} items found)</span>
            </h2>
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {searchResults.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-all">
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={200}
                        height={200}
                        className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground">{item.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-base mb-2 line-clamp-2">{item.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mb-2">{item.weight}</p>
                    <p className="text-2xl font-bold text-primary">${item.price.toFixed(2)}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 gap-2">
                    <Button className="flex-1 bg-primary hover:bg-primary/90">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                    <Button size="icon" variant="outline">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <SearchIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground text-lg">No groceries found. Try searching for something else!</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
