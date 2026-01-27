"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  Search,
  Filter,
  Mail,
  Phone,
  FileText,
  CheckCircle2,
  Award,
  Briefcase,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Empreiteiro {
  id: string
  nome: string
  empresa: string
  especialidades: string[]
  localizacao: string
  distrito: string
  alvara: string
  email: string
  telefone: string
  obrasRealizadas: number
  avaliacaoMedia: number
  documentos: {
    alvara: boolean
    seguro: boolean
    certidao: boolean
  }
}

const empreiteiros: Empreiteiro[] = [
  {
    id: "EMP-001",
    nome: "José Ferreira",
    empresa: "Construções Ferreira Lda",
    especialidades: ["Remodelação", "Construção Civil", "Reabilitação"],
    localizacao: "Lisboa",
    distrito: "Lisboa",
    alvara: "Classe 4",
    email: "geral@ferreira-construcoes.pt",
    telefone: "+351 912 345 678",
    obrasRealizadas: 45,
    avaliacaoMedia: 4.7,
    documentos: { alvara: true, seguro: true, certidao: true }
  },
  {
    id: "EMP-002",
    nome: "António Santos",
    empresa: "Santos & Filhos Construções",
    especialidades: ["Pintura", "Pavimentos", "Carpintaria"],
    localizacao: "Porto",
    distrito: "Porto",
    alvara: "Classe 3",
    email: "info@santosfilhos.pt",
    telefone: "+351 923 456 789",
    obrasRealizadas: 32,
    avaliacaoMedia: 4.5,
    documentos: { alvara: true, seguro: true, certidao: false }
  },
  {
    id: "EMP-003",
    nome: "Manuel Costa",
    empresa: "Costa Obras",
    especialidades: ["Canalização", "Eletricidade", "AVAC"],
    localizacao: "Setúbal",
    distrito: "Setúbal",
    alvara: "Classe 2",
    email: "costa.obras@email.pt",
    telefone: "+351 934 567 890",
    obrasRealizadas: 28,
    avaliacaoMedia: 4.8,
    documentos: { alvara: true, seguro: false, certidao: true }
  },
]

const distritos = ["Todos", "Lisboa", "Porto", "Setúbal", "Braga", "Coimbra", "Faro"]
const especialidadesLista = ["Todas", "Remodelação", "Construção Civil", "Reabilitação", "Pintura", "Pavimentos", "Canalização", "Eletricidade"]

export function EmpreiteirosSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroDistrito, setFiltroDistrito] = useState("Todos")
  const [filtroEspecialidade, setFiltroEspecialidade] = useState("Todas")
  const [empreiteiroBSelecionado, setEmpreiteiroSelecionado] = useState<Empreiteiro | null>(null)

  const empreiteirosFiltrados = empreiteiros.filter((emp) => {
    const matchSearch =
      emp.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.empresa.toLowerCase().includes(searchTerm.toLowerCase())

    const matchDistrito = filtroDistrito === "Todos" || emp.distrito === filtroDistrito
    const matchEspecialidade = filtroEspecialidade === "Todas" || emp.especialidades.includes(filtroEspecialidade)

    return matchSearch && matchDistrito && matchEspecialidade
  })

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif text-foreground mb-2">Lista de Empreiteiros</h2>
        <p className="text-muted-foreground">
          Consulte os empreiteiros registados na plataforma, com informações sobre trabalhos que executam, alvarás e documentação.
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search" className="text-sm">
                Pesquisar
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Nome ou empresa..."
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
              <Label className="text-sm">Especialidade</Label>
              <Select value={filtroEspecialidade} onValueChange={setFiltroEspecialidade}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {especialidadesLista.map((e) => (
                    <SelectItem key={e} value={e}>
                      {e}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {empreiteirosFiltrados.length} empreiteiro{empreiteirosFiltrados.length !== 1 ? "s" : ""} encontrado
          {empreiteirosFiltrados.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Lista de Empreiteiros */}
      <div className="space-y-4">
        {empreiteirosFiltrados.length === 0 ? (
          <Card className="p-12 text-center">
            <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum empreiteiro encontrado com os filtros selecionados.</p>
          </Card>
        ) : (
          empreiteirosFiltrados.map((empreiteiro) => (
            <Card key={empreiteiro.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{empreiteiro.empresa}</CardTitle>
                    <CardDescription>{empreiteiro.nome}</CardDescription>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    {empreiteiro.alvara}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{empreiteiro.localizacao}, {empreiteiro.distrito}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <span>{empreiteiro.obrasRealizadas} obras realizadas</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{empreiteiro.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{empreiteiro.telefone}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Especialidades:</p>
                  <div className="flex flex-wrap gap-2">
                    {empreiteiro.especialidades.map((esp, idx) => (
                      <Badge key={idx} variant="secondary" className="font-normal">
                        {esp}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Documentação:</p>
                  <div className="flex flex-wrap gap-4">
                    <div className={`flex items-center gap-1 text-sm ${empreiteiro.documentos.alvara ? 'text-green-600' : 'text-red-600'}`}>
                      {empreiteiro.documentos.alvara ? <CheckCircle2 className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                      Alvará
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${empreiteiro.documentos.seguro ? 'text-green-600' : 'text-red-600'}`}>
                      {empreiteiro.documentos.seguro ? <CheckCircle2 className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                      Seguro
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${empreiteiro.documentos.certidao ? 'text-green-600' : 'text-red-600'}`}>
                      {empreiteiro.documentos.certidao ? <CheckCircle2 className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                      Certidão
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => setEmpreiteiroSelecionado(empreiteiro)}>
                        Ver Detalhes
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>{empreiteiro.empresa}</DialogTitle>
                        <DialogDescription>Detalhes do empreiteiro</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <p className="text-sm"><strong>Responsável:</strong> {empreiteiro.nome}</p>
                        <p className="text-sm"><strong>Email:</strong> {empreiteiro.email}</p>
                        <p className="text-sm"><strong>Telefone:</strong> {empreiteiro.telefone}</p>
                        <p className="text-sm"><strong>Alvará:</strong> {empreiteiro.alvara}</p>
                        <p className="text-sm"><strong>Obras Realizadas:</strong> {empreiteiro.obrasRealizadas}</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Mail className="w-4 h-4 mr-2" />
                    Enviar Obra
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
