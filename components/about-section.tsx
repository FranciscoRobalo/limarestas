"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function AboutSection() {
  const { t } = useLanguage()

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
                  <p className="text-sm text-muted-foreground">{t("about.projects")}</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-accent">50+</p>
                  <p className="text-sm text-muted-foreground">{t("about.partners")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">{t("about.label")}</span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground text-balance">
              {t("about.title")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("about.description")}
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="#contacto">{t("about.cta")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
