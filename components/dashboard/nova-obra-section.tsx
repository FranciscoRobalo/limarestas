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
import { CheckCircle2, Building, MapPin, Calendar, FileText, Euro, User, Phone, Mail, Upload, X, Home, Ruler, Clock, AlertCircle } from "lucide-react"
import { useObras } from "@/hooks/use-obras"

interface ObraFormData {
  // Informações do Cliente
  nomeCliente: string
  email: string
  telefone: string
  tipoCliente: string
  // Informações da Obra
  nome: string
  tipo: string
  subtipo: string
  localizacao: string
  morada: string
  codigoPostal: string
  distrito: string
  // Detalhes Técnicos
  area: string
  numDivisoes: string
  numPisos: string
  anoConstructao: string
  tipoImovel: string
  // Financeiro e Prazo
  orcamento: string
  prazo: string
  prioridade: string
  // Descrição
  descricao: string
  requisitosEspeciais: string
  // Documentos
  documentos: string[]
}

export function NovaObraSection() {
  const { addObra } = useObras()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const [formData, setFormData] = useState<ObraFormData>({
    // Cliente
    nomeCliente: "",
    email: "",
    telefone: "",
    tipoCliente: "",
    // Obra
    nome: "",
    tipo: "",
    subtipo: "",
    localizacao: "",
    morada: "",
    codigoPostal: "",
    distrito: "",
    // Técnico
    area: "",
    numDivisoes: "",
    numPisos: "",
    anoConstructao: "",
    tipoImovel: "",
    // Financeiro
    orcamento: "",
    prazo: "",
    prioridade: "normal",
    // Descrição
    descricao: "",
    requisitosEspeciais: "",
    documentos: [],
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
      setCurrentStep(1)
      setFormData({
        nomeCliente: "",
        email: "",
        telefone: "",
        tipoCliente: "",
        nome: "",
        tipo: "",
        subtipo: "",
        localizacao: "",
        morada: "",
        codigoPostal: "",
        distrito: "",
        area: "",
        numDivisoes: "",
        numPisos: "",
        anoConstructao: "",
        tipoImovel: "",
        orcamento: "",
        prazo: "",
        prioridade: "normal",
        descricao: "",
        requisitosEspeciais: "",
        documentos: [],
      })
    }, 3000)
  }

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.nomeCliente && formData.email && formData.telefone && formData.tipoCliente
      case 2:
        return formData.nome && formData.tipo && formData.localizacao && formData.distrito
      case 3:
        return formData.tipoImovel
      case 4:
        return formData.descricao
      default:
        return true
    }
  }

  const handleChange = (field: keyof ObraFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const stepTitles = [
    { step: 1, title: "Dados do Cliente", icon: User },
    { step: 2, title: "Informação da Obra", icon: Building },
    { step: 3, title: "Detalhes Técnicos", icon: Ruler },
    { step: 4, title: "Descrição e Documentos", icon: FileText },
  ]

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

      {/* Progress Steps */}
      <div className="flex items-center justify-between max-w-2xl mx-auto mb-8">
        {stepTitles.map((s, index) => (
          <div key={s.step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                  currentStep >= s.step
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-muted-foreground/30 text-muted-foreground"
                }`}
              >
                {currentStep > s.step ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <s.icon className="w-5 h-5" />
                )}
              </div>
              <span className={`text-xs mt-2 ${currentStep >= s.step ? "text-primary font-medium" : "text-muted-foreground"}`}>
                {s.title}
              </span>
            </div>
            {index < stepTitles.length - 1 && (
              <div className={`w-12 sm:w-24 h-0.5 mx-2 ${currentStep > s.step ? "bg-primary" : "bg-muted-foreground/30"}`} />
            )}
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {(() => {
              const StepIcon = stepTitles[currentStep - 1].icon
              return StepIcon ? <StepIcon className="w-5 h-5 text-primary" /> : null
            })()}
            {stepTitles[currentStep - 1].title}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && "Informações de contacto do cliente responsável pela obra."}
            {currentStep === 2 && "Detalhes básicos sobre a localização e tipo de obra."}
            {currentStep === 3 && "Características técnicas do imóvel e orçamento."}
            {currentStep === 4 && "Descrição detalhada e documentação relevante."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Step 1: Client Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nomeCliente" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Nome Completo *
                    </Label>
                    <Input
                      id="nomeCliente"
                      placeholder="Ex: João Silva"
                      value={formData.nomeCliente}
                      onChange={(e) => handleChange("nomeCliente", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tipoCliente">Tipo de Cliente *</Label>
                    <Select value={formData.tipoCliente} onValueChange={(value) => handleChange("tipoCliente", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="particular">Particular</SelectItem>
                        <SelectItem value="empresa">Empresa</SelectItem>
                        <SelectItem value="condominio">Condomínio</SelectItem>
                        <SelectItem value="imobiliaria">Imobiliária</SelectItem>
                        <SelectItem value="arquiteto">Arquiteto/Engenheiro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="cliente@email.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Telefone *
                    </Label>
                    <Input
                      id="telefone"
                      type="tel"
                      placeholder="+351 912 345 678"
                      value={formData.telefone}
                      onChange={(e) => handleChange("telefone", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Project Basic Info */}
            {currentStep === 2 && (
              <div className="space-y-6">
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
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Remodelação">Remodelação</SelectItem>
                        <SelectItem value="Construção Nova">Construção Nova</SelectItem>
                        <SelectItem value="Ampliação">Ampliação</SelectItem>
                        <SelectItem value="Reabilitação">Reabilitação</SelectItem>
                        <SelectItem value="Manutenção">Manutenção</SelectItem>
                        <SelectItem value="Paisagismo">Paisagismo</SelectItem>
                        <SelectItem value="Outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="morada" className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Morada Completa
                    </Label>
                    <Input
                      id="morada"
                      placeholder="Rua, número, andar"
                      value={formData.morada}
                      onChange={(e) => handleChange("morada", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="localizacao">Localidade *</Label>
                    <Input
                      id="localizacao"
                      placeholder="Ex: Cascais"
                      value={formData.localizacao}
                      onChange={(e) => handleChange("localizacao", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="codigoPostal">Código Postal</Label>
                    <Input
                      id="codigoPostal"
                      placeholder="0000-000"
                      value={formData.codigoPostal}
                      onChange={(e) => handleChange("codigoPostal", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="distrito">Distrito *</Label>
                    <Select value={formData.distrito} onValueChange={(value) => handleChange("distrito", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Aveiro">Aveiro</SelectItem>
                        <SelectItem value="Beja">Beja</SelectItem>
                        <SelectItem value="Braga">Braga</SelectItem>
                        <SelectItem value="Bragança">Bragança</SelectItem>
                        <SelectItem value="Castelo Branco">Castelo Branco</SelectItem>
                        <SelectItem value="Coimbra">Coimbra</SelectItem>
                        <SelectItem value="Évora">Évora</SelectItem>
                        <SelectItem value="Faro">Faro</SelectItem>
                        <SelectItem value="Guarda">Guarda</SelectItem>
                        <SelectItem value="Leiria">Leiria</SelectItem>
                        <SelectItem value="Lisboa">Lisboa</SelectItem>
                        <SelectItem value="Portalegre">Portalegre</SelectItem>
                        <SelectItem value="Porto">Porto</SelectItem>
                        <SelectItem value="Santarém">Santarém</SelectItem>
                        <SelectItem value="Setúbal">Setúbal</SelectItem>
                        <SelectItem value="Viana do Castelo">Viana do Castelo</SelectItem>
                        <SelectItem value="Vila Real">Vila Real</SelectItem>
                        <SelectItem value="Viseu">Viseu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Technical Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="tipoImovel" className="flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      Tipo de Imóvel *
                    </Label>
                    <Select value={formData.tipoImovel} onValueChange={(value) => handleChange("tipoImovel", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartamento">Apartamento</SelectItem>
                        <SelectItem value="moradia">Moradia</SelectItem>
                        <SelectItem value="escritorio">Escritório</SelectItem>
                        <SelectItem value="loja">Loja Comercial</SelectItem>
                        <SelectItem value="armazem">Armazém</SelectItem>
                        <SelectItem value="edificio">Edifício</SelectItem>
                        <SelectItem value="terreno">Terreno</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="area" className="flex items-center gap-2">
                      <Ruler className="w-4 h-4" />
                      Área (m²)
                    </Label>
                    <Input
                      id="area"
                      type="number"
                      placeholder="Ex: 120"
                      value={formData.area}
                      onChange={(e) => handleChange("area", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numDivisoes">Nº de Divisões</Label>
                    <Input
                      id="numDivisoes"
                      type="number"
                      placeholder="Ex: 5"
                      value={formData.numDivisoes}
                      onChange={(e) => handleChange("numDivisoes", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numPisos">Nº de Pisos</Label>
                    <Input
                      id="numPisos"
                      type="number"
                      placeholder="Ex: 2"
                      value={formData.numPisos}
                      onChange={(e) => handleChange("numPisos", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="anoConstructao">Ano de Construção</Label>
                    <Input
                      id="anoConstructao"
                      type="number"
                      placeholder="Ex: 1990"
                      value={formData.anoConstructao}
                      onChange={(e) => handleChange("anoConstructao", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prioridade" className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Prioridade
                    </Label>
                    <Select value={formData.prioridade} onValueChange={(value) => handleChange("prioridade", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baixa">Baixa</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                        <SelectItem value="urgente">Urgente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="orcamento" className="flex items-center gap-2">
                      <Euro className="w-4 h-4" />
                      Orçamento Previsto
                    </Label>
                    <Select value={formData.orcamento} onValueChange={(value) => handleChange("orcamento", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
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
                      <Clock className="w-4 h-4" />
                      Prazo Desejado
                    </Label>
                    <Select value={formData.prazo} onValueChange={(value) => handleChange("prazo", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
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
              </div>
            )}

            {/* Step 4: Description and Documents */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="descricao" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Descrição do Projeto *
                  </Label>
                  <Textarea
                    id="descricao"
                    placeholder="Descreva o projeto em detalhe: o que pretende fazer, estado atual do imóvel, materiais preferidos, etc."
                    rows={5}
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

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Documentos (opcional)
                  </Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                    <p className="text-sm text-muted-foreground mb-1">
                      Arraste ficheiros ou clique para carregar
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Plantas, fotografias, documentos (PDF, JPG, PNG - máx. 10MB cada)
                    </p>
                  </div>
                  {formData.documentos.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.documentos.map((doc, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {doc}
                          <X className="w-3 h-3 cursor-pointer" onClick={() => {
                            const newDocs = formData.documentos.filter((_, i) => i !== index)
                            handleChange("documentos", newDocs as unknown as string)
                          }} />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Summary */}
                <Card className="bg-secondary/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Resumo da Obra</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      <span className="text-muted-foreground">Cliente:</span>
                      <span className="font-medium">{formData.nomeCliente || "-"}</span>
                      <span className="text-muted-foreground">Projeto:</span>
                      <span className="font-medium">{formData.nome || "-"}</span>
                      <span className="text-muted-foreground">Tipo:</span>
                      <span className="font-medium">{formData.tipo || "-"}</span>
                      <span className="text-muted-foreground">Localização:</span>
                      <span className="font-medium">{formData.localizacao}, {formData.distrito || "-"}</span>
                      <span className="text-muted-foreground">Orçamento:</span>
                      <span className="font-medium">{formData.orcamento || "Não especificado"}</span>
                      <span className="text-muted-foreground">Prazo:</span>
                      <span className="font-medium">{formData.prazo || "Flexível"}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Anterior
              </Button>
              <div className="flex gap-3">
                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepValid()}
                  >
                    Próximo
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-primary/90"
                    disabled={!isStepValid()}
                  >
                    Submeter Obra
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
