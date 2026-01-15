"use client"

import { useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Maria Santos",
    role: "Proprietária",
    location: "Cascais",
    image: "/professional-woman-portrait.png",
    rating: 5,
    text: "A Limarestas foi excepcional na gestão do nosso projeto de construção. Conseguiram-nos orçamentos competitivos e acompanharam todo o processo. Recomendo vivamente!",
    project: "Construção de moradia T4",
  },
  {
    id: 2,
    name: "João Ferreira",
    role: "Empresário",
    location: "Porto",
    image: "/professional-man-portrait-business.png",
    rating: 5,
    text: "Profissionalismo do início ao fim. Ajudaram-nos a encontrar o empreiteiro ideal para a remodelação do nosso escritório. O resultado superou as expectativas.",
    project: "Remodelação de escritório",
  },
  {
    id: 3,
    name: "Ana Rodrigues",
    role: "Arquiteta",
    location: "Lisboa",
    image: "/professional-woman-architect.png",
    rating: 5,
    text: "Como arquiteta, aprecio parceiros que entendem a visão do projeto. A Limarestas conseguiu traduzir as necessidades dos meus clientes em soluções práticas e económicas.",
    project: "Diversos projetos residenciais",
  },
  {
    id: 4,
    name: "Pedro Costa",
    role: "Investidor Imobiliário",
    location: "Algarve",
    image: "/professional-man-investor-portrait.jpg",
    rating: 5,
    text: "Trabalho com a Limarestas há 3 anos. A sua rede de contactos e conhecimento do mercado têm sido fundamentais para os meus investimentos em reabilitação urbana.",
    project: "Reabilitação de edifícios",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section id="testemunhos" className="py-20 md:py-32 bg-primary text-primary-foreground overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Testemunhos</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-serif font-medium">O que dizem os nossos clientes</h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Quote className="absolute -top-8 -left-4 w-24 h-24 text-accent/20" />

          <Card className="bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="shrink-0">
                  <img
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-accent"
                  />
                </div>
                <div className="text-center md:text-left">
                  <div className="flex justify-center md:justify-start gap-1 mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed mb-6">
                    "{testimonials[currentIndex].text}"
                  </p>
                  <div>
                    <p className="font-semibold text-primary-foreground">{testimonials[currentIndex].name}</p>
                    <p className="text-sm text-primary-foreground/70">
                      {testimonials[currentIndex].role} • {testimonials[currentIndex].location}
                    </p>
                    <p className="text-xs text-accent mt-1">{testimonials[currentIndex].project}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false)
                    setCurrentIndex(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "w-8 bg-accent" : "bg-primary-foreground/30"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
