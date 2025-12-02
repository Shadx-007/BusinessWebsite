"use client"

import { useState } from "react"
import { MessageCircle, X } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function FloatingHelpButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        {isOpen && (
          <div className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-[#2E8B57]/10 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-gradient-to-r from-[#2E8B57] to-[#FF7A1A] text-white p-4 flex justify-between items-center">
              <h3 className="font-semibold">FreshMart+ Support</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 rounded-full p-1 transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              <div className="text-sm space-y-2">
                <p className="text-muted-foreground">
                  Hello! How can we help you with your grocery order today?
                </p>
                <div className="space-y-2 mt-4">
                  <button className="w-full text-left px-3 py-2 rounded-lg bg-[#F6FFF7] hover:bg-[#2E8B57]/10 text-sm transition-colors">
                    Track my order
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg bg-[#F6FFF7] hover:bg-[#2E8B57]/10 text-sm transition-colors">
                    Delivery information
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg bg-[#F6FFF7] hover:bg-[#2E8B57]/10 text-sm transition-colors">
                    Return or refund
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg bg-[#F6FFF7] hover:bg-[#2E8B57]/10 text-sm transition-colors">
                    Contact support
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-[#2E8B57] to-[#FF7A1A] hover:from-[#1F5F3F] hover:to-[#E86B09] text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </>
  )
}
