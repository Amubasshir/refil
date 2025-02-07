import type React from "react"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FileUploaderProps {
  onFileSelect: (file: File) => void
  acceptedFileTypes: string
  maxFileSize: number
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect, acceptedFileTypes, maxFileSize }) => {
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > maxFileSize) {
        setError(`File size should not exceed ${maxFileSize / (1024 * 1024)}MB`)
      } else {
        setError(null)
        onFileSelect(file)
      }
    }
  }

  return (
    <div>
      <Input type="file" onChange={handleFileInput} accept={acceptedFileTypes} ref={fileInputRef} className="hidden" />
      <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
        Upload File
      </Button>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

