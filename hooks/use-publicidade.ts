"use client"

import { useState, useEffect, useCallback } from "react"
import type { PacotePublicidade, PedidoPublicidade, Advertisement } from "@/lib/types"

const PACOTES_KEY = "limarestas_pacotes_publicidade"
const PEDIDOS_KEY = "limarestas_pedidos_publicidade"
const ADS_KEY = "limarestas_advertisements"

const DEFAULT_PACOTES: PacotePublicidade[] = [
  {
    id: "1",
    nome: "Banner Topo - Básico",
    descricao: "Banner no topo da página principal. Máxima visibilidade.",
    posicao: "banner-topo",
    duracao: 7,
    preco: 150,
    destaque: false,
  },
  {
    id: "2",
    nome: "Banner Topo - Premium",
    descricao: "Banner no topo da página principal por 30 dias. Inclui relatório de cliques.",
    posicao: "banner-topo",
    duracao: 30,
    preco: 450,
    destaque: true,
  },
  {
    id: "3",
    nome: "Sidebar",
    descricao: "Anúncio na barra lateral. Visível em todas as páginas.",
    posicao: "sidebar",
    duracao: 30,
    preco: 200,
    destaque: false,
  },
  {
    id: "4",
    nome: "Footer",
    descricao: "Anúncio no rodapé. Presente em todas as páginas.",
    posicao: "footer",
    duracao: 30,
    preco: 100,
    destaque: false,
  },
  {
    id: "5",
    nome: "Entre Conteúdo",
    descricao: "Anúncio entre secções de conteúdo. Alta taxa de conversão.",
    posicao: "entre-conteudo",
    duracao: 14,
    preco: 250,
    destaque: true,
  },
]

export function usePublicidade() {
  const [pacotes, setPacotes] = useState<PacotePublicidade[]>([])
  const [pedidos, setPedidos] = useState<PedidoPublicidade[]>([])
  const [anuncios, setAnuncios] = useState<Advertisement[]>([])

  useEffect(() => {
    const storedPacotes = localStorage.getItem(PACOTES_KEY)
    const storedPedidos = localStorage.getItem(PEDIDOS_KEY)
    const storedAds = localStorage.getItem(ADS_KEY)

    setPacotes(storedPacotes ? JSON.parse(storedPacotes) : DEFAULT_PACOTES)
    setPedidos(storedPedidos ? JSON.parse(storedPedidos) : [])
    setAnuncios(storedAds ? JSON.parse(storedAds) : [])

    if (!storedPacotes) {
      localStorage.setItem(PACOTES_KEY, JSON.stringify(DEFAULT_PACOTES))
    }
  }, [])

  const savePedidos = useCallback((newPedidos: PedidoPublicidade[]) => {
    localStorage.setItem(PEDIDOS_KEY, JSON.stringify(newPedidos))
    setPedidos(newPedidos)
  }, [])

  const saveAnuncios = useCallback((newAnuncios: Advertisement[]) => {
    localStorage.setItem(ADS_KEY, JSON.stringify(newAnuncios))
    setAnuncios(newAnuncios)
  }, [])

  const submeterPedido = useCallback(
    (pedido: Omit<PedidoPublicidade, "id" | "dataSubmissao" | "status">) => {
      const novoPedido: PedidoPublicidade = {
        ...pedido,
        id: Date.now().toString(),
        dataSubmissao: new Date().toISOString(),
        status: "pendente",
      }
      savePedidos([...pedidos, novoPedido])
      return novoPedido
    },
    [pedidos, savePedidos],
  )

  const atualizarStatusPedido = useCallback(
    (id: string, status: PedidoPublicidade["status"]) => {
      const updated = pedidos.map((p) => (p.id === id ? { ...p, status } : p))
      savePedidos(updated)
    },
    [pedidos, savePedidos],
  )

  const criarAnuncio = useCallback(
    (pedidoId: string) => {
      const pedido = pedidos.find((p) => p.id === pedidoId)
      const pacote = pacotes.find((p) => p.id === pedido?.pacoteId)

      if (!pedido || !pacote) return null

      const dataInicio = new Date()
      const dataFim = new Date()
      dataFim.setDate(dataFim.getDate() + pacote.duracao)

      const novoAnuncio: Advertisement = {
        id: Date.now().toString(),
        empresaId: pedidoId,
        empresaNome: pedido.empresaNome,
        titulo: pedido.titulo,
        descricao: pedido.descricao,
        imagemUrl: pedido.imagemUrl,
        linkUrl: pedido.linkUrl,
        posicao: pacote.posicao,
        dataInicio: dataInicio.toISOString(),
        dataFim: dataFim.toISOString(),
        status: "ativo",
        visualizacoes: 0,
        cliques: 0,
        precoTotal: pacote.preco,
      }

      saveAnuncios([...anuncios, novoAnuncio])
      atualizarStatusPedido(pedidoId, "pago")
      return novoAnuncio
    },
    [pedidos, pacotes, anuncios, saveAnuncios, atualizarStatusPedido],
  )

  const getEstatisticas = useCallback(() => {
    const totalAnuncios = anuncios.length
    const anunciosAtivos = anuncios.filter((a) => a.status === "ativo").length
    const totalVisualizacoes = anuncios.reduce((acc, a) => acc + a.visualizacoes, 0)
    const totalCliques = anuncios.reduce((acc, a) => acc + a.cliques, 0)
    const receitaTotal = anuncios.reduce((acc, a) => acc + a.precoTotal, 0)
    const pedidosPendentes = pedidos.filter((p) => p.status === "pendente").length

    return {
      totalAnuncios,
      anunciosAtivos,
      totalVisualizacoes,
      totalCliques,
      receitaTotal,
      pedidosPendentes,
    }
  }, [anuncios, pedidos])

  return {
    pacotes,
    pedidos,
    anuncios,
    submeterPedido,
    atualizarStatusPedido,
    criarAnuncio,
    getEstatisticas,
  }
}
