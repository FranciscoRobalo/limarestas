"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/contexts/language-context"

export function ContactSection() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Create WhatsApp message with form data
    const whatsappMessage = encodeURIComponent(
      `*Nova Mensagem do Website Limarestas*\n\n` +
      `*Nome:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      `*Telefone:* ${formData.phone}\n` +
      `*Tipo de Projeto:* ${formData.project}\n` +
      `*Mensagem:* ${formData.message}`
    )

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/351910118134?text=${whatsappMessage}`, '_blank')

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        project: "",
        message: "",
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  return (
    <section id="contacto" className="py-20 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-8">
            <div>
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">{t("contact.label")}</span>
              <h2 className="mt-4 text-3xl md:text-4xl font-serif font-medium text-foreground text-balance">
                {t("contact.title")}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                {t("contact.subtitle")}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{t("contact.email")}</p>
                  <a
                    href="mailto:geral@limarestas.com"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    geral@limarestas.com
                  </a>
                </div>
              </div>

              <a
                href="https://wa.me/351910118134"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 bg-green-500/10 border-2 border-green-500/50 rounded-xl hover:bg-green-500/20 transition-colors group"
              >
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{t("contact.whatsapp")}</p>
                  <span className="text-green-600 font-semibold group-hover:text-green-700 transition-colors">
                    +351 910 118 134
                  </span>
                  <p className="text-sm text-muted-foreground mt-1">{t("contact.click_to_talk")}</p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{t("contact.address")}</p>
                  <p className="text-muted-foreground">Portugal</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Mensagem Enviada!</h3>
                <p className="text-muted-foreground">
                  A sua mensagem foi enviada via WhatsApp. Entraremos em contacto brevemente.
                </p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      {t("contact.form.name")}
                    </label>
                    <Input 
                      id="name" 
                      placeholder="O seu nome" 
                      className="bg-background" 
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      {t("contact.form.email")}
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="email@exemplo.com" 
                      className="bg-background" 
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">
                    {t("contact.form.phone")}
                  </label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="+351 000 000 000" 
                    className="bg-background" 
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="project" className="text-sm font-medium text-foreground">
                    Tipo de Projeto
                  </label>
                  <Input 
                    id="project" 
                    placeholder="Ex: Remodelação de cozinha" 
                    className="bg-background" 
                    value={formData.project}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    {t("contact.form.message")}
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Descreva o seu projeto..."
                    rows={4}
                    className="bg-background resize-none"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      A enviar...
                    </>
                  ) : (
                    t("contact.form.submit")
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
