"use client"

import { useState, useEffect } from "react"
import type { EtapaWorkflow } from "@/lib/types"
import { storage } from "@/lib/storage"

const WORKFLOW_KEY = "limarestas_workflow"

export function useWorkflow(obraId: string, initialEtapas: EtapaWorkflow[] = []) {
  const [etapas, setEtapas] = useState<EtapaWorkflow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = storage.get<Record<string, EtapaWorkflow[]>>(WORKFLOW_KEY) || {}
    const savedEtapas = stored[obraId]
    const nextEtapas = savedEtapas?.length ? savedEtapas : initialEtapas.map((etapa) => ({
      ...etapa,
      obraId,
      tarefas: etapa.tarefas.map((tarefa) => ({ ...tarefa })),
    }))

    setEtapas(nextEtapas)
    if (!savedEtapas?.length && nextEtapas.length) {
      storage.set(WORKFLOW_KEY, { ...stored, [obraId]: nextEtapas })
    }
    setLoading(false)
  }, [obraId])

  const persist = (updater: (current: EtapaWorkflow[]) => EtapaWorkflow[]) => {
    setEtapas((current) => {
      const updated = updater(current)
      const stored = storage.get<Record<string, EtapaWorkflow[]>>(WORKFLOW_KEY) || {}
      storage.set(WORKFLOW_KEY, { ...stored, [obraId]: updated })
      return updated
    })
  }

  const updateTarefa = (etapaId: number, tarefaId: string, completada: boolean) => {
    persist((current) => current.map((etapa) =>
      etapa.id === etapaId
        ? {
            ...etapa,
            tarefas: etapa.tarefas.map((tarefa) => (tarefa.id === tarefaId ? { ...tarefa, completada } : tarefa)),
          }
        : etapa,
    ))
  }

  const avancarEtapa = (etapaId: number) => {
    persist((current) => current.map((etapa) =>
      etapa.id === etapaId
        ? { ...etapa, completada: true, tarefas: etapa.tarefas.map((tarefa) => ({ ...tarefa, completada: true })) }
        : etapa,
    ))
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
