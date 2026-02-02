"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Ruler,
  HardHat,
  Briefcase,
  Search,
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  Eye,
  Plus,
} from "lucide-react"

interface Mediador {
  id: string
  nome: string
  tipo: "arquiteto" | "engenheiro" | "empreiteiro"
  empresa: string
  email: string
  telefone: string
  licenca: string // AMI, Ordem, Alvará
  documentosValidos: boolean
  dataRegisto: string
  status: "ativo" | "pendente" | "suspenso"
}

const mediadores: Mediador[] = [
  {
    id: "MED-001",
    nome: "Arq. Maria Santos",
    tipo: "arquiteto",
    empresa: "Santos Arquitetura",
    email: "maria@santosarquitetura.pt",
    telefone: "+351 912 345 678",
    licenca: "OA 12345",
    documentosValidos: true,
    dataRegisto: "2023-06-15",
    status: "ativo",
  },
  {
    id: "MED-002",
    nome: "Eng. João Ferreira",
    tipo: "engenheiro",
    empresa: "Ferreira Engenharia",
    email: "joao@ferreiraeng.pt",
    telefone: "+351 923 456 789",
    licenca: "OE 54321",
    documentosValidos: true,
    dataRegisto: "2023-08-20",
    status: "ativo",
  },
  {
    id: "MED-003",
    nome: "Carlos Costa",
    tipo: "empreiteiro",
    empresa: "Costa Construções",
    email: "carlos@costaconstrucoes.pt",
    telefone: "+351 934 567 890",
    licenca: "Alvará Classe 4",
    documentosValidos: false,
    dataRegisto: "2024-01-10",
    status: "pendente",
  },
  {
    id: "MED-004",
    nome: "Arq. Ana Rodrigues",
    tipo: "arquiteto",
    empresa: "AR Arquitetura",
    email: "ana@ararquitetura.pt",
    telefone: "+351 945 678 901",
    licenca: "OA 67890",
    documentosValidos: true,
    dataRegisto: "2023-11-05",
    status: "ativo",
  },
]

const tipoConfig = {
  arquiteto: { label: "Arquiteto", icon: Ruler, color: "text-blue-600", bgColor: "bg-blue-500/10" },
  engenheiro: { label: "Engenheiro", icon: HardHat, color: "text-green-600", bgColor: "bg-green-500/10" },
  empreiteiro: { label: "Empreiteiro", icon: Briefcase, color: "text-orange-600", bgColor: "bg-orange-500/10" },
}

const statusConfig = {
  ativo: { label: "Ativo", color: "bg-green-500/10 text-green-600 border-green-500/30" },
  pendente: { label: "Pendente", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30" },
  suspenso: { label: "Suspenso", color: "bg-red-500/10 text-red-600 border-red-500/30" },
}

export function PainelTecnicoSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("todos")

  const filteredMediadores = mediadores.filter((med) => {
    const matchSearch =
      med.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.empresa.toLowerCase().includes(searchTerm.toLowerCase())

    const matchTab = activeTab === "todos" || med.tipo === activeTab

    return matchSearch && matchTab
  })

  const countByType = {
    todos: mediadores.length,
    arquiteto: mediadores.filter((m) => m.tipo === "arquiteto").length,
    engenheiro: mediadores.filter((m) => m.tipo === "engenheiro").length,
    empreiteiro: mediadores.filter((m) => m.tipo === "empreiteiro").length,
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground mb-2">Painel Técnico</h2>
          <p className="text-muted-foreground">
            Gestão de mediadores técnicos: Arquitetos, Engenheiros e Empreiteiros com documentos obrigatórios.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Mediador
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Mediador</DialogTitle>
              <DialogDescription>
                Registe um novo mediador técnico na plataforma.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Nome Completo</Label>
                <Input placeholder="Nome do mediador" />
              </div>
              <div className="space-y-2">
                <Label>Tipo</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="arquiteto">Arquiteto</option>
                  <option value="engenheiro">Engenheiro</option>
                  <option value="empreiteiro">Empreiteiro</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Licença / Ordem / Alvará</Label>
                <Input placeholder="Ex: OA 12345, OE 54321, Alvará Classe 4" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="email@exemplo.pt" />
              </div>
              <Button className="w-full">Registar Mediador</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">{countByType.todos}</div>
            <p className="text-sm text-muted-foreground">Total Mediadores</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-blue-600" />
              <div className="text-2xl font-bold text-foreground">{countByType.arquiteto}</div>
            </div>
            <p className="text-sm text-muted-foreground">Arquitetos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <HardHat className="w-5 h-5 text-green-600" />
              <div className="text-2xl font-bold text-foreground">{countByType.engenheiro}</div>
            </div>
            <p className="text-sm text-muted-foreground">Engenheiros</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-orange-600" />
              <div className="text-2xl font-bold text-foreground">{countByType.empreiteiro}</div>
            </div>
            <p className="text-sm text-muted-foreground">Empreiteiros</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Tabs */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar mediadores..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="todos">Todos ({countByType.todos})</TabsTrigger>
            <TabsTrigger value="arquiteto">Arquitetos ({countByType.arquiteto})</TabsTrigger>
            <TabsTrigger value="engenheiro">Engenheiros ({countByType.engenheiro})</TabsTrigger>
            <TabsTrigger value="empreiteiro">Empreiteiros ({countByType.empreiteiro})</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Mediadores List */}
      <div className="space-y-4">
        {filteredMediadores.length === 0 ? (
          <Card className="p-12 text-center">
            <Ruler className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum mediador encontrado.</p>
          </Card>
        ) : (
          filteredMediadores.map((med) => {
            const tipo = tipoConfig[med.tipo]
            const status = statusConfig[med.status]
            const TipoIcon = tipo.icon

            return (
              <Card key={med.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl ${tipo.bgColor} flex items-center justify-center`}>
                        <TipoIcon className={`w-6 h-6 ${tipo.color}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{med.nome}</CardTitle>
                          <Badge className={`${status.color} border`}>{status.label}</Badge>
                        </div>
                        <CardDescription>{med.empresa}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">{tipo.label}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Licença:</span>
                      <p className="font-medium">{med.licenca}</p>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Email:</span>
                      <p className="font-medium">{med.email}</p>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Telefone:</span>
                      <p className="font-medium">{med.telefone}</p>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Data Registo:</span>
                      <p className="font-medium">{new Date(med.dataRegisto).toLocaleDateString("pt-PT")}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    {med.documentosValidos ? (
                      <div className="flex items-center gap-2 text-green-600 text-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        Documentos válidos
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-amber-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        Documentos pendentes
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Documentos
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Ver Obras
                    </Button>
                    {!med.documentosValidos && (
                      <Button size="sm" className="bg-amber-500 hover:bg-amber-600">
                        <Clock className="w-4 h-4 mr-2" />
                        Solicitar Documentos
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
