"use client"

import Link from "next/link"
import { FileText, MessageSquare, Upload, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"

export function DashboardOverview() {
  const { user } = useAuth()

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div>
        <h2 className="text-2xl font-serif text-foreground mb-2">Olá, {user?.name}!</h2>
        <p className="text-muted-foreground">
          Bem-vindo ao seu painel de controlo. Aqui pode gerir os seus documentos e comunicar com a nossa equipa.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Documentos</CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">0</div>
            <p className="text-xs text-muted-foreground">ficheiros carregados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Mensagens</CardTitle>
            <MessageSquare className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">0</div>
            <p className="text-xs text-muted-foreground">conversas ativas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Última atividade</CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Agora</div>
            <p className="text-xs text-muted-foreground">sessão iniciada</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Ações rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/dashboard?tab=documents">
            <Card className="hover:border-accent/50 hover:shadow-md transition-all cursor-pointer group">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Upload className="w-6 h-6 text-accent" />
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
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <MessageSquare className="w-6 h-6 text-primary" />
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
    </div>
  )
}
