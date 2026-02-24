import { Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

const team = [
  {
    name: "Francisco Robalo",
    role: "Diretor Geral",
    image: "/professional-man-ceo-portrait-suit.jpg",
    bio: "Com mais de 15 anos de experiência no setor da construção, lidera a visão estratégica da empresa.",
    linkedin: "#",
    email: "francisco@limarestas.com",
  },
  {
    name: "Ana Martins",
    role: "Gestora de Projetos",
    image: "/professional-woman-project-manager.png",
    bio: "Especialista em gestão de projetos complexos, garante que cada obra cumpre prazos e orçamentos.",
    linkedin: "#",
    email: "ana@limarestas.com",
  },
  {
    name: "Pedro Silva",
    role: "Consultor Técnico",
    image: "/professional-engineer.png",
    bio: "Engenheiro civil com vasta experiência, avalia tecnicamente todos os projetos e parceiros.",
    linkedin: "#",
    email: "pedro@limarestas.com",
  },
  {
    name: "Sofia Costa",
    role: "Relações com Parceiros",
    image: "/professional-woman-business-development-portrait.jpg",
    bio: "Responsável pela expansão e manutenção da rede de empresas parceiras certificadas.",
    linkedin: "#",
    email: "sofia@limarestas.com",
  },
]

export function TeamSection() {
  return (
    <section id="equipa" className="py-20 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">A Nossa Equipa</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-serif font-medium text-foreground">
            Conheça quem faz acontecer
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Uma equipa dedicada a encontrar as melhores soluções para o seu projeto.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div key={member.name} className="group text-center">
              <div className="relative mb-6 overflow-hidden rounded-2xl aspect-square">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                  <div className="flex gap-2">
                    <Button size="icon" variant="secondary" className="w-10 h-10 rounded-full" asChild>
                      <a href={member.linkedin}>
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button size="icon" variant="secondary" className="w-10 h-10 rounded-full" asChild>
                      <a href={`mailto:${member.email}`}>
                        <Mail className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
              <p className="text-sm text-accent font-medium mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
