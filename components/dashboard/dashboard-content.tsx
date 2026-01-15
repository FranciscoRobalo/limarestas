"use client"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { DocumentsSection } from "./documents-section"
import { ChatSection } from "./chat-section"
import { DashboardOverview } from "./dashboard-overview"
import { NovaObraSection } from "./nova-obra-section"
import { ValidacaoSection } from "./validacao-section"
import { AgendarVisitaSection } from "./agendar-visita-section"
import { ObrasDisponiveisSection } from "./obras-disponiveis-section"
import { WorkflowSection } from "./workflow-section"
import { ActivityLogSection } from "./activity-log-section"
import { PublicidadeSection } from "./publicidade-section"
import { VisitasAgendadasSection } from "./visitas-agendadas-section"
import { SettingsSection } from "./settings-section"
import { NotificationsSection } from "./notifications-section"
import { AnalyticsSection } from "./analytics-section"
import { InvoicesSection } from "./invoices-section"
import { CalendarSection } from "./calendar-section"

export function DashboardContent() {
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab")
  const { user } = useAuth()

  if (tab === "analytics" && user?.role === "admin") {
    return <AnalyticsSection />
  }

  if (tab === "calendar" && (user?.role === "admin" || user?.role === "tecnico")) {
    return <CalendarSection />
  }

  if (tab === "workflow" && user?.role === "admin") {
    return <WorkflowSection />
  }

  if (tab === "nova-obra" && user?.role === "admin") {
    return <NovaObraSection />
  }

  if (tab === "validacao" && user?.role === "admin") {
    return <ValidacaoSection />
  }

  if (tab === "agendar" && (user?.role === "admin" || user?.role === "tecnico")) {
    return <AgendarVisitaSection />
  }

  if (tab === "visitas-agendadas" && user?.role === "public") {
    return <VisitasAgendadasSection />
  }

  if (tab === "obras" && (user?.role === "admin" || user?.role === "tecnico")) {
    return <ObrasDisponiveisSection />
  }

  if (tab === "invoices" && user?.role === "admin") {
    return <InvoicesSection />
  }

  if (tab === "documents") {
    return <DocumentsSection />
  }

  if (tab === "chat") {
    return <ChatSection />
  }

  if (tab === "notifications") {
    return <NotificationsSection />
  }

  if (tab === "logs" && user?.role === "admin") {
    return <ActivityLogSection />
  }

  if (tab === "publicidade" && (user?.role === "publicidade" || user?.role === "admin")) {
    return <PublicidadeSection />
  }

  if (tab === "settings") {
    return <SettingsSection />
  }

  // Default: show overview or publicidade dashboard
  if (user?.role === "publicidade") {
    return <PublicidadeSection />
  }

  return <DashboardOverview />
}
