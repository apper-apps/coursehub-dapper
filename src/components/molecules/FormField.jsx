import React from "react"
import Label from "@/components/atoms/Label"
import Input from "@/components/atoms/Input"
import Textarea from "@/components/atoms/Textarea"
import { cn } from "@/utils/cn"

export default function FormField({ 
  label, 
  type = "text", 
  error, 
  required,
  className,
  ...props 
}) {
  const Component = type === "textarea" ? Textarea : Input

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <Component
        type={type === "textarea" ? undefined : type}
        className={error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}