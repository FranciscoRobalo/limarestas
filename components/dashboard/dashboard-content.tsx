"use client"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { DocumentsSection } from "./documents-section"
import { ChatSection } from "./chat-section"
import { DashboardOverview } from "./dashboard-overview"
import { ValidacaoSection } from "./validacao-section"
import { AgendarVisitaSection } from "./agendar-visita-section"
import { ObrasDisponiveisSection } from "./obras-disponiveis-section"
import { WorkflowSection } from "./workflow-section"
import { ActivityLogSection } from "./activity-log-section"
import { VisitasAgendadasSection } from "./visitas-agendadas-section"
import { SettingsSection } from "./settings-section"
import { NotificationsSection } from "./notifications-section"
import { InvoicesSection } from "./invoices-section"
import { CalendarSection } from "./calendar-section"
import { FeedbackSection } from "./feedback-section"
import { EmpreiteirosSection } from "./empreiteiros-section"
import { ConsultaContasSection } from "./consulta-contas-section"

export function DashboardContent() {
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab")
  const { user } = useAuth()

  // Admin only sections
  if (tab === "calendar" && user?.role === "admin") {
    return <CalendarSection />
  }

  if (tab === "workflow" && user?.role === "admin") {
    return <WorkflowSection />
  }

  if (tab === "validacao" && user?.role === "admin") {
    return <ValidacaoSection />
  }

  if (tab === "empreiteiros" && user?.role === "admin") {
    return <EmpreiteirosSection />
  }

  if (tab === "invoices" && user?.role === "admin") {
    return <InvoicesSection />
  }

  if (tab === "feedback" && user?.role === "admin") {
    return <FeedbackSection />
  }

  if (tab === "logs" && user?.role === "admin") {
    return <ActivityLogSection />
  }

  // Técnico (Mediador) sections
  if (tab === "agendar" && (user?.role === "admin" || user?.role === "tecnico")) {
    return <AgendarVisitaSection />
  }

  if (tab === "obras" && user?.role === "tecnico") {
    return <ObrasDisponiveisSection />
  }

  // Cliente sections
  if (tab === "visitas-agendadas" && user?.role === "cliente") {
    return <VisitasAgendadasSection />
  }

  // Construtor sections
  if (tab === "minhas-obras" && user?.role === "construtor") {
    return <ObrasDisponiveisSection />
  }

  // Empreiteiro sections
  if (tab === "obras-disponiveis" && user?.role === "empreiteiro") {
    return <ObrasDisponiveisSection />
  }

  if (tab === "pedido-orcamento" && user?.role === "empreiteiro") {
    return <DocumentsSection /> // Placeholder for now
  }

  // Common sections
  if (tab === "contas") {
    return <ConsultaContasSection />
  }

  if (tab === "chat") {
    return <ChatSection />
  }

  if (tab === "notifications") {
    return <NotificationsSection />
  }

  if (tab === "settings") {
    return <SettingsSection />
  }

  return <DashboardOverview />
}
