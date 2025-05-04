"use client"

import React from "react"
import { cn } from "../../lib/utils"
import { X } from "lucide-react"

const Sheet = ({ children, open, onOpenChange }) => {
  return <div className={cn("fixed inset-0 z-50", open ? "block" : "hidden")}>{children}</div>
}

const SheetTrigger = ({ children, onClick }) => {
  return React.cloneElement(children, { onClick })
}

const SheetContent = ({ children, className, side = "right", onClose }) => {
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} />
      <div
        className={cn(
          "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out",
          {
            "inset-y-0 right-0 h-full w-3/4 sm:max-w-sm": side === "right",
            "inset-y-0 left-0 h-full w-3/4 sm:max-w-sm": side === "left",
            "inset-x-0 top-0 h-auto": side === "top",
            "inset-x-0 bottom-0 h-auto": side === "bottom",
          },
          className,
        )}
      >
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button className="rounded-full p-1 hover:bg-muted" onClick={onClose}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  )
}

const SheetHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
)

const SheetTitle = ({ className, ...props }) => (
  <h3 className={cn("text-lg font-semibold text-foreground", className)} {...props} />
)

const SheetDescription = ({ className, ...props }) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
)

const SheetFooter = ({ className, ...props }) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
)

export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription }
