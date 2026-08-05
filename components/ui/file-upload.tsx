"use client"

import * as React from "react"
import { UploadCloud, X, Loader2, Image as ImageIcon, File as FileIcon } from "lucide-react"
import { StorageService, BucketName } from "../../services/StorageService"

interface FileUploadProps {
  bucket: BucketName
  folder?: string
  value?: string
  onChange: (url: string) => void
  accept?: string
  label?: string
  maxSizeMB?: number
}

export function FileUpload({ 
  bucket, 
  folder, 
  value, 
  onChange, 
  accept = "image/*", 
  label = "Fazer upload",
  maxSizeMB = 5
}: FileUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Verify size
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`O arquivo não pode exceder ${maxSizeMB}MB.`)
      return
    }

    setIsUploading(true)
    try {
      const url = await StorageService.uploadFile(bucket, file, folder)
      onChange(url)
    } catch (err: any) {
      alert("Falha no upload: " + err.message)
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleRemove = async () => {
    if (!value) return
    try {
      // Opcional: deletar o arquivo antigo do storage
      // await StorageService.deleteFile(bucket, value)
      onChange("")
    } catch (err) {
      console.error("Erro ao remover:", err)
    }
  }

  const isImage = value && (value.match(/\.(jpeg|jpg|gif|png|webp)/i) || accept.includes("image"))

  return (
    <div className="space-y-3">
      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-[#2A2A2A] bg-[#121212] aspect-video max-w-sm flex flex-col items-center justify-center">
          {isImage ? (
            <img src={value} alt="Uploaded preview" className="w-full h-full object-cover" />
          ) : (
            <div className="p-6 text-center space-y-2 text-[#D4AF37]">
              <FileIcon className="w-12 h-12 mx-auto" />
              <p className="text-xs break-all px-4 text-gray-400">{value.split('/').pop()}</p>
            </div>
          )}
          
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={handleRemove}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transform scale-90 group-hover:scale-100 transition-all"
              title="Remover arquivo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          className="w-full max-w-sm aspect-video rounded-xl border-2 border-dashed border-[#2A2A2A] hover:border-[#D4AF37] hover:bg-[#1E1E1E]/50 transition-colors flex flex-col items-center justify-center gap-3 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
              <span className="text-sm">Enviando arquivo...</span>
            </>
          ) : (
            <>
              <UploadCloud className="w-10 h-10 mb-2 opacity-50" />
              <div className="text-sm font-medium">{label}</div>
              <div className="text-xs opacity-50">Tamanho máximo: {maxSizeMB}MB</div>
            </>
          )}
        </button>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
      />
    </div>
  )
}
