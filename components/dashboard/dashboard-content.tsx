"use client"
import { useSearchParams } from "next/navigation"
import { DocumentsSection } from "./documents-section"
import { ChatSection } from "./chat-section"
import { DashboardOverview } from "./dashboard-overview"

export function DashboardContent() {
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab")

  if (tab === "documents") {
    return <DocumentsSection />
  }

  if (tab === "chat") {
    return <ChatSection />
  }

  return <DashboardOverview />
}
