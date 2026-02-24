"use client"

import Link from "next/link"
import {
  MessageSquare,
  Upload,
  PlusCircle,
  ClipboardCheck,
  Calendar,
  Building2,
  Receipt,
  CalendarDays,
  CheckCircle2,
  Star,
  Users,
  GitBranch,
  BarChart3, // Import BarChart3
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
  const obrasConcluidas = obras.filter((o) => o.status === "rejeitado").length // Using rejeitado as concluída for demo
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

  // Tarefas da semana para calendário
  const tarefasSemana = [
    { dia: "Segunda", tarefa: "Visita técnica - Lisboa", hora: "10:00" },
    { dia: "Terça", tarefa: "Reunião com cliente", hora: "14:00" },
    { dia: "Quarta", tarefa: "Apresentação orçamentos", hora: "11:00" },
    { dia: "Quinta", tarefa: "Acompanhamento obra Porto", hora: "09:00" },
    { dia: "Sexta", tarefa: "Validação de propostas", hora: "15:00" },
  ]

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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Obras Concluídas</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{obrasConcluidas}</div>
            <p className="text-xs text-muted-foreground">finalizadas</p>
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
        <>
          {/* Calendário da Semana e Tarefas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-primary" />
                  Calendário da Semana
                </CardTitle>
                <CardDescription>Tarefas a executar e gestão de obras</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tarefasSemana.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-16 text-sm font-medium text-primary">{item.dia}</div>
                        <div className="text-sm text-foreground">{item.tarefa}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">{item.hora}</div>
                    </div>
                  ))}
                </div>
                <Link href="/dashboard?tab=calendar" className="mt-4 block">
                  <button className="w-full mt-4 text-sm text-primary hover:underline">
                    Ver calendário completo
                  </button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-primary" />
                  Gestão de Obras
                </CardTitle>
                <CardDescription>Acompanhe o progresso das obras ativas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">Remodelação Lisboa</p>
                      <p className="text-sm text-muted-foreground">Etapa 3: Orçamento</p>
                    </div>
                    <div className="w-24 bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "50%" }} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">Moradia Cascais</p>
                      <p className="text-sm text-muted-foreground">Etapa 2: Visita</p>
                    </div>
                    <div className="w-24 bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "33%" }} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">Prédio Porto</p>
                      <p className="text-sm text-muted-foreground">Etapa 5: Adjudicação</p>
                    </div>
                    <div className="w-24 bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "83%" }} />
                    </div>
                  </div>
                </div>
                <Link href="/dashboard?tab=workflow" className="mt-4 block">
                  <button className="w-full mt-4 text-sm text-primary hover:underline">
                    Ver gestão completa
                  </button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Ferramentas de Gestão</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

              <Link href="/dashboard?tab=empreiteiros">
                <Card className="hover:border-accent/50 hover:shadow-md transition-all cursor-pointer group h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-base">Lista de Empreiteiros</CardTitle>
                    <CardDescription>Gerencie empreiteiros e alvarás.</CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/dashboard?tab=feedback">
                <Card className="hover:border-accent/50 hover:shadow-md transition-all cursor-pointer group h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                      <Star className="w-6 h-6 text-amber-600" />
                    </div>
                    <CardTitle className="text-base">Feedback de Clientes</CardTitle>
                    <CardDescription>Controlo de qualidade interno.</CardDescription>
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
        </>
      )}

      {isTecnico && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Ferramentas do Mediador</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <Link href="/dashboard?tab=obras">
              <Card className="hover:border-accent/50 hover:shadow-md transition-all cursor-pointer group h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Building2 className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle className="text-base">Lista de Obras</CardTitle>
                  <CardDescription>Obras atribuídas pela LAT.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/dashboard?tab=contas">
              <Card className="hover:border-accent/50 hover:shadow-md transition-all cursor-pointer group h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                    <Receipt className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-base">Consulta de Contas</CardTitle>
                  <CardDescription>Consulte os seus movimentos.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      )}

      {/* Quick actions for all users */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Ações rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/dashboard?tab=contas">
            <Card className="hover:border-accent/50 hover:shadow-md transition-all cursor-pointer group h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                  <Upload className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-base">Consulta de Contas</CardTitle>
                <CardDescription>Consulte os seus documentos e movimentos financeiros.</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/dashboard?tab=chat">
            <Card className="hover:border-accent/50 hover:shadow-md transition-all cursor-pointer group h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-base">Iniciar Conversa</CardTitle>
                <CardDescription>Comunique diretamente com a nossa equipa.</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/dashboard?tab=notifications">
            <Card className="hover:border-accent/50 hover:shadow-md transition-all cursor-pointer group h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                  <PlusCircle className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-base">Notificações</CardTitle>
                <CardDescription>Veja as suas notificações e alertas.</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
