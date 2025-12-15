"use client"

import { useState, useEffect } from "react"
import type { Visita } from "@/lib/types"
import { storage } from "@/lib/storage"

const VISITAS_KEY = "limarestas_visitas"

export function useVisitas() {
  const [visitas, setVisitas] = useState<Visita[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = storage.get<Visita[]>(VISITAS_KEY)
    if (stored) {
      setVisitas(stored)
    }
    setLoading(false)
  }, [])

  const addVisita = (visita: Omit<Visita, "id" | "status">) => {
    const newVisita: Visita = {
      ...visita,
      id: `VIS-${Date.now()}`,
      status: "pendente",
    }
    const updated = [...visitas, newVisita]
    setVisitas(updated)
    storage.set(VISITAS_KEY, updated)
    return newVisita
  }

  const updateVisita = (id: string, updates: Partial<Visita>) => {
    const updated = visitas.map((visita) => (visita.id === id ? { ...visita, ...updates } : visita))
    setVisitas(updated)
    storage.set(VISITAS_KEY, updated)
  }

  const deleteVisita = (id: string) => {
    const updated = visitas.filter((visita) => visita.id !== id)
    setVisitas(updated)
    storage.set(VISITAS_KEY, updated)
  }

  const getVisitasByObra = (obraId: string) => {
    return visitas.filter((visita) => visita.obraId === obraId)
  }

  return {
    visitas,
    loading,
    addVisita,
    updateVisita,
    deleteVisita,
    getVisitasByObra,
  }
}
