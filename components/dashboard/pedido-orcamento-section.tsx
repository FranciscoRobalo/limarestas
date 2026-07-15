"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, CreditCard, Euro, Clock, Building2, FileText } from "lucide-react"
import { useObras } from "@/hooks/use-obras"

interface PedidoForm {
  obraId: string
  valorProposto: string
  prazoExecucao: string
  descricaoProposta: string
  condicoesPagamento: string
}

const initialForm: PedidoForm = {
  obraId: "",
  valorProposto: "",
  prazoExecucao: "",
  descricaoProposta: "",
  condicoesPagamento: "",
}

interface PedidoSubmetido extends PedidoForm {
  id: string
  obraNome: string
  data: string
  status: "pendente" | "aceite" | "rejeitado"
}

export function PedidoOrcamentoSection() {
  const { obras } = useObras()
  const [form, setForm] = useState<PedidoForm>(initialForm)
  const [pedidos, setPedidos] = useState<PedidoSubmetido[]>([])
  const [submitted, setSubmitted] = useState(false)

  const obrasDisponiveis = obras.filter((o) => o.status === "aprovado" || o.status === "pendente")

  const handleChange = (field: keyof PedidoForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.obraId || !form.valorProposto || !form.prazoExecucao || !form.descricaoProposta) return

    const obra = obrasDisponiveis.find((o) => o.id === form.obraId)
    const pedido: PedidoSubmetido = {
      ...form,
      id: `PED-${Date.now().toString().slice(-6)}`,
      obraNome: obra?.nome || form.obraId,
      data: new Date().toISOString().split("T")[0],
      status: "pendente",
    }

    setPedidos((prev) => [pedido, ...prev])
    setForm(initialForm)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  const statusStyles: Record<PedidoSubmetido["status"], string> = {
    pendente: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400",
    aceite: "bg-green-500/15 text-green-600 dark:text-green-400",
    rejeitado: "bg-red-500/15 text-red-600 dark:text-red-400",
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif text-foreground mb-2">Pedido de Orçamento</h2>
        <p className="text-muted-foreground">
          Submeta a sua proposta de orçamento para obras disponíveis. A equipa LAT irá analisar e responder.
        </p>
      </div>

      {submitted && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <p className="text-green-700 dark:text-green-300 font-medium">
            Proposta submetida com sucesso! Será notificado quando for analisada.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Nova Proposta
            </CardTitle>
            <CardDescription>Preencha os detalhes da sua proposta de orçamento.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="obraId" className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Obra *
                  </Label>
                  <Select value={form.obraId} onValueChange={(v) => handleChange("obraId", v)}>
                    <SelectTrigger id="obraId">
                      <SelectValue placeholder="Selecione a obra" />
                    </SelectTrigger>
                    <SelectContent>
                      {obrasDisponiveis.length === 0 ? (
                        <SelectItem value="none" disabled>
                          Sem obras disponíveis
                        </SelectItem>
                      ) : (
                        obrasDisponiveis.map((obra) => (
                          <SelectItem key={obra.id} value={obra.id}>
                            {obra.nome} — {obra.localizacao}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="valorProposto" className="flex items-center gap-2">
                    <Euro className="w-4 h-4" />
                    Valor Proposto (€) *
                  </Label>
                  <Input
                    id="valorProposto"
                    type="number"
                    min="0"
                    placeholder="Ex: 25000"
                    value={form.valorProposto}
                    onChange={(e) => handleChange("valorProposto", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prazoExecucao" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Prazo de Execução *
                  </Label>
                  <Select value={form.prazoExecucao} onValueChange={(v) => handleChange("prazoExecucao", v)}>
                    <SelectTrigger id="prazoExecucao">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2-4 semanas">2 a 4 semanas</SelectItem>
                      <SelectItem value="1-2 meses">1 a 2 meses</SelectItem>
                      <SelectItem value="2-4 meses">2 a 4 meses</SelectItem>
                      <SelectItem value="4-6 meses">4 a 6 meses</SelectItem>
                      <SelectItem value="6+ meses">Mais de 6 meses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricaoProposta" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Descrição da Proposta *
                </Label>
                <Textarea
                  id="descricaoProposta"
                  rows={4}
                  placeholder="Descreva a sua abordagem, materiais, equipa e o que está incluído no valor proposto."
                  value={form.descricaoProposta}
                  onChange={(e) => handleChange("descricaoProposta", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="condicoesPagamento">Condições de Pagamento</Label>
                <Textarea
                  id="condicoesPagamento"
                  rows={2}
                  placeholder="Ex: 30% adjudicação, 40% a meio da obra, 30% na entrega"
                  value={form.condicoesPagamento}
                  onChange={(e) => handleChange("condicoesPagamento", e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={!form.obraId || !form.valorProposto || !form.prazoExecucao || !form.descricaoProposta}
                >
                  Submeter Proposta
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">As Minhas Propostas</CardTitle>
            <CardDescription>Histórico de propostas submetidas.</CardDescription>
          </CardHeader>
          <CardContent>
            {pedidos.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                <CreditCard className="w-8 h-8 mx-auto mb-3 opacity-40" />
                <p>Ainda não submeteu propostas.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pedidos.map((p) => (
                  <div key={p.id} className="p-3 rounded-lg bg-secondary/50 space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-foreground leading-snug">{p.obraNome}</p>
                      <Badge variant="secondary" className={statusStyles[p.status]}>
                        {p.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{p.id}</span>
                      <span>{Number(p.valorProposto).toLocaleString("pt-PT")} €</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
