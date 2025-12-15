"use client"

import { useState, useEffect } from "react"
import type { EtapaWorkflow } from "@/lib/types"
import { storage } from "@/lib/storage"

const WORKFLOW_KEY = "limarestas_workflow"

export function useWorkflow(obraId: string) {
  const [etapas, setEtapas] = useState<EtapaWorkflow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = storage.get<Record<string, EtapaWorkflow[]>>(WORKFLOW_KEY) || {}
    if (stored[obraId]) {
      setEtapas(stored[obraId])
    }
    setLoading(false)
  }, [obraId])

  const updateTarefa = (etapaId: number, tarefaId: string, completada: boolean) => {
    const updated = etapas.map((etapa) =>
      etapa.id === etapaId
        ? {
            ...etapa,
            tarefas: etapa.tarefas.map((tarefa) => (tarefa.id === tarefaId ? { ...tarefa, completada } : tarefa)),
          }
        : etapa,
    )
    setEtapas(updated)

    const stored = storage.get<Record<string, EtapaWorkflow[]>>(WORKFLOW_KEY) || {}
    stored[obraId] = updated
    storage.set(WORKFLOW_KEY, stored)
  }

  const avancarEtapa = (etapaId: number) => {
    const updated = etapas.map((etapa) => (etapa.id === etapaId ? { ...etapa, completada: true } : etapa))
    setEtapas(updated)

    const stored = storage.get<Record<string, EtapaWorkflow[]>>(WORKFLOW_KEY) || {}
    stored[obraId] = updated
    storage.set(WORKFLOW_KEY, stored)
  }

  const getProgresso = () => {
    const totalTarefas = etapas.reduce((acc, etapa) => acc + etapa.tarefas.length, 0)
    const tarefasCompletas = etapas.reduce((acc, etapa) => acc + etapa.tarefas.filter((t) => t.completada).length, 0)
    return totalTarefas > 0 ? Math.round((tarefasCompletas / totalTarefas) * 100) : 0
  }

  return {
    etapas,
    loading,
    updateTarefa,
    avancarEtapa,
    getProgresso,
  }
}
