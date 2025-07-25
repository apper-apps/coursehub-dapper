import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "default", 
  className,
  disabled,
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-lg",
    secondary: "bg-white text-secondary-700 border border-secondary-300 hover:bg-secondary-50 hover:border-secondary-400",
    outline: "border-2 border-primary-500 text-primary-600 hover:bg-primary-50",
    ghost: "text-secondary-600 hover:bg-secondary-100",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg"
  }

  const sizes = {
    sm: "px-3 py-2 text-sm",
    default: "px-6 py-3",
    lg: "px-8 py-4 text-lg"
  }

  return (
    <button
      ref={ref}
      className={cn(
        "font-medium rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button