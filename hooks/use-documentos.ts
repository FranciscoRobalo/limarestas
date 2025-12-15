"use client"

import { useState, useEffect } from "react"
import type { Documento } from "@/lib/types"
import { storage } from "@/lib/storage"

const DOCUMENTOS_KEY = "limarestas_documentos"

export function useDocumentos() {
  const [documentos, setDocumentos] = useState<Documento[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = storage.get<Documento[]>(DOCUMENTOS_KEY)
    if (stored) {
      setDocumentos(stored)
    }
    setLoading(false)
  }, [])

  const addDocumento = (file: File, obraId?: string) => {
    const newDoc: Documento = {
      id: `DOC-${Date.now()}`,
      obraId,
      nome: file.name,
      tipo: file.type,
      tamanho: file.size,
      dataUpload: new Date().toISOString(),
      url: URL.createObjectURL(file),
    }
    const updated = [...documentos, newDoc]
    setDocumentos(updated)
    storage.set(DOCUMENTOS_KEY, updated)
    return newDoc
  }

  const deleteDocumento = (id: string) => {
    const updated = documentos.filter((doc) => doc.id !== id)
    setDocumentos(updated)
    storage.set(DOCUMENTOS_KEY, updated)
  }

  const getDocumentosByObra = (obraId: string) => {
    return documentos.filter((doc) => doc.obraId === obraId)
  }

  return {
    documentos,
    loading,
    addDocumento,
    deleteDocumento,
    getDocumentosByObra,
  }
}
