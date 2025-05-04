"use client"

import React from "react"
import { cn } from "../../lib/utils"
import { Check } from "lucide-react"

const Checkbox = React.forwardRef(({ className, checked, ...props }, ref) => {
  const [isChecked, setIsChecked] = React.useState(checked || false)

  React.useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked)
    }
  }, [checked])

  const handleChange = (event) => {
    const newChecked = event.target.checked
    setIsChecked(newChecked)
    if (props.onChange) {
      props.onChange(event)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        ref={ref}
        role="checkbox"
        aria-checked={isChecked}
        data-state={isChecked ? "checked" : "unchecked"}
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          isChecked && "bg-primary text-primary-foreground",
          className,
        )}
        onClick={() => setIsChecked(!isChecked)}
        {...props}
      >
        {isChecked && <Check className="h-4 w-4 text-white" />}
      </button>
    </div>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }
