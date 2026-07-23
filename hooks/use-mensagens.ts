"use client"

import { useState, useEffect } from "react"
import type { Mensagem } from "@/lib/types"
import { storage } from "@/lib/storage"

const MENSAGENS_KEY = "limarestas_mensagens"

export function useMensagens() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = storage.get<Mensagem[]>(MENSAGENS_KEY)
    if (stored) {
      setMensagens(stored)
    } else {
      // Initialize with welcome message
      const initialMessage: Mensagem = {
        id: "MSG-INIT",
        conteudo: "Bem-vindo ao chat da Lima Restas! Como podemos ajudar?",
        remetente: "support",
        nomeRemetente: "Suporte Técnico",
        timestamp: new Date().toISOString(),
        lida: false,
      }
      setMensagens([initialMessage])
      storage.set(MENSAGENS_KEY, [initialMessage])
    }
    setLoading(false)
  }, [])

  const addMensagem = (
    conteudo: string,
    nomeRemetente: string,
    remetente: Mensagem["remetente"] = "user",
    threadId = "1",
  ) => {
    const newMensagem: Mensagem = {
      id: `MSG-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      threadId,
      conteudo,
      remetente,
      nomeRemetente,
      timestamp: new Date().toISOString(),
      lida: remetente === "user",
    }
    setMensagens((current) => {
      const updated = [...current, newMensagem]
      storage.set(MENSAGENS_KEY, updated)
      return updated
    })
    return newMensagem
  }

  const marcarComoLida = (id: string) => {
    const updated = mensagens.map((msg) => (msg.id === id ? { ...msg, lida: true } : msg))
    setMensagens(updated)
    storage.set(MENSAGENS_KEY, updated)
  }

  const marcarThreadComoLida = (threadId: string) => {
    setMensagens((current) => {
      const updated = current.map((msg) =>
        (msg.threadId ?? "1") === threadId && msg.remetente !== "user" ? { ...msg, lida: true } : msg,
      )
      storage.set(MENSAGENS_KEY, updated)
      return updated
    })
  }

  const limparThread = (threadId: string) => {
    setMensagens((current) => {
      const updated = current.filter((msg) => (msg.threadId ?? "1") !== threadId)
      storage.set(MENSAGENS_KEY, updated)
      return updated
    })
  }

  const getNaoLidas = () => mensagens.filter((msg) => !msg.lida && msg.remetente !== "user")

  return {
    mensagens,
    loading,
    addMensagem,
    marcarComoLida,
    marcarThreadComoLida,
    limparThread,
    getNaoLidas,
  }
}
