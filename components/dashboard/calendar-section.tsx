"use client"

import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, User, Trash2, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useVisitas } from "@/hooks/use-visitas"
import { useCalendarEvents, type CalendarEvent } from "@/hooks/use-calendar-events"
import { toast } from "sonner"

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

const TYPE_LABELS: Record<CalendarEvent["type"], string> = {
  visita: "Visita",
  reuniao: "Reunião",
  entrega: "Entrega",
  prazo: "Prazo",
}

function toDateStr(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

const emptyForm = {
  title: "",
  date: "",
  time: "",
  type: "reuniao" as CalendarEvent["type"],
  location: "",
  client: "",
  notes: "",
}

export function CalendarSection() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { visitas } = useVisitas()
  const { events, addEvent, updateEvent, deleteEvent } = useCalendarEvents()

  const allEvents = useMemo(() => {
    const visitaEvents: CalendarEvent[] = visitas.map((v) => ({
      id: `visita-${v.id}`,
      title: `Visita - ${v.obraNome || v.obraId}`,
      date: v.data,
      time: v.horario,
      type: "visita" as const,
      location: v.obraNome || v.obraId,
      client: v.responsavel,
    }))
    return [...events, ...visitaEvents]
  }, [events, visitas])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days: (Date | null)[] = []
    for (let i = 0; i < firstDay.getDay(); i++) days.push(null)
    for (let i = 1; i <= lastDay.getDate(); i++) days.push(new Date(year, month, i))
    return days
  }

  const days = getDaysInMonth(currentDate)

  const getEventsForDate = (date: Date) => {
    const dateStr = toDateStr(date)
    return allEvents.filter((event) => event.date === dateStr)
  }

  const goToPreviousMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  const goToNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  const goToToday = () => {
    const today = new Date()
    setCurrentDate(today)
    setSelectedDate(today)
  }

  const isSameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()

  const isToday = (date: Date) => isSameDay(date, new Date())
  const isSelected = (date: Date) => (selectedDate ? isSameDay(date, selectedDate) : false)

  const getEventTypeColor = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "visita":
        return "bg-blue-500"
      case "reuniao":
        return "bg-green-500"
      case "entrega":
        return "bg-accent"
      case "prazo":
        return "bg-red-500"
      default:
        return "bg-primary"
    }
  }

  const openCreateDialog = (presetDate?: Date) => {
    setEditingId(null)
    setErrors({})
    setForm({ ...emptyForm, date: presetDate ? toDateStr(presetDate) : selectedDate ? toDateStr(selectedDate) : "" })
    setDialogOpen(true)
  }

  const openEditDialog = (event: CalendarEvent) => {
    setEditingId(event.id)
    setErrors({})
    setForm({
      title: event.title,
      date: event.date,
      time: event.time,
      type: event.type,
      location: event.location ?? "",
      client: event.client ?? "",
      notes: event.notes ?? "",
    })
    setDialogOpen(true)
  }

  const validate = () => {
    const next: Record<string, string> = {}
    if (!form.title.trim()) next.title = "Indique um título."
    if (!form.date) next.date = "Escolha uma data."
    if (!form.time) next.time = "Escolha uma hora."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    const payload = {
      title: form.title.trim(),
      date: form.date,
      time: form.time,
      type: form.type,
      location: form.location.trim() || undefined,
      client: form.client.trim() || undefined,
      notes: form.notes.trim() || undefined,
    }
    if (editingId) {
      updateEvent(editingId, payload)
      toast.success("Evento atualizado")
    } else {
      addEvent(payload)
      toast.success("Evento criado")
    }
    setSelectedDate(new Date(`${form.date}T00:00:00`))
    setCurrentDate(new Date(`${form.date}T00:00:00`))
    setDialogOpen(false)
  }

  const handleDelete = (event: CalendarEvent) => {
    if (event.id.startsWith("visita-")) {
      toast.error("Reagende a visita na secção de visitas.")
      return
    }
    deleteEvent(event.id)
    toast.success("Evento removido")
  }

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : []

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Calendário</h2>
          <p className="text-muted-foreground">Visualize visitas, reuniões e prazos</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={goToToday}>
            Hoje
          </Button>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => openCreateDialog()}>
            <Plus className="w-4 h-4 mr-2" /> Novo Evento
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={goToPreviousMonth} aria-label="Mês anterior">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <CardTitle className="text-xl">
                {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={goToNextMonth} aria-label="Mês seguinte">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS.map((day) => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                if (!day) return <div key={`empty-${index}`} className="aspect-square" />
                const dayEvents = getEventsForDate(day)
                const hasEvents = dayEvents.length > 0
                return (
                  <button
                    key={day.toISOString()}
                    type="button"
                    onClick={() => setSelectedDate(day)}
                    onDoubleClick={() => openCreateDialog(day)}
                    className={`aspect-square p-1 rounded-lg transition-colors relative ${
                      isToday(day)
                        ? "bg-accent text-accent-foreground"
                        : isSelected(day)
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                    }`}
                  >
                    <span className="text-sm">{day.getDate()}</span>
                    {hasEvents && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                        {dayEvents.slice(0, 3).map((event, i) => (
                          <div key={i} className={`w-1.5 h-1.5 rounded-full ${getEventTypeColor(event.type)}`} />
                        ))}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-muted-foreground">Visitas</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-muted-foreground">Reuniões</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-muted-foreground">Entregas</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-muted-foreground">Prazos</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {selectedDate
                ? selectedDate.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long" })
                : "Selecione um dia"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length > 0 ? (
              <div className="flex flex-col gap-4">
                {selectedDateEvents.map((event) => (
                  <div key={event.id} className="p-4 rounded-lg bg-secondary/50 flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-foreground">{event.title}</h4>
                      <Badge variant="secondary" className={`${getEventTypeColor(event.type)} text-white`}>
                        {TYPE_LABELS[event.type]}
                      </Badge>
                    </div>
                    <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                      )}
                      {event.client && (
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {event.client}
                        </div>
                      )}
                      {event.notes && <p className="pt-1">{event.notes}</p>}
                    </div>
                    <div className="flex gap-2 pt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(event)}
                        disabled={event.id.startsWith("visita-")}
                      >
                        <Pencil className="w-3.5 h-3.5 mr-1.5" /> Editar
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(event)}>
                        <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Remover
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>Nenhum evento para este dia</p>
                <Button variant="link" className="mt-2 text-accent" onClick={() => openCreateDialog()}>
                  Adicionar evento
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? "Editar evento" : "Novo evento"}</DialogTitle>
            <DialogDescription>Preencha os detalhes do evento no calendário.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="event-title">Título</Label>
              <Input
                id="event-title"
                value={form.title}
                aria-invalid={!!errors.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Ex. Reunião de orçamento"
              />
              {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="event-date">Data</Label>
                <Input
                  id="event-date"
                  type="date"
                  value={form.date}
                  aria-invalid={!!errors.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
                {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="event-time">Hora</Label>
                <Input
                  id="event-time"
                  type="time"
                  value={form.time}
                  aria-invalid={!!errors.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                />
                {errors.time && <p className="text-sm text-destructive">{errors.time}</p>}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="event-type">Tipo</Label>
              <Select
                value={form.type}
                onValueChange={(value) => setForm({ ...form, type: value as CalendarEvent["type"] })}
              >
                <SelectTrigger id="event-type" className="w-full">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="reuniao">Reunião</SelectItem>
                    <SelectItem value="visita">Visita</SelectItem>
                    <SelectItem value="entrega">Entrega</SelectItem>
                    <SelectItem value="prazo">Prazo</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="event-location">Local (opcional)</Label>
                <Input
                  id="event-location"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="event-client">Cliente (opcional)</Label>
                <Input
                  id="event-client"
                  value={form.client}
                  onChange={(e) => setForm({ ...form, client: e.target.value })}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="event-notes">Notas (opcional)</Label>
              <Textarea
                id="event-notes"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>{editingId ? "Guardar alterações" : "Criar evento"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
