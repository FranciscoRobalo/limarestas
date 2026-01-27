"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  Building2,
  CheckCircle2,
  Send,
  Plus,
} from "lucide-react"

interface Empreiteiro {
  id: string
  nome: string
  empresa: string
  email: string
  telefone: string
  localizacao: string
  especialidades: string[]
  alvaras: string[]
  licencaAMI?: string
  obrasRealizadas: number
  avaliacao: number
  disponivel: boolean
}

const empreiteirosExemplo: Empreiteiro[] = [
  {
    id: "1",
    nome: "Manuel Ferreira",
    empresa: "Ferreira & Filhos Construções",
    email: "manuel@ferreirafilhos.pt",
    telefone: "+351 912 345 678",
    localizacao: "Lisboa",
    especialidades: ["Remodelações", "Construção Civil", "Acabamentos"],
    alvaras: ["Alvará Classe 3", "Alvará de Obras Públicas"],
    obrasRealizadas: 45,
    avaliacao: 4.8,
    disponivel: true,
  },
  {
    id: "2",
    nome: "Ana Rodrigues",
    empresa: "AR Construções Lda",
    email: "ana@arconstrucoes.pt",
    telefone: "+351 923 456 789",
    localizacao: "Porto",
    especialidades: ["Reabilitação", "Restauro", "Pintura"],
    alvaras: ["Alvará Classe 2"],
    licencaAMI: "AMI-12345",
    obrasRealizadas: 32,
    avaliacao: 4.9,
    disponivel: true,
  },
  {
    id: "3",
    nome: "Carlos Santos",
    empresa: "Santos & Associados",
    email: "carlos@santosassociados.pt",
    telefone: "+351 934 567 890",
    localizacao: "Cascais",
    especialidades: ["Moradias", "Piscinas", "Jardins"],
    alvaras: ["Alvará Classe 4", "Alvará de Paisagismo"],
    obrasRealizadas: 67,
    avaliacao: 4.7,
    disponivel: false,
  },
  {
    id: "4",
    nome: "Rita Oliveira",
    empresa: "Oliveira Construções",
    email: "rita@oliveiraconstrucoes.pt",
    telefone: "+351 945 678 901",
    localizacao: "Setúbal",
    especialidades: ["Canalização", "Eletricidade", "AVAC"],
    alvaras: ["Alvará Classe 2"],
    obrasRealizadas: 28,
    avaliacao: 4.6,
    disponivel: true,
  },
]

interface Obra {
  id: string
  nome: string
  localizacao: string
  tipo: string
}

const obrasDisponiveis: Obra[] = [
  { id: "1", nome: "Remodelação Apartamento T3", localizacao: "Lisboa", tipo: "Remodelação" },
  { id: "2", nome: "Construção Moradia V4", localizacao: "Cascais", tipo: "Construção" },
  { id: "3", nome: "Reabilitação Prédio Centro", localizacao: "Porto", tipo: "Reabilitação" },
]

export function EmpreiteirosSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroEspecialidade, setFiltroEspecialidade] = useState<string>("")
  const [filtroLocalizacao, setFiltroLocalizacao] = useState<string>("")
  const [empreiteiroSelecionado, setEmpreiteiroSelecionado] = useState<Empreiteiro | null>(null)
  const [obrasSelecionadas, setObrasSelecionadas] = useState<string[]>([])

  const especialidades = [...new Set(empreiteirosExemplo.flatMap((e) => e.especialidades))]
  const localizacoes = [...new Set(empreiteirosExemplo.map((e) => e.localizacao))]

  const empreiteirosFiltrados = empreiteirosExemplo.filter((emp) => {
    const matchSearch =
      emp.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.empresa.toLowerCase().includes(searchTerm.toLowerCase())
    const matchEspecialidade = !filtroEspecialidade || emp.especialidades.includes(filtroEspecialidade)
    const matchLocalizacao = !filtroLocalizacao || emp.localizacao === filtroLocalizacao
    return matchSearch && matchEspecialidade && matchLocalizacao
  })

  const handleEnviarObras = () => {
    if (!empreiteiroSelecionado || obrasSelecionadas.length === 0) return
    // Simular envio
    alert(`Email enviado para ${empreiteiroSelecionado.email} com ${obrasSelecionadas.length} obras`)
    setEmpreiteiroSelecionado(null)
    setObrasSelecionadas([])
  }

  const toggleObra = (obraId: string) => {
    setObrasSelecionadas((prev) =>
      prev.includes(obraId) ? prev.filter((id) => id !== obraId) : [...prev, obraId]
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif text-foreground mb-2">Lista de Empreiteiros</h2>
        <p className="text-muted-foreground">
          Gestão de empreiteiros com informações de trabalhos, alvarás e conexão com obras disponíveis.
        </p>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar empreiteiro..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <select
              value={filtroEspecialidade}
              onChange={(e) => setFiltroEspecialidade(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Todas as Especialidades</option>
              {especialidades.map((esp) => (
                <option key={esp} value={esp}>
                  {esp}
                </option>
              ))}
            </select>
            <select
              value={filtroLocalizacao}
              onChange={(e) => setFiltroLocalizacao(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Todas as Localizações</option>
              {localizacoes.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <Button variant="outline" className="bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Mais Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Empreiteiros */}
      <div className="grid gap-4 md:grid-cols-2">
        {empreiteirosFiltrados.map((empreiteiro) => (
          <Card key={empreiteiro.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    {empreiteiro.nome}
                  </CardTitle>
                  <CardDescription>{empreiteiro.empresa}</CardDescription>
                </div>
                <Badge variant={empreiteiro.disponivel ? "default" : "secondary"}>
                  {empreiteiro.disponivel ? "Disponível" : "Ocupado"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  {empreiteiro.email}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  {empreiteiro.telefone}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {empreiteiro.localizacao}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="w-4 h-4" />
                  {empreiteiro.obrasRealizadas} obras
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Especialidades:</p>
                <div className="flex flex-wrap gap-1">
                  {empreiteiro.especialidades.map((esp) => (
                    <Badge key={esp} variant="outline" className="text-xs">
                      {esp}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Documentação:</p>
                <div className="flex flex-wrap gap-1">
                  {empreiteiro.alvaras.map((alvara) => (
                    <Badge key={alvara} variant="secondary" className="text-xs flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {alvara}
                    </Badge>
                  ))}
                  {empreiteiro.licencaAMI && (
                    <Badge className="text-xs bg-green-500 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {empreiteiro.licencaAMI}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEmpreiteiroSelecionado(empreiteiro)}
                  className="bg-transparent"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Obras
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Seleção de Obras */}
      {empreiteiroSelecionado && (
        <div className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>Escolher Lista de Obras</CardTitle>
              <CardDescription>
                Selecione as obras para enviar para {empreiteiroSelecionado.nome}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {obrasDisponiveis.map((obra) => (
                  <div
                    key={obra.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      obrasSelecionadas.includes(obra.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => toggleObra(obra.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{obra.nome}</p>
                        <p className="text-sm text-muted-foreground">
                          {obra.localizacao} - {obra.tipo}
                        </p>
                      </div>
                      {obrasSelecionadas.includes(obra.id) && (
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEmpreiteiroSelecionado(null)} className="bg-transparent">
                  Cancelar
                </Button>
                <Button onClick={handleEnviarObras} disabled={obrasSelecionadas.length === 0}>
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar Email ({obrasSelecionadas.length})
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
