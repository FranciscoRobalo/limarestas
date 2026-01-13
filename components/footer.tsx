import Link from "next/link"
import { Facebook, Instagram, Linkedin } from "lucide-react"

const navigation = {
  main: [
    { name: "Início", href: "#inicio" },
    { name: "Sobre", href: "#sobre" },
    { name: "Serviços", href: "#servicos" },
    { name: "Contacto", href: "#contacto" },
  ],
  social: [
    { name: "Facebook", href: "#", icon: Facebook },
    { name: "Instagram", href: "#", icon: Instagram },
    { name: "LinkedIn", href: "#", icon: Linkedin },
  ],
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-foreground/10 rounded-lg">
              <span className="text-primary-foreground font-bold text-sm">LAT</span>
            </div>
            <span className="text-xl font-semibold">Limarestas</span>
          </div>

          <nav className="flex flex-wrap gap-6">
            {navigation.main.map((item) => (
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
            {navigation.social.map((item) => (
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
              © {new Date().getFullYear()} LAT - Limarestas. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm text-primary-foreground/60">
              <Link href="#" className="hover:text-primary-foreground transition-colors">
                Política de Privacidade
              </Link>
              <Link href="#" className="hover:text-primary-foreground transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
