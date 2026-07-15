"use client"

import type React from "react"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useAuth, type UserRole } from "@/contexts/auth-context"
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Home,
  PlusCircle,
  ClipboardCheck,
  Calendar,
  Building2,
  GitBranch,
  Activity,
  Bell,
  Settings,
  CalendarCheck,
  BarChart3,
  Receipt,
  CalendarDays,
  Users,
  Star,
  CreditCard,
  FolderOpen,
} from "lucide-react"

interface DashboardLayoutProps {
  children: ReactNode
}

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
  id: string
  roles: UserRole[]
}

interface NavGroup {
  label: string | null
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    label: null,
    items: [
      { name: "Painel", href: "/dashboard", icon: LayoutDashboard, id: "dashboard", roles: ["admin", "tecnico", "cliente", "construtor", "empreiteiro"] },
      { name: "Nova Obra", href: "/dashboard?tab=nova-obra", icon: PlusCircle, id: "nova-obra", roles: ["admin", "cliente"] },
    ],
  },
  {
    label: "Gestão",
    items: [
      { name: "Calendário", href: "/dashboard?tab=calendar", icon: CalendarDays, id: "calendar", roles: ["admin"] },
      { name: "Gestão de Obras", href: "/dashboard?tab=workflow", icon: GitBranch, id: "workflow", roles: ["admin"] },
      { name: "Relatórios", href: "/dashboard?tab=analytics", icon: BarChart3, id: "analytics", roles: ["admin"] },
      { name: "Registo de Atividades", href: "/dashboard?tab=logs", icon: Activity, id: "logs", roles: ["admin"] },
    ],
  },
  {
    label: "Financeiro",
    items: [
      { name: "Aprovação de Orçamentos", href: "/dashboard?tab=validacao", icon: ClipboardCheck, id: "validacao", roles: ["admin"] },
      { name: "Orçamentos Detalhados", href: "/dashboard?tab=budgets", icon: Receipt, id: "budgets", roles: ["admin"] },
      { name: "Faturação", href: "/dashboard?tab=invoices", icon: CreditCard, id: "invoices", roles: ["admin"] },
    ],
  },
  {
    label: "Pessoas",
    items: [
      { name: "Lista de Empreiteiros", href: "/dashboard?tab=empreiteiros", icon: Users, id: "empreiteiros", roles: ["admin"] },
      { name: "Feedback de Clientes", href: "/dashboard?tab=feedback", icon: Star, id: "feedback", roles: ["admin"] },
    ],
  },
  {
    label: "Obras",
    items: [
      { name: "Agendar Visita", href: "/dashboard?tab=agendar", icon: Calendar, id: "agendar", roles: ["admin", "tecnico"] },
      { name: "Lista de Obras", href: "/dashboard?tab=obras", icon: Building2, id: "obras", roles: ["tecnico"] },
      { name: "Visitas Agendadas", href: "/dashboard?tab=visitas-agendadas", icon: CalendarCheck, id: "visitas-agendadas", roles: ["cliente"] },
      { name: "Minhas Obras", href: "/dashboard?tab=minhas-obras", icon: Building2, id: "minhas-obras", roles: ["construtor"] },
      { name: "Obras Disponíveis", href: "/dashboard?tab=obras-disponiveis", icon: Building2, id: "obras-disponiveis", roles: ["empreiteiro"] },
      { name: "Pedido de Orçamento", href: "/dashboard?tab=pedido-orcamento", icon: CreditCard, id: "pedido-orcamento", roles: ["empreiteiro"] },
    ],
  },
  {
    label: "Conta",
    items: [
      { name: "Documentos", href: "/dashboard?tab=documents", icon: FolderOpen, id: "documents", roles: ["admin", "tecnico", "cliente", "construtor", "empreiteiro"] },
      { name: "Consulta de Contas", href: "/dashboard?tab=contas", icon: FileText, id: "contas", roles: ["admin", "tecnico", "cliente", "construtor", "empreiteiro"] },
      { name: "Mensagens", href: "/dashboard?tab=chat", icon: MessageSquare, id: "chat", roles: ["admin", "tecnico", "cliente", "construtor", "empreiteiro"] },
      { name: "Notificações", href: "/dashboard?tab=notifications", icon: Bell, id: "notifications", roles: ["admin", "tecnico", "cliente", "construtor", "empreiteiro"] },
      { name: "Definições de Conta", href: "/dashboard?tab=settings", icon: Settings, id: "settings", roles: ["admin", "tecnico", "cliente", "construtor", "empreiteiro"] },
    ],
  },
]

// Flat list used for resolving the current page title
const allNavItems = navGroups.flatMap((g) => g.items)

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const searchParams = useSearchParams()
  const currentTab = searchParams.get("tab")

  const activeId = currentTab || "dashboard"
  const activeItem = allNavItems.find((item) => item.id === activeId)
  const pageTitle = activeItem?.name || "Painel"

  const roleLabels: Record<UserRole, string> = {
    admin: "Administrador",
    tecnico: "Mediador",
    cliente: "Cliente",
    construtor: "Construtor",
    empreiteiro: "Empreiteiro",
  }

  const isActive = (item: NavItem) => item.id === activeId

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 z-50 h-full w-72 bg-background border-r border-border
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <span className="text-primary-foreground font-bold text-sm">LAT</span>
              </div>
              <span className="text-xl font-semibold text-foreground">Limarestas</span>
            </Link>
            <button
              className="lg:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setSidebarOpen(false)}
              aria-label="Fechar menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User info */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-semibold">{user?.name.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <p className="font-medium text-foreground">{user?.name}</p>
                <p className="text-sm text-muted-foreground">{user?.role && roleLabels[user.role]}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            {navGroups.map((group) => {
              const visibleItems = group.items.filter((item) => user?.role && item.roles.includes(user.role))
              if (visibleItems.length === 0) return null

              return (
                <div key={group.label ?? "main"} className="mb-4">
                  {group.label && (
                    <p className="px-4 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                      {group.label}
                    </p>
                  )}
                  <div className="space-y-0.5">
                    {visibleItems.map((item) => {
                      const active = isActive(item)
                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={`relative flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                            active
                              ? "bg-primary text-primary-foreground font-medium"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          }`}
                          onClick={() => setSidebarOpen(false)}
                        >
                          {active && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r bg-accent" aria-hidden="true" />
                          )}
                          <item.icon className="w-5 h-5 shrink-0" />
                          {item.name}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </nav>

          {/* Bottom actions */}
          <div className="p-4 border-t border-border space-y-1">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <Home className="w-5 h-5" />
              Voltar ao site
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors w-full"
            >
              <LogOut className="w-5 h-5" />
              Terminar sessão
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden text-muted-foreground hover:text-foreground"
                onClick={() => setSidebarOpen(true)}
                aria-label="Abrir menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="hidden sm:inline">Painel LAT</span>
                <span className="hidden sm:inline text-border">/</span>
                <h1 className="text-base font-semibold text-foreground lg:text-lg">{pageTitle}</h1>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Link
                href="/dashboard?tab=chat"
                aria-label="Mensagens"
                className={`p-2 rounded-lg transition-colors ${
                  activeId === "chat"
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <MessageSquare className="w-5 h-5" />
              </Link>
              <Link
                href="/dashboard?tab=notifications"
                aria-label="Notificações"
                className={`relative p-2 rounded-lg transition-colors ${
                  activeId === "notifications"
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
              </Link>
              <Link
                href="/dashboard?tab=settings"
                aria-label="Definições"
                className={`p-2 rounded-lg transition-colors ${
                  activeId === "settings"
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Settings className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <div key={activeId} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
