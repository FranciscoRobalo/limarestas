"use client"

import { useVisitas } from "@/hooks/use-visitas"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, Phone, CheckCircle, XCircle, AlertCircle } from "lucide-react"

const statusConfig = {
  pendente: {
    label: "Pendente",
    color: "bg-amber-100 text-amber-700",
    icon: AlertCircle,
  },
  confirmada: {
    label: "Confirmada",
    color: "bg-blue-100 text-blue-700",
    icon: CheckCircle,
  },
  concluida: {
    label: "Concluída",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },
  cancelada: {
    label: "Cancelada",
    color: "bg-red-100 text-red-700",
    icon: XCircle,
  },
}

export function VisitasAgendadasSection() {
  const { visitas, atualizarStatusVisita } = useVisitas()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-PT", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const visitasProximas = visitas
    .filter((v) => v.status !== "cancelada" && v.status !== "concluida")
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())

  const visitasPassadas = visitas
    .filter((v) => v.status === "concluida" || v.status === "cancelada")
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Visitas Agendadas</h2>
        <p className="text-muted-foreground">Consulte as suas visitas técnicas agendadas</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{visitas.length}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{visitas.filter((v) => v.status === "pendente").length}</p>
                <p className="text-sm text-muted-foreground">Pendentes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{visitas.filter((v) => v.status === "confirmada").length}</p>
                <p className="text-sm text-muted-foreground">Confirmadas</p>
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
                <p className="text-2xl font-bold">{visitas.filter((v) => v.status === "concluida").length}</p>
                <p className="text-sm text-muted-foreground">Concluídas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Próximas Visitas */}
      <Card>
        <CardHeader>
          <CardTitle>Próximas Visitas</CardTitle>
          <CardDescription>Visitas técnicas agendadas</CardDescription>
        </CardHeader>
        <CardContent>
          {visitasProximas.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma visita agendada</p>
            </div>
          ) : (
            <div className="space-y-4">
              {visitasProximas.map((visita) => {
                const status = statusConfig[visita.status]
                const StatusIcon = status.icon
                return (
                  <div
                    key={visita.id}
                    className="p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">{visita.obraNome}</h4>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(visita.data)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {visita.horario}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {visita.responsavel}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {visita.contacto}
                          </span>
                        </div>
                        {visita.observacoes && <p className="text-sm text-muted-foreground">{visita.observacoes}</p>}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${status.color}`}
                        >
                          <StatusIcon className="w-4 h-4" />
                          {status.label}
                        </span>
                        {visita.status === "confirmada" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => atualizarStatusVisita(visita.id, "cancelada")}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Cancelar
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Histórico */}
      {visitasPassadas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Histórico</CardTitle>
            <CardDescription>Visitas concluídas ou canceladas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {visitasPassadas.map((visita) => {
                const status = statusConfig[visita.status]
                return (
                  <div
                    key={visita.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg opacity-75"
                  >
                    <div>
                      <p className="font-medium">{visita.obraNome}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(visita.data)} às {visita.horario}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>{status.label}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
