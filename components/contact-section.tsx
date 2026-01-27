import { Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactSection() {
  return (
    <section id="contacto" className="py-20 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-8">
            <div>
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">Contacte-nos</span>
              <h2 className="mt-4 text-3xl md:text-4xl font-serif font-medium text-foreground text-balance">
                Vamos falar sobre o seu projeto
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                A LAT - Limarestas poupa-lhe tempo, dinheiro e dores de cabeça. Fazemos a ponte entre o seu projeto e a
                solução certa — sem compromisso.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Email</p>
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
                  <p className="font-medium text-foreground">WhatsApp</p>
                  <span className="text-green-600 font-semibold group-hover:text-green-700 transition-colors">
                    +351 910 118 134
                  </span>
                  <p className="text-sm text-muted-foreground mt-1">Clique para falar connosco</p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Área de Serviço</p>
                  <p className="text-muted-foreground">Portugal</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Nome
                  </label>
                  <Input id="name" placeholder="O seu nome" className="bg-background" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="email@exemplo.com" className="bg-background" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Telefone
                </label>
                <Input id="phone" type="tel" placeholder="+351 000 000 000" className="bg-background" />
              </div>

              <div className="space-y-2">
                <label htmlFor="project" className="text-sm font-medium text-foreground">
                  Tipo de Projeto
                </label>
                <Input id="project" placeholder="Ex: Remodelação de cozinha" className="bg-background" />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  placeholder="Descreva o seu projeto..."
                  rows={4}
                  className="bg-background resize-none"
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Enviar mensagem
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
