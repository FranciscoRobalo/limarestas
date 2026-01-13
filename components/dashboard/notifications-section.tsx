"use client"

import { useState } from "react"
import { useObras } from "@/hooks/use-obras"
import { useVisitas } from "@/hooks/use-visitas"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, CheckCircle, AlertCircle, Trash2, CheckCheck } from "lucide-react"

interface Notification {
  id: string
  tipo: "info" | "success" | "warning" | "error"
  titulo: string
  mensagem: string
  data: string
  lida: boolean
  link?: string
}

export function NotificationsSection() {
  const { obras } = useObras()
  const { visitas } = useVisitas()

  // Generate notifications based on real data
  const generateNotifications = (): Notification[] => {
    const notifications: Notification[] = []

    // Obras pendentes
    const obrasPendentes = obras.filter((o) => o.status === "pendente")
    obrasPendentes.forEach((obra) => {
      notifications.push({
        id: `obra-pendente-${obra.id}`,
        tipo: "warning",
        titulo: "Obra Pendente de Aprovação",
        mensagem: `A obra "${obra.nome}" está aguardando aprovação.`,
        data: obra.dataSubmissao,
        lida: false,
      })
    })

    // Obras aprovadas
    const obrasAprovadas = obras.filter((o) => o.status === "aprovado")
    obrasAprovadas.forEach((obra) => {
      notifications.push({
        id: `obra-aprovada-${obra.id}`,
        tipo: "success",
        titulo: "Obra Aprovada",
        mensagem: `A obra "${obra.nome}" foi aprovada!`,
        data: obra.dataSubmissao,
        lida: false,
      })
    })

    // Visitas confirmadas
    const visitasConfirmadas = visitas.filter((v) => v.status === "confirmada")
    visitasConfirmadas.forEach((visita) => {
      notifications.push({
        id: `visita-${visita.id}`,
        tipo: "info",
        titulo: "Visita Agendada",
        mensagem: `Visita técnica agendada para ${new Date(visita.data).toLocaleDateString("pt-PT")} às ${visita.horario}.`,
        data: visita.data,
        lida: false,
      })
    })

    return notifications.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
  }

  const [notifications, setNotifications] = useState<Notification[]>(generateNotifications)

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, lida: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, lida: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const unreadCount = notifications.filter((n) => !n.lida).length

  const tipoConfig = {
    info: { icon: Bell, color: "bg-blue-100 text-blue-700" },
    success: { icon: CheckCircle, color: "bg-green-100 text-green-700" },
    warning: { icon: AlertCircle, color: "bg-amber-100 text-amber-700" },
    error: { icon: AlertCircle, color: "bg-red-100 text-red-700" },
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `Há ${diffMins} minutos`
    if (diffHours < 24) return `Há ${diffHours} horas`
    if (diffDays < 7) return `Há ${diffDays} dias`
    return date.toLocaleDateString("pt-PT")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Notificações</h2>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} notificação(ões) por ler` : "Todas as notificações lidas"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <CheckCheck className="w-4 h-4 mr-2" />
            Marcar todas como lidas
          </Button>
          <Button variant="destructive" onClick={clearAll} disabled={notifications.length === 0}>
            <Trash2 className="w-4 h-4 mr-2" />
            Limpar tudo
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Bell className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{notifications.length}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{unreadCount}</p>
                <p className="text-sm text-muted-foreground">Por ler</p>
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
                <p className="text-2xl font-bold">{notifications.filter((n) => n.tipo === "success").length}</p>
                <p className="text-sm text-muted-foreground">Sucessos</p>
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
                <p className="text-2xl font-bold">{notifications.filter((n) => n.tipo === "warning").length}</p>
                <p className="text-sm text-muted-foreground">Alertas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Todas as Notificações</CardTitle>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma notificação</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => {
                const config = tipoConfig[notification.tipo]
                const Icon = config.icon
                return (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${
                      notification.lida ? "border-border bg-background opacity-60" : "border-primary/20 bg-primary/5"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${config.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{notification.titulo}</h4>
                        {!notification.lida && <span className="w-2 h-2 bg-primary rounded-full" />}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.mensagem}</p>
                      <p className="text-xs text-muted-foreground mt-2">{formatDate(notification.data)}</p>
                    </div>
                    <div className="flex gap-2">
                      {!notification.lida && (
                        <Button size="sm" variant="ghost" onClick={() => markAsRead(notification.id)}>
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" onClick={() => deleteNotification(notification.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
