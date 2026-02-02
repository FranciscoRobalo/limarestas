"use client"

import type React from "react"

import { useRef } from "react"
import { Upload, FileText, Trash2, Download, File, ImageIcon, FileSpreadsheet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useDocumentos } from "@/hooks/use-documentos"
import { useState } from "react"

export function DocumentsSection() {
  const { documentos, addDocumento, deleteDocumento } = useDocumentos()

  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    processFiles(droppedFiles)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      processFiles(selectedFiles)
    }
  }

  const processFiles = (newFiles: File[]) => {
    newFiles.forEach((file) => {
      addDocumento(file)
    })
  }

  const handleDeleteFile = (id: string) => {
    deleteDocumento(id)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return ImageIcon
    if (type.includes("spreadsheet") || type.includes("excel")) return FileSpreadsheet
    if (type.includes("pdf")) return FileText
    return File
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif text-foreground mb-2">Consulta de Contas</h2>
        <p className="text-muted-foreground">Consulte faturas, recibos e documentos financeiros do seu projeto.</p>
      </div>

      {/* Upload area */}
      <Card>
        <CardHeader>
          <CardTitle>Carregar ficheiros</CardTitle>
          <CardDescription>Arraste e solte os seus ficheiros aqui ou clique para selecionar.</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
              transition-colors duration-200
              ${isDragging ? "border-accent bg-accent/5" : "border-border hover:border-accent/50 hover:bg-secondary/50"}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.gif"
            />
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-accent" />
            </div>
            <p className="text-foreground font-medium mb-2">Arraste ficheiros aqui</p>
            <p className="text-sm text-muted-foreground mb-4">ou clique para selecionar</p>
            <p className="text-xs text-muted-foreground">PDF, DOC, XLS, PNG, JPG até 10MB</p>
          </div>
        </CardContent>
      </Card>

      {/* Files list */}
      {documentos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Ficheiros carregados</CardTitle>
            <CardDescription>
              {documentos.length} ficheiro{documentos.length !== 1 ? "s" : ""} no total
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {documentos.map((file) => {
                const FileIcon = getFileIcon(file.tipo)
                return (
                  <div
                    key={file.id}
                    className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <FileIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{file.nome}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(file.tamanho)} • {new Date(file.dataUpload).toLocaleDateString("pt-PT")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-foreground"
                        asChild
                      >
                        <a href={file.url} download={file.nome}>
                          <Download className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => handleDeleteFile(file.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty state */}
      {documentos.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-foreground font-medium mb-1">Nenhum ficheiro</p>
            <p className="text-sm text-muted-foreground text-center">Carregue documentos para os ver aqui.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
