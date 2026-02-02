"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

type Language = "pt" | "en" | "es"

interface Translations {
  [key: string]: {
    pt: string
    en: string
    es: string
  }
}

const translations: Translations = {
  // Navigation
  "nav.inicio": { pt: "Início", en: "Home", es: "Inicio" },
  "nav.sobre": { pt: "Sobre", en: "About", es: "Sobre" },
  "nav.servicos": { pt: "Serviços", en: "Services", es: "Servicios" },
  "nav.portfolio": { pt: "Portfólio", en: "Portfolio", es: "Portafolio" },
  "nav.calculadora": { pt: "Calculadora", en: "Calculator", es: "Calculadora" },
  "nav.contacto": { pt: "Contacto", en: "Contact", es: "Contacto" },
  "nav.equipa": { pt: "Equipa", en: "Team", es: "Equipo" },
  "nav.faq": { pt: "FAQ", en: "FAQ", es: "FAQ" },
  "nav.entrar": { pt: "Entrar", en: "Login", es: "Entrar" },
  "nav.fale_connosco": { pt: "Fale connosco", en: "Contact us", es: "Contáctenos" },
  "nav.terminar_sessao": { pt: "Terminar sessão", en: "Logout", es: "Cerrar sesión" },
  "nav.idioma": { pt: "Idioma", en: "Language", es: "Idioma" },

  // Hero
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
  "hero.cta_primary": { pt: "Fale connosco", en: "Contact us", es: "Contáctenos" },
  "hero.cta_secondary": { pt: "Contacte-nos", en: "Get in touch", es: "Contáctenos" },

  // About
  "about.label": { pt: "Sobre nós", en: "About us", es: "Sobre nosotros" },
  "about.title": {
    pt: "O projeto é seu. O trabalho é nosso.",
    en: "The project is yours. The work is ours.",
    es: "El proyecto es tuyo. El trabajo es nuestro.",
  },
  "about.description": {
    pt: "A LAT – Limarestas poupa-lhe preocupações, dinheiro e tempo.",
    en: "LAT - Limarestas saves you worries, money and time.",
    es: "LAT - Limarestas le ahorra preocupaciones, dinero y tiempo.",
  },
  "about.cta": { pt: "Contacte-nos", en: "Contact us", es: "Contáctenos" },
  "about.projects": { pt: "Projetos realizados", en: "Completed projects", es: "Proyectos realizados" },
  "about.partners": { pt: "Empresas parceiras", en: "Partner companies", es: "Empresas asociadas" },

  // Benefits
  "benefits.label": { pt: "Porquê a Limarestas", en: "Why Limarestas", es: "Por qué Limarestas" },
  "benefits.title": { pt: "Os nossos compromissos", en: "Our commitments", es: "Nuestros compromisos" },
  "benefits.validated_companies": { pt: "Empresas Validadas", en: "Validated Companies", es: "Empresas Validadas" },
  "benefits.validated_companies_desc": {
    pt: "Trabalhamos apenas com empresas verificadas e certificadas, garantindo qualidade e confiança.",
    en: "We only work with verified and certified companies, ensuring quality and trust.",
    es: "Trabajamos solo con empresas verificadas y certificadas, garantizando calidad y confianza.",
  },
  "benefits.quick_quotes": { pt: "Orçamentos Rápidos", en: "Quick Quotes", es: "Presupuestos Rápidos" },
  "benefits.quick_quotes_desc": {
    pt: "Receba até 5 orçamentos de diferentes empresas em menos de 72 horas.",
    en: "Receive up to 5 quotes from different companies in less than 72 hours.",
    es: "Reciba hasta 5 presupuestos de diferentes empresas en menos de 72 horas.",
  },
  "benefits.support": { pt: "Suporte Especializado", en: "Expert Support", es: "Soporte Especializado" },
  "benefits.support_desc": {
    pt: "Acompanhamento personalizado em todas as fases do seu projeto, do início ao fim.",
    en: "Personalized support at every stage of your project, from start to finish.",
    es: "Acompañamiento personalizado en todas las fases de su proyecto, de principio a fin.",
  },
  "benefits.security": { pt: "Segurança Garantida", en: "Guaranteed Security", es: "Seguridad Garantizada" },
  "benefits.security_desc": {
    pt: "Contratos claros e proteção total para o seu investimento e projeto.",
    en: "Clear contracts and full protection for your investment and project.",
    es: "Contratos claros y protección total para su inversión y proyecto.",
  },

  // Services
  "services.label": { pt: "Os nossos serviços", en: "Our services", es: "Nuestros servicios" },
  "services.title": {
    pt: "Soluções completas para o seu projeto",
    en: "Complete solutions for your project",
    es: "Soluciones completas para su proyecto",
  },
  "services.residential": { pt: "Construção Residencial", en: "Residential Construction", es: "Construcción Residencial" },
  "services.commercial": { pt: "Espaços Comerciais", en: "Commercial Spaces", es: "Espacios Comerciales" },
  "services.renovation": { pt: "Remodelação", en: "Renovation", es: "Remodelación" },
  "services.landscaping": { pt: "Paisagismo", en: "Landscaping", es: "Paisajismo" },

  // Contact
  "contact.label": { pt: "Contacte-nos", en: "Contact us", es: "Contáctenos" },
  "contact.title": {
    pt: "Pronto para começar o seu projeto?",
    en: "Ready to start your project?",
    es: "¿Listo para comenzar su proyecto?",
  },
  "contact.subtitle": {
    pt: "Entre em contacto connosco e receba um orçamento personalizado sem compromisso.",
    en: "Get in touch with us and receive a personalized quote with no commitment.",
    es: "Póngase en contacto con nosotros y reciba un presupuesto personalizado sin compromiso.",
  },
  "contact.whatsapp": { pt: "WhatsApp", en: "WhatsApp", es: "WhatsApp" },
  "contact.click_to_talk": { pt: "Clique para falar connosco", en: "Click to talk to us", es: "Haga clic para hablar con nosotros" },
  "contact.email": { pt: "Email", en: "Email", es: "Email" },
  "contact.address": { pt: "Morada", en: "Address", es: "Dirección" },
  "contact.form.name": { pt: "Nome", en: "Name", es: "Nombre" },
  "contact.form.email": { pt: "Email", en: "Email", es: "Email" },
  "contact.form.phone": { pt: "Telefone", en: "Phone", es: "Teléfono" },
  "contact.form.message": { pt: "Mensagem", en: "Message", es: "Mensaje" },
  "contact.form.submit": { pt: "Enviar mensagem", en: "Send message", es: "Enviar mensaje" },

  // Portfolio
  "portfolio.label": { pt: "Portfólio", en: "Portfolio", es: "Portafolio" },
  "portfolio.title": { pt: "Projetos em destaque", en: "Featured projects", es: "Proyectos destacados" },
  "portfolio.view_all": { pt: "Ver todos", en: "View all", es: "Ver todos" },

  // FAQ
  "faq.label": { pt: "Perguntas frequentes", en: "FAQ", es: "Preguntas frecuentes" },
  "faq.title": { pt: "Tire as suas dúvidas", en: "Get your questions answered", es: "Resuelva sus dudas" },

  // Footer
  "footer.rights": { pt: "Todos os direitos reservados", en: "All rights reserved", es: "Todos los derechos reservados" },
  "footer.privacy": { pt: "Política de Privacidade", en: "Privacy Policy", es: "Política de Privacidad" },
  "footer.terms": { pt: "Termos de Serviço", en: "Terms of Service", es: "Términos de Servicio" },

  // Calculator
  "calculator.label": { pt: "Calculadora de Orçamento", en: "Budget Calculator", es: "Calculadora de Presupuesto" },
  "calculator.title": { pt: "Estime o seu orçamento", en: "Estimate your budget", es: "Estime su presupuesto" },

  // Join Us
  "join.title": { pt: "Junte-se a nós", en: "Join us", es: "Únase a nosotros" },
  "join.subtitle": {
    pt: "Faça parte da rede de profissionais Limarestas",
    en: "Join the Limarestas network of professionals",
    es: "Únase a la red de profesionales Limarestas",
  },

  // Calendar
  "calendar.title": { pt: "Calendário", en: "Calendar", es: "Calendario" },
  "calendar.subtitle": { pt: "Visualize visitas, reuniões e prazos", en: "View visits, meetings and deadlines", es: "Ver visitas, reuniones y plazos" },
  "calendar.today": { pt: "Hoje", en: "Today", es: "Hoy" },
  "calendar.new_event": { pt: "Novo Evento", en: "New Event", es: "Nuevo Evento" },
  "calendar.select_day": { pt: "Selecione um dia", en: "Select a day", es: "Seleccione un día" },
  "calendar.no_events": { pt: "Nenhum evento para este dia", en: "No events for this day", es: "No hay eventos para este día" },
  "calendar.add_event": { pt: "Adicionar evento", en: "Add event", es: "Añadir evento" },
  "calendar.visits": { pt: "Visitas", en: "Visits", es: "Visitas" },
  "calendar.meetings": { pt: "Reuniões", en: "Meetings", es: "Reuniones" },
  "calendar.deliveries": { pt: "Entregas", en: "Deliveries", es: "Entregas" },
  "calendar.deadlines": { pt: "Prazos", en: "Deadlines", es: "Plazos" },

  // Dashboard
  "dashboard.panel": { pt: "Painel", en: "Dashboard", es: "Panel" },
  "dashboard.admin_panel": { pt: "Painel Administrativo", en: "Admin Dashboard", es: "Panel Administrativo" },
  "dashboard.tech_panel": { pt: "Painel Técnico", en: "Technical Panel", es: "Panel Técnico" },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt")

  const t = useCallback(
    (key: string) => {
      const translation = translations[key]
      if (!translation) {
        console.warn(`[v0] Translation missing for key: ${key}`)
        return key
      }
      return translation[language]
    },
    [language]
  )

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
