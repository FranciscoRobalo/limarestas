"use client"

import React from "react"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/contexts/language-context"
import {
  Building2,
  Ruler,
  HardHat,
  Hammer,
  Home,
  Landmark,
  ArrowRight,
  CheckCircle2,
  Upload,
  FileText,
} from "lucide-react"
import { useState } from "react"

const categories = [
  {
    key: "join.architects",
    icon: Ruler,
    description: {
      pt: "Arquitetos e gabinetes de arquitetura",
      en: "Architects and architecture firms",
      es: "Arquitectos y estudios de arquitectura",
    },
    requirements: {
      pt: ["Licenciatura em Arquitetura", "Inscrição na Ordem dos Arquitetos", "Portfólio de projetos"],
      en: ["Architecture degree", "Registration with Architects Association", "Project portfolio"],
      es: ["Licenciatura en Arquitectura", "Inscripción en el Colegio de Arquitectos", "Portafolio de proyectos"],
    },
  },
  {
    key: "join.engineers",
    icon: Building2,
    description: {
      pt: "Engenheiros civis e de estruturas",
      en: "Civil and structural engineers",
      es: "Ingenieros civiles y de estructuras",
    },
    requirements: {
      pt: ["Licenciatura em Engenharia", "Inscrição na Ordem dos Engenheiros", "Experiência comprovada"],
      en: ["Engineering degree", "Registration with Engineers Association", "Proven experience"],
      es: ["Licenciatura en Ingeniería", "Inscripción en el Colegio de Ingenieros", "Experiencia comprobada"],
    },
  },
  {
    key: "join.builders",
    icon: HardHat,
    description: {
      pt: "Empresas de construção e construtores",
      en: "Construction companies and builders",
      es: "Empresas de construcción y constructores",
    },
    requirements: {
      pt: ["Alvará de construção", "Seguro de responsabilidade civil", "Referências de obras"],
      en: ["Construction permit", "Liability insurance", "Work references"],
      es: ["Licencia de construcción", "Seguro de responsabilidad civil", "Referencias de obras"],
    },
  },
  {
    key: "join.contractors",
    icon: Hammer,
    description: {
      pt: "Empreiteiros e subempreiteiros especializados",
      en: "Contractors and specialized subcontractors",
      es: "Contratistas y subcontratistas especializados",
    },
    requirements: {
      pt: ["Licença de atividade", "Certificações profissionais", "Equipa qualificada"],
      en: ["Activity license", "Professional certifications", "Qualified team"],
      es: ["Licencia de actividad", "Certificaciones profesionales", "Equipo calificado"],
    },
  },
  {
    key: "join.condominiums",
    icon: Home,
    description: {
      pt: "Gestão e administração de condomínios",
      en: "Condominium management and administration",
      es: "Gestión y administración de condominios",
    },
    requirements: {
      pt: ["Licença AMI (se aplicável)", "Experiência em gestão", "Conhecimento legal"],
      en: ["AMI license (if applicable)", "Management experience", "Legal knowledge"],
      es: ["Licencia AMI (si aplica)", "Experiencia en gestión", "Conocimiento legal"],
    },
  },
  {
    key: "join.realestate",
    icon: Landmark,
    description: {
      pt: "Agências imobiliárias e consultores",
      en: "Real estate agencies and consultants",
      es: "Agencias inmobiliarias y consultores",
    },
    requirements: {
      pt: ["Licença AMI obrigatória", "Seguro profissional", "Base de dados de imóveis"],
      en: ["Mandatory AMI license", "Professional insurance", "Property database"],
      es: ["Licencia AMI obligatoria", "Seguro profesional", "Base de datos de inmuebles"],
    },
  },
]

export default function JoinUsPage() {
  const { t, language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  const texts = {
    pt: {
      title: "Junte-se a Nós",
      subtitle: "Faça parte da rede LAT - Limarestas e expanda as suas oportunidades de negócio.",
      selectCategory: "Selecione a sua categoria profissional",
      whyJoin: "Porquê juntar-se à Limarestas?",
      benefit1: "Acesso a novos projetos e clientes",
      benefit2: "Rede de profissionais qualificados",
      benefit3: "Suporte administrativo e comercial",
      benefit4: "Visibilidade no mercado",
      requirements: "Requisitos",
      registerForm: "Formulário de Registo",
      name: "Nome Completo / Empresa",
      email: "Email",
      phone: "Telefone",
      nif: "NIF / NIPC",
      experience: "Experiência e Qualificações",
      documents: "Documentos (PDF)",
      uploadDocs: "Carregar Documentos",
      submit: "Submeter Candidatura",
      successTitle: "Candidatura Enviada!",
      successMsg: "Entraremos em contacto em breve para validar os seus dados.",
      backToHome: "Voltar ao Início",
    },
    en: {
      title: "Join Us",
      subtitle: "Join the LAT - Limarestas network and expand your business opportunities.",
      selectCategory: "Select your professional category",
      whyJoin: "Why join Limarestas?",
      benefit1: "Access to new projects and clients",
      benefit2: "Network of qualified professionals",
      benefit3: "Administrative and commercial support",
      benefit4: "Market visibility",
      requirements: "Requirements",
      registerForm: "Registration Form",
      name: "Full Name / Company",
      email: "Email",
      phone: "Phone",
      nif: "Tax ID",
      experience: "Experience and Qualifications",
      documents: "Documents (PDF)",
      uploadDocs: "Upload Documents",
      submit: "Submit Application",
      successTitle: "Application Sent!",
      successMsg: "We will contact you soon to validate your data.",
      backToHome: "Back to Home",
    },
    es: {
      title: "Únete a Nosotros",
      subtitle: "Forme parte de la red LAT - Limarestas y amplíe sus oportunidades de negocio.",
      selectCategory: "Seleccione su categoría profesional",
      whyJoin: "¿Por qué unirse a Limarestas?",
      benefit1: "Acceso a nuevos proyectos y clientes",
      benefit2: "Red de profesionales calificados",
      benefit3: "Soporte administrativo y comercial",
      benefit4: "Visibilidad en el mercado",
      requirements: "Requisitos",
      registerForm: "Formulario de Registro",
      name: "Nombre Completo / Empresa",
      email: "Email",
      phone: "Teléfono",
      nif: "NIF",
      experience: "Experiencia y Calificaciones",
      documents: "Documentos (PDF)",
      uploadDocs: "Cargar Documentos",
      submit: "Enviar Solicitud",
      successTitle: "¡Solicitud Enviada!",
      successMsg: "Nos pondremos en contacto pronto para validar sus datos.",
      backToHome: "Volver al Inicio",
    },
  }

  const txt = texts[language]

  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-32 pb-20 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-foreground mb-4">
              {txt.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {txt.subtitle}
            </p>
          </div>

          {!formSubmitted ? (
            <>
              {/* Benefits */}
              <div className="mb-16">
                <h2 className="text-2xl font-serif text-foreground text-center mb-8">{txt.whyJoin}</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[txt.benefit1, txt.benefit2, txt.benefit3, txt.benefit4].map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-background rounded-lg border border-border">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Selection */}
              <div className="mb-12">
                <h2 className="text-xl font-semibold text-foreground text-center mb-8">{txt.selectCategory}</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((category) => {
                    const isSelected = selectedCategory === category.key
                    return (
                      <Card
                        key={category.key}
                        className={`cursor-pointer transition-all hover:shadow-lg ${
                          isSelected ? "border-primary ring-2 ring-primary/20" : "hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedCategory(category.key)}
                      >
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-lg ${isSelected ? "bg-primary/10" : "bg-secondary"}`}>
                              <category.icon className={`w-6 h-6 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{t(category.key)}</CardTitle>
                              <CardDescription>{category.description[language]}</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        {isSelected && (
                          <CardContent>
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-foreground">{txt.requirements}:</p>
                              <ul className="space-y-1">
                                {category.requirements[language].map((req, i) => (
                                  <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                                    <FileText className="w-3 h-3" />
                                    {req}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* Registration Form */}
              {selectedCategory && (
                <Card className="max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle>{txt.registerForm}</CardTitle>
                    <CardDescription>
                      {t(selectedCategory)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">{txt.name}</label>
                          <Input placeholder={txt.name} required />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">{txt.email}</label>
                          <Input type="email" placeholder="email@exemplo.com" required />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">{txt.phone}</label>
                          <Input type="tel" placeholder="+351 000 000 000" required />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">{txt.nif}</label>
                          <Input placeholder="000000000" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">{txt.experience}</label>
                        <Textarea
                          placeholder={txt.experience}
                          rows={4}
                          className="resize-none"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">{txt.documents}</label>
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                          <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">{txt.uploadDocs}</p>
                          <p className="text-xs text-muted-foreground mt-1">PDF, max 10MB</p>
                          <input type="file" className="hidden" accept=".pdf" multiple />
                        </div>
                      </div>

                      <Button type="submit" size="lg" className="w-full">
                        {txt.submit}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card className="max-w-md mx-auto text-center">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-serif text-foreground mb-2">{txt.successTitle}</h2>
                <p className="text-muted-foreground mb-6">{txt.successMsg}</p>
                <Button asChild>
                  <Link href="/">{txt.backToHome}</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
