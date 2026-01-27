import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/30 -skew-x-12 transform origin-top-right -z-10" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight text-foreground text-balance">
              Encontramos a equipa certa para qualquer projeto de construção.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              O projeto é seu, o trabalho é nosso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="#contacto">
                  Fale connosco
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5 bg-transparent"
              >
                <Link href="#contacto">Contacte-nos</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/modern-minimalist-architecture-interior-with-clean.jpg"
                alt="Arquitetura moderna com formas geométricas"
                className="object-cover w-full h-full"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent rounded-2xl -z-10" />
            <div className="absolute -top-6 -right-6 w-16 h-16 border-4 border-primary rounded-xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
