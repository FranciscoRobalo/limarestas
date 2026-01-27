"use client"

import type React from "react"

import { useState, type ReactNode } from "react"
import Link from "next/link"
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
  Megaphone,
  Bell,
  Settings,
  CalendarCheck,
  BarChart3,
  Receipt,
  CalendarDays,
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

const navigation: NavItem[] = [
  { name: "Painel", href: "/dashboard", icon: LayoutDashboard, id: "dashboard", roles: ["admin", "tecnico", "public"] },
  { name: "Analytics", href: "/dashboard?tab=analytics", icon: BarChart3, id: "analytics", roles: ["admin"] },
  {
    name: "Calendário",
    href: "/dashboard?tab=calendar",
    icon: CalendarDays,
    id: "calendar",
    roles: ["admin", "tecnico"],
  },
  { name: "Gestão de Obras", href: "/dashboard?tab=workflow", icon: GitBranch, id: "workflow", roles: ["admin"] },
  { name: "Aprovação de Orçamentos", href: "/dashboard?tab=validacao", icon: ClipboardCheck, id: "validacao", roles: ["admin"] },
  {
    name: "Visitas Agendadas",
    href: "/dashboard?tab=visitas-agendadas",
    icon: CalendarCheck,
    id: "visitas-agendadas",
    roles: ["public"],
  },
  {
    name: "Lista de Empreiteiros",
    href: "/dashboard?tab=empreiteiros",
    icon: Building2,
    id: "empreiteiros",
    roles: ["admin", "tecnico"],
  },
  {
    name: "Painel Técnico",
    href: "/dashboard?tab=painel-tecnico",
    icon: ClipboardCheck,
    id: "painel-tecnico",
    roles: ["admin"],
  },
  { name: "Faturação", href: "/dashboard?tab=invoices", icon: Receipt, id: "invoices", roles: ["admin"] },
  {
    name: "Consulta de Contas",
    href: "/dashboard?tab=documents",
    icon: FileText,
    id: "documents",
    roles: ["admin", "tecnico", "public"],
  },
  {
    name: "Mensagens",
    href: "/dashboard?tab=chat",
    icon: MessageSquare,
    id: "chat",
    roles: ["admin", "tecnico", "public"],
  },
  {
    name: "Notificações",
    href: "/dashboard?tab=notifications",
    icon: Bell,
    id: "notifications",
    roles: ["admin", "tecnico", "public"],
  },
  {
    name: "Feedback de Clientes",
    href: "/dashboard?tab=feedback",
    icon: Activity,
    id: "feedback",
    roles: ["admin"],
  },
  { name: "Registo de Atividades", href: "/dashboard?tab=logs", icon: Activity, id: "logs", roles: ["admin"] },
  {
    name: "Definições de Conta",
    href: "/dashboard?tab=settings",
    icon: Settings,
    id: "settings",
    roles: ["admin", "tecnico", "public"],
  },
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filteredNavigation = navigation.filter((item) => user?.role && item.roles.includes(user.role))

  const roleLabels: Record<UserRole, string> = {
    admin: "Administrador",
    tecnico: "Técnico",
    public: "Utilizador",
    publicidade: "Publicidade",
  }

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
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {filteredNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Bottom actions */}
          <div className="p-4 border-t border-border space-y-2">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <Home className="w-5 h-5" />
              Voltar ao site
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors w-full"
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
            <button
              className="lg:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-foreground lg:text-xl">
              {user?.role === "admin" ? "Painel Administrativo" : user?.role === "tecnico" ? "Painel Técnico" : "Painel de Gestão"}
            </h1>
            <div className="w-6 lg:hidden" />
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
