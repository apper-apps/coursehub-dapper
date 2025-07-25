import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Input = forwardRef(({ 
  className,
  type = "text",
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "input-field",
        className
      )}
      {...props}
    />
  )
})

Input.displayName = "Input"

export default Input