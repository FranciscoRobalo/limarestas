"use client"
import { useSearchParams } from "next/navigation"
import { DocumentsSection } from "./documents-section"
import { ChatSection } from "./chat-section"
import { DashboardOverview } from "./dashboard-overview"
import { NovaObraSection } from "./nova-obra-section"
import { ValidacaoSection } from "./validacao-section"
import { AgendarVisitaSection } from "./agendar-visita-section"
import { ObrasDisponiveisSection } from "./obras-disponiveis-section"
import { WorkflowSection } from "./workflow-section"

export function DashboardContent() {
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab")

  if (tab === "workflow") {
    return <WorkflowSection />
  }

  if (tab === "nova-obra") {
    return <NovaObraSection />
  }

  if (tab === "validacao") {
    return <ValidacaoSection />
  }

  if (tab === "agendar") {
    return <AgendarVisitaSection />
  }

  if (tab === "obras") {
    return <ObrasDisponiveisSection />
  }

  if (tab === "documents") {
    return <DocumentsSection />
  }

  if (tab === "chat") {
    return <ChatSection />
  }

  return <DashboardOverview />
}
