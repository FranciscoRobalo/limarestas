"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function AboutSection() {
  const { language } = useLanguage()

  const texts = {
    pt: {
      label: "Sobre nós",
      title: "O projeto é seu. O trabalho é nosso.",
      description: "A LAT – Limarestas poupa-lhe preocupações, dinheiro e tempo.",
      secondary: "Fazemos a ponte entre o seu projeto e a solução certa — sem compromisso.",
      cta: "Contacte-nos",
      projects: "Projetos realizados",
      partners: "Empresas parceiras",
    },
    en: {
      label: "About us",
      title: "The project is yours. The work is ours.",
      description: "LAT – Limarestas saves you worries, money and time.",
      secondary: "We bridge the gap between your project and the right solution — no commitment.",
      cta: "Contact us",
      projects: "Projects completed",
      partners: "Partner companies",
    },
    es: {
      label: "Sobre nosotros",
      title: "El proyecto es tuyo. El trabajo es nuestro.",
      description: "LAT – Limarestas le ahorra preocupaciones, dinero y tiempo.",
      secondary: "Hacemos de puente entre su proyecto y la solución adecuada — sin compromiso.",
      cta: "Contáctenos",
      projects: "Proyectos realizados",
      partners: "Empresas asociadas",
    },
  }

  const txt = texts[language]

  return (
    <section id="sobre" className="py-20 md:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <img
                src="/construction-team-planning-blueprints-modern-offic.jpg"
                alt="Equipa Limarestas em planeamento"
                className="object-cover w-full h-full"
              />
            </div>
            {/* Stats overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-card/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-3xl font-bold text-primary">100+</p>
                  <p className="text-sm text-muted-foreground">{txt.projects}</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-accent">50+</p>
                  <p className="text-sm text-muted-foreground">{txt.partners}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">{txt.label}</span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground text-balance">
              {txt.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-medium">
              {txt.description}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {txt.secondary}
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="#contacto">{txt.cta}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
