"use client"

import { Mail, MapPin, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/contexts/language-context"

export function ContactSection() {
  const { language } = useLanguage()

  const texts = {
    pt: {
      label: "Contacte-nos",
      title: "Vamos falar sobre o seu projeto",
      description: "A LAT - Limarestas poupa-lhe tempo, dinheiro e dores de cabeça. Fazemos a ponte entre o seu projeto e a solução certa — sem compromisso.",
      email: "Email",
      whatsapp: "WhatsApp",
      whatsappCta: "Contactar via WhatsApp",
      area: "Área de Serviço",
      name: "Nome",
      namePlaceholder: "O seu nome",
      emailPlaceholder: "email@exemplo.com",
      phone: "Telefone",
      project: "Tipo de Projeto",
      projectPlaceholder: "Ex: Remodelação de cozinha",
      message: "Mensagem",
      messagePlaceholder: "Descreva o seu projeto...",
      send: "Enviar mensagem",
    },
    en: {
      label: "Contact us",
      title: "Let's talk about your project",
      description: "LAT - Limarestas saves you time, money and headaches. We bridge the gap between your project and the right solution — no commitment.",
      email: "Email",
      whatsapp: "WhatsApp",
      whatsappCta: "Contact via WhatsApp",
      area: "Service Area",
      name: "Name",
      namePlaceholder: "Your name",
      emailPlaceholder: "email@example.com",
      phone: "Phone",
      project: "Project Type",
      projectPlaceholder: "E.g.: Kitchen renovation",
      message: "Message",
      messagePlaceholder: "Describe your project...",
      send: "Send message",
    },
    es: {
      label: "Contáctenos",
      title: "Hablemos de su proyecto",
      description: "LAT - Limarestas le ahorra tiempo, dinero y dolores de cabeza. Hacemos de puente entre su proyecto y la solución adecuada — sin compromiso.",
      email: "Email",
      whatsapp: "WhatsApp",
      whatsappCta: "Contactar vía WhatsApp",
      area: "Área de Servicio",
      name: "Nombre",
      namePlaceholder: "Su nombre",
      emailPlaceholder: "email@ejemplo.com",
      phone: "Teléfono",
      project: "Tipo de Proyecto",
      projectPlaceholder: "Ej: Renovación de cocina",
      message: "Mensaje",
      messagePlaceholder: "Describa su proyecto...",
      send: "Enviar mensaje",
    },
  }

  const txt = texts[language]

  return (
    <section id="contacto" className="py-20 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-8">
            <div>
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">{txt.label}</span>
              <h2 className="mt-4 text-3xl md:text-4xl font-serif font-medium text-foreground text-balance">
                {txt.title}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                {txt.description}
              </p>
            </div>

            <div className="space-y-6">
              {/* WhatsApp - Highlighted */}
              <div className="bg-green-500/10 border-2 border-green-500/30 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center shrink-0">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-lg">{txt.whatsapp}</p>
                    <a
                      href="https://wa.me/351910118134"
                      className="text-green-600 hover:text-green-700 font-medium text-lg"
                    >
                      +351 910 118 134
                    </a>
                    <Button
                      asChild
                      className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white"
                    >
                      <a href="https://wa.me/351910118134" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        {txt.whatsappCta}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{txt.email}</p>
                  <a
                    href="mailto:geral@limarestas.com"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    geral@limarestas.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{txt.area}</p>
                  <p className="text-muted-foreground">Portugal</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    {txt.name}
                  </label>
                  <Input id="name" placeholder={txt.namePlaceholder} className="bg-background" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    {txt.email}
                  </label>
                  <Input id="email" type="email" placeholder={txt.emailPlaceholder} className="bg-background" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-foreground">
                  {txt.phone}
                </label>
                <Input id="phone" type="tel" placeholder="+351 000 000 000" className="bg-background" />
              </div>

              <div className="space-y-2">
                <label htmlFor="project" className="text-sm font-medium text-foreground">
                  {txt.project}
                </label>
                <Input id="project" placeholder={txt.projectPlaceholder} className="bg-background" />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  {txt.message}
                </label>
                <Textarea
                  id="message"
                  placeholder={txt.messagePlaceholder}
                  rows={4}
                  className="bg-background resize-none"
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                {txt.send}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
