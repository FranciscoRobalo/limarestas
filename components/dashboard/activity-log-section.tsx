"use client"

import { useState } from "react"
import { useActivityLog } from "@/hooks/use-activity-log"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Activity,
  Search,
  Filter,
  Trash2,
  User,
  FileText,
  Calendar,
  MessageSquare,
  Building2,
  Megaphone,
  Settings,
  Download,
} from "lucide-react"

const entityIcons = {
  obra: Building2,
  documento: FileText,
  visita: Calendar,
  mensagem: MessageSquare,
  usuario: User,
  publicidade: Megaphone,
  sistema: Settings,
}

const entityColors = {
  obra: "bg-blue-100 text-blue-700",
  documento: "bg-green-100 text-green-700",
  visita: "bg-purple-100 text-purple-700",
  mensagem: "bg-amber-100 text-amber-700",
  usuario: "bg-cyan-100 text-cyan-700",
  publicidade: "bg-pink-100 text-pink-700",
  sistema: "bg-gray-100 text-gray-700",
}

const roleColors = {
  admin: "bg-red-100 text-red-700",
  tecnico: "bg-blue-100 text-blue-700",
  public: "bg-green-100 text-green-700",
  publicidade: "bg-purple-100 text-purple-700",
}

export function ActivityLogSection() {
  const { logs, clearLogs } = useActivityLog()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterEntity, setFilterEntity] = useState<string>("all")
  const [filterUser, setFilterUser] = useState<string>("all")

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesEntity = filterEntity === "all" || log.entityType === filterEntity
    const matchesUser = filterUser === "all" || log.userId === filterUser

    return matchesSearch && matchesEntity && matchesUser
  })

  const uniqueUsers = [...new Set(logs.map((l) => l.userId))]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("pt-PT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const exportLogs = () => {
    const csv = [
      ["Data", "Utilizador", "Função", "Ação", "Detalhes", "Tipo", "ID Entidade"].join(","),
      ...filteredLogs.map((log) =>
        [
          formatDate(log.timestamp),
          log.userName,
          log.userRole,
          log.action,
          `"${log.details.replace(/"/g, '""')}"`,
          log.entityType,
          log.entityId || "",
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `logs-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Registo de Atividades</h2>
          <p className="text-muted-foreground">Histórico completo de todas as ações na plataforma</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportLogs}>
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
          <Button variant="destructive" onClick={clearLogs}>
            <Trash2 className="w-4 h-4 mr-2" />
            Limpar Logs
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{logs.length}</p>
                <p className="text-sm text-muted-foreground">Total de Ações</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{uniqueUsers.length}</p>
                <p className="text-sm text-muted-foreground">Utilizadores Ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{logs.filter((l) => l.entityType === "obra").length}</p>
                <p className="text-sm text-muted-foreground">Ações em Obras</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 rounded-lg">
                <FileText className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{logs.filter((l) => l.entityType === "documento").length}</p>
                <p className="text-sm text-muted-foreground">Documentos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterEntity}
              onChange={(e) => setFilterEntity(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="all">Todos os tipos</option>
              <option value="obra">Obras</option>
              <option value="documento">Documentos</option>
              <option value="visita">Visitas</option>
              <option value="mensagem">Mensagens</option>
              <option value="usuario">Utilizadores</option>
              <option value="publicidade">Publicidade</option>
              <option value="sistema">Sistema</option>
            </select>
            <select
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="all">Todos os utilizadores</option>
              {uniqueUsers.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Logs List */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Atividades</CardTitle>
          <CardDescription>{filteredLogs.length} registo(s) encontrado(s)</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredLogs.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma atividade registada</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredLogs.map((log) => {
                const Icon = entityIcons[log.entityType]
                return (
                  <div
                    key={log.id}
                    className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                  >
                    <div className={`p-2 rounded-lg ${entityColors[log.entityType]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-foreground">{log.action}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${roleColors[log.userRole as keyof typeof roleColors] || "bg-gray-100 text-gray-700"}`}
                        >
                          {log.userRole}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{log.details}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {log.userName}
                        </span>
                        <span>{formatDate(log.timestamp)}</span>
                        {log.entityId && (
                          <span className="font-mono bg-secondary px-1.5 py-0.5 rounded">
                            ID: {log.entityId.slice(0, 8)}...
                          </span>
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
    </div>
  )
}
