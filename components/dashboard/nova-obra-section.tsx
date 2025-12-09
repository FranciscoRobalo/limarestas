"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Building, MapPin, Calendar, FileText, Euro } from "lucide-react"

interface ObraFormData {
  nome: string
  tipo: string
  localizacao: string
  area: string
  orcamento: string
  prazo: string
  descricao: string
  requisitos: string
}

export function NovaObraSection() {
  const [formData, setFormData] = useState<ObraFormData>({
    nome: "",
    tipo: "",
    localizacao: "",
    area: "",
    orcamento: "",
    prazo: "",
    descricao: "",
    requisitos: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const handleChange = (field: keyof ObraFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif text-foreground mb-2">Registar Nova Obra</h2>
        <p className="text-muted-foreground">
          Preencha o formulário abaixo para submeter uma nova obra. A nossa equipa irá analisar e contactá-lo
          brevemente.
        </p>
      </div>

      {submitted && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <p className="text-green-700 dark:text-green-300">
            Obra submetida com sucesso! Entraremos em contacto em breve.
          </p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5 text-primary" />
            Informações da Obra
          </CardTitle>
          <CardDescription>
            Forneça os detalhes do projeto para podermos entender melhor as suas necessidades.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Projeto *</Label>
                <Input
                  id="nome"
                  placeholder="Ex: Remodelação Apartamento T3"
                  value={formData.nome}
                  onChange={(e) => handleChange("nome", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Obra *</Label>
                <Select value={formData.tipo} onValueChange={(value) => handleChange("tipo", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de obra" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remodelacao">Remodelação</SelectItem>
                    <SelectItem value="construcao">Construção Nova</SelectItem>
                    <SelectItem value="ampliacao">Ampliação</SelectItem>
                    <SelectItem value="reabilitacao">Reabilitação</SelectItem>
                    <SelectItem value="manutencao">Manutenção</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="localizacao" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Localização *
                </Label>
                <Input
                  id="localizacao"
                  placeholder="Ex: Lisboa, Cascais"
                  value={formData.localizacao}
                  onChange={(e) => handleChange("localizacao", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="area">Área Aproximada (m²)</Label>
                <Input
                  id="area"
                  type="number"
                  placeholder="Ex: 120"
                  value={formData.area}
                  onChange={(e) => handleChange("area", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="orcamento" className="flex items-center gap-2">
                  <Euro className="w-4 h-4" />
                  Orçamento Previsto
                </Label>
                <Select value={formData.orcamento} onValueChange={(value) => handleChange("orcamento", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma faixa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ate-10k">Até 10.000€</SelectItem>
                    <SelectItem value="10k-25k">10.000€ - 25.000€</SelectItem>
                    <SelectItem value="25k-50k">25.000€ - 50.000€</SelectItem>
                    <SelectItem value="50k-100k">50.000€ - 100.000€</SelectItem>
                    <SelectItem value="100k-250k">100.000€ - 250.000€</SelectItem>
                    <SelectItem value="mais-250k">Mais de 250.000€</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prazo" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Prazo Desejado
                </Label>
                <Select value={formData.prazo} onValueChange={(value) => handleChange("prazo", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o prazo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgente">Urgente (menos de 1 mês)</SelectItem>
                    <SelectItem value="1-3meses">1 a 3 meses</SelectItem>
                    <SelectItem value="3-6meses">3 a 6 meses</SelectItem>
                    <SelectItem value="6-12meses">6 a 12 meses</SelectItem>
                    <SelectItem value="flexivel">Flexível</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Descrição do Projeto *
              </Label>
              <Textarea
                id="descricao"
                placeholder="Descreva o projeto em detalhe: o que pretende fazer, estado atual do imóvel, materiais preferidos, etc."
                rows={4}
                value={formData.descricao}
                onChange={(e) => handleChange("descricao", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requisitos">Requisitos Especiais</Label>
              <Textarea
                id="requisitos"
                placeholder="Indique requisitos especiais: acessibilidade, sustentabilidade, materiais específicos, horários de trabalho, etc."
                rows={3}
                value={formData.requisitos}
                onChange={(e) => handleChange("requisitos", e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setFormData({
                    nome: "",
                    tipo: "",
                    localizacao: "",
                    area: "",
                    orcamento: "",
                    prazo: "",
                    descricao: "",
                    requisitos: "",
                  })
                }
              >
                Limpar
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Submeter Obra
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
