"use client"

import { useState } from "react"
import {
  Plus,
  Download,
  Send,
  Eye,
  MoreHorizontal,
  Search,
  Filter,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface Invoice {
  id: string
  number: string
  client: string
  obra: string
  amount: number
  status: "rascunho" | "enviada" | "paga" | "vencida"
  dueDate: string
  createdAt: string
  tipoDestinatario: "cliente" | "empreiteiro" | "mediador"
  }

const mockInvoices: Invoice[] = [
  {
  id: "1",
  number: "FAT-2024-001",
  client: "Maria Santos",
  obra: "Moradia T4 Cascais",
  amount: 15000,
  status: "paga",
  dueDate: "2024-01-15",
  createdAt: "2024-01-01",
  tipoDestinatario: "cliente",
  },
  {
    id: "2",
    number: "FAT-2024-002",
client: "João Ferreira",
  obra: "Remodelação Escritório",
  amount: 8500,
  status: "enviada",
  dueDate: "2024-02-28",
  createdAt: "2024-02-14",
  tipoDestinatario: "empreiteiro",
  },
  {
  id: "3",
  number: "FAT-2024-003",
client: "Ana Rodrigues",
  obra: "Cozinha e WC",
  amount: 4200,
  status: "vencida",
  dueDate: "2024-01-30",
  createdAt: "2024-01-16",
  tipoDestinatario: "cliente",
  },
  {
  id: "4",
  number: "FAT-2024-004",
  client: "Pedro Costa",
  obra: "Reabilitação Edifício",
  amount: 45000,
  status: "rascunho",
  dueDate: "2024-03-15",
  createdAt: "2024-02-20",
  tipoDestinatario: "mediador",
  },
]

export function InvoicesSection() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
const [newInvoice, setNewInvoice] = useState({
  client: "",
  obra: "",
  amount: "",
  dueDate: "",
  description: "",
  tipoDestinatario: "cliente" as "cliente" | "empreiteiro" | "mediador",
  })

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.obra.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: Invoice["status"]) => {
    switch (status) {
      case "paga":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" /> Paga
          </Badge>
        )
      case "enviada":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Clock className="w-3 h-3 mr-1" /> Enviada
          </Badge>
        )
      case "vencida":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <AlertCircle className="w-3 h-3 mr-1" /> Vencida
          </Badge>
        )
      case "rascunho":
        return (
          <Badge variant="secondary">
            <FileText className="w-3 h-3 mr-1" /> Rascunho
          </Badge>
        )
    }
  }

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" }).format(value)

  const totalPaid = invoices.filter((i) => i.status === "paga").reduce((sum, i) => sum + i.amount, 0)
  const totalPending = invoices.filter((i) => i.status === "enviada").reduce((sum, i) => sum + i.amount, 0)
  const totalOverdue = invoices.filter((i) => i.status === "vencida").reduce((sum, i) => sum + i.amount, 0)

const handleCreateInvoice = () => {
  const invoice: Invoice = {
  id: Date.now().toString(),
  number: `FAT-2024-${String(invoices.length + 1).padStart(3, "0")}`,
  client: newInvoice.client,
  obra: newInvoice.obra,
  amount: Number.parseFloat(newInvoice.amount),
  status: "rascunho",
  dueDate: newInvoice.dueDate,
  createdAt: new Date().toISOString().split("T")[0],
  tipoDestinatario: newInvoice.tipoDestinatario,
  }
  setInvoices([invoice, ...invoices])
  setNewInvoice({ client: "", obra: "", amount: "", dueDate: "", description: "", tipoDestinatario: "cliente" })
  setIsCreateOpen(false)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Faturação</h2>
          <p className="text-muted-foreground">Gerencie faturas e pagamentos</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Plus className="w-4 h-4 mr-2" /> Nova Fatura
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Criar Nova Fatura</DialogTitle>
              <DialogDescription>Preencha os dados da fatura</DialogDescription>
            </DialogHeader>
<div className="space-y-4 py-4">
  <div className="space-y-2">
  <Label>Tipo de Destinatário</Label>
  <Select 
  value={newInvoice.tipoDestinatario} 
  onValueChange={(value: "cliente" | "empreiteiro" | "mediador") => 
    setNewInvoice({ ...newInvoice, tipoDestinatario: value })
  }
  >
  <SelectTrigger>
  <SelectValue placeholder="Selecione o tipo" />
  </SelectTrigger>
  <SelectContent>
  <SelectItem value="cliente">Cliente</SelectItem>
  <SelectItem value="empreiteiro">Empreiteiro</SelectItem>
  <SelectItem value="mediador">Mediador</SelectItem>
  </SelectContent>
  </Select>
  </div>
  <div className="space-y-2">
  <Label>Nome do {newInvoice.tipoDestinatario === "cliente" ? "Cliente" : newInvoice.tipoDestinatario === "empreiteiro" ? "Empreiteiro" : "Mediador"}</Label>
  <Input
  value={newInvoice.client}
  onChange={(e) => setNewInvoice({ ...newInvoice, client: e.target.value })}
  placeholder={`Nome do ${newInvoice.tipoDestinatario}`}
  />
  </div>
  <div className="space-y-2">
  <Label>Obra</Label>
  <Input
  value={newInvoice.obra}
  onChange={(e) => setNewInvoice({ ...newInvoice, obra: e.target.value })}
  placeholder="Nome da obra"
  />
  </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Valor (EUR)</Label>
                  <Input
                    type="number"
                    value={newInvoice.amount}
                    onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Data de Vencimento</Label>
                  <Input
                    type="date"
                    value={newInvoice.dueDate}
                    onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Descrição</Label>
                <Textarea
                  value={newInvoice.description}
                  onChange={(e) => setNewInvoice({ ...newInvoice, description: e.target.value })}
                  placeholder="Descrição dos serviços..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateInvoice} disabled={!newInvoice.client || !newInvoice.amount}>
                Criar Fatura
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Recebido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalPaid)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">A Aguardar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalPending)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Em Atraso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(totalOverdue)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar faturas..."
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
            <SelectItem value="rascunho">Rascunho</SelectItem>
            <SelectItem value="enviada">Enviada</SelectItem>
            <SelectItem value="paga">Paga</SelectItem>
            <SelectItem value="vencida">Vencida</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nº Fatura</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="hidden md:table-cell">Obra</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="hidden md:table-cell">Vencimento</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.number}</TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell className="hidden md:table-cell">{invoice.obra}</TableCell>
                  <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(invoice.dueDate).toLocaleDateString("pt-PT")}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => alert(`Detalhes da fatura ${invoice.number}\n\nCliente: ${invoice.client}\nObra: ${invoice.obra}\nValor: ${formatCurrency(invoice.amount)}\nEstado: ${invoice.status}`)}>
                          <Eye className="w-4 h-4 mr-2" /> Ver
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          const emailSubject = encodeURIComponent(`Fatura ${invoice.number} - Limarestas`)
                          const emailBody = encodeURIComponent(
                            `Exmo(a). Sr(a). ${invoice.client},\n\n` +
                            `Segue em anexo a fatura ${invoice.number} relativa à obra "${invoice.obra}".\n\n` +
                            `Valor: ${formatCurrency(invoice.amount)}\n` +
                            `Data de vencimento: ${new Date(invoice.dueDate).toLocaleDateString("pt-PT")}\n\n` +
                            `Com os melhores cumprimentos,\n` +
                            `Equipa Limarestas`
                          )
                          window.open(`mailto:?subject=${emailSubject}&body=${emailBody}`, '_blank')
                          setInvoices(prev => prev.map(i => i.id === invoice.id ? { ...i, status: "enviada" as const } : i))
                        }}>
                          <Send className="w-4 h-4 mr-2" /> Enviar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          // Generate PDF content
                          const pdfContent = `
FATURA
------
Número: ${invoice.number}
Data: ${new Date(invoice.createdAt).toLocaleDateString("pt-PT")}
Vencimento: ${new Date(invoice.dueDate).toLocaleDateString("pt-PT")}

CLIENTE
-------
${invoice.client}

OBRA
----
${invoice.obra}

TOTAL: ${formatCurrency(invoice.amount)}
                          `
                          const blob = new Blob([pdfContent], { type: 'text/plain' })
                          const url = URL.createObjectURL(blob)
                          const a = document.createElement('a')
                          a.href = url
                          a.download = `${invoice.number}.txt`
                          a.click()
                          URL.revokeObjectURL(url)
                        }}>
                          <Download className="w-4 h-4 mr-2" /> Download
                        </DropdownMenuItem>
                        {invoice.status === "enviada" && (
                          <DropdownMenuItem onClick={() => {
                            setInvoices(prev => prev.map(i => i.id === invoice.id ? { ...i, status: "paga" as const } : i))
                          }}>
                            <CheckCircle className="w-4 h-4 mr-2" /> Marcar como Paga
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
