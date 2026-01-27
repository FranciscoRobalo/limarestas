"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ClipboardCheck, Clock, CheckCircle2, XCircle, AlertCircle, Eye, MapPin, Calendar, Euro } from "lucide-react"
import { useObras } from "@/hooks/use-obras"
import type React from "react"

type StatusType = "pendente" | "em-analise" | "aprovado" | "rejeitado" | "informacao-adicional"

interface Obra {
  id: string
  nome: string
  tipo: string
  localizacao: string
  distrito?: string
  dataSubmissao: string
  status: StatusType
  observacoes?: string
  orcamento: string
}

const statusConfig: Record<StatusType, { label: string; color: string; icon: React.ElementType; bgColor: string }> = {
  pendente: {
    label: "Pendente",
    color: "text-yellow-600",
    icon: Clock,
    bgColor: "bg-yellow-500/10 border-yellow-500/30",
  },
  "em-analise": {
    label: "Em Análise",
    color: "text-blue-600",
    icon: Eye,
    bgColor: "bg-blue-500/10 border-blue-500/30",
  },
  aprovado: {
    label: "Aprovado",
    color: "text-green-600",
    icon: CheckCircle2,
    bgColor: "bg-green-500/10 border-green-500/30",
  },
  rejeitado: {
    label: "Rejeitado",
    color: "text-red-600",
    icon: XCircle,
    bgColor: "bg-red-500/10 border-red-500/30",
  },
  "informacao-adicional": {
    label: "Info. Adicional",
    color: "text-orange-600",
    icon: AlertCircle,
    bgColor: "bg-orange-500/10 border-orange-500/30",
  },
}

export function ValidacaoSection() {
  const { obras, updateObra } = useObras()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif text-foreground mb-2">Pré-Validação de Obras</h2>
        <p className="text-muted-foreground">
          Acompanhe o estado de aprovação de cada obra submetida. O sistema de cores indica o progresso de cada projeto.
        </p>
      </div>

      {/* Status Legend */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <ClipboardCheck className="w-4 h-4" />
            Legenda de Estados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {Object.entries(statusConfig).map(([key, config]) => {
              const Icon = config.icon
              return (
                <div key={key} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${config.bgColor}`}>
                  <Icon className={`w-4 h-4 ${config.color}`} />
                  <span className={`text-sm font-medium ${config.color}`}>{config.label}</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Obras List */}
      {obras.length === 0 ? (
        <Card className="p-12 text-center">
          <ClipboardCheck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhuma obra submetida ainda.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Submeta uma nova obra na tab &quot;Nova Obra&quot; para começar.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {obras.map((obra) => {
            const status = statusConfig[obra.status]
            const StatusIcon = status.icon

            return (
              <Card
                key={obra.id}
                className={`border-l-4 ${
                  obra.status === "aprovado"
                    ? "border-l-green-500"
                    : obra.status === "em-analise"
                      ? "border-l-blue-500"
                      : obra.status === "pendente"
                        ? "border-l-yellow-500"
                        : obra.status === "rejeitado"
                          ? "border-l-red-500"
                          : "border-l-orange-500"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg">{obra.nome}</CardTitle>
                      <CardDescription className="mt-1">Referência: {obra.id}</CardDescription>
                    </div>
                    <Badge className={`${status.bgColor} ${status.color} border`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {status.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {obra.localizacao}
                      {obra.distrito ? `, ${obra.distrito}` : ""}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(obra.dataSubmissao).toLocaleDateString("pt-PT")}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Euro className="w-4 h-4" />
                      {obra.orcamento}
                    </div>
                    <div className="text-sm text-muted-foreground">Tipo: {obra.tipo}</div>
                  </div>

                  {obra.observacoes && (
                    <div className={`p-3 rounded-lg ${status.bgColor} border mb-4`}>
                      <p className="text-sm">
                        <span className="font-medium">Observações:</span> {obra.observacoes}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                    {obra.status === "informacao-adicional" && (
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                        Enviar Documentos
                      </Button>
                    )}
                    {obra.status === "aprovado" && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Agendar Visita
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
