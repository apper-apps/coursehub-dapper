import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Textarea = forwardRef(({ 
  className,
  ...props 
}, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "input-field resize-vertical min-h-[120px]",
        className
      )}
      {...props}
    />
  )
})

Textarea.displayName = "Textarea"

export default Textarea