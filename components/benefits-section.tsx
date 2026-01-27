"use client"

import { Users, Clock, Target, Shield } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function BenefitsSection() {
  const { language } = useLanguage()

  const texts = {
    pt: {
      label: "Porquê a Limarestas",
      title: "Porquê a Limarestas.",
      benefits: [
        {
          title: "Acompanhamento personalizado",
          description: "Recebe orientação desde o primeiro passo — adaptada ao seu projeto e às suas dúvidas.",
        },
        {
          title: "Ganhe tempo",
          description: "Não precisa pedir orçamentos a várias empresas — nós tratamos disso por si.",
        },
        {
          title: "Contactos certos, soluções certas",
          description: "Ligamos o seu projeto às empresas mais adequadas, com base no que realmente precisa.",
        },
        {
          title: "Menos stress, mais confiança",
          description: "Tome decisões com clareza, sabendo que está a comparar opções fiáveis e bem explicadas.",
        },
      ],
    },
    en: {
      label: "Why Limarestas",
      title: "Why Limarestas.",
      benefits: [
        {
          title: "Personalized support",
          description: "Get guidance from the first step — adapted to your project and your questions.",
        },
        {
          title: "Save time",
          description: "No need to request quotes from multiple companies — we handle that for you.",
        },
        {
          title: "Right contacts, right solutions",
          description: "We connect your project to the most suitable companies, based on what you really need.",
        },
        {
          title: "Less stress, more confidence",
          description: "Make decisions with clarity, knowing you're comparing reliable and well-explained options.",
        },
      ],
    },
    es: {
      label: "Por qué Limarestas",
      title: "Por qué Limarestas.",
      benefits: [
        {
          title: "Acompañamiento personalizado",
          description: "Recibe orientación desde el primer paso — adaptada a tu proyecto y tus dudas.",
        },
        {
          title: "Ahorre tiempo",
          description: "No necesita pedir presupuestos a varias empresas — nosotros nos encargamos.",
        },
        {
          title: "Contactos correctos, soluciones correctas",
          description: "Conectamos su proyecto con las empresas más adecuadas, según lo que realmente necesita.",
        },
        {
          title: "Menos estrés, más confianza",
          description: "Tome decisiones con claridad, sabiendo que está comparando opciones confiables y bien explicadas.",
        },
      ],
    },
  }

  const txt = texts[language]
  const icons = [Users, Clock, Target, Shield]

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">{txt.label}</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-serif font-medium text-foreground">{txt.title}</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {txt.benefits.map((benefit, index) => {
            const Icon = icons[index]
            return (
              <div
                key={benefit.title}
                className="group relative p-8 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-accent rounded-t-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
