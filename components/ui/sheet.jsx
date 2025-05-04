"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Sheet = React.forwardRef(({ className, children, open, onOpenChange, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("fixed inset-0 z-50", { hidden: !open }, className)} {...props}>
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange?.(false)} />
      {children}
    </div>
  )
})
Sheet.displayName = "Sheet"

const SheetContent = React.forwardRef(({ className, children, side = "right", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "fixed z-50 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
        {
          "inset-y-0 right-0 h-full w-3/4 sm:max-w-sm data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right":
            side === "right",
          "inset-y-0 left-0 h-full w-3/4 sm:max-w-sm data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left":
            side === "left",
        },
        className,
      )}
      {...props}
    >
      <button
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        onClick={() => props.onOpenChange?.(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
        <span className="sr-only">Close</span>
      </button>
      {children}
    </div>
  )
})
SheetContent.displayName = "SheetContent"

export { Sheet, SheetContent }
