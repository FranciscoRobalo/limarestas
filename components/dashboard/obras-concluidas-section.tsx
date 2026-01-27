"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  CheckCircle2,
  Search,
  MapPin,
  Calendar,
  Euro,
  Star,
  Eye,
  FileText,
  Building2,
  Users,
} from "lucide-react"

interface ObraConcluida {
  id: string
  nome: string
  tipo: string
  cliente: string
  localizacao: string
  dataInicio: string
  dataConclusao: string
  valorTotal: number
  empreiteiro: string
  rating: number
  feedback: boolean
}

const obrasConcluidas: ObraConcluida[] = [
  {
    id: "OBR-C001",
    nome: "Remodelação Apartamento T3 - Alfama",
    tipo: "Remodelação",
    cliente: "João Silva",
    localizacao: "Lisboa",
    dataInicio: "2023-09-01",
    dataConclusao: "2023-12-15",
    valorTotal: 45000,
    empreiteiro: "Ferreira Construções Lda",
    rating: 5,
    feedback: true,
  },
  {
    id: "OBR-C002",
    nome: "Construção Moradia V4 - Estoril",
    tipo: "Construção Nova",
    cliente: "Maria Santos",
    localizacao: "Cascais",
    dataInicio: "2023-03-15",
    dataConclusao: "2024-01-20",
    valorTotal: 320000,
    empreiteiro: "Silva & Filhos",
    rating: 4,
    feedback: true,
  },
  {
    id: "OBR-C003",
    nome: "Reabilitação Edifício Histórico",
    tipo: "Reabilitação",
    cliente: "António Costa",
    localizacao: "Porto",
    dataInicio: "2023-06-01",
    dataConclusao: "2024-02-10",
    valorTotal: 180000,
    empreiteiro: "Costa Obras",
    rating: 5,
    feedback: false,
  },
  {
    id: "OBR-C004",
    nome: "Remodelação Cozinha e WC",
    tipo: "Remodelação",
    cliente: "Ana Rodrigues",
    localizacao: "Almada",
    dataInicio: "2024-01-05",
    dataConclusao: "2024-02-01",
    valorTotal: 12000,
    empreiteiro: "Martins Construções",
    rating: 5,
    feedback: true,
  },
]

export function ObrasConcluídasSection() {
  const [searchTerm, setSearchTerm] = useState("")

  const obrasFiltradas = obrasConcluidas.filter(
    (obra) =>
      obra.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      obra.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      obra.localizacao.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    total: obrasConcluidas.length,
    valorTotal: obrasConcluidas.reduce((acc, o) => acc + o.valorTotal, 0),
    mediaRating: (obrasConcluidas.reduce((acc, o) => acc + o.rating, 0) / obrasConcluidas.length).toFixed(1),
    comFeedback: obrasConcluidas.filter((o) => o.feedback).length,
  }

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" }).format(value)

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
        <h2 className="text-2xl font-serif text-foreground mb-2">Obras Concluídas</h2>
        <p className="text-muted-foreground">
          Histórico de todas as obras concluídas com sucesso.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div className="text-2xl font-bold text-foreground">{stats.total}</div>
            </div>
            <p className="text-sm text-muted-foreground">Obras Concluídas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Euro className="w-5 h-5 text-primary" />
              <div className="text-2xl font-bold text-foreground">{formatCurrency(stats.valorTotal)}</div>
            </div>
            <p className="text-sm text-muted-foreground">Valor Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <div className="text-2xl font-bold text-foreground">{stats.mediaRating}</div>
            </div>
            <p className="text-sm text-muted-foreground">Avaliação Média</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div className="text-2xl font-bold text-foreground">{stats.comFeedback}</div>
            </div>
            <p className="text-sm text-muted-foreground">Com Feedback</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Pesquisar obras concluídas..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Obras List */}
      <div className="space-y-4">
        {obrasFiltradas.length === 0 ? (
          <Card className="p-12 text-center">
            <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhuma obra concluída encontrada.</p>
          </Card>
        ) : (
          obrasFiltradas.map((obra) => (
            <Card key={obra.id} className="border-l-4 border-l-green-500">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">{obra.nome}</CardTitle>
                      <Badge className="bg-green-500/10 text-green-600 border border-green-500/30">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Concluída
                      </Badge>
                    </div>
                    <CardDescription>
                      Cliente: {obra.cliente} | Empreiteiro: {obra.empreiteiro}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1">{renderStars(obra.rating)}</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{obra.localizacao}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{new Date(obra.dataConclusao).toLocaleDateString("pt-PT")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Euro className="w-4 h-4 text-muted-foreground" />
                    <span>{formatCurrency(obra.valorTotal)}</span>
                  </div>
                  <div className="text-sm">
                    <Badge variant="outline">{obra.tipo}</Badge>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Detalhes
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Ver Documentos
                  </Button>
                  {obra.feedback ? (
                    <Badge variant="secondary" className="h-9 px-3">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                      Feedback recebido
                    </Badge>
                  ) : (
                    <Button size="sm">Solicitar Feedback</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
