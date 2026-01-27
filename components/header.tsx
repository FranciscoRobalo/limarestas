"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, User, LogOut, Globe, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage, type Language } from "@/contexts/language-context"

const navigation = [
  { key: "nav.home", href: "#inicio" },
  { key: "nav.about", href: "#sobre" },
  { key: "nav.services", href: "#servicos" },
  { key: "nav.portfolio", href: "#portfolio" },
  { key: "nav.team", href: "#equipa" },
  { key: "nav.joinUs", href: "/junte-se" },
  { key: "nav.contact", href: "#contacto" },
]

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "pt", label: "PT", flag: "🇵🇹" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "es", label: "ES", flag: "🇪🇸" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const { language, setLanguage, t } = useLanguage()

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
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t(item.key)}
            </Link>
          ))}

          {/* Language Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-secondary"
            >
              <Globe className="w-4 h-4" />
              {language.toUpperCase()}
            </button>
            {langMenuOpen && (
              <div className="absolute top-full right-0 mt-2 bg-background border border-border rounded-lg shadow-lg py-1 min-w-[100px]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setLanguage(lang.code)
                      setLangMenuOpen(false)
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-secondary flex items-center gap-2 ${
                      language === lang.code ? "text-primary font-medium" : "text-muted-foreground"
                    }`}
                  >
                    <span>{lang.flag}</span>
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* WhatsApp Button - Highlighted */}
          <Button
            asChild
            size="sm"
            className="bg-green-500 hover:bg-green-600 text-white gap-2"
          >
            <a href="https://wa.me/351910118134" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </Button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
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
            <div className="flex items-center gap-3">
              <Button asChild variant="outline" className="bg-transparent">
                <Link href="/login">{t("nav.login")}</Link>
              </Button>
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="#contacto">{t("nav.talkToUs")}</Link>
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
                key={item.key}
                href={item.href}
                className="block text-base font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}

            {/* Mobile Language Selector */}
            <div className="flex items-center gap-2 py-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setLanguage(lang.code)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      language === lang.code
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile WhatsApp Button */}
            <Button
              asChild
              className="w-full bg-green-500 hover:bg-green-600 text-white gap-2"
            >
              <a href="https://wa.me/351910118134" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </Button>

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
                  {t("common.logout")}
                </Button>
              </div>
            ) : (
              <div className="space-y-2 pt-4 border-t border-border">
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    {t("nav.login")}
                  </Link>
                </Button>
                <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="#contacto" onClick={() => setMobileMenuOpen(false)}>
                    {t("nav.talkToUs")}
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
