"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Star, MessageSquare, Building2, User, Calendar, Send, CheckCircle2 } from "lucide-react"

interface Feedback {
  id: string
  obraId: string
  obraNome: string
  cliente: string
  data: string
  rating: number
  comentario: string
  estado: "pendente" | "lido" | "respondido"
  resposta?: string
}

const feedbacksExemplo: Feedback[] = [
  {
    id: "1",
    obraId: "OBR-001",
    obraNome: "Remodelação Apartamento T3 - Lisboa",
    cliente: "João Silva",
    data: "2025-01-20",
    rating: 5,
    comentario: "Excelente trabalho! A equipa foi muito profissional e cumpriu todos os prazos. Recomendo vivamente.",
    estado: "respondido",
    resposta: "Muito obrigado pelo seu feedback positivo! Foi um prazer trabalhar consigo.",
  },
  {
    id: "2",
    obraId: "OBR-002",
    obraNome: "Construção Moradia - Cascais",
    cliente: "Maria Santos",
    data: "2025-01-18",
    rating: 4,
    comentario: "Bom trabalho no geral. Houve alguns pequenos atrasos mas a qualidade final foi boa.",
    estado: "lido",
  },
  {
    id: "3",
    obraId: "OBR-003",
    obraNome: "Reabilitação Prédio - Porto",
    cliente: "António Costa",
    data: "2025-01-15",
    rating: 5,
    comentario: "Superou as expectativas! Comunicação clara e trabalho impecável.",
    estado: "pendente",
  },
]

export function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(feedbacksExemplo)
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null)
  const [resposta, setResposta] = useState("")

  const handleResponder = () => {
    if (!selectedFeedback || !resposta.trim()) return

    setFeedbacks((prev) =>
      prev.map((f) =>
        f.id === selectedFeedback.id ? { ...f, estado: "respondido" as const, resposta } : f
      )
    )
    setSelectedFeedback(null)
    setResposta("")
  }

  const handleMarcarLido = (id: string) => {
    setFeedbacks((prev) =>
      prev.map((f) => (f.id === id && f.estado === "pendente" ? { ...f, estado: "lido" as const } : f))
    )
  }

  const getEstadoBadge = (estado: Feedback["estado"]) => {
    switch (estado) {
      case "pendente":
        return <Badge variant="destructive">Pendente</Badge>
      case "lido":
        return <Badge variant="outline" className="border-amber-500 text-amber-600">Lido</Badge>
      case "respondido":
        return <Badge className="bg-green-500">Respondido</Badge>
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
          />
        ))}
      </div>
    )
  }

  const pendentes = feedbacks.filter((f) => f.estado === "pendente").length
  const mediaRating = feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif text-foreground mb-2">Feedback de Clientes</h2>
        <p className="text-muted-foreground">
          Receba feedback dos clientes sobre obras em decorrer para controlo interno de qualidade.
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Feedbacks</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feedbacks.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{pendentes}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mediaRating.toFixed(1)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Feedbacks */}
      <div className="space-y-4">
        {feedbacks.map((feedback) => (
          <Card key={feedback.id} className={feedback.estado === "pendente" ? "border-amber-500/50" : ""}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    <CardTitle className="text-lg">{feedback.obraNome}</CardTitle>
                  </div>
                  <CardDescription className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {feedback.cliente}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(feedback.data).toLocaleDateString("pt-PT")}
                    </span>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  {renderStars(feedback.rating)}
                  {getEstadoBadge(feedback.estado)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-secondary/50 rounded-lg p-4">
                <p className="text-foreground">{feedback.comentario}</p>
              </div>

              {feedback.resposta && (
                <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-4">
                  <p className="text-sm font-medium text-primary mb-1">Resposta LAT:</p>
                  <p className="text-muted-foreground">{feedback.resposta}</p>
                </div>
              )}

              <div className="flex justify-end gap-2">
                {feedback.estado === "pendente" && (
                  <Button variant="outline" size="sm" onClick={() => handleMarcarLido(feedback.id)}>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Marcar como Lido
                  </Button>
                )}
                {feedback.estado !== "respondido" && (
                  <Button size="sm" onClick={() => setSelectedFeedback(feedback)}>
                    <Send className="w-4 h-4 mr-2" />
                    Responder
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Resposta */}
      {selectedFeedback && (
        <div className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>Responder ao Feedback</CardTitle>
              <CardDescription>
                Obra: {selectedFeedback.obraNome}
                <br />
                Cliente: {selectedFeedback.cliente}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-secondary/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">{selectedFeedback.comentario}</p>
              </div>
              <Textarea
                placeholder="Escreva a sua resposta..."
                value={resposta}
                onChange={(e) => setResposta(e.target.value)}
                rows={4}
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedFeedback(null)}>
                  Cancelar
                </Button>
                <Button onClick={handleResponder} disabled={!resposta.trim()}>
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Resposta
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
