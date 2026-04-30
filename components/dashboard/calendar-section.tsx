"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, User, X, Trash2 } from "lucide-react"
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

type EventType = "visita" | "reuniao" | "entrega" | "prazo"

interface CalendarEvent {
  id: string
  title: string
  date: string
  time: string
  type: EventType
  location?: string
  client?: string
}

// Generate dates relative to current date
const getRelativeDate = (daysFromNow: number): string => {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  return date.toISOString().split("T")[0]
}

const initialMockEvents: CalendarEvent[] = [
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

export function CalendarSection() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [events, setEvents] = useState<CalendarEvent[]>(initialMockEvents)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newEventTitle, setNewEventTitle] = useState("")
  const [newEventDate, setNewEventDate] = useState("")
  const [newEventTime, setNewEventTime] = useState("")
  const [newEventType, setNewEventType] = useState<EventType>("visita")
  const [newEventLocation, setNewEventLocation] = useState("")
  const [newEventClient, setNewEventClient] = useState("")
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

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }

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

  const openDialog = (date?: Date) => {
    const targetDate = date || selectedDate || new Date()
    setNewEventDate(targetDate.toISOString().split("T")[0])
    setNewEventTitle("")
    setNewEventTime("")
    setNewEventType("visita")
    setNewEventLocation("")
    setNewEventClient("")
    setIsDialogOpen(true)
  }

  const handleCreateEvent = () => {
    if (!newEventTitle || !newEventDate || !newEventTime) {
      return
    }

    const event: CalendarEvent = {
      id: `event-${Date.now()}`,
      title: newEventTitle,
      date: newEventDate,
      time: newEventTime,
      type: newEventType,
      location: newEventLocation || undefined,
      client: newEventClient || undefined,
    }

    setEvents((prev) => [...prev, event])
    setIsDialogOpen(false)
    
    // Reset form
    setNewEventTitle("")
    setNewEventDate("")
    setNewEventTime("")
    setNewEventType("visita")
    setNewEventLocation("")
    setNewEventClient("")
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

  const getEventTypeColor = (type: EventType) => {
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
          <Button 
            onClick={() => openDialog()} 
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
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

                const dayEvents = getEventsForDate(day)
                const hasEvents = dayEvents.length > 0

                return (
                  <button
                    key={day.toISOString()}
                    type="button"
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
                        {dayEvents.slice(0, 3).map((event, i) => (
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
                  <div key={event.id} className="p-4 rounded-lg bg-secondary/50 space-y-2 relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      <Trash2 className="w-3 h-3" />
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
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => openDialog(selectedDate || undefined)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar evento
                </Button>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>Nenhum evento para este dia</p>
                <Button 
                  variant="link" 
                  className="mt-2 text-accent" 
                  onClick={() => openDialog(selectedDate || undefined)}
                >
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
              <Label htmlFor="event-title">Título *</Label>
              <Input
                id="event-title"
                placeholder="Ex: Visita Técnica - Lisboa"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="event-date">Data *</Label>
                <Input
                  id="event-date"
                  type="date"
                  value={newEventDate}
                  onChange={(e) => setNewEventDate(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="event-time">Hora *</Label>
                <Input
                  id="event-time"
                  type="time"
                  value={newEventTime}
                  onChange={(e) => setNewEventTime(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="event-type">Tipo de Evento *</Label>
              <Select value={newEventType} onValueChange={(value: EventType) => setNewEventType(value)}>
                <SelectTrigger id="event-type">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visita">Visita</SelectItem>
                  <SelectItem value="reuniao">Reunião</SelectItem>
                  <SelectItem value="entrega">Entrega</SelectItem>
                  <SelectItem value="prazo">Prazo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="event-location">Localização</Label>
              <Input
                id="event-location"
                placeholder="Ex: Lisboa, Porto, Cascais..."
                value={newEventLocation}
                onChange={(e) => setNewEventLocation(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="event-client">Cliente</Label>
              <Input
                id="event-client"
                placeholder="Nome do cliente"
                value={newEventClient}
                onChange={(e) => setNewEventClient(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleCreateEvent}
              disabled={!newEventTitle || !newEventDate || !newEventTime}
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
