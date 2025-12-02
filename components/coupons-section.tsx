"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Ticket, Copy } from 'lucide-react'

interface Coupon {
  id: number
  code: string
  discount: number
  description: string
  minOrder: number
  expiry: string
}

export function CouponsSection() {
  const [coupons] = useState<Coupon[]>([
    {
      id: 1,
      code: "FRESH20",
      discount: 20,
      description: "Get 20% off on all fresh fruits",
      minOrder: 50,
      expiry: "Dec 31, 2024",
    },
    {
      id: 2,
      code: "VEGGIE15",
      discount: 15,
      description: "Get 15% off on organic vegetables",
      minOrder: 30,
      expiry: "Dec 25, 2024",
    },
    {
      id: 3,
      code: "DAIRY25",
      discount: 25,
      description: "Get 25% off on dairy products",
      minOrder: 40,
      expiry: "Dec 28, 2024",
    },
    {
      id: 4,
      code: "WELCOME10",
      discount: 10,
      description: "First order welcome discount",
      minOrder: 20,
      expiry: "Dec 31, 2024",
    },
  ])

  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Ticket className="h-6 w-6 text-[#FF7A1A]" />
          <h2 className="text-3xl font-bold">Active Coupons & Offers</h2>
        </div>
        <p className="text-muted-foreground">Scratch & grab amazing discounts on your orders</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coupons.map((coupon) => (
          <Card
            key={coupon.id}
            className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-2 border-[#FF7A1A]/20 hover:border-[#FF7A1A]"
          >
            <CardHeader className="bg-gradient-to-r from-[#2E8B57]/5 to-[#FF7A1A]/5 pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <Badge className="bg-[#FF7A1A] text-white mb-2 text-lg px-3 py-1">
                    {coupon.discount}% OFF
                  </Badge>
                  <CardTitle className="text-lg">{coupon.description}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Code:</span>
                  <code className="bg-[#F6FFF7] px-3 py-1 rounded font-mono text-sm font-bold text-[#2E8B57]">
                    {coupon.code}
                  </code>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Min Order:</span>
                  <span className="font-semibold">${coupon.minOrder}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Expires:</span>
                  <span className="font-semibold text-[#FF7A1A]">{coupon.expiry}</span>
                </div>
                <Button
                  onClick={() => handleCopy(coupon.code)}
                  className="w-full mt-4 bg-[#2E8B57] hover:bg-[#1F5F3F] text-white transition-all duration-200"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {copiedCode === coupon.code ? "Copied!" : "Copy Code"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
