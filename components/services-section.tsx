import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    title: "Construção",
    description: "Desde casas novas a ampliações, encontramos construtores de confiança para o seu projeto.",
    image: "/modern-house-construction-site-professional-worker.jpg",
    href: "#",
  },
  {
    title: "Arquitetura",
    description: "Conectamos-o com arquitetos que dão vida à sua visão, com design funcional e estético.",
    image: "/architectural-blueprints-modern-building-design.jpg",
    href: "#",
  },
  {
    title: "Paisagismo e Espaços Exteriores",
    description: "Jardins, piscinas e espaços exteriores que complementam perfeitamente a sua propriedade.",
    image: "/beautiful-landscaped-garden-with-pool-modern-desig.jpg",
    href: "#",
  },
]

export function ServicesSection() {
  return (
    <section id="servicos" className="py-20 md:py-32 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">O que fazemos</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-serif font-medium">Os nossos serviços incluem</h2>
          </div>
          <Button
            asChild
            variant="outline"
            className="self-start md:self-auto border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10"
          >
            <Link href="#">Ver mais serviços</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-primary-foreground/10"
            >
              <img
                src={service.image || "/placeholder.svg"}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-primary-foreground mb-2">{service.title}</h3>
                    <p className="text-sm text-primary-foreground/80 line-clamp-2">{service.description}</p>
                  </div>
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <ArrowUpRight className="w-5 h-5 text-accent-foreground" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
