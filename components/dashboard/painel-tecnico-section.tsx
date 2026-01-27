"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  Ruler,
  HardHat,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  Award,
  Mail,
  Phone,
  Eye,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Mediador {
  id: string
  nome: string
  tipo: "arquiteto" | "engenheiro" | "empreiteiro"
  empresa: string
  email: string
  telefone: string
  licencaAMI?: string
  alvara?: string
  ordemProfissional?: string
  documentos: {
    licenca: boolean
    alvara: boolean
    seguro: boolean
    certidao: boolean
  }
  status: "pendente" | "aprovado" | "rejeitado"
  dataRegisto: string
}

const mediadores: Mediador[] = [
  {
    id: "MED-001",
    nome: "Dr. Carlos Oliveira",
    tipo: "arquiteto",
    empresa: "Oliveira Arquitetura",
    email: "carlos@oliveira-arq.pt",
    telefone: "+351 912 111 222",
    ordemProfissional: "OA12345",
    documentos: { licenca: true, alvara: false, seguro: true, certidao: true },
    status: "aprovado",
    dataRegisto: "2024-01-15"
  },
  {
    id: "MED-002",
    nome: "Eng. Maria Silva",
    tipo: "engenheiro",
    empresa: "Silva Engenharia",
    email: "maria@silva-eng.pt",
    telefone: "+351 923 222 333",
    ordemProfissional: "OE54321",
    documentos: { licenca: true, alvara: false, seguro: true, certidao: false },
    status: "pendente",
    dataRegisto: "2024-02-01"
  },
  {
    id: "MED-003",
    nome: "António Ferreira",
    tipo: "empreiteiro",
    empresa: "Ferreira Construções",
    email: "antonio@ferreira-const.pt",
    telefone: "+351 934 333 444",
    alvara: "Classe 4",
    licencaAMI: "AMI-12345",
    documentos: { licenca: true, alvara: true, seguro: true, certidao: true },
    status: "aprovado",
    dataRegisto: "2024-01-20"
  },
  {
    id: "MED-004",
    nome: "Dr. João Costa",
    tipo: "arquiteto",
    empresa: "Costa Design",
    email: "joao@costadesign.pt",
    telefone: "+351 915 444 555",
    ordemProfissional: "OA67890",
    documentos: { licenca: false, alvara: false, seguro: false, certidao: false },
    status: "pendente",
    dataRegisto: "2024-02-10"
  },
]

const tipoConfig = {
  arquiteto: { label: "Arquiteto", icon: Ruler, color: "bg-blue-100 text-blue-700" },
  engenheiro: { label: "Engenheiro", icon: Building2, color: "bg-purple-100 text-purple-700" },
  empreiteiro: { label: "Empreiteiro", icon: HardHat, color: "bg-orange-100 text-orange-700" },
}

const statusConfig = {
  pendente: { label: "Pendente", color: "bg-yellow-100 text-yellow-700", icon: Clock },
  aprovado: { label: "Aprovado", color: "bg-green-100 text-green-700", icon: CheckCircle2 },
  rejeitado: { label: "Rejeitado", color: "bg-red-100 text-red-700", icon: XCircle },
}

export function PainelTecnicoSection() {
  const [selectedTab, setSelectedTab] = useState("todos")

  const filteredMediadores = selectedTab === "todos" 
    ? mediadores 
    : mediadores.filter(m => m.tipo === selectedTab)

  const pendentes = mediadores.filter(m => m.status === "pendente").length

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif text-foreground mb-2">Painel Técnico - Mediadores</h2>
        <p className="text-muted-foreground">
          Gerencie arquitetos, engenheiros e empreiteiros com os seus documentos obrigatórios, licenças AMI, alvarás e ordens profissionais.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Registados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mediadores.length}</div>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Aprovados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mediadores.filter(m => m.status === "aprovado").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Documentos em Falta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {mediadores.filter(m => !m.documentos.licenca || !m.documentos.seguro || !m.documentos.certidao).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="arquiteto">Arquitetos</TabsTrigger>
          <TabsTrigger value="engenheiro">Engenheiros</TabsTrigger>
          <TabsTrigger value="empreiteiro">Empreiteiros</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4 mt-6">
          {filteredMediadores.length === 0 ? (
            <Card className="p-12 text-center">
              <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum mediador encontrado nesta categoria.</p>
            </Card>
          ) : (
            filteredMediadores.map((mediador) => {
              const tipo = tipoConfig[mediador.tipo]
              const status = statusConfig[mediador.status]
              const TipoIcon = tipo.icon
              const StatusIcon = status.icon

              return (
                <Card key={mediador.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${tipo.color}`}>
                          <TipoIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{mediador.nome}</CardTitle>
                          <CardDescription>{mediador.empresa}</CardDescription>
                        </div>
                      </div>
                      <Badge className={`${status.color} border-0`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {status.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>{mediador.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{mediador.telefone}</span>
                      </div>
                      {mediador.ordemProfissional && (
                        <div className="flex items-center gap-2 text-sm">
                          <Award className="w-4 h-4 text-muted-foreground" />
                          <span>Ordem: {mediador.ordemProfissional}</span>
                        </div>
                      )}
                      {mediador.licencaAMI && (
                        <div className="flex items-center gap-2 text-sm">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span>{mediador.licencaAMI}</span>
                        </div>
                      )}
                      {mediador.alvara && (
                        <div className="flex items-center gap-2 text-sm">
                          <Award className="w-4 h-4 text-muted-foreground" />
                          <span>Alvará: {mediador.alvara}</span>
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Documentos Obrigatórios:</p>
                      <div className="flex flex-wrap gap-4">
                        <div className={`flex items-center gap-1 text-sm ${mediador.documentos.licenca ? 'text-green-600' : 'text-red-600'}`}>
                          {mediador.documentos.licenca ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                          Licença/Ordem
                        </div>
                        {mediador.tipo === "empreiteiro" && (
                          <div className={`flex items-center gap-1 text-sm ${mediador.documentos.alvara ? 'text-green-600' : 'text-red-600'}`}>
                            {mediador.documentos.alvara ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                            Alvará
                          </div>
                        )}
                        <div className={`flex items-center gap-1 text-sm ${mediador.documentos.seguro ? 'text-green-600' : 'text-red-600'}`}>
                          {mediador.documentos.seguro ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                          Seguro
                        </div>
                        <div className={`flex items-center gap-1 text-sm ${mediador.documentos.certidao ? 'text-green-600' : 'text-red-600'}`}>
                          {mediador.documentos.certidao ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                          Certidão
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Detalhes
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{mediador.nome}</DialogTitle>
                            <DialogDescription>{mediador.empresa}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-3 pt-4">
                            <p className="text-sm"><strong>Tipo:</strong> {tipo.label}</p>
                            <p className="text-sm"><strong>Email:</strong> {mediador.email}</p>
                            <p className="text-sm"><strong>Telefone:</strong> {mediador.telefone}</p>
                            {mediador.ordemProfissional && (
                              <p className="text-sm"><strong>Ordem Profissional:</strong> {mediador.ordemProfissional}</p>
                            )}
                            {mediador.licencaAMI && (
                              <p className="text-sm"><strong>Licença AMI:</strong> {mediador.licencaAMI}</p>
                            )}
                            {mediador.alvara && (
                              <p className="text-sm"><strong>Alvará:</strong> {mediador.alvara}</p>
                            )}
                            <p className="text-sm"><strong>Data de Registo:</strong> {new Date(mediador.dataRegisto).toLocaleDateString('pt-PT')}</p>
                          </div>
                        </DialogContent>
                      </Dialog>
                      {mediador.status === "pendente" && (
                        <>
                          <Button className="bg-green-600 hover:bg-green-700">
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Aprovar
                          </Button>
                          <Button variant="destructive">
                            <XCircle className="w-4 h-4 mr-2" />
                            Rejeitar
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
