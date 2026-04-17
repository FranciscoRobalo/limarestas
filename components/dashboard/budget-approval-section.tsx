"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Receipt,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Percent,
  Euro,
  Search,
  Filter,
  RefreshCw,
  AlertCircle,
  Building,
  User,
  Calendar,
  FileText,
} from "lucide-react"

type BudgetStatus = "pendente" | "em-analise" | "aprovado" | "rejeitado" | "revisao"

interface BudgetItem {
  id: string
  materialId: string
  materialName: string
  unit: string
  quantity: number
  unitPrice: number
  category: string
  totalPrice: number
}

interface Budget {
  id: string
  obraId: string
  obraNome: string
  clienteNome: string
  clienteEmail: string
  items: BudgetItem[]
  subtotal: number
  marginPercentage: number
  marginAmount: number
  total: number
  status: BudgetStatus
  dataSubmissao: string
  dataAprovacao?: string
  observacoes?: string
  aprovadoPor?: string
}

const statusConfig: Record<BudgetStatus, { label: string; color: string; icon: React.ElementType; bgColor: string }> = {
  pendente: {
    label: "Pendente",
    color: "text-yellow-600",
    icon: Clock,
    bgColor: "bg-yellow-500/10 border-yellow-500/30",
  },
  "em-analise": {
    label: "Em Análise",
    color: "text-blue-600",
    icon: Eye,
    bgColor: "bg-blue-500/10 border-blue-500/30",
  },
  aprovado: {
    label: "Aprovado",
    color: "text-green-600",
    icon: CheckCircle2,
    bgColor: "bg-green-500/10 border-green-500/30",
  },
  rejeitado: {
    label: "Rejeitado",
    color: "text-red-600",
    icon: XCircle,
    bgColor: "bg-red-500/10 border-red-500/30",
  },
  revisao: {
    label: "Revisão",
    color: "text-orange-600",
    icon: AlertCircle,
    bgColor: "bg-orange-500/10 border-orange-500/30",
  },
}

// Mock data for budgets
const mockBudgets: Budget[] = [
  {
    id: "ORC-2024-001",
    obraId: "OBR-001",
    obraNome: "Remodelação Apartamento T3 Cascais",
    clienteNome: "Maria Santos",
    clienteEmail: "maria@email.com",
    items: [
      { id: "1", materialId: "mat-001", materialName: "Cimento Portland", unit: "kg", quantity: 500, unitPrice: 0.15, category: "Cimentos", totalPrice: 75 },
      { id: "2", materialId: "mat-002", materialName: "Areia Fina", unit: "m³", quantity: 3, unitPrice: 45, category: "Agregados", totalPrice: 135 },
      { id: "3", materialId: "mat-003", materialName: "Azulejo 30x60", unit: "m²", quantity: 45, unitPrice: 18.5, category: "Cerâmica", totalPrice: 832.5 },
      { id: "4", materialId: "mat-004", materialName: "Mão de Obra", unit: "hora", quantity: 120, unitPrice: 25, category: "Serviços", totalPrice: 3000 },
    ],
    subtotal: 4042.5,
    marginPercentage: 15,
    marginAmount: 606.38,
    total: 4648.88,
    status: "pendente",
    dataSubmissao: "2024-03-15",
  },
  {
    id: "ORC-2024-002",
    obraId: "OBR-002",
    obraNome: "Construção Moradia T4 Lisboa",
    clienteNome: "João Ferreira",
    clienteEmail: "joao@email.com",
    items: [
      { id: "1", materialId: "mat-001", materialName: "Betão Estrutural", unit: "m³", quantity: 25, unitPrice: 95, category: "Betões", totalPrice: 2375 },
      { id: "2", materialId: "mat-002", materialName: "Aço Estrutural", unit: "ton", quantity: 2.5, unitPrice: 850, category: "Metais", totalPrice: 2125 },
      { id: "3", materialId: "mat-003", materialName: "Tijolo Térmico", unit: "un", quantity: 2000, unitPrice: 0.45, category: "Alvenaria", totalPrice: 900 },
    ],
    subtotal: 5400,
    marginPercentage: 20,
    marginAmount: 1080,
    total: 6480,
    status: "em-analise",
    dataSubmissao: "2024-03-14",
  },
  {
    id: "ORC-2024-003",
    obraId: "OBR-003",
    obraNome: "Pintura Escritório Porto",
    clienteNome: "Ana Rodrigues",
    clienteEmail: "ana@email.com",
    items: [
      { id: "1", materialId: "mat-001", materialName: "Tinta Acrílica Branca", unit: "L", quantity: 50, unitPrice: 8.5, category: "Tintas", totalPrice: 425 },
      { id: "2", materialId: "mat-002", materialName: "Primário", unit: "L", quantity: 20, unitPrice: 12, category: "Tintas", totalPrice: 240 },
    ],
    subtotal: 665,
    marginPercentage: 10,
    marginAmount: 66.5,
    total: 731.5,
    status: "aprovado",
    dataSubmissao: "2024-03-10",
    dataAprovacao: "2024-03-12",
    aprovadoPor: "Admin LAT",
  },
]

export function BudgetApprovalSection() {
  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isMarginDialogOpen, setIsMarginDialogOpen] = useState(false)
  const [newMargin, setNewMargin] = useState("")
  const [approvalNotes, setApprovalNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const filteredBudgets = budgets.filter((budget) => {
    const matchesSearch =
      budget.obraNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      budget.clienteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      budget.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || budget.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" }).format(value)
  }

  const handleViewDetails = (budget: Budget) => {
    setSelectedBudget(budget)
    setIsDetailOpen(true)
  }

  const handleOpenMarginDialog = (budget: Budget) => {
    setSelectedBudget(budget)
    setNewMargin(budget.marginPercentage.toString())
    setIsMarginDialogOpen(true)
  }

  const handleUpdateMargin = () => {
    if (!selectedBudget || !newMargin) return

    const marginPercent = parseFloat(newMargin)
    if (isNaN(marginPercent) || marginPercent < 0 || marginPercent > 100) return

    const newMarginAmount = selectedBudget.subtotal * (marginPercent / 100)
    const newTotal = selectedBudget.subtotal + newMarginAmount

    setBudgets(budgets.map((b) => 
      b.id === selectedBudget.id 
        ? { ...b, marginPercentage: marginPercent, marginAmount: newMarginAmount, total: newTotal }
        : b
    ))

    setIsMarginDialogOpen(false)
    setSelectedBudget(null)
    setNewMargin("")
  }

  const handleApprove = async (budget: Budget) => {
    const updatedBudget = { 
      ...budget, 
      status: "aprovado" as BudgetStatus, 
      dataAprovacao: new Date().toISOString().split('T')[0],
      aprovadoPor: "Admin LAT",
      observacoes: approvalNotes || undefined
    }
    
    setBudgets(budgets.map((b) => 
      b.id === budget.id ? updatedBudget : b
    ))
    
    // Submit approved budget to MOAP for client visibility
    await submitToMOAP(updatedBudget)
    setApprovalNotes("")
  }

  const handleReject = (budget: Budget) => {
    setBudgets(budgets.map((b) => 
      b.id === budget.id 
        ? { 
            ...b, 
            status: "rejeitado" as BudgetStatus,
            observacoes: approvalNotes || "Orçamento rejeitado"
          }
        : b
    ))
    setApprovalNotes("")
  }

  const handleRequestRevision = (budget: Budget) => {
    setBudgets(budgets.map((b) => 
      b.id === budget.id 
        ? { 
            ...b, 
            status: "revisao" as BudgetStatus,
            observacoes: approvalNotes || "Necessária revisão"
          }
        : b
    ))
    setApprovalNotes("")
  }

  const refreshBudgets = async () => {
    setIsLoading(true)
    try {
      // Fetch budgets from MOAP API
      const response = await fetch("/api/moap?table=budgets")
      const result = await response.json()
      
      if (result.success && result.data && Array.isArray(result.data)) {
        // Map MOAP budgets to our format
        const moapBudgets = result.data.map((b: Record<string, unknown>) => ({
          id: b.id as string || `ORC-${Date.now()}`,
          obraId: b.obraId as string || b.obra_id as string || "",
          obraNome: b.obraName as string || b.name as string || "Obra sem nome",
          clienteNome: b.clientName as string || "Cliente",
          clienteEmail: b.clientEmail as string || "",
          items: (b.items as BudgetItem[]) || [],
          subtotal: b.subtotal as number || 0,
          marginPercentage: b.marginPercentage as number || 0,
          marginAmount: b.marginAmount as number || 0,
          total: b.total as number || 0,
          status: (b.status as BudgetStatus) || "pendente",
          dataSubmissao: b.createdAt as string || new Date().toISOString().split('T')[0],
          dataAprovacao: b.approvedAt as string,
          observacoes: b.observacoes as string,
        }))
        
        // Merge with existing budgets (keep mock data for demo)
        setBudgets([...mockBudgets, ...moapBudgets])
      }
    } catch {
      // Silent fail - will use mock data
    } finally {
      setIsLoading(false)
    }
  }
  
  // Sync materials from MOAP
  const syncMaterials = async () => {
    try {
      const response = await fetch("/api/moap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sync_materials" }),
      })
      await response.json()
    } catch {
      // Silent fail - sync is optional
    }
  }

  // Submit approved budget to MOAP
  const submitToMOAP = async (budget: Budget) => {
    try {
      const response = await fetch("/api/moap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "submit_budget",
          data: {
            name: budget.id,
            obraName: budget.obraNome,
            obraId: budget.obraId,
            items: budget.items,
            clientEmail: budget.clienteEmail,
            clientName: budget.clienteNome,
            subtotal: budget.subtotal,
            marginPercentage: budget.marginPercentage,
            marginAmount: budget.marginAmount,
            total: budget.total,
          },
        }),
      })
      const result = await response.json()
      return result.success
    } catch {
      return false
    }
  }

  const pendingCount = budgets.filter(b => b.status === "pendente").length
  const inAnalysisCount = budgets.filter(b => b.status === "em-analise").length
  const approvedCount = budgets.filter(b => b.status === "aprovado").length

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif text-foreground mb-2">Aprovação de Orçamentos</h2>
        <p className="text-muted-foreground">
          Revise e aprove orçamentos submetidos. Adicione margens de lucro antes de enviar aos clientes.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pendingCount}</p>
              <p className="text-sm text-muted-foreground">Pendentes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{inAnalysisCount}</p>
              <p className="text-sm text-muted-foreground">Em Análise</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{approvedCount}</p>
              <p className="text-sm text-muted-foreground">Aprovados</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Euro className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {formatCurrency(budgets.filter(b => b.status === "aprovado").reduce((sum, b) => sum + b.total, 0))}
              </p>
              <p className="text-sm text-muted-foreground">Total Aprovado</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar orçamentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="pendente">Pendente</SelectItem>
            <SelectItem value="em-analise">Em Análise</SelectItem>
            <SelectItem value="aprovado">Aprovado</SelectItem>
            <SelectItem value="rejeitado">Rejeitado</SelectItem>
            <SelectItem value="revisao">Revisão</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={refreshBudgets} disabled={isLoading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Atualizar
        </Button>
        <Button variant="outline" onClick={syncMaterials}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Sincronizar Materiais
        </Button>
      </div>

      {/* Budget List */}
      <div className="space-y-4">
        {filteredBudgets.length === 0 ? (
          <Card className="p-12 text-center">
            <Receipt className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum orçamento encontrado.</p>
          </Card>
        ) : (
          filteredBudgets.map((budget) => {
            const status = statusConfig[budget.status]
            const StatusIcon = status.icon

            return (
              <Card
                key={budget.id}
                className={`border-l-4 ${
                  budget.status === "aprovado"
                    ? "border-l-green-500"
                    : budget.status === "em-analise"
                      ? "border-l-blue-500"
                      : budget.status === "pendente"
                        ? "border-l-yellow-500"
                        : budget.status === "rejeitado"
                          ? "border-l-red-500"
                          : "border-l-orange-500"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Building className="w-5 h-5 text-primary" />
                        {budget.obraNome}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Referência: {budget.id} | Cliente: {budget.clienteNome}
                      </CardDescription>
                    </div>
                    <Badge className={`${status.bgColor} ${status.color} border`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {status.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      {budget.clienteNome}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(budget.dataSubmissao).toLocaleDateString("pt-PT")}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="w-4 h-4" />
                      {budget.items.length} itens
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Percent className="w-4 h-4 text-primary" />
                      Margem: {budget.marginPercentage}%
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-primary">
                      <Euro className="w-4 h-4" />
                      {formatCurrency(budget.total)}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(budget)}>
                      <Eye className="w-4 h-4 mr-1" />
                      Ver Detalhes
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleOpenMarginDialog(budget)}>
                      <Percent className="w-4 h-4 mr-1" />
                      Ajustar Margem
                    </Button>
                    {(budget.status === "pendente" || budget.status === "em-analise") && (
                      <>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprove(budget)}
                        >
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Aprovar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-orange-600 border-orange-600 hover:bg-orange-50"
                          onClick={() => handleRequestRevision(budget)}
                        >
                          <AlertCircle className="w-4 h-4 mr-1" />
                          Pedir Revisão
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-red-600 border-red-600 hover:bg-red-50"
                          onClick={() => handleReject(budget)}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
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
      </div>

      {/* Budget Details Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5" />
              Detalhes do Orçamento
            </DialogTitle>
            <DialogDescription>
              {selectedBudget?.id} - {selectedBudget?.obraNome}
            </DialogDescription>
          </DialogHeader>

          {selectedBudget && (
            <div className="space-y-6">
              {/* Client Info */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-secondary/30 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Cliente</p>
                  <p className="font-medium">{selectedBudget.clienteNome}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedBudget.clienteEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data de Submissão</p>
                  <p className="font-medium">{new Date(selectedBudget.dataSubmissao).toLocaleDateString("pt-PT")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estado</p>
                  <Badge className={`${statusConfig[selectedBudget.status].bgColor} ${statusConfig[selectedBudget.status].color}`}>
                    {statusConfig[selectedBudget.status].label}
                  </Badge>
                </div>
              </div>

              {/* Items Table */}
              <div>
                <h4 className="font-semibold mb-3">Itens do Orçamento</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Material</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead className="text-right">Qtd</TableHead>
                      <TableHead className="text-right">Unidade</TableHead>
                      <TableHead className="text-right">Preço Unit.</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedBudget.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.materialName}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">{item.unit}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                        <TableCell className="text-right font-medium">{formatCurrency(item.totalPrice)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Totals */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(selectedBudget.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Margem ({selectedBudget.marginPercentage}%)</span>
                  <span className="text-primary">{formatCurrency(selectedBudget.marginAmount)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span className="text-primary">{formatCurrency(selectedBudget.total)}</span>
                </div>
              </div>

              {/* Approval Notes */}
              {(selectedBudget.status === "pendente" || selectedBudget.status === "em-analise") && (
                <div className="space-y-2">
                  <Label>Observações de Aprovação</Label>
                  <Textarea
                    placeholder="Adicione notas ou observações sobre este orçamento..."
                    value={approvalNotes}
                    onChange={(e) => setApprovalNotes(e.target.value)}
                    rows={3}
                  />
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
              Fechar
            </Button>
            {selectedBudget && (selectedBudget.status === "pendente" || selectedBudget.status === "em-analise") && (
              <>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    handleApprove(selectedBudget)
                    setIsDetailOpen(false)
                  }}
                >
                  Aprovar Orçamento
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Margin Adjustment Dialog */}
      <Dialog open={isMarginDialogOpen} onOpenChange={setIsMarginDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Percent className="w-5 h-5" />
              Ajustar Margem de Lucro
            </DialogTitle>
            <DialogDescription>
              Defina a percentagem de margem para este orçamento
            </DialogDescription>
          </DialogHeader>

          {selectedBudget && (
            <div className="space-y-4">
              <div className="p-4 bg-secondary/30 rounded-lg space-y-2">
                <p className="text-sm text-muted-foreground">Subtotal do Orçamento</p>
                <p className="text-xl font-bold">{formatCurrency(selectedBudget.subtotal)}</p>
              </div>

              <div className="space-y-2">
                <Label>Margem de Lucro (%)</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    step="0.5"
                    value={newMargin}
                    onChange={(e) => setNewMargin(e.target.value)}
                    placeholder="Ex: 15"
                  />
                  <span className="flex items-center text-muted-foreground">%</span>
                </div>
              </div>

              {newMargin && !isNaN(parseFloat(newMargin)) && (
                <div className="p-4 bg-primary/10 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatCurrency(selectedBudget.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Margem ({newMargin}%)</span>
                    <span className="text-primary">
                      {formatCurrency(selectedBudget.subtotal * (parseFloat(newMargin) / 100))}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold border-t pt-2">
                    <span>Novo Total</span>
                    <span className="text-primary">
                      {formatCurrency(selectedBudget.subtotal * (1 + parseFloat(newMargin) / 100))}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                {[5, 10, 15, 20, 25].map((percent) => (
                  <Button
                    key={percent}
                    variant={newMargin === percent.toString() ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNewMargin(percent.toString())}
                  >
                    {percent}%
                  </Button>
                ))}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMarginDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateMargin}>
              Aplicar Margem
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
