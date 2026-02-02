"use client"

import { Users, Clock, Target, Shield } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function BenefitsSection() {
  const { t } = useLanguage()

  const benefits = [
    {
      icon: Users,
      title: t("benefits.validated_companies"),
      description: t("benefits.validated_companies_desc"),
    },
    {
      icon: Clock,
      title: t("benefits.quick_quotes"),
      description: t("benefits.quick_quotes_desc"),
    },
    {
      icon: Target,
      title: t("benefits.support"),
      description: t("benefits.support_desc"),
    },
    {
      icon: Shield,
      title: t("benefits.security"),
      description: t("benefits.security_desc"),
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">{t("benefits.label")}</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-serif font-medium text-foreground">{t("benefits.title")}</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="group relative p-8 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-accent rounded-t-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
