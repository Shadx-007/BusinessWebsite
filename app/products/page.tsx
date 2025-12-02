"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Star, ShoppingCart, Heart, Filter } from 'lucide-react'
import Image from "next/image"

const groceryProducts = [
  // Fresh Fruits
  {
    id: 1,
    name: "Fresh Bananas",
    price: 2.99,
    originalPrice: 4.99,
    weight: "1 kg",
    rating: 4.5,
    reviews: 234,
    image: "/fresh-bananas.jpg",
    category: "Fresh Fruits",
    inStock: true,
  },
  {
    id: 2,
    name: "Red Apples",
    price: 4.49,
    originalPrice: 5.99,
    weight: "1 kg",
    rating: 4.7,
    reviews: 189,
    image: "/red-apples.jpg",
    category: "Fresh Fruits",
    inStock: true,
  },
  {
    id: 3,
    name: "Green Grapes",
    price: 5.99,
    originalPrice: 7.99,
    weight: "500g",
    rating: 4.6,
    reviews: 156,
    image: "/green-grapes.jpg",
    category: "Fresh Fruits",
    inStock: true,
  },
  {
    id: 4,
    name: "Fresh Oranges",
    price: 3.49,
    originalPrice: 4.99,
    weight: "1 kg",
    rating: 4.4,
    reviews: 120,
    image: "/fresh-oranges.jpg",
    category: "Fresh Fruits",
    inStock: true,
  },
  // Vegetables
  {
    id: 5,
    name: "Organic Tomatoes",
    price: 1.99,
    originalPrice: 3.49,
    weight: "500g",
    rating: 4.5,
    reviews: 267,
    image: "/organic-tomatoes.jpg",
    category: "Vegetables",
    inStock: true,
  },
  {
    id: 6,
    name: "Fresh Potatoes",
    price: 1.49,
    originalPrice: 2.49,
    weight: "1 kg",
    rating: 4.3,
    reviews: 198,
    image: "/fresh-potatoes.jpg",
    category: "Vegetables",
    inStock: true,
  },
  {
    id: 7,
    name: "Yellow Onions",
    price: 0.99,
    originalPrice: 1.49,
    weight: "500g",
    rating: 4.2,
    reviews: 145,
    image: "/yellow-onions.jpg",
    category: "Vegetables",
    inStock: true,
  },
  {
    id: 8,
    name: "Fresh Spinach",
    price: 2.49,
    originalPrice: 3.99,
    weight: "300g",
    rating: 4.6,
    reviews: 89,
    image: "/fresh-spinach.jpg",
    category: "Vegetables",
    inStock: true,
  },
  // Dairy
  {
    id: 9,
    name: "Whole Milk",
    price: 2.49,
    originalPrice: 3.29,
    weight: "1 Liter",
    rating: 4.7,
    reviews: 312,
    image: "/whole-milk.jpg",
    category: "Dairy",
    inStock: true,
  },
  {
    id: 10,
    name: "Butter Premium",
    price: 4.99,
    originalPrice: 6.49,
    weight: "500g",
    rating: 4.8,
    reviews: 178,
    image: "/butter-premium.jpg",
    category: "Dairy",
    inStock: true,
  },
  {
    id: 11,
    name: "Greek Yogurt",
    price: 3.99,
    originalPrice: 5.49,
    weight: "500g",
    rating: 4.6,
    reviews: 234,
    image: "/greek-yogurt.jpg",
    category: "Dairy",
    inStock: true,
  },
  {
    id: 12,
    name: "Cheddar Cheese",
    price: 5.49,
    originalPrice: 7.99,
    weight: "200g",
    rating: 4.5,
    reviews: 156,
    image: "/cheddar-cheese.jpg",
    category: "Dairy",
    inStock: true,
  },
  // Staples
  {
    id: 13,
    name: "Basmati Rice",
    price: 4.99,
    originalPrice: 6.49,
    weight: "2 kg",
    rating: 4.6,
    reviews: 267,
    image: "/basmati-rice.jpg",
    category: "Staples",
    inStock: true,
  },
  {
    id: 14,
    name: "Whole Wheat Flour (Atta)",
    price: 3.49,
    originalPrice: 4.99,
    weight: "5 kg",
    rating: 4.5,
    reviews: 189,
    image: "/wheat-flour.jpg",
    category: "Staples",
    inStock: true,
  },
  {
    id: 15,
    name: "Lentils (Dal)",
    price: 2.99,
    originalPrice: 3.99,
    weight: "1 kg",
    rating: 4.4,
    reviews: 134,
    image: "/lentils-dal.jpg",
    category: "Staples",
    inStock: true,
  },
  {
    id: 16,
    name: "Cooking Oil",
    price: 6.99,
    originalPrice: 8.99,
    weight: "1 Liter",
    rating: 4.7,
    reviews: 278,
    image: "/cooking-oil.jpg",
    category: "Staples",
    inStock: true,
  },
  // Snacks
  {
    id: 17,
    name: "Potato Chips",
    price: 1.99,
    originalPrice: 2.99,
    weight: "150g",
    rating: 4.3,
    reviews: 145,
    image: "/potato-chips.jpg",
    category: "Snacks",
    inStock: true,
  },
  {
    id: 18,
    name: "Digestive Biscuits",
    price: 1.49,
    originalPrice: 2.49,
    weight: "200g",
    rating: 4.5,
    reviews: 198,
    image: "/digestive-biscuits.jpg",
    category: "Snacks",
    inStock: true,
  },
  {
    id: 19,
    name: "Dark Chocolate",
    price: 2.49,
    originalPrice: 3.99,
    weight: "100g",
    rating: 4.8,
    reviews: 267,
    image: "/dark-chocolate.jpg",
    category: "Snacks",
    inStock: true,
  },
  {
    id: 20,
    name: "Granola Bar Pack",
    price: 3.99,
    originalPrice: 5.49,
    weight: "250g",
    rating: 4.6,
    reviews: 112,
    image: "/granola-bar.jpg",
    category: "Snacks",
    inStock: true,
  },
  // Beverages
  {
    id: 21,
    name: "Orange Juice",
    price: 2.99,
    originalPrice: 3.99,
    weight: "1 Liter",
    rating: 4.5,
    reviews: 189,
    image: "/vibrant-orange-juice.png",
    category: "Beverages",
    inStock: true,
  },
  {
    id: 22,
    name: "Cola Soda",
    price: 1.99,
    originalPrice: 2.99,
    weight: "1.5 Liter",
    rating: 4.2,
    reviews: 156,
    image: "/cola-soda.jpg",
    category: "Beverages",
    inStock: true,
  },
  {
    id: 23,
    name: "Masala Tea",
    price: 5.99,
    originalPrice: 7.99,
    weight: "250g",
    rating: 4.7,
    reviews: 234,
    image: "/placeholder.svg?height=300&width=300",
    category: "Beverages",
    inStock: true,
  },
  {
    id: 24,
    name: "Instant Coffee",
    price: 4.99,
    originalPrice: 6.99,
    weight: "100g",
    rating: 4.6,
    reviews: 178,
    image: "/placeholder.svg?height=300&width=300",
    category: "Beverages",
    inStock: true,
  },
]

const categories = ["Fresh Fruits", "Vegetables", "Dairy", "Staples", "Snacks", "Beverages"]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 15])
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = groceryProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    return matchesSearch && matchesCategory && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.id - a.id
      default:
        return 0
    }
  })

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-primary">Filters</h3>

            {/* Search */}
            <div className="space-y-2">
              <Label>Search Products</Label>
              <Input placeholder="Search groceries..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <Label>Categories</Label>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                    />
                    <Label htmlFor={category} className="text-sm font-normal">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <Label>Price Range</Label>
              <div className="px-2">
                <Slider value={priceRange} onValueChange={setPriceRange} max={15} step={0.5} className="w-full" />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>${priceRange[0].toFixed(2)}</span>
                  <span>${priceRange[1].toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold">Fresh Groceries</h1>
              <p className="text-muted-foreground">{sortedProducts.length} products found</p>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-110"
                    />
                    <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Badge>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-1 line-clamp-2">{product.name}</CardTitle>
                  <p className="text-sm font-medium text-muted-foreground mb-2">{product.weight}</p>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group-hover:scale-105 transition-transform">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
