"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, User, LogOut, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const languages = [
  { code: "pt" as const, name: "Português", flag: "PT" },
  { code: "en" as const, name: "English", flag: "EN" },
  { code: "es" as const, name: "Español", flag: "ES" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const { language, setLanguage, t } = useLanguage()

  const navigation = [
    { name: t("nav.inicio"), href: "#inicio" },
    { name: t("nav.sobre"), href: "#sobre" },
    { name: t("nav.servicos"), href: "#servicos" },
    { name: t("nav.portfolio"), href: "#portfolio" },
    { name: t("nav.calculadora"), href: "#calculadora" },
    { name: t("nav.contacto"), href: "#contacto" },
    { name: t("nav.equipa"), href: "/junte-se" },
    { name: t("nav.faq"), href: "#faq" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <span className="text-primary-foreground font-bold text-sm">LAT</span>
          </div>
          <span className="text-xl font-semibold text-foreground">Limarestas</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}

          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Globe className="w-4 h-4" />
                <span className="text-xs font-semibold">{languages.find(l => l.code === language)?.flag}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={language === lang.code ? "bg-accent" : ""}
                >
                  <span className="font-semibold mr-2">{lang.flag}</span>
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {isAuthenticated ? (
            <div className="flex items-center gap-3 ml-2">
              <Button asChild variant="outline" className="gap-2 bg-transparent">
                <Link href="/dashboard">
                  <User className="w-4 h-4" />
                  {user?.name}
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="text-muted-foreground hover:text-destructive"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3 ml-2">
              <Button asChild variant="outline">
                <Link href="/login">{t("nav.entrar")}</Link>
              </Button>
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="#contacto">{t("nav.fale_connosco")}</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden p-2 text-muted-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-background border-b border-border">
          <div className="px-6 py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-base font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Language Switcher */}
            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{t("nav.idioma")}:</span>
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-2 py-1 text-xs font-semibold rounded ${
                      language === lang.code 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {lang.flag}
                  </button>
                ))}
              </div>
            </div>

            {isAuthenticated ? (
              <div className="space-y-2 pt-4 border-t border-border">
                <Button asChild variant="outline" className="w-full gap-2 bg-transparent">
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <User className="w-4 h-4" />
                    {user?.name}
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-destructive"
                  onClick={() => {
                    logout()
                    setMobileMenuOpen(false)
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {t("nav.terminar_sessao")}
                </Button>
              </div>
            ) : (
              <div className="space-y-2 pt-4 border-t border-border">
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    {t("nav.entrar")}
                  </Link>
                </Button>
                <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="#contacto" onClick={() => setMobileMenuOpen(false)}>
                    {t("nav.fale_connosco")}
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
