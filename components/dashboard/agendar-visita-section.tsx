"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, CheckCircle2, User, Phone } from "lucide-react"

interface VisitaFormData {
  obra: string
  data: string
  horario: string
  contacto: string
  responsavel: string
  observacoes: string
}

const obrasDisponiveis = [
  { id: "OBR-2024-001", nome: "Remodelação Apartamento T3 - Cascais" },
  { id: "OBR-2024-002", nome: "Construção Moradia V4 - Sintra" },
]

const horariosDisponiveis = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
]

interface VisitaAgendada {
  id: string
  obra: string
  data: string
  horario: string
  status: "confirmada" | "pendente" | "concluida"
}

const visitasAgendadas: VisitaAgendada[] = [
  {
    id: "VIS-001",
    obra: "Remodelação Apartamento T3 - Cascais",
    data: "2024-02-05",
    horario: "10:00 - 11:00",
    status: "confirmada",
  },
  {
    id: "VIS-002",
    obra: "Construção Moradia V4 - Sintra",
    data: "2024-02-08",
    horario: "14:00 - 15:00",
    status: "pendente",
  },
]

export function AgendarVisitaSection() {
  const [formData, setFormData] = useState<VisitaFormData>({
    obra: "",
    data: "",
    horario: "",
    contacto: "",
    responsavel: "",
    observacoes: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const handleChange = (field: keyof VisitaFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif text-foreground mb-2">Agendar Visita à Obra</h2>
        <p className="text-muted-foreground">
          Agende uma visita técnica ao local da obra. A nossa equipa irá avaliar o espaço e discutir os detalhes do
          projeto.
        </p>
      </div>

      {submitted && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <p className="text-green-700 dark:text-green-300">
            Visita agendada com sucesso! Receberá confirmação por email.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulário de Agendamento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Nova Visita
            </CardTitle>
            <CardDescription>Selecione a obra e escolha a data e horário preferidos.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="obra">Obra *</Label>
                <Select value={formData.obra} onValueChange={(value) => handleChange("obra", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a obra" />
                  </SelectTrigger>
                  <SelectContent>
                    {obrasDisponiveis.map((obra) => (
                      <SelectItem key={obra.id} value={obra.id}>
                        {obra.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="data" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Data *
                  </Label>
                  <Input
                    id="data"
                    type="date"
                    min={today}
                    value={formData.data}
                    onChange={(e) => handleChange("data", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="horario" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Horário *
                  </Label>
                  <Select value={formData.horario} onValueChange={(value) => handleChange("horario", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {horariosDisponiveis.map((horario) => (
                        <SelectItem key={horario} value={horario}>
                          {horario}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsavel" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Responsável no Local
                </Label>
                <Input
                  id="responsavel"
                  placeholder="Nome de quem estará presente"
                  value={formData.responsavel}
                  onChange={(e) => handleChange("responsavel", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contacto" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Contacto *
                </Label>
                <Input
                  id="contacto"
                  type="tel"
                  placeholder="Telemóvel para contacto"
                  value={formData.contacto}
                  onChange={(e) => handleChange("contacto", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  placeholder="Instruções de acesso, estacionamento, código de entrada, etc."
                  rows={3}
                  value={formData.observacoes}
                  onChange={(e) => handleChange("observacoes", e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Agendar Visita
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Visitas Agendadas */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Visitas Agendadas</h3>

          {visitasAgendadas.length === 0 ? (
            <Card className="p-8 text-center">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhuma visita agendada</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {visitasAgendadas.map((visita) => (
                <Card
                  key={visita.id}
                  className={`border-l-4 ${
                    visita.status === "confirmada"
                      ? "border-l-green-500"
                      : visita.status === "pendente"
                        ? "border-l-yellow-500"
                        : "border-l-muted"
                  }`}
                >
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <p className="font-medium text-foreground">{visita.obra}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(visita.data).toLocaleDateString("pt-PT", {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {visita.horario}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          visita.status === "confirmada"
                            ? "bg-green-500/10 text-green-600 border border-green-500/30"
                            : visita.status === "pendente"
                              ? "bg-yellow-500/10 text-yellow-600 border border-yellow-500/30"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {visita.status === "confirmada"
                          ? "Confirmada"
                          : visita.status === "pendente"
                            ? "Pendente"
                            : "Concluída"}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        Reagendar
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                        Cancelar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
