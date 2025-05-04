"use client"
import { cn } from "../../lib/utils"

export function Sheet({ children, open, onOpenChange }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="fixed inset-y-0 right-0 z-50 w-3/4 max-w-sm bg-background p-6 shadow-lg">
        {children}
        <button
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          onClick={() => onOpenChange(false)}
        >
          ✕<span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  )
}

export function SheetContent({ children, className, ...props }) {
  return (
    <div className={cn("h-full flex flex-col", className)} {...props}>
      {children}
    </div>
  )
}
