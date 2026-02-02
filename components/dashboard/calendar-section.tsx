"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, User, Share2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useVisitas } from "@/hooks/use-visitas"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Marco",
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

// Generate dynamic mock events based on current date
const generateMockEvents = (): CalendarEvent[] => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  
  const formatDate = (day: number) => {
    const m = String(month + 1).padStart(2, "0")
    const d = String(day).padStart(2, "0")
    return `${year}-${m}-${d}`
  }

  return [
    {
      id: "1",
      title: "Visita Tecnica - Cascais",
      date: formatDate(today.getDate() + 1),
      time: "10:00",
      type: "visita",
      location: "Cascais",
      client: "Maria Santos",
    },
    { 
      id: "2", 
      title: "Reuniao Orcamento", 
      date: formatDate(today.getDate() + 1), 
      time: "14:00", 
      type: "reuniao", 
      client: "Joao Ferreira" 
    },
    { 
      id: "3", 
      title: "Entrega Projeto", 
      date: formatDate(today.getDate() + 3), 
      time: "09:00", 
      type: "entrega", 
      client: "Ana Rodrigues" 
    },
    { 
      id: "4", 
      title: "Prazo Orcamento", 
      date: formatDate(today.getDate() + 5), 
      time: "18:00", 
      type: "prazo" 
    },
    {
      id: "5",
      title: "Visita Obra Porto",
      date: formatDate(today.getDate() + 7),
      time: "11:00",
      type: "visita",
      location: "Porto",
      client: "Pedro Costa",
    },
  ]
}

const mockEvents: CalendarEvent[] = generateMockEvents()

export function CalendarSection() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [events, setEvents] = useState<CalendarEvent[]>(generateMockEvents())
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    type: "visita" as CalendarEvent["type"],
    location: "",
    client: "",
  })
  const { visitas } = useVisitas()

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) {
      alert("Por favor preencha todos os campos obrigatorios")
      return
    }

    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: newEvent.date,
      time: newEvent.time,
      type: newEvent.type,
      location: newEvent.location || undefined,
      client: newEvent.client || undefined,
    }

    setEvents([...events, event])
    setNewEvent({
      title: "",
      date: "",
      time: "",
      type: "visita",
      location: "",
      client: "",
    })
    setIsCreateDialogOpen(false)
  }

  const openCreateDialog = (preselectedDate?: Date) => {
    if (preselectedDate) {
      const dateStr = preselectedDate.toISOString().split("T")[0]
      setNewEvent({ ...newEvent, date: dateStr })
    }
    setIsCreateDialogOpen(true)
  }

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" /> Partilhar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => alert("Calendario partilhado com Tecnicos")}>
                Partilhar com Tecnicos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert("Calendario partilhado com Clientes")}>
                Partilhar com Clientes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert("Calendario partilhado com Empreiteiros")}>
                Partilhar com Empreiteiros
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button 
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
            onClick={() => openCreateDialog()}
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
                  <div key={event.id} className="p-4 rounded-lg bg-secondary/50 space-y-2">
                    <div className="flex items-start justify-between">
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
                <Button 
                  variant="link" 
                  className="mt-2 text-accent"
                  onClick={() => openCreateDialog(selectedDate || undefined)}
                >
                  Adicionar evento
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create Event Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Novo Evento</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Titulo *</Label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Ex: Visita Tecnica - Lisboa"
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
              <Label htmlFor="type">Tipo de Evento</Label>
              <Select
                value={newEvent.type}
                onValueChange={(value: CalendarEvent["type"]) => setNewEvent({ ...newEvent, type: value })}
              >
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
              <Label htmlFor="location">Localizacao</Label>
              <Input
                id="location"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                placeholder="Ex: Lisboa, Cascais"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="client">Cliente</Label>
              <Input
                id="client"
                value={newEvent.client}
                onChange={(e) => setNewEvent({ ...newEvent, client: e.target.value })}
                placeholder="Nome do cliente"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateEvent} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Criar Evento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
