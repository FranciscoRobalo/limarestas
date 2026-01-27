"use client"

import Link from "next/link"
import {
  MessageSquare,
  Upload,
  PlusCircle,
  ClipboardCheck,
  Calendar,
  Building2,
  BarChart3,
  Receipt,
  CalendarDays,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { useObras } from "@/hooks/use-obras"
import { useVisitas } from "@/hooks/use-visitas"
import { useMensagens } from "@/hooks/use-mensagens"

export function DashboardOverview() {
  const { user } = useAuth()
  const { obras } = useObras()
  const { visitas } = useVisitas()
  const { getNaoLidas } = useMensagens()

  const obrasAtivas = obras.filter((o) => o.status === "aprovado" || o.status === "em-analise").length
  const obrasPendentes = obras.filter((o) => o.status === "pendente").length
  const visitasProximas = visitas.filter((v) => {
    const visitaDate = new Date(v.data)
    const hoje = new Date()
    const umaSemana = new Date()
    umaSemana.setDate(hoje.getDate() + 7)
    return visitaDate >= hoje && visitaDate <= umaSemana && v.status !== "cancelada"
  }).length
  const mensagensNaoLidas = getNaoLidas().length

  const isAdmin = user?.role === "admin"
  const isTecnico = user?.role === "tecnico"

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div>
        <h2 className="text-2xl font-serif text-foreground mb-2">Olá, {user?.name}!</h2>
        <p className="text-muted-foreground">
          Bem-vindo ao seu painel de controlo. Gerencie as suas obras, documentos e comunique com a nossa equipa.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Obras Ativas</CardTitle>
            <Building2 className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{obrasAtivas}</div>
            <p className="text-xs text-muted-foreground">em andamento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pendentes</CardTitle>
            <ClipboardCheck className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{obrasPendentes}</div>
            <p className="text-xs text-muted-foreground">aguardam validação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Visitas</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{visitasProximas}</div>
            <p className="text-xs text-muted-foreground">agendada{visitasProximas !== 1 ? "s" : ""} esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Mensagens</CardTitle>
            <MessageSquare className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mensagensNaoLidas}</div>
            <p className="text-xs text-muted-foreground">não lida{mensagensNaoLidas !== 1 ? "s" : ""}</p>
          </CardContent>
        </Card>
      </div>

      {isAdmin && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Ferramentas de Gestão</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/dashboard?tab=analytics">
              <Card className="hover:border-accent/50 hover:shadow-md transition-all cursor-pointer group h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-base">Analytics</CardTitle>
                  <CardDescription>Visualize métricas e desempenho da plataforma.</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/dashboard?tab=invoices">
              <Card className="hover:border-accent/50 hover:shadow-md transition-all cursor-pointer group h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                    <Receipt className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-base">Faturação</CardTitle>
                  <CardDescription>Gerencie faturas e acompanhe pagamentos.</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/dashboard?tab=calendar">
              <Card className="hover:border-accent/50 hover:shadow-md transition-all cursor-pointer group h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                    <CalendarDays className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-base">Calendário</CardTitle>
                  <CardDescription>Visualize agenda de visitas e eventos.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      )}

      {isTecnico && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Ferramentas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/dashboard?tab=calendar">
              <Card className="hover:border-accent/50 hover:shadow-md transition-all cursor-pointer group h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                    <CalendarDays className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-base">Calendário</CardTitle>
                  <CardDescription>Visualize agenda de visitas e eventos.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Ações rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isAdmin && (
            <Link href="/dashboard?tab=nova-obra">
              <Card className="hover:border-accent/50 hover:shadow-md transition-all cursor-pointer group h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <PlusCircle className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-base">Nova Obra</CardTitle>
                  <CardDescription>Submeta um novo projeto para análise.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          )}

          {isAdmin && (
            <Link href="/dashboard?tab=validacao">
              <Card className="hover:border-accent/50 hover:shadow-md transition-all cursor-pointer group h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                    <ClipboardCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-base">Pré-Validação</CardTitle>
                  <CardDescription>Acompanhe o estado das suas obras.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          )}

          {(isAdmin || isTecnico) && (
            <Link href="/dashboard?tab=agendar">
              <Card className="hover:border-accent/50 hover:shadow-md transition-all cursor-pointer group h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-base">Agendar Visita</CardTitle>
                  <CardDescription>Marque uma visita técnica à obra.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          )}

          {(isAdmin || isTecnico) && (
            <Link href="/dashboard?tab=obras">
              <Card className="hover:border-accent/50 hover:shadow-md transition-all cursor-pointer group h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Building2 className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle className="text-base">Obras Disponíveis</CardTitle>
                  <CardDescription>Explore concursos e oportunidades.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          )}
        </div>
      </div>

      {/* Secondary actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/dashboard?tab=documents">
          <Card className="hover:border-accent/50 hover:shadow-md transition-all cursor-pointer group">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                <Upload className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle>Carregar Documentos</CardTitle>
              <CardDescription>
                Envie orçamentos, plantas, contratos e outros documentos relacionados com o seu projeto.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/dashboard?tab=chat">
          <Card className="hover:border-accent/50 hover:shadow-md transition-all cursor-pointer group">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                <MessageSquare className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Iniciar Conversa</CardTitle>
              <CardDescription>
                Comunique diretamente com a nossa equipa para esclarecer dúvidas ou acompanhar o seu projeto.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  )
}
