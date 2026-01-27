"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  MessageSquare,
  Star,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Building2,
  User,
  Calendar,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Feedback {
  id: string
  obraId: string
  obraNome: string
  clienteNome: string
  clienteEmail: string
  avaliacao: number
  comentario: string
  dataSubmissao: string
  status: "pendente" | "analisado" | "resolvido"
  categoria: "qualidade" | "prazo" | "comunicacao" | "custo" | "geral"
  resposta?: string
}

const feedbacks: Feedback[] = [
  {
    id: "FB-001",
    obraId: "OBR-001",
    obraNome: "Remodelação Apartamento T3 - Lisboa",
    clienteNome: "João Silva",
    clienteEmail: "joao.silva@email.com",
    avaliacao: 5,
    comentario: "Excelente trabalho! A equipa foi muito profissional e cumpriu todos os prazos. Recomendo vivamente.",
    dataSubmissao: "2024-02-15",
    status: "resolvido",
    categoria: "geral",
    resposta: "Obrigado pelo seu feedback positivo!"
  },
  {
    id: "FB-002",
    obraId: "OBR-002",
    obraNome: "Construção Moradia - Cascais",
    clienteNome: "Maria Santos",
    clienteEmail: "maria.santos@email.com",
    avaliacao: 3,
    comentario: "O trabalho foi bom mas houve alguns atrasos na entrega. A comunicação poderia ter sido melhor.",
    dataSubmissao: "2024-02-10",
    status: "analisado",
    categoria: "prazo"
  },
  {
    id: "FB-003",
    obraId: "OBR-003",
    obraNome: "Reabilitação Prédio - Porto",
    clienteNome: "António Costa",
    clienteEmail: "antonio.costa@email.com",
    avaliacao: 4,
    comentario: "Bom serviço no geral. Alguns detalhes de acabamento poderiam ser melhores.",
    dataSubmissao: "2024-02-08",
    status: "pendente",
    categoria: "qualidade"
  },
  {
    id: "FB-004",
    obraId: "OBR-004",
    obraNome: "Pintura Escritório - Setúbal",
    clienteNome: "Sofia Ferreira",
    clienteEmail: "sofia.ferreira@email.com",
    avaliacao: 2,
    comentario: "Tive problemas com o orçamento final que ficou acima do previsto. Não fiquei satisfeita.",
    dataSubmissao: "2024-02-05",
    status: "pendente",
    categoria: "custo"
  },
]

const categoriaConfig = {
  qualidade: { label: "Qualidade", color: "bg-blue-100 text-blue-700" },
  prazo: { label: "Prazo", color: "bg-purple-100 text-purple-700" },
  comunicacao: { label: "Comunicação", color: "bg-orange-100 text-orange-700" },
  custo: { label: "Custo", color: "bg-red-100 text-red-700" },
  geral: { label: "Geral", color: "bg-gray-100 text-gray-700" },
}

const statusConfig = {
  pendente: { label: "Pendente", color: "bg-yellow-100 text-yellow-700", icon: Clock },
  analisado: { label: "Analisado", color: "bg-blue-100 text-blue-700", icon: AlertTriangle },
  resolvido: { label: "Resolvido", color: "bg-green-100 text-green-700", icon: CheckCircle2 },
}

export function FeedbackSection() {
  const [resposta, setResposta] = useState("")
  const [feedbackSelecionado, setFeedbackSelecionado] = useState<Feedback | null>(null)

  const pendentes = feedbacks.filter(f => f.status === "pendente").length
  const mediaAvaliacao = feedbacks.reduce((acc, f) => acc + f.avaliacao, 0) / feedbacks.length

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif text-foreground mb-2">Feedback de Clientes</h2>
        <p className="text-muted-foreground">
          Receba e gerencie o feedback dos clientes sobre as obras em decorrer. Controlo interno de qualidade.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feedbacks.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendentes}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avaliação Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">{mediaAvaliacao.toFixed(1)}</div>
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Satisfação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-green-600">
                {Math.round((feedbacks.filter(f => f.avaliacao >= 4).length / feedbacks.length) * 100)}%
              </div>
              <ThumbsUp className="w-5 h-5 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {feedbacks.length === 0 ? (
          <Card className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum feedback recebido ainda.</p>
          </Card>
        ) : (
          feedbacks.map((feedback) => {
            const categoria = categoriaConfig[feedback.categoria]
            const status = statusConfig[feedback.status]
            const StatusIcon = status.icon

            return (
              <Card key={feedback.id} className={`hover:shadow-md transition-shadow ${feedback.status === "pendente" ? "border-l-4 border-l-yellow-500" : ""}`}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <CardTitle className="text-lg">{feedback.obraNome}</CardTitle>
                      </div>
                      <CardDescription className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {feedback.clienteNome}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(feedback.dataSubmissao).toLocaleDateString('pt-PT')}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`${categoria.color} border-0`}>
                        {categoria.label}
                      </Badge>
                      <Badge className={`${status.color} border-0`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {status.label}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1 mb-3">
                    {renderStars(feedback.avaliacao)}
                    <span className="text-sm text-muted-foreground ml-2">({feedback.avaliacao}/5)</span>
                  </div>
                  
                  <p className="text-sm text-foreground mb-4 p-3 bg-secondary/50 rounded-lg">
                    &ldquo;{feedback.comentario}&rdquo;
                  </p>

                  {feedback.resposta && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-700">
                        <strong>Resposta:</strong> {feedback.resposta}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => setFeedbackSelecionado(feedback)}>
                          Ver Detalhes
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Feedback - {feedback.obraNome}</DialogTitle>
                          <DialogDescription>Cliente: {feedback.clienteNome}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <div className="flex items-center gap-1">
                            {renderStars(feedback.avaliacao)}
                          </div>
                          <p className="text-sm">{feedback.comentario}</p>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Responder ao cliente:</label>
                            <Textarea
                              placeholder="Escreva a sua resposta..."
                              value={resposta}
                              onChange={(e) => setResposta(e.target.value)}
                              rows={3}
                            />
                          </div>
                          <Button className="w-full">Enviar Resposta</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    {feedback.status === "pendente" && (
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Marcar como Analisado
                      </Button>
                    )}
                    {feedback.avaliacao <= 2 && (
                      <Button variant="destructive">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Prioridade Alta
                      </Button>
                    )}
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
