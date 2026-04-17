"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useVisitas } from "@/hooks/use-visitas"

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

interface CalendarEvent {
  id: string
  title: string
  date: string
  time: string
  type: "visita" | "reuniao" | "entrega" | "prazo"
  location?: string
  client?: string
}

// Generate dates relative to current date
const getRelativeDate = (daysFromNow: number): string => {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  return date.toISOString().split("T")[0]
}

const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Visita Técnica - Cascais",
    date: getRelativeDate(2),
    time: "10:00",
    type: "visita",
    location: "Cascais",
    client: "Maria Santos",
  },
  { id: "2", title: "Reunião Orçamento", date: getRelativeDate(2), time: "14:00", type: "reuniao", client: "João Ferreira" },
  { id: "3", title: "Entrega Projeto", date: getRelativeDate(5), time: "09:00", type: "entrega", client: "Ana Rodrigues" },
  { id: "4", title: "Prazo Orçamento", date: getRelativeDate(7), time: "18:00", type: "prazo" },
  {
    id: "5",
    title: "Visita Obra Porto",
    date: getRelativeDate(10),
    time: "11:00",
    type: "visita",
    location: "Porto",
    client: "Pedro Costa",
  },
  {
    id: "6",
    title: "Reunião Cliente Lisboa",
    date: getRelativeDate(0),
    time: "15:00",
    type: "reuniao",
    location: "Lisboa",
    client: "Carlos Mendes",
  },
  {
    id: "7",
    title: "Visita Inicial - Sintra",
    date: getRelativeDate(1),
    time: "09:30",
    type: "visita",
    location: "Sintra",
    client: "Sofia Almeida",
  },
]

interface NewEventForm {
  title: string
  date: string
  time: string
  type: CalendarEvent["type"]
  location: string
  client: string
}

const initialEventForm: NewEventForm = {
  title: "",
  date: "",
  time: "",
  type: "visita",
  location: "",
  client: "",
}

export function CalendarSection() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newEvent, setNewEvent] = useState<NewEventForm>(initialEventForm)
  const { visitas } = useVisitas()

  const allEvents = useMemo(() => {
    const visitaEvents: CalendarEvent[] = visitas.map((v) => ({
      id: v.id,
      title: `Visita - ${v.obraId}`,
      date: v.data,
      time: v.horario,
      type: "visita" as const,
      location: v.obraId,
    }))
    return [...events, ...visitaEvents]
  }, [visitas, events])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days: (Date | null)[] = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  const days = getDaysInMonth(currentDate)

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return allEvents.filter((event) => event.date === dateStr)
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
    setSelectedDate(new Date())
  }

  const openNewEventDialog = (date?: Date) => {
    const targetDate = date || selectedDate || new Date()
    setNewEvent({
      ...initialEventForm,
      date: targetDate.toISOString().split("T")[0],
    })
    setIsDialogOpen(true)
  }

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) return

    const event: CalendarEvent = {
      id: `event-${Date.now()}`,
      title: newEvent.title,
      date: newEvent.date,
      time: newEvent.time,
      type: newEvent.type,
      location: newEvent.location || undefined,
      client: newEvent.client || undefined,
    }

    setEvents((prev) => [...prev, event])
    setNewEvent(initialEventForm)
    setIsDialogOpen(false)
  }

  const handleDeleteEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId))
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const isSelected = (date: Date) => {
    return (
      selectedDate &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    )
  }

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

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : []

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Calendário</h2>
          <p className="text-muted-foreground">Visualize visitas, reuniões e prazos</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={goToToday}>
            Hoje
          </Button>
          <Button onClick={() => openNewEventDialog()} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Plus className="w-4 h-4 mr-2" /> Novo Evento
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={goToPreviousMonth}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <CardTitle className="text-xl">
                {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={goToNextMonth}>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Days header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS.map((day) => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                if (!day) {
                  return <div key={`empty-${index}`} className="aspect-square" />
                }

                const events = getEventsForDate(day)
                const hasEvents = events.length > 0

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDate(day)}
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
                        {events.slice(0, 3).map((event, i) => (
                          <div key={i} className={`w-1.5 h-1.5 rounded-full ${getEventTypeColor(event.type)}`} />
                        ))}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Legend */}
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

        {/* Selected Day Events */}
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
              <div className="space-y-4">
                {selectedDateEvents.map((event) => (
                  <div key={event.id} className="p-4 rounded-lg bg-secondary/50 space-y-2 group relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                    <div className="flex items-start justify-between pr-8">
                      <h4 className="font-medium text-foreground">{event.title}</h4>
                      <Badge variant="secondary" className={`${getEventTypeColor(event.type)} text-white`}>
                        {event.type}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
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
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>Nenhum evento para este dia</p>
                <Button variant="link" className="mt-2 text-accent" onClick={() => openNewEventDialog(selectedDate || undefined)}>
                  Adicionar evento
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* New Event Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar Novo Evento</DialogTitle>
            <DialogDescription>
              Adicione um novo evento ao calendário.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                placeholder="Ex: Visita Técnica - Lisboa"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Data *</Label>
                <Input
                  id="date"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Hora *</Label>
                <Input
                  id="time"
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Tipo de Evento *</Label>
              <Select value={newEvent.type} onValueChange={(value: CalendarEvent["type"]) => setNewEvent({ ...newEvent, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visita">Visita</SelectItem>
                  <SelectItem value="reuniao">Reuniao</SelectItem>
                  <SelectItem value="entrega">Entrega</SelectItem>
                  <SelectItem value="prazo">Prazo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Localização</Label>
              <Input
                id="location"
                placeholder="Ex: Lisboa, Porto, Cascais..."
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="client">Cliente</Label>
              <Input
                id="client"
                placeholder="Nome do cliente"
                value={newEvent.client}
                onChange={(e) => setNewEvent({ ...newEvent, client: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleCreateEvent}
              disabled={!newEvent.title || !newEvent.date || !newEvent.time}
              className="bg-accent hover:bg-accent/90"
            >
              Criar Evento
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
