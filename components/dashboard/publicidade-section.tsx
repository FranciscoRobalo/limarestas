"use client"

import type React from "react"

import { useState } from "react"
import { usePublicidade } from "@/hooks/use-publicidade"
import { useActivityLog } from "@/hooks/use-activity-log"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Megaphone,
  Eye,
  MousePointer,
  Euro,
  Clock,
  CheckCircle,
  ShoppingCart,
  Star,
  BarChart3,
  FileImage,
  LinkIcon,
  Building,
  Mail,
  Phone,
  CreditCard,
} from "lucide-react"

type View = "pacotes" | "meus-anuncios" | "novo-pedido" | "estatisticas"

export function PublicidadeSection() {
  const { pacotes, pedidos, anuncios, submeterPedido, getEstatisticas } = usePublicidade()
  const { addLog } = useActivityLog()
  const [view, setView] = useState<View>("pacotes")
  const [selectedPacote, setSelectedPacote] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    empresaNome: "",
    empresaEmail: "",
    empresaTelefone: "",
    nif: "",
    titulo: "",
    descricao: "",
    imagemUrl: "",
    linkUrl: "",
  })

  const stats = getEstatisticas()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPacote) return

    submeterPedido({
      pacoteId: selectedPacote,
      ...formData,
    })

    addLog("Pedido de Publicidade", `Nova solicitação de anúncio: ${formData.titulo}`, "publicidade")

    setFormData({
      empresaNome: "",
      empresaEmail: "",
      empresaTelefone: "",
      nif: "",
      titulo: "",
      descricao: "",
      imagemUrl: "",
      linkUrl: "",
    })
    setSelectedPacote(null)
    setView("meus-anuncios")
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: "EUR",
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-PT")
  }

  const positionLabels = {
    "banner-topo": "Banner Topo",
    sidebar: "Barra Lateral",
    footer: "Rodapé",
    "entre-conteudo": "Entre Conteúdo",
  }

  const statusColors = {
    pendente: "bg-amber-100 text-amber-700",
    aprovado: "bg-blue-100 text-blue-700",
    rejeitado: "bg-red-100 text-red-700",
    pago: "bg-green-100 text-green-700",
    ativo: "bg-green-100 text-green-700",
    pausado: "bg-gray-100 text-gray-700",
    expirado: "bg-red-100 text-red-700",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Publicidade</h2>
          <p className="text-muted-foreground">Compre espaços publicitários no site Lima Restas</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 flex-wrap">
        <Button variant={view === "pacotes" ? "default" : "outline"} onClick={() => setView("pacotes")}>
          <ShoppingCart className="w-4 h-4 mr-2" />
          Pacotes
        </Button>
        <Button variant={view === "meus-anuncios" ? "default" : "outline"} onClick={() => setView("meus-anuncios")}>
          <Megaphone className="w-4 h-4 mr-2" />
          Meus Anúncios
        </Button>
        <Button variant={view === "estatisticas" ? "default" : "outline"} onClick={() => setView("estatisticas")}>
          <BarChart3 className="w-4 h-4 mr-2" />
          Estatísticas
        </Button>
      </div>

      {/* Pacotes View */}
      {view === "pacotes" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pacotes.map((pacote) => (
            <Card
              key={pacote.id}
              className={`relative overflow-hidden ${pacote.destaque ? "ring-2 ring-primary" : ""}`}
            >
              {pacote.destaque && (
                <div className="absolute top-4 right-4">
                  <span className="flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                    <Star className="w-3 h-3" />
                    Destaque
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle>{pacote.nome}</CardTitle>
                <CardDescription>{pacote.descricao}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Posição</span>
                  <span className="font-medium">{positionLabels[pacote.posicao]}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Duração</span>
                  <span className="font-medium flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {pacote.duracao} dias
                  </span>
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-primary">{formatPrice(pacote.preco)}</span>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => {
                      setSelectedPacote(pacote.id)
                      setView("novo-pedido")
                    }}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Comprar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Novo Pedido View */}
      {view === "novo-pedido" && selectedPacote && (
        <Card>
          <CardHeader>
            <CardTitle>Novo Pedido de Publicidade</CardTitle>
            <CardDescription>
              Pacote selecionado: <strong>{pacotes.find((p) => p.id === selectedPacote)?.nome}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Info */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Dados da Empresa
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="empresaNome">Nome da Empresa *</Label>
                    <Input
                      id="empresaNome"
                      value={formData.empresaNome}
                      onChange={(e) => setFormData({ ...formData, empresaNome: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nif">NIF *</Label>
                    <Input
                      id="nif"
                      value={formData.nif}
                      onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="empresaEmail">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="empresaEmail"
                        type="email"
                        className="pl-10"
                        value={formData.empresaEmail}
                        onChange={(e) => setFormData({ ...formData, empresaEmail: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="empresaTelefone">Telefone *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="empresaTelefone"
                        type="tel"
                        className="pl-10"
                        value={formData.empresaTelefone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            empresaTelefone: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Ad Content */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Megaphone className="w-5 h-5" />
                  Conteúdo do Anúncio
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="titulo">Título do Anúncio *</Label>
                    <Input
                      id="titulo"
                      value={formData.titulo}
                      onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="descricao">Descrição</Label>
                    <Textarea
                      id="descricao"
                      rows={3}
                      value={formData.descricao}
                      onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="imagemUrl">URL da Imagem *</Label>
                    <div className="relative">
                      <FileImage className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="imagemUrl"
                        type="url"
                        className="pl-10"
                        placeholder="https://exemplo.com/banner.jpg"
                        value={formData.imagemUrl}
                        onChange={(e) => setFormData({ ...formData, imagemUrl: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkUrl">Link de Destino *</Label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="linkUrl"
                        type="url"
                        className="pl-10"
                        placeholder="https://suaempresa.com"
                        value={formData.linkUrl}
                        onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="p-4 bg-secondary rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Resumo do Pedido
                </h3>
                <div className="flex justify-between items-center">
                  <span>
                    {pacotes.find((p) => p.id === selectedPacote)?.nome} -{" "}
                    {pacotes.find((p) => p.id === selectedPacote)?.duracao} dias
                  </span>
                  <span className="text-xl font-bold text-primary">
                    {formatPrice(pacotes.find((p) => p.id === selectedPacote)?.preco || 0)}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setSelectedPacote(null)
                    setView("pacotes")
                  }}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Submeter Pedido
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Meus Anúncios View */}
      {view === "meus-anuncios" && (
        <div className="space-y-6">
          {/* Pedidos Pendentes */}
          {pedidos.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Pedidos</CardTitle>
                <CardDescription>Estado dos seus pedidos de publicidade</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pedidos.map((pedido) => (
                    <div
                      key={pedido.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{pedido.titulo}</p>
                        <p className="text-sm text-muted-foreground">
                          {pedido.empresaNome} - {formatDate(pedido.dataSubmissao)}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[pedido.status]}`}>
                        {pedido.status === "pendente" && "Pendente"}
                        {pedido.status === "aprovado" && "Aprovado"}
                        {pedido.status === "rejeitado" && "Rejeitado"}
                        {pedido.status === "pago" && "Pago / Ativo"}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Anúncios Ativos */}
          <Card>
            <CardHeader>
              <CardTitle>Anúncios Ativos</CardTitle>
              <CardDescription>Seus anúncios em exibição</CardDescription>
            </CardHeader>
            <CardContent>
              {anuncios.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Megaphone className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum anúncio ativo</p>
                  <Button variant="link" onClick={() => setView("pacotes")} className="mt-2">
                    Ver pacotes disponíveis
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {anuncios.map((anuncio) => (
                    <div key={anuncio.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{anuncio.titulo}</h4>
                          <p className="text-sm text-muted-foreground">{positionLabels[anuncio.posicao]}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[anuncio.status]}`}>
                          {anuncio.status === "ativo" && "Ativo"}
                          {anuncio.status === "pausado" && "Pausado"}
                          {anuncio.status === "expirado" && "Expirado"}
                        </span>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-muted-foreground" />
                          <span>{anuncio.visualizacoes} visualizações</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MousePointer className="w-4 h-4 text-muted-foreground" />
                          <span>{anuncio.cliques} cliques</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>Até {formatDate(anuncio.dataFim)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Estatísticas View */}
      {view === "estatisticas" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Megaphone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalAnuncios}</p>
                  <p className="text-sm text-muted-foreground">Total de Anúncios</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.anunciosAtivos}</p>
                  <p className="text-sm text-muted-foreground">Anúncios Ativos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalVisualizacoes}</p>
                  <p className="text-sm text-muted-foreground">Visualizações</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <MousePointer className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalCliques}</p>
                  <p className="text-sm text-muted-foreground">Cliques</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.pedidosPendentes}</p>
                  <p className="text-sm text-muted-foreground">Pedidos Pendentes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Euro className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{formatPrice(stats.receitaTotal)}</p>
                  <p className="text-sm text-muted-foreground">Receita Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
