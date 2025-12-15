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

  const addMensagem = (conteudo: string, nomeRemetente: string, remetente: Mensagem["remetente"] = "user") => {
    const newMensagem: Mensagem = {
      id: `MSG-${Date.now()}`,
      conteudo,
      remetente,
      nomeRemetente,
      timestamp: new Date().toISOString(),
      lida: false,
    }
    const updated = [...mensagens, newMensagem]
    setMensagens(updated)
    storage.set(MENSAGENS_KEY, updated)
    return newMensagem
  }

  const marcarComoLida = (id: string) => {
    const updated = mensagens.map((msg) => (msg.id === id ? { ...msg, lida: true } : msg))
    setMensagens(updated)
    storage.set(MENSAGENS_KEY, updated)
  }

  const getNaoLidas = () => {
    return mensagens.filter((msg) => !msg.lida && msg.remetente !== "user")
  }

  return {
    mensagens,
    loading,
    addMensagem,
    marcarComoLida,
    getNaoLidas,
  }
}
