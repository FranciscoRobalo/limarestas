"use client"

import { useState, useEffect } from "react"
import type { Obra } from "@/lib/types"
import { storage } from "@/lib/storage"

const OBRAS_KEY = "limarestas_obras"

export function useObras() {
  const [obras, setObras] = useState<Obra[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = storage.get<Obra[]>(OBRAS_KEY)
    if (stored) {
      setObras(stored)
    }
    setLoading(false)
  }, [])

  const addObra = (obra: Omit<Obra, "id" | "dataSubmissao" | "status">) => {
    const newObra: Obra = {
      ...obra,
      id: `OBR-${Date.now()}`,
      dataSubmissao: new Date().toISOString(),
      status: "pendente",
      etapaAtual: 1,
      progresso: 0,
    }
    const updated = [...obras, newObra]
    setObras(updated)
    storage.set(OBRAS_KEY, updated)
    return newObra
  }

  const updateObra = (id: string, updates: Partial<Obra>) => {
    const updated = obras.map((obra) => (obra.id === id ? { ...obra, ...updates } : obra))
    setObras(updated)
    storage.set(OBRAS_KEY, updated)
  }

  const deleteObra = (id: string) => {
    const updated = obras.filter((obra) => obra.id !== id)
    setObras(updated)
    storage.set(OBRAS_KEY, updated)
  }

  const getObraById = (id: string) => {
    return obras.find((obra) => obra.id === id)
  }

  return {
    obras,
    loading,
    addObra,
    updateObra,
    deleteObra,
    getObraById,
  }
}
