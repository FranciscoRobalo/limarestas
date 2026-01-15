"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const projectTypes = [
  { value: "construcao", label: "Construção Nova", pricePerM2: { min: 1200, max: 2000 } },
  { value: "remodelacao-total", label: "Remodelação Total", pricePerM2: { min: 600, max: 1000 } },
  { value: "remodelacao-parcial", label: "Remodelação Parcial", pricePerM2: { min: 300, max: 600 } },
  { value: "cozinha", label: "Remodelação Cozinha", pricePerM2: { min: 800, max: 1500 } },
  { value: "casa-banho", label: "Remodelação Casa de Banho", pricePerM2: { min: 600, max: 1200 } },
  { value: "pintura", label: "Pintura", pricePerM2: { min: 15, max: 30 } },
  { value: "pavimento", label: "Pavimentos", pricePerM2: { min: 40, max: 100 } },
]

const qualityLevels = [
  { value: "economico", label: "Económico", multiplier: 0.8 },
  { value: "standard", label: "Standard", multiplier: 1 },
  { value: "premium", label: "Premium", multiplier: 1.4 },
  { value: "luxo", label: "Luxo", multiplier: 2 },
]

export function BudgetCalculator() {
  const [projectType, setProjectType] = useState("")
  const [area, setArea] = useState("")
  const [quality, setQuality] = useState("standard")
  const [estimate, setEstimate] = useState<{ min: number; max: number } | null>(null)

  const calculateEstimate = () => {
    const selectedProject = projectTypes.find((p) => p.value === projectType)
    const selectedQuality = qualityLevels.find((q) => q.value === quality)

    if (!selectedProject || !selectedQuality || !area) return

    const areaNum = Number.parseFloat(area)
    const min = Math.round(areaNum * selectedProject.pricePerM2.min * selectedQuality.multiplier)
    const max = Math.round(areaNum * selectedProject.pricePerM2.max * selectedQuality.multiplier)

    setEstimate({ min, max })
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(
      value,
    )
  }

  return (
    <section id="calculadora" className="py-20 md:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Simulador</span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground text-balance">
              Calcule uma estimativa para o seu projeto
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Use o nosso simulador para ter uma ideia do investimento necessário. Os valores são indicativos e podem
              variar conforme as especificidades do projeto.
            </p>
            <div className="flex items-start gap-3 p-4 bg-accent/10 rounded-xl">
              <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Esta é apenas uma estimativa. Para um orçamento preciso, contacte-nos e receberá propostas detalhadas de
                empresas qualificadas.
              </p>
            </div>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Calculator className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>Simulador de Orçamento</CardTitle>
              <CardDescription>Preencha os dados do seu projeto para obter uma estimativa.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Tipo de Projeto</Label>
                <Select value={projectType} onValueChange={setProjectType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de projeto" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Área (m²)</Label>
                <Input
                  type="number"
                  placeholder="Ex: 100"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  min="1"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Nível de Acabamentos</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>
                          O nível de acabamentos influencia significativamente o custo final. Materiais premium e
                          detalhes personalizados aumentam o investimento.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {qualityLevels.map((level) => (
                    <Button
                      key={level.value}
                      variant={quality === level.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setQuality(level.value)}
                      className={quality === level.value ? "bg-primary" : ""}
                    >
                      {level.label}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={calculateEstimate}
                disabled={!projectType || !area}
              >
                Calcular Estimativa
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              {estimate && (
                <div className="p-6 bg-secondary rounded-xl text-center space-y-2">
                  <p className="text-sm text-muted-foreground">Estimativa de investimento</p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatCurrency(estimate.min)} - {formatCurrency(estimate.max)}
                  </p>
                  <Button variant="link" className="text-accent" asChild>
                    <a href="#contacto">Pedir orçamentos reais</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
