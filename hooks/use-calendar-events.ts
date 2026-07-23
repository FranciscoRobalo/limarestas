"use client"

import { useEffect, useState } from "react"
import { storage } from "@/lib/storage"

const EVENTS_KEY = "limarestas_calendar_events"

export interface CalendarEvent {
  id: string
  title: string
  date: string
  time: string
  type: "visita" | "reuniao" | "entrega" | "prazo"
  location?: string
  client?: string
  notes?: string
}

const eventosIniciais: CalendarEvent[] = [
  {
    id: "seed-1",
    title: "Visita Técnica - Cascais",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 15).toISOString().split("T")[0],
    time: "10:00",
    type: "visita",
    location: "Cascais",
    client: "Maria Santos",
  },
  {
    id: "seed-2",
    title: "Reunião Orçamento",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 15).toISOString().split("T")[0],
    time: "14:00",
    type: "reuniao",
    client: "João Ferreira",
  },
  {
    id: "seed-3",
    title: "Entrega Projeto",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 18).toISOString().split("T")[0],
    time: "09:00",
    type: "entrega",
    client: "Ana Rodrigues",
  },
  {
    id: "seed-4",
    title: "Prazo Orçamento",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 20).toISOString().split("T")[0],
    time: "18:00",
    type: "prazo",
  },
]

export function useCalendarEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = storage.get<CalendarEvent[]>(EVENTS_KEY)
    setEvents(saved?.length ? saved : eventosIniciais)
    if (!saved?.length) storage.set(EVENTS_KEY, eventosIniciais)
    setLoading(false)
  }, [])

  const persist = (next: CalendarEvent[]) => {
    setEvents(next)
    storage.set(EVENTS_KEY, next)
  }

  const addEvent = (event: Omit<CalendarEvent, "id">) => {
    const novo: CalendarEvent = { ...event, id: `evt-${Date.now()}` }
    persist([...events, novo])
    return novo
  }

  const updateEvent = (id: string, updates: Partial<CalendarEvent>) => {
    persist(events.map((event) => (event.id === id ? { ...event, ...updates } : event)))
  }

  const deleteEvent = (id: string) => {
    persist(events.filter((event) => event.id !== id))
  }

  return { events, loading, addEvent, updateEvent, deleteEvent }
}
