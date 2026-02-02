"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Star,
  MessageSquare,
  Search,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Building2,
  User,
} from "lucide-react"

interface Feedback {
  id: string
  obraId: string
  obraNome: string
  clienteNome: string
  clienteEmail: string
  rating: number
  comentario: string
  dataSubmissao: string
  status: "novo" | "analisado" | "resolvido"
  tipo: "positivo" | "neutro" | "negativo"
}

const initialFeedbacks: Feedback[] = [
  {
    id: "FB-001",
    obraId: "OBR-001",
    obraNome: "Remodelação Apartamento T3 - Lisboa",
    clienteNome: "João Silva",
    clienteEmail: "joao.silva@email.com",
    rating: 5,
    comentario:
      "Excelente trabalho! A equipa foi muito profissional e cumpriu todos os prazos. Recomendo vivamente.",
    dataSubmissao: "2024-02-15",
    status: "analisado",
    tipo: "positivo",
  },
  {
    id: "FB-002",
    obraId: "OBR-002",
    obraNome: "Construção Moradia - Cascais",
    clienteNome: "Maria Santos",
    clienteEmail: "maria.santos@email.com",
    rating: 4,
    comentario:
      "Bom serviço no geral, apenas houve um pequeno atraso na entrega dos materiais, mas foi resolvido rapidamente.",
    dataSubmissao: "2024-02-10",
    status: "resolvido",
    tipo: "positivo",
  },
  {
    id: "FB-003",
    obraId: "OBR-003",
    obraNome: "Reabilitação Prédio - Porto",
    clienteNome: "António Costa",
    clienteEmail: "antonio.costa@email.com",
    rating: 2,
    comentario:
      "Tive alguns problemas de comunicação com a equipa. Os trabalhos ficaram bem mas a experiência podia ter sido melhor.",
    dataSubmissao: "2024-02-08",
    status: "novo",
    tipo: "negativo",
  },
  {
    id: "FB-004",
    obraId: "OBR-004",
    obraNome: "Remodelação Cozinha - Almada",
    clienteNome: "Ana Rodrigues",
    clienteEmail: "ana.rodrigues@email.com",
    rating: 5,
    comentario: "Perfeito! A minha cozinha ficou linda. Muito obrigada por todo o apoio.",
    dataSubmissao: "2024-02-05",
    status: "analisado",
    tipo: "positivo",
  },
]

const statusConfig = {
  novo: { label: "Novo", color: "bg-blue-500/10 text-blue-600 border-blue-500/30", icon: Clock },
  analisado: { label: "Analisado", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30", icon: MessageSquare },
  resolvido: { label: "Resolvido", color: "bg-green-500/10 text-green-600 border-green-500/30", icon: CheckCircle2 },
}

export function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedbacks)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("todos")

  const updateFeedbackStatus = (id: string, newStatus: Feedback["status"]) => {
    setFeedbacks(prev => prev.map(fb => 
      fb.id === id ? { ...fb, status: newStatus } : fb
    ))
  }

  const filteredFeedbacks = feedbacks.filter((fb) => {
    const matchSearch =
      fb.obraNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fb.clienteNome.toLowerCase().includes(searchTerm.toLowerCase())

    const matchTab = activeTab === "todos" || fb.tipo === activeTab || fb.status === activeTab

    return matchSearch && matchTab
  })

  const stats = {
    total: feedbacks.length,
    positivos: feedbacks.filter((f) => f.tipo === "positivo").length,
    negativos: feedbacks.filter((f) => f.tipo === "negativo").length,
    novos: feedbacks.filter((f) => f.status === "novo").length,
    mediaRating: (feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length).toFixed(1),
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif text-foreground mb-2">Feedback de Clientes</h2>
        <p className="text-muted-foreground">
          Controlo interno de qualidade - receba e analise feedback dos clientes sobre as obras a decorrer.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total Feedbacks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <div className="text-2xl font-bold text-foreground">{stats.mediaRating}</div>
            </div>
            <p className="text-sm text-muted-foreground">Média Geral</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-5 h-5 text-green-600" />
              <div className="text-2xl font-bold text-green-600">{stats.positivos}</div>
            </div>
            <p className="text-sm text-muted-foreground">Positivos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <ThumbsDown className="w-5 h-5 text-red-600" />
              <div className="text-2xl font-bold text-red-600">{stats.negativos}</div>
            </div>
            <p className="text-sm text-muted-foreground">Negativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">{stats.novos}</div>
            </div>
            <p className="text-sm text-muted-foreground">Por Analisar</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar por obra ou cliente..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="novo">Novos</TabsTrigger>
            <TabsTrigger value="positivo">Positivos</TabsTrigger>
            <TabsTrigger value="negativo">Negativos</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedbacks.length === 0 ? (
          <Card className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum feedback encontrado.</p>
          </Card>
        ) : (
          filteredFeedbacks.map((fb) => {
            const status = statusConfig[fb.status]
            const StatusIcon = status.icon

            return (
              <Card
                key={fb.id}
                className={`border-l-4 ${
                  fb.tipo === "positivo"
                    ? "border-l-green-500"
                    : fb.tipo === "negativo"
                      ? "border-l-red-500"
                      : "border-l-yellow-500"
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <CardTitle className="text-lg">{fb.obraNome}</CardTitle>
                      </div>
                      <CardDescription className="flex items-center gap-2">
                        <User className="w-3 h-3" />
                        {fb.clienteNome} - {fb.clienteEmail}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">{renderStars(fb.rating)}</div>
                      <Badge className={`${status.color} border`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {status.label}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-secondary/50 rounded-lg p-4 mb-4">
                    <p className="text-foreground italic">"{fb.comentario}"</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Submetido em {new Date(fb.dataSubmissao).toLocaleDateString("pt-PT")}
                    </p>
                    <div className="flex gap-2">
                      {fb.status === "novo" && (
                        <Button size="sm" onClick={() => updateFeedbackStatus(fb.id, "analisado")}>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Marcar como Analisado
                        </Button>
                      )}
                      {fb.status === "analisado" && (
                        <Button size="sm" variant="outline" onClick={() => updateFeedbackStatus(fb.id, "resolvido")}>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Marcar como Resolvido
                        </Button>
                      )}
                      {fb.status === "resolvido" && (
                        <Badge className="bg-green-500/10 text-green-600 border border-green-500/30">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Concluído
                        </Badge>
                      )}
                      <Button variant="outline" size="sm" onClick={() => window.open(`mailto:${fb.clienteEmail}`, '_blank')}>
                        Contactar Cliente
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
