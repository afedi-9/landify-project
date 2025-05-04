"use client"

import React from "react"
import { cn } from "../../lib/utils"

const Switch = React.forwardRef(({ className, checked, ...props }, ref) => {
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
    <button
      ref={ref}
      role="switch"
      aria-checked={isChecked}
      data-state={isChecked ? "checked" : "unchecked"}
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        isChecked ? "bg-primary" : "bg-input",
        className,
      )}
      onClick={() => setIsChecked(!isChecked)}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
          isChecked ? "translate-x-5" : "translate-x-0",
        )}
      />
    </button>
  )
})
Switch.displayName = "Switch"

export { Switch }
