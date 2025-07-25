import React, { useState, useRef } from "react"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

export default function RichTextEditor({ value, onChange, className }) {
  const [showImageUrl, setShowImageUrl] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const editorRef = useRef(null)

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value)
    editorRef.current.focus()
  }

  const insertImage = () => {
    if (imageUrl.trim()) {
      execCommand("insertImage", imageUrl)
      setImageUrl("")
      setShowImageUrl(false)
    }
  }

  const handleContentChange = () => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML)
    }
  }

  return (
    <div className={cn("border border-secondary-300 rounded-lg overflow-hidden", className)}>
      {/* Toolbar */}
      <div className="bg-secondary-50 border-b border-secondary-300 p-3 flex flex-wrap gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => execCommand("bold")}
          className="p-2"
        >
          <ApperIcon name="Bold" className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => execCommand("italic")}
          className="p-2"
        >
          <ApperIcon name="Italic" className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => execCommand("underline")}
          className="p-2"
        >
          <ApperIcon name="Underline" className="w-4 h-4" />
        </Button>
        
        <div className="w-px bg-secondary-300 mx-2"></div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => execCommand("formatBlock", "<h1>")}
          className="px-3 py-2 text-sm"
        >
          H1
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => execCommand("formatBlock", "<h2>")}
          className="px-3 py-2 text-sm"
        >
          H2
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => execCommand("formatBlock", "<p>")}
          className="px-3 py-2 text-sm"
        >
          P
        </Button>
        
        <div className="w-px bg-secondary-300 mx-2"></div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => execCommand("insertUnorderedList")}
          className="p-2"
        >
          <ApperIcon name="List" className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => execCommand("insertOrderedList")}
          className="p-2"
        >
          <ApperIcon name="ListOrdered" className="w-4 h-4" />
        </Button>
        
        <div className="w-px bg-secondary-300 mx-2"></div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowImageUrl(!showImageUrl)}
          className="p-2"
        >
          <ApperIcon name="Image" className="w-4 h-4" />
        </Button>
      </div>

      {/* Image URL Input */}
      {showImageUrl && (
        <div className="bg-secondary-50 border-b border-secondary-300 p-3 flex gap-2">
          <input
            type="url"
            placeholder="Enter image URL..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="flex-1 px-3 py-2 border border-secondary-300 rounded-md text-sm"
          />
          <Button size="sm" onClick={insertImage}>
            Insert
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowImageUrl(false)}>
            Cancel
          </Button>
        </div>
      )}

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="editor-content p-4 min-h-[300px] focus:outline-none"
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={handleContentChange}
        onBlur={handleContentChange}
      />
    </div>
  )
}