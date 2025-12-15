"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  FileText,
  Users,
  Calendar,
  Euro,
  Bell,
  ArrowRight,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Obra {
  id: string
  nome: string
  cliente: string
  etapaAtual: number
  tarefaAtual: string
  progresso: number
  diasRestantes: number
  alertas: number
}

interface Tarefa {
  id: string
  titulo: string
  descricao: string
  completada: boolean
  pendente: boolean
  prazo?: string
  alertas?: string[]
}

interface Etapa {
  id: number
  nome: string
  descricao: string
  icon: any
  tarefas: Tarefa[]
}

const etapas: Etapa[] = [
  {
    id: 1,
    nome: "Entrada de Obra",
    descricao: "Registo inicial e recolha de informação do cliente",
    icon: FileText,
    tarefas: [
      {
        id: "1.1",
        titulo: "Informe a LAT",
        descricao: "Notificar a equipa LAT sobre a nova obra",
        completada: false,
        pendente: false,
      },
      {
        id: "1.2",
        titulo: "Informe o Cliente",
        descricao: "Contactar o cliente para confirmar a receção da solicitação",
        completada: false,
        pendente: false,
      },
      {
        id: "1.3",
        titulo: "Preencha o Inquérito",
        descricao: "Completar o formulário de levantamento de necessidades",
        completada: false,
        pendente: false,
      },
    ],
  },
  {
    id: 2,
    nome: "Gerir Visitas à Obra",
    descricao: "Coordenação e acompanhamento das visitas técnicas",
    icon: Calendar,
    tarefas: [
      {
        id: "2.1",
        titulo: "Informe o Cliente",
        descricao: "Confirmar disponibilidade para visita técnica",
        completada: false,
        pendente: false,
      },
      {
        id: "2.2",
        titulo: "Marque a(s) Visita(s) à Obra",
        descricao: "Agendar data e hora com todas as partes",
        completada: false,
        pendente: false,
      },
      {
        id: "2.3",
        titulo: "Acompanhe a Visita Técnica",
        descricao: "Realizar a visita e documentar observações",
        completada: false,
        pendente: false,
      },
      {
        id: "2.4",
        titulo: "Aguardar por Relatório de Obra",
        descricao: "Receber e validar o relatório técnico da visita",
        completada: false,
        pendente: true,
        prazo: "Até 5 dias após a visita",
      },
    ],
  },
  {
    id: 3,
    nome: "Apresentar Orçamentos",
    descricao: "Organização e apresentação de propostas aos clientes",
    icon: Euro,
    tarefas: [
      {
        id: "3.1",
        titulo: "Aguardar até Receber Orçamentos",
        descricao: "Contactar empresas se não receber em 15 dias",
        completada: false,
        pendente: true,
        prazo: "15 dias",
        alertas: ["Caso não receba orçamentos em 15 dias, contactar a empresa"],
      },
      {
        id: "3.2",
        titulo: "Organize os Orçamentos",
        descricao: "Compilar e comparar todas as propostas recebidas",
        completada: false,
        pendente: false,
      },
      {
        id: "3.3",
        titulo: "Apresente as Propostas",
        descricao: "Preparar apresentação para o cliente",
        completada: false,
        pendente: false,
      },
      {
        id: "3.4",
        titulo: "Envie ao Cliente",
        descricao: "Enviar orçamentos e aguardar feedback",
        completada: false,
        pendente: false,
      },
    ],
  },
  {
    id: 4,
    nome: "Confirmar a Adjudicação",
    descricao: "Validação da decisão do cliente e contratação",
    icon: CheckCircle2,
    tarefas: [
      {
        id: "4.1",
        titulo: "Aguardar até Receber Feedback",
        descricao: "Contactar o cliente após 1 semana sem resposta",
        completada: false,
        pendente: true,
        prazo: "1 semana",
        alertas: ["Caso não receba feedback em 1 semana, contactar o cliente"],
      },
      {
        id: "4.2",
        titulo: "Confirme os Dados",
        descricao: "Validar toda a informação da adjudicação",
        completada: false,
        pendente: false,
      },
      {
        id: "4.3",
        titulo: "Aguardar Comprovativo de Adjudicação",
        descricao: "Receber documentação formal da contratação",
        completada: false,
        pendente: true,
        alertas: ["Reforçar pedido caso não receba comprovativo"],
      },
    ],
  },
  {
    id: 5,
    nome: "Pedido de Pagamento",
    descricao: "Solicitação e gestão de comissões",
    icon: Euro,
    tarefas: [
      {
        id: "5.1",
        titulo: "Peça a Sua Comissão",
        descricao: "Submeter pedido de pagamento de comissão",
        completada: false,
        pendente: false,
      },
      {
        id: "5.2",
        titulo: "Aguardar Comprovativo de Pagamento",
        descricao: "Confirmar receção do pagamento",
        completada: false,
        pendente: true,
        alertas: ["Reforçar pedido caso não receba comprovativo"],
      },
    ],
  },
  {
    id: 6,
    nome: "Encerrar Consultoria",
    descricao: "Finalização do processo e agradecimento",
    icon: CheckCircle2,
    tarefas: [
      {
        id: "6.1",
        titulo: "Aguardar Comprovativo Final",
        descricao: "Confirmar conclusão de todos os pagamentos",
        completada: false,
        pendente: true,
      },
      {
        id: "6.2",
        titulo: "Agradeça ao Cliente",
        descricao: "Enviar mensagem de agradecimento e solicitar feedback",
        completada: false,
        pendente: false,
      },
    ],
  },
]

const obrasExemplo: Obra[] = [
  {
    id: "1",
    nome: "Remodelação Apartamento T3 - Lisboa",
    cliente: "João Silva",
    etapaAtual: 3,
    tarefaAtual: "Aguardar até Receber Orçamentos",
    progresso: 45,
    diasRestantes: 8,
    alertas: 1,
  },
  {
    id: "2",
    nome: "Construção Moradia - Cascais",
    cliente: "Maria Santos",
    etapaAtual: 2,
    tarefaAtual: "Marque a(s) Visita(s) à Obra",
    progresso: 25,
    diasRestantes: 3,
    alertas: 0,
  },
  {
    id: "3",
    nome: "Reabilitação Prédio - Porto",
    cliente: "António Costa",
    etapaAtual: 5,
    tarefaAtual: "Peça a Sua Comissão",
    progresso: 85,
    diasRestantes: 15,
    alertas: 2,
  },
]

export function WorkflowSection() {
  const [obraSelecionada, setObraSelecionada] = useState<string | null>(null)
  const [etapaSelecionada, setEtapaSelecionada] = useState<number>(1)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif text-foreground mb-2">Gestão de Obras</h2>
        <p className="text-muted-foreground">
          Acompanhe o progresso das obras através das 6 etapas do processo de consultoria.
        </p>
      </div>

      <Tabs defaultValue="obras" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="obras">Obras em Curso</TabsTrigger>
          <TabsTrigger value="processo">Processo Completo</TabsTrigger>
        </TabsList>

        <TabsContent value="obras" className="space-y-6">
          {/* Estatísticas Rápidas */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Obras Ativas</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">+1 desde a última semana</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alertas Pendentes</CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Requerem atenção</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Progresso Médio</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">52%</div>
                <p className="text-xs text-muted-foreground">Across all active projects</p>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Obras */}
          <div className="space-y-4">
            {obrasExemplo.map((obra) => {
              const etapa = etapas.find((e) => e.id === obra.etapaAtual)
              return (
                <Card key={obra.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{obra.nome}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Cliente: {obra.cliente}
                        </CardDescription>
                      </div>
                      {obra.alertas > 0 && (
                        <Badge variant="destructive" className="flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {obra.alertas}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          {etapa && <etapa.icon className="w-4 h-4 text-primary" />}
                          <span className="font-medium">
                            Etapa {obra.etapaAtual}: {etapa?.nome}
                          </span>
                        </div>
                        <span className="text-muted-foreground">{obra.progresso}%</span>
                      </div>
                      <Progress value={obra.progresso} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        Tarefa Atual: {obra.tarefaAtual}
                      </div>
                      <Button size="sm" onClick={() => setObraSelecionada(obra.id)} className="flex items-center gap-2">
                        Ver Detalhes
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>

                    {obra.diasRestantes <= 5 && (
                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        <span className="text-sm text-amber-800 dark:text-amber-200">
                          {obra.diasRestantes} dias restantes para a próxima ação
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="processo" className="space-y-6">
          {/* Seletor de Etapas */}
          <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
            {etapas.map((etapa) => (
              <button
                key={etapa.id}
                onClick={() => setEtapaSelecionada(etapa.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  etapaSelecionada === etapa.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <etapa.icon className="w-5 h-5 text-primary" />
                  <span className="text-xs font-semibold text-muted-foreground">Etapa {etapa.id}</span>
                </div>
                <p className="text-sm font-medium text-foreground">{etapa.nome}</p>
              </button>
            ))}
          </div>

          {/* Detalhes da Etapa Selecionada */}
          {etapas
            .filter((etapa) => etapa.id === etapaSelecionada)
            .map((etapa) => (
              <Card key={etapa.id}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <etapa.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">
                        Etapa {etapa.id}: {etapa.nome}
                      </CardTitle>
                      <CardDescription>{etapa.descricao}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {etapa.tarefas.map((tarefa, index) => (
                      <div key={tarefa.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div
                              className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                tarefa.completada
                                  ? "bg-green-500 border-green-500"
                                  : tarefa.pendente
                                    ? "bg-amber-500 border-amber-500"
                                    : "border-muted-foreground"
                              }`}
                            >
                              {tarefa.completada && <CheckCircle2 className="w-4 h-4 text-white" />}
                              {tarefa.pendente && <Clock className="w-4 h-4 text-white" />}
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-foreground">{tarefa.titulo}</h4>
                                {tarefa.pendente && (
                                  <Badge variant="outline" className="text-amber-600 border-amber-600">
                                    Aguardando
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{tarefa.descricao}</p>
                              {tarefa.prazo && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Clock className="w-4 h-4" />
                                  Prazo: {tarefa.prazo}
                                </div>
                              )}
                              {tarefa.alertas &&
                                tarefa.alertas.map((alerta, i) => (
                                  <div
                                    key={i}
                                    className="bg-amber-500/10 border border-amber-500/30 rounded p-2 flex items-start gap-2"
                                  >
                                    <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-amber-800 dark:text-amber-200">{alerta}</span>
                                  </div>
                                ))}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant={tarefa.completada ? "outline" : "default"}
                            className="ml-4"
                            onClick={() => {}}
                          >
                            {tarefa.completada ? "Concluída" : "Marcar"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {etapa.id < 6 && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <Button className="w-full" size="lg">
                        <span>Avançar para Etapa {etapa.id + 1}</span>
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>

      {/* Mensagem de Sucesso */}
      {etapaSelecionada === 6 && (
        <Card className="bg-green-500/10 border-green-500/30">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="inline-flex p-4 bg-green-500/20 rounded-full">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-2">
                  Parabéns pelo Seu Trabalho!
                </h3>
                <p className="text-green-700 dark:text-green-300">
                  Obrigado por todo o empenho na gestão desta obra. A sua dedicação é fundamental para o sucesso dos
                  nossos projetos.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
