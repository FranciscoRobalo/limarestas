"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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

const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Visita Técnica - Cascais",
    date: "2024-02-15",
    time: "10:00",
    type: "visita",
    location: "Cascais",
    client: "Maria Santos",
  },
  { id: "2", title: "Reunião Orçamento", date: "2024-02-15", time: "14:00", type: "reuniao", client: "João Ferreira" },
  { id: "3", title: "Entrega Projeto", date: "2024-02-18", time: "09:00", type: "entrega", client: "Ana Rodrigues" },
  { id: "4", title: "Prazo Orçamento", date: "2024-02-20", time: "18:00", type: "prazo" },
  {
    id: "5",
    title: "Visita Obra Porto",
    date: "2024-02-22",
    time: "11:00",
    type: "visita",
    location: "Porto",
    client: "Pedro Costa",
  },
]

export function CalendarSection() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
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
    return [...mockEvents, ...visitaEvents]
  }, [visitas])

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
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
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
                <Button variant="link" className="mt-2 text-accent">
                  Adicionar evento
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
