"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "pt" | "en" | "es"

interface Translations {
  [key: string]: {
    pt: string
    en: string
    es: string
  }
}

export const translations: Translations = {
  // Navigation
  "nav.home": { pt: "Início", en: "Home", es: "Inicio" },
  "nav.about": { pt: "Sobre", en: "About", es: "Sobre" },
  "nav.services": { pt: "Serviços", en: "Services", es: "Servicios" },
  "nav.portfolio": { pt: "Portfólio", en: "Portfolio", es: "Portafolio" },
  "nav.calculator": { pt: "Calculadora", en: "Calculator", es: "Calculadora" },
  "nav.team": { pt: "Equipa", en: "Team", es: "Equipo" },
  "nav.faq": { pt: "FAQ", en: "FAQ", es: "FAQ" },
  "nav.contact": { pt: "Contacto", en: "Contact", es: "Contacto" },
  "nav.joinUs": { pt: "Junte-se a Nós", en: "Join Us", es: "Únete" },
  "nav.login": { pt: "Entrar", en: "Login", es: "Entrar" },
  "nav.talkToUs": { pt: "Fale connosco", en: "Talk to us", es: "Hable con nosotros" },

  // Hero Section
  "hero.title": {
    pt: "Encontramos a equipa certa para qualquer projeto de construção.",
    en: "We find the right team for any construction project.",
    es: "Encontramos el equipo adecuado para cualquier proyecto de construcción.",
  },
  "hero.subtitle": {
    pt: "O projeto é seu, o trabalho é nosso.",
    en: "The project is yours, the work is ours.",
    es: "El proyecto es tuyo, el trabajo es nuestro.",
  },
  "hero.cta.contact": { pt: "Fale connosco", en: "Talk to us", es: "Hable con nosotros" },
  "hero.cta.about": { pt: "Contacte-nos", en: "Contact us", es: "Contáctenos" },

  // About Section
  "about.label": { pt: "Sobre nós", en: "About us", es: "Sobre nosotros" },
  "about.title": {
    pt: "O projeto é seu. O trabalho é nosso.",
    en: "The project is yours. The work is ours.",
    es: "El proyecto es tuyo. El trabajo es nuestro.",
  },
  "about.description": {
    pt: "A LAT – Limarestas poupa-lhe preocupações, dinheiro e tempo.",
    en: "LAT – Limarestas saves you worries, money and time.",
    es: "LAT – Limarestas le ahorra preocupaciones, dinero y tiempo.",
  },
  "about.cta": { pt: "Contacte-nos", en: "Contact us", es: "Contáctenos" },
  "about.projects": { pt: "Projetos realizados", en: "Projects completed", es: "Proyectos realizados" },
  "about.partners": { pt: "Empresas parceiras", en: "Partner companies", es: "Empresas asociadas" },

  // Benefits Section
  "benefits.label": { pt: "Porquê a Limarestas", en: "Why Limarestas", es: "Por qué Limarestas" },
  "benefits.title": { pt: "Porquê a Limarestas.", en: "Why Limarestas.", es: "Por qué Limarestas." },

  // Contact Section
  "contact.label": { pt: "Contacte-nos", en: "Contact us", es: "Contáctenos" },
  "contact.title": {
    pt: "Vamos falar sobre o seu projeto",
    en: "Let's talk about your project",
    es: "Hablemos de su proyecto",
  },
  "contact.whatsapp": { pt: "WhatsApp", en: "WhatsApp", es: "WhatsApp" },
  "contact.whatsappCta": { pt: "Contactar via WhatsApp", en: "Contact via WhatsApp", es: "Contactar vía WhatsApp" },

  // Join Us Page
  "join.title": { pt: "Junte-se a Nós", en: "Join Us", es: "Únete a Nosotros" },
  "join.subtitle": {
    pt: "Faça parte da rede LAT - Limarestas e expanda as suas oportunidades de negócio.",
    en: "Join the LAT - Limarestas network and expand your business opportunities.",
    es: "Forme parte de la red LAT - Limarestas y amplíe sus oportunidades de negocio.",
  },
  "join.architects": { pt: "Arquitetos", en: "Architects", es: "Arquitectos" },
  "join.engineers": { pt: "Engenheiros", en: "Engineers", es: "Ingenieros" },
  "join.builders": { pt: "Construtores", en: "Builders", es: "Constructores" },
  "join.contractors": { pt: "Empreiteiros", en: "Contractors", es: "Contratistas" },
  "join.condominiums": { pt: "Condomínios", en: "Condominiums", es: "Condominios" },
  "join.realestate": { pt: "Imobiliárias", en: "Real Estate", es: "Inmobiliarias" },

  // Dashboard
  "dashboard.title": { pt: "Painel LAT", en: "LAT Panel", es: "Panel LAT" },
  "dashboard.completedWorks": { pt: "Obras Concluídas", en: "Completed Works", es: "Obras Completadas" },

  // Workflow
  "workflow.step1": { pt: "Pedido de Informação", en: "Information Request", es: "Solicitud de Información" },
  "workflow.step2": { pt: "Visita", en: "Visit", es: "Visita" },
  "workflow.step3": { pt: "Orçamento", en: "Budget", es: "Presupuesto" },
  "workflow.step4": { pt: "Estado do Orçamento", en: "Budget Status", es: "Estado del Presupuesto" },
  "workflow.step5": { pt: "Adjudicação / Comissão Paga", en: "Award / Commission Paid", es: "Adjudicación / Comisión Pagada" },
  "workflow.step6": { pt: "Obra Concluída", en: "Work Completed", es: "Obra Completada" },
  "workflow.thankYou": { pt: "Obrigado por trabalhar connosco.", en: "Thank you for working with us.", es: "Gracias por trabajar con nosotros." },

  // Contractors List
  "contractors.title": { pt: "Lista de Empreiteiros", en: "Contractors List", es: "Lista de Contratistas" },
  "contractors.selectWorks": { pt: "Escolher Lista de Obras", en: "Select Works List", es: "Seleccionar Lista de Obras" },

  // Billing
  "billing.contractors": { pt: "Empreiteiros", en: "Contractors", es: "Contratistas" },
  "billing.clients": { pt: "Clientes", en: "Clients", es: "Clientes" },
  "billing.mediators": { pt: "Mediadores", en: "Mediators", es: "Mediadores" },

  // Accounts
  "accounts.title": { pt: "Consulta de Contas", en: "Account Consultation", es: "Consulta de Cuentas" },

  // Feedback
  "feedback.title": { pt: "Feedback de Clientes", en: "Client Feedback", es: "Feedback de Clientes" },

  // Technical Panel
  "technical.mediators": { pt: "Mediadores (Técnicos)", en: "Mediators (Technicians)", es: "Mediadores (Técnicos)" },

  // User Types
  "user.client": { pt: "Cliente", en: "Client", es: "Cliente" },
  "user.builder": { pt: "Construtor", en: "Builder", es: "Constructor" },
  "user.contractor": { pt: "Empreiteiro", en: "Contractor", es: "Contratista" },

  // Budget Approvals
  "approvals.title": { pt: "Aprovação de Orçamentos", en: "Budget Approvals", es: "Aprobación de Presupuestos" },

  // MOAP
  "moap.budgetRequest": { pt: "Pedido de Orçamento", en: "Budget Request", es: "Solicitud de Presupuesto" },
  "moap.uploadBudget": { pt: "Carregar Orçamento", en: "Upload Budget", es: "Cargar Presupuesto" },
  "moap.features": { pt: "Funcionalidades", en: "Features", es: "Funcionalidades" },

  // Common
  "common.backToSite": { pt: "Voltar ao site", en: "Back to site", es: "Volver al sitio" },
  "common.logout": { pt: "Terminar sessão", en: "Logout", es: "Cerrar sesión" },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt")

  useEffect(() => {
    const storedLang = localStorage.getItem("limarestas_language") as Language
    if (storedLang && ["pt", "en", "es"].includes(storedLang)) {
      setLanguage(storedLang)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("limarestas_language", lang)
  }

  const t = (key: string): string => {
    const translation = translations[key]
    if (!translation) return key
    return translation[language] || translation.pt || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
