"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const socialLinks = [
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "LinkedIn", href: "#", icon: Linkedin },
]

export function Footer() {
  const { t } = useLanguage()

  const navigation = [
    { name: t("nav.inicio"), href: "#inicio" },
    { name: t("nav.sobre"), href: "#sobre" },
    { name: t("nav.servicos"), href: "#servicos" },
    { name: t("nav.contacto"), href: "#contacto" },
  ]

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex items-center">
            <Image
              src="/limarestas-logo.png"
              alt="LAT - Soluções de Construção"
              width={100}
              height={40}
              className="h-10 w-auto brightness-0 invert"
            />
          </div>

          <nav className="flex flex-wrap gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex gap-4">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-primary-foreground/60">
              {new Date().getFullYear()} LAT - Limarestas. {t("footer.rights")}.
            </p>
            <div className="flex gap-6 text-sm text-primary-foreground/60">
              <Link href="#" className="hover:text-primary-foreground transition-colors">
                {t("footer.privacy")}
              </Link>
              <Link href="#" className="hover:text-primary-foreground transition-colors">
                {t("footer.terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
