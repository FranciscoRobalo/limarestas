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
  Search,
  Filter,
  Mail,
  Phone,
  FileText,
  CheckCircle2,
  Star,
  Send,
} from "lucide-react"

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
  rating: number
  obrasRealizadas: number
  disponivel: boolean
}

const empreiteiros: Empreiteiro[] = [
  {
    id: "EMP-001",
    nome: "Carlos Ferreira",
    empresa: "Ferreira Construções Lda",
    especialidades: ["Construção Civil", "Reabilitação", "Remodelação"],
    localizacao: "Lisboa",
    distrito: "Lisboa",
    alvara: "Classe 5",
    email: "carlos@ferreiraconstrucoes.pt",
    telefone: "+351 912 345 678",
    rating: 4.8,
    obrasRealizadas: 45,
    disponivel: true,
  },
  {
    id: "EMP-002",
    nome: "António Silva",
    empresa: "Silva & Filhos",
    especialidades: ["Instalações Elétricas", "AVAC", "Canalização"],
    localizacao: "Porto",
    distrito: "Porto",
    alvara: "Classe 3",
    email: "antonio@silvafilhos.pt",
    telefone: "+351 923 456 789",
    rating: 4.5,
    obrasRealizadas: 78,
    disponivel: true,
  },
  {
    id: "EMP-003",
    nome: "Manuel Costa",
    empresa: "Costa Obras",
    especialidades: ["Pintura", "Impermeabilização", "Isolamentos"],
    localizacao: "Setúbal",
    distrito: "Setúbal",
    alvara: "Classe 2",
    email: "manuel@costaobras.pt",
    telefone: "+351 934 567 890",
    rating: 4.9,
    obrasRealizadas: 112,
    disponivel: false,
  },
  {
    id: "EMP-004",
    nome: "José Martins",
    empresa: "Martins Construções",
    especialidades: ["Estruturas", "Betão Armado", "Fundações"],
    localizacao: "Cascais",
    distrito: "Lisboa",
    alvara: "Classe 4",
    email: "jose@martinsconstrucoes.pt",
    telefone: "+351 945 678 901",
    rating: 4.7,
    obrasRealizadas: 34,
    disponivel: true,
  },
]

const distritos = ["Todos", "Lisboa", "Porto", "Setúbal", "Braga", "Faro", "Coimbra"]
const especialidadesOptions = [
  "Todas",
  "Construção Civil",
  "Reabilitação",
  "Remodelação",
  "Instalações Elétricas",
  "AVAC",
  "Canalização",
  "Pintura",
  "Impermeabilização",
  "Estruturas",
]

export function EmpreiteirosSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroDistrito, setFiltroDistrito] = useState("Todos")
  const [filtroEspecialidade, setFiltroEspecialidade] = useState("Todas")
  const [selectedEmpreiteiro, setSelectedEmpreiteiro] = useState<Empreiteiro | null>(null)
  const [emailEnviado, setEmailEnviado] = useState(false)

  const empreiteirosFiltrados = empreiteiros.filter((emp) => {
    const matchSearch =
      emp.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.especialidades.some((e) => e.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchDistrito = filtroDistrito === "Todos" || emp.distrito === filtroDistrito
    const matchEspecialidade =
      filtroEspecialidade === "Todas" || emp.especialidades.includes(filtroEspecialidade)

    return matchSearch && matchDistrito && matchEspecialidade
  })

  const handleEnviarEmail = () => {
    setEmailEnviado(true)
    setTimeout(() => {
      setEmailEnviado(false)
      setSelectedEmpreiteiro(null)
    }, 2000)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif text-foreground mb-2">Lista de Empreiteiros</h2>
        <p className="text-muted-foreground">
          Consulte a lista de empreiteiros parceiros com informação sobre os trabalhos que executam, alvarás e
          contactos.
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
                  placeholder="Nome, empresa ou especialidade..."
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
                  {especialidadesOptions.map((e) => (
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
          empreiteirosFiltrados.map((emp) => (
            <Card key={emp.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{emp.empresa}</CardTitle>
                      {emp.disponivel ? (
                        <Badge className="bg-green-500/10 text-green-600 border border-green-500/30">
                          Disponível
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Ocupado</Badge>
                      )}
                    </div>
                    <CardDescription>{emp.nome}</CardDescription>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{emp.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{emp.localizacao}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span>Alvará {emp.alvara}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                    <span>{emp.obrasRealizadas} obras realizadas</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{emp.telefone}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Especialidades:</p>
                  <div className="flex flex-wrap gap-2">
                    {emp.especialidades.map((esp, idx) => (
                      <Badge key={idx} variant="secondary" className="font-normal">
                        {esp}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={() => setSelectedEmpreiteiro(emp)}>
                        <Send className="w-4 h-4 mr-2" />
                        Enviar Informação de Obra
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Enviar Informação de Obra</DialogTitle>
                        <DialogDescription>
                          Envie informação proforma de uma obra para {emp.empresa}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        {emailEnviado ? (
                          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            <p className="text-green-700 dark:text-green-300">Email enviado com sucesso!</p>
                          </div>
                        ) : (
                          <>
                            <div className="space-y-2">
                              <Label>Obra</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione uma obra" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="obra1">Remodelação Apartamento T3 - Lisboa</SelectItem>
                                  <SelectItem value="obra2">Construção Moradia - Cascais</SelectItem>
                                  <SelectItem value="obra3">Reabilitação Prédio - Porto</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button className="w-full" onClick={handleEnviarEmail}>
                              <Mail className="w-4 h-4 mr-2" />
                              Enviar Email
                            </Button>
                          </>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline">Ver Perfil Completo</Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
