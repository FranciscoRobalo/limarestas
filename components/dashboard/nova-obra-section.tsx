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
import { useObras } from "@/hooks/use-obras"

interface ObraFormData {
  nome: string
  tipo: string
  localizacao: string
  distrito: string
  area: string
  orcamento: string
  prazo: string
  descricao: string
  requisitosEspeciais: string
}

export function NovaObraSection() {
  const { addObra } = useObras()

  const [formData, setFormData] = useState<ObraFormData>({
    nome: "",
    tipo: "",
    localizacao: "",
    distrito: "",
    area: "",
    orcamento: "",
    prazo: "",
    descricao: "",
    requisitosEspeciais: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [obraId, setObraId] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const novaObra = addObra(formData)
    setObraId(novaObra.id)
    setSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        nome: "",
        tipo: "",
        localizacao: "",
        distrito: "",
        area: "",
        orcamento: "",
        prazo: "",
        descricao: "",
        requisitosEspeciais: "",
      })
    }, 3000)
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
          <div>
            <p className="text-green-700 dark:text-green-300 font-medium">Obra submetida com sucesso!</p>
            <p className="text-sm text-green-600 dark:text-green-400">
              Referência: {obraId} • Entraremos em contacto em breve.
            </p>
          </div>
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
                    <SelectItem value="Remodelação">Remodelação</SelectItem>
                    <SelectItem value="Construção Nova">Construção Nova</SelectItem>
                    <SelectItem value="Ampliação">Ampliação</SelectItem>
                    <SelectItem value="Reabilitação">Reabilitação</SelectItem>
                    <SelectItem value="Manutenção">Manutenção</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
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
                  placeholder="Ex: Cascais"
                  value={formData.localizacao}
                  onChange={(e) => handleChange("localizacao", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="distrito">Distrito *</Label>
                <Select value={formData.distrito} onValueChange={(value) => handleChange("distrito", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o distrito" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lisboa">Lisboa</SelectItem>
                    <SelectItem value="Porto">Porto</SelectItem>
                    <SelectItem value="Setúbal">Setúbal</SelectItem>
                    <SelectItem value="Braga">Braga</SelectItem>
                    <SelectItem value="Coimbra">Coimbra</SelectItem>
                    <SelectItem value="Faro">Faro</SelectItem>
                    <SelectItem value="Aveiro">Aveiro</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
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
                    <SelectItem value="Até 10.000€">Até 10.000€</SelectItem>
                    <SelectItem value="10.000€ - 25.000€">10.000€ - 25.000€</SelectItem>
                    <SelectItem value="25.000€ - 50.000€">25.000€ - 50.000€</SelectItem>
                    <SelectItem value="50.000€ - 100.000€">50.000€ - 100.000€</SelectItem>
                    <SelectItem value="100.000€ - 250.000€">100.000€ - 250.000€</SelectItem>
                    <SelectItem value="Mais de 250.000€">Mais de 250.000€</SelectItem>
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
                    <SelectItem value="Urgente">Urgente (menos de 1 mês)</SelectItem>
                    <SelectItem value="1-3 meses">1 a 3 meses</SelectItem>
                    <SelectItem value="3-6 meses">3 a 6 meses</SelectItem>
                    <SelectItem value="6-12 meses">6 a 12 meses</SelectItem>
                    <SelectItem value="Flexível">Flexível</SelectItem>
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
              <Label htmlFor="requisitosEspeciais">Requisitos Especiais</Label>
              <Textarea
                id="requisitosEspeciais"
                placeholder="Indique requisitos especiais: acessibilidade, sustentabilidade, materiais específicos, horários de trabalho, etc."
                rows={3}
                value={formData.requisitosEspeciais}
                onChange={(e) => handleChange("requisitosEspeciais", e.target.value)}
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
                    distrito: "",
                    area: "",
                    orcamento: "",
                    prazo: "",
                    descricao: "",
                    requisitosEspeciais: "",
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
