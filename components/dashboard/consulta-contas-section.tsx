"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Download,
  FileText,
  Euro,
  Calendar,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Eye,
} from "lucide-react"

interface Movimento {
  id: string
  tipo: "entrada" | "saida"
  descricao: string
  valor: number
  data: string
  categoria: string
  obra?: string
  estado: "pendente" | "processado" | "cancelado"
  documento?: string
}

const movimentosExemplo: Movimento[] = [
  {
    id: "1",
    tipo: "entrada",
    descricao: "Comissão Obra Lisboa",
    valor: 2500,
    data: "2025-01-20",
    categoria: "Comissão",
    obra: "Remodelação Apartamento T3 - Lisboa",
    estado: "processado",
    documento: "FAT-2025-001.pdf",
  },
  {
    id: "2",
    tipo: "saida",
    descricao: "Pagamento Subempreiteiro",
    valor: 1200,
    data: "2025-01-18",
    categoria: "Subcontratação",
    obra: "Construção Moradia - Cascais",
    estado: "processado",
    documento: "REC-2025-015.pdf",
  },
  {
    id: "3",
    tipo: "entrada",
    descricao: "Adiantamento Cliente",
    valor: 5000,
    data: "2025-01-15",
    categoria: "Adiantamento",
    obra: "Reabilitação Prédio - Porto",
    estado: "processado",
    documento: "FAT-2025-002.pdf",
  },
  {
    id: "4",
    tipo: "saida",
    descricao: "Material de Construção",
    valor: 3500,
    data: "2025-01-12",
    categoria: "Material",
    obra: "Construção Moradia - Cascais",
    estado: "processado",
    documento: "REC-2025-016.pdf",
  },
  {
    id: "5",
    tipo: "entrada",
    descricao: "Faturação Final",
    valor: 8000,
    data: "2025-01-10",
    categoria: "Faturação",
    obra: "Remodelação Apartamento T3 - Lisboa",
    estado: "pendente",
  },
]

export function ConsultaContasSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroTipo, setFiltroTipo] = useState<"todos" | "entrada" | "saida">("todos")
  const [filtroCategoria, setFiltroCategoria] = useState("")

  const categorias = [...new Set(movimentosExemplo.map((m) => m.categoria))]

  const movimentosFiltrados = movimentosExemplo.filter((mov) => {
    const matchSearch =
      mov.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (mov.obra && mov.obra.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchTipo = filtroTipo === "todos" || mov.tipo === filtroTipo
    const matchCategoria = !filtroCategoria || mov.categoria === filtroCategoria
    return matchSearch && matchTipo && matchCategoria
  })

  const totalEntradas = movimentosExemplo
    .filter((m) => m.tipo === "entrada" && m.estado === "processado")
    .reduce((acc, m) => acc + m.valor, 0)
  const totalSaidas = movimentosExemplo
    .filter((m) => m.tipo === "saida" && m.estado === "processado")
    .reduce((acc, m) => acc + m.valor, 0)
  const saldo = totalEntradas - totalSaidas

  const getEstadoBadge = (estado: Movimento["estado"]) => {
    switch (estado) {
      case "processado":
        return <Badge className="bg-green-500">Processado</Badge>
      case "pendente":
        return <Badge variant="outline" className="border-amber-500 text-amber-600">Pendente</Badge>
      case "cancelado":
        return <Badge variant="destructive">Cancelado</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif text-foreground mb-2">Consulta de Contas</h2>
        <p className="text-muted-foreground">
          Consulte todos os movimentos financeiros e documentos associados.
        </p>
      </div>

      {/* Resumo Financeiro */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entradas</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {totalEntradas.toLocaleString("pt-PT")} €
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Saídas</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {totalSaidas.toLocaleString("pt-PT")} €
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${saldo >= 0 ? "text-green-600" : "text-red-600"}`}>
              {saldo.toLocaleString("pt-PT")} €
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar movimento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value as "todos" | "entrada" | "saida")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="todos">Todos os Tipos</option>
              <option value="entrada">Entradas</option>
              <option value="saida">Saídas</option>
            </select>
            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Todas as Categorias</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <Button variant="outline" className="bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Movimentos */}
      <div className="space-y-4">
        {movimentosFiltrados.map((movimento) => (
          <Card key={movimento.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-full ${
                      movimento.tipo === "entrada" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {movimento.tipo === "entrada" ? (
                      <ArrowUpRight className="w-5 h-5 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{movimento.descricao}</p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(movimento.data).toLocaleDateString("pt-PT")}
                      </span>
                      {movimento.obra && (
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          {movimento.obra}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline">{movimento.categoria}</Badge>
                  {getEstadoBadge(movimento.estado)}
                  <div
                    className={`text-xl font-bold ${
                      movimento.tipo === "entrada" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {movimento.tipo === "entrada" ? "+" : "-"}
                    {movimento.valor.toLocaleString("pt-PT")} €
                  </div>
                  {movimento.documento && (
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Documento
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {movimentosFiltrados.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Nenhum movimento encontrado com os filtros selecionados.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
