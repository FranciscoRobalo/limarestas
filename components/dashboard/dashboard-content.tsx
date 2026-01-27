"use client"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { DocumentsSection } from "./documents-section"
import { ChatSection } from "./chat-section"
import { DashboardOverview } from "./dashboard-overview"
import { ValidacaoSection } from "./validacao-section"
import { EmpreiteirosSection } from "./empreiteiros-section"
import { PainelTecnicoSection } from "./painel-tecnico-section"
import { WorkflowSection } from "./workflow-section"
import { ActivityLogSection } from "./activity-log-section"
import { VisitasAgendadasSection } from "./visitas-agendadas-section"
import { SettingsSection } from "./settings-section"
import { NotificationsSection } from "./notifications-section"
import { AnalyticsSection } from "./analytics-section"
import { InvoicesSection } from "./invoices-section"
import { CalendarSection } from "./calendar-section"
import { FeedbackSection } from "./feedback-section"

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

  if (tab === "validacao" && user?.role === "admin") {
    return <ValidacaoSection />
  }

  if (tab === "visitas-agendadas" && user?.role === "public") {
    return <VisitasAgendadasSection />
  }

  if (tab === "empreiteiros" && (user?.role === "admin" || user?.role === "tecnico")) {
    return <EmpreiteirosSection />
  }

  if (tab === "painel-tecnico" && user?.role === "admin") {
    return <PainelTecnicoSection />
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

  if (tab === "feedback" && user?.role === "admin") {
    return <FeedbackSection />
  }

  if (tab === "logs" && user?.role === "admin") {
    return <ActivityLogSection />
  }

  if (tab === "settings") {
    return <SettingsSection />
  }

  return <DashboardOverview />
}
