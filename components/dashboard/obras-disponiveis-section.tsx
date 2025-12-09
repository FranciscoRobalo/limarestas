"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Building2,
  MapPin,
  Euro,
  Search,
  Filter,
  UserPlus,
  Users,
  Clock,
  FileText,
  CheckCircle2,
  X,
} from "lucide-react"

interface ObraDisponivel {
  id: string
  titulo: string
  tipo: string
  localizacao: string
  distrito: string
  orcamentoMin: number
  orcamentoMax: number
  prazoSubmissao: string
  entidade: string
  descricao: string
  requisitos: string[]
  participantes: number
}

const obrasDisponiveis: ObraDisponivel[] = [
  {
    id: "CONC-2024-001",
    titulo: "Reabilitação de Escola Básica - Almada",
    tipo: "Reabilitação",
    localizacao: "Almada",
    distrito: "Setúbal",
    orcamentoMin: 150000,
    orcamentoMax: 200000,
    prazoSubmissao: "2024-02-28",
    entidade: "Câmara Municipal de Almada",
    descricao:
      "Reabilitação completa de escola básica incluindo cobertura, instalações elétricas, AVAC e acessibilidades.",
    requisitos: ["Alvará Classe 3", "Certificação ETICS", "Experiência em obras públicas"],
    participantes: 5,
  },
  {
    id: "CONC-2024-002",
    titulo: "Construção de Centro de Saúde - Loures",
    tipo: "Construção Nova",
    localizacao: "Loures",
    distrito: "Lisboa",
    orcamentoMin: 800000,
    orcamentoMax: 1200000,
    prazoSubmissao: "2024-03-15",
    entidade: "ARSLVT",
    descricao: "Construção de novo centro de saúde com 2000m² incluindo equipamento médico básico.",
    requisitos: ["Alvará Classe 5", "ISO 9001", "Experiência em equipamentos de saúde"],
    participantes: 8,
  },
  {
    id: "CONC-2024-003",
    titulo: "Remodelação de Mercado Municipal - Cascais",
    tipo: "Remodelação",
    localizacao: "Cascais",
    distrito: "Lisboa",
    orcamentoMin: 300000,
    orcamentoMax: 450000,
    prazoSubmissao: "2024-02-20",
    entidade: "Câmara Municipal de Cascais",
    descricao:
      "Remodelação interior do mercado municipal incluindo bancas, instalações sanitárias e sistema de refrigeração.",
    requisitos: ["Alvará Classe 4", "Certificação HACCP", "Experiência em espaços comerciais"],
    participantes: 12,
  },
  {
    id: "CONC-2024-004",
    titulo: "Ampliação de Pavilhão Desportivo - Sintra",
    tipo: "Ampliação",
    localizacao: "Sintra",
    distrito: "Lisboa",
    orcamentoMin: 500000,
    orcamentoMax: 700000,
    prazoSubmissao: "2024-03-01",
    entidade: "Junta de Freguesia de Sintra",
    descricao: "Ampliação de pavilhão desportivo com nova ala de 800m² incluindo balneários e sala de musculação.",
    requisitos: ["Alvará Classe 4", "Experiência em equipamentos desportivos"],
    participantes: 6,
  },
  {
    id: "CONC-2024-005",
    titulo: "Manutenção de Estradas Municipais - Oeiras",
    tipo: "Manutenção",
    localizacao: "Oeiras",
    distrito: "Lisboa",
    orcamentoMin: 80000,
    orcamentoMax: 120000,
    prazoSubmissao: "2024-02-15",
    entidade: "Câmara Municipal de Oeiras",
    descricao: "Manutenção e reparação de pavimentos em diversas estradas municipais.",
    requisitos: ["Alvará obras públicas", "Equipamento de pavimentação"],
    participantes: 15,
  },
]

const distritos = ["Todos", "Lisboa", "Setúbal", "Porto", "Braga", "Coimbra", "Faro"]
const tiposObra = ["Todos", "Reabilitação", "Construção Nova", "Remodelação", "Ampliação", "Manutenção"]
const faixasOrcamento = [
  { label: "Todos", min: 0, max: Number.POSITIVE_INFINITY },
  { label: "Até 100.000€", min: 0, max: 100000 },
  { label: "100.000€ - 500.000€", min: 100000, max: 500000 },
  { label: "500.000€ - 1.000.000€", min: 500000, max: 1000000 },
  { label: "Mais de 1.000.000€", min: 1000000, max: Number.POSITIVE_INFINITY },
]

export function ObrasDisponiveisSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroDistrito, setFiltroDistrito] = useState("Todos")
  const [filtroTipo, setFiltroTipo] = useState("Todos")
  const [filtroOrcamento, setFiltroOrcamento] = useState("Todos")
  const [emailConvite, setEmailConvite] = useState("")
  const [conviteEnviado, setConviteEnviado] = useState(false)
  const [obraSelecionada, setObraSelecionada] = useState<string | null>(null)

  const obrasFiltradas = obrasDisponiveis.filter((obra) => {
    const matchSearch =
      obra.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      obra.localizacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      obra.entidade.toLowerCase().includes(searchTerm.toLowerCase())

    const matchDistrito = filtroDistrito === "Todos" || obra.distrito === filtroDistrito
    const matchTipo = filtroTipo === "Todos" || obra.tipo === filtroTipo

    const faixaSelecionada = faixasOrcamento.find((f) => f.label === filtroOrcamento)
    const matchOrcamento =
      !faixaSelecionada ||
      (obra.orcamentoMin >= faixaSelecionada.min && obra.orcamentoMax <= faixaSelecionada.max) ||
      filtroOrcamento === "Todos"

    return matchSearch && matchDistrito && matchTipo && matchOrcamento
  })

  const handleConvite = () => {
    setConviteEnviado(true)
    setTimeout(() => {
      setConviteEnviado(false)
      setEmailConvite("")
    }, 3000)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(
      value,
    )
  }

  const getDaysRemaining = (date: string) => {
    const today = new Date()
    const deadline = new Date(date)
    const diff = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return diff
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif text-foreground mb-2">Obras Disponíveis</h2>
        <p className="text-muted-foreground">
          Consulte as obras disponíveis estilo concurso público. Pode filtrar, candidatar-se e convidar outros
          utilizadores.
        </p>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filtros de Pesquisa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search" className="text-sm">
                Pesquisar
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Título, local ou entidade..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Distrito</Label>
              <Select value={filtroDistrito} onValueChange={setFiltroDistrito}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {distritos.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Tipo de Obra</Label>
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tiposObra.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Orçamento</Label>
              <Select value={filtroOrcamento} onValueChange={setFiltroOrcamento}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {faixasOrcamento.map((f) => (
                    <SelectItem key={f.label} value={f.label}>
                      {f.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {(searchTerm || filtroDistrito !== "Todos" || filtroTipo !== "Todos" || filtroOrcamento !== "Todos") && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Filtros ativos:</span>
              {searchTerm && (
                <Badge variant="secondary" className="gap-1">
                  {searchTerm}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchTerm("")} />
                </Badge>
              )}
              {filtroDistrito !== "Todos" && (
                <Badge variant="secondary" className="gap-1">
                  {filtroDistrito}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setFiltroDistrito("Todos")} />
                </Badge>
              )}
              {filtroTipo !== "Todos" && (
                <Badge variant="secondary" className="gap-1">
                  {filtroTipo}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setFiltroTipo("Todos")} />
                </Badge>
              )}
              {filtroOrcamento !== "Todos" && (
                <Badge variant="secondary" className="gap-1">
                  {filtroOrcamento}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setFiltroOrcamento("Todos")} />
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resultados */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {obrasFiltradas.length} obra{obrasFiltradas.length !== 1 ? "s" : ""} encontrada
          {obrasFiltradas.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Lista de Obras */}
      <div className="space-y-4">
        {obrasFiltradas.length === 0 ? (
          <Card className="p-12 text-center">
            <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhuma obra encontrada com os filtros selecionados.</p>
          </Card>
        ) : (
          obrasFiltradas.map((obra) => {
            const diasRestantes = getDaysRemaining(obra.prazoSubmissao)
            const urgente = diasRestantes <= 7

            return (
              <Card key={obra.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{obra.titulo}</CardTitle>
                        {urgente && (
                          <Badge className="bg-red-500/10 text-red-600 border border-red-500/30">Urgente</Badge>
                        )}
                      </div>
                      <CardDescription>{obra.entidade}</CardDescription>
                    </div>
                    <Badge variant="outline">{obra.tipo}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{obra.descricao}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {obra.localizacao}, {obra.distrito}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Euro className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {formatCurrency(obra.orcamentoMin)} - {formatCurrency(obra.orcamentoMax)}
                      </span>
                    </div>
                    <div className={`flex items-center gap-2 text-sm ${urgente ? "text-red-600 font-medium" : ""}`}>
                      <Clock className="w-4 h-4" />
                      <span>{diasRestantes} dias restantes</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{obra.participantes} participantes</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Requisitos:</p>
                    <div className="flex flex-wrap gap-2">
                      {obra.requisitos.map((req, idx) => (
                        <Badge key={idx} variant="secondary" className="font-normal">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button className="bg-primary hover:bg-primary/90">
                      <FileText className="w-4 h-4 mr-2" />
                      Candidatar
                    </Button>
                    <Button variant="outline">Ver Detalhes</Button>

                    {/* Dialog para Convidar */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => setObraSelecionada(obra.id)}>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Convidar
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Convidar Utilizador</DialogTitle>
                          <DialogDescription>
                            Convide outro utilizador para participar nesta obra: {obra.titulo}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          {conviteEnviado ? (
                            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3">
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                              <p className="text-green-700 dark:text-green-300">Convite enviado com sucesso!</p>
                            </div>
                          ) : (
                            <>
                              <div className="space-y-2">
                                <Label htmlFor="email-convite">Email do utilizador</Label>
                                <Input
                                  id="email-convite"
                                  type="email"
                                  placeholder="exemplo@email.com"
                                  value={emailConvite}
                                  onChange={(e) => setEmailConvite(e.target.value)}
                                />
                              </div>
                              <Button
                                className="w-full bg-primary hover:bg-primary/90"
                                onClick={handleConvite}
                                disabled={!emailConvite}
                              >
                                Enviar Convite
                              </Button>
                            </>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
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
