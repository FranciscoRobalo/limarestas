import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Building2, 
  HardHat, 
  Ruler, 
  Home, 
  Building, 
  Landmark,
  ArrowRight,
  CheckCircle2,
  Users,
  Shield,
  TrendingUp
} from "lucide-react"

const professionCategories = [
  {
    title: "Arquitetos",
    description: "Profissionais de arquitetura que pretendem expandir a sua rede de projetos e clientes.",
    icon: Ruler,
    benefits: ["Acesso a projetos qualificados", "Gestão simplificada de propostas", "Visibilidade aumentada"]
  },
  {
    title: "Engenheiros",
    description: "Engenheiros civis e de especialidade para projetos de construção e reabilitação.",
    icon: Building2,
    benefits: ["Projetos técnicos diversificados", "Parcerias estratégicas", "Suporte administrativo"]
  },
  {
    title: "Construtores",
    description: "Empresas de construção civil para obras de diversos tipos e dimensões.",
    icon: HardHat,
    benefits: ["Obras pré-validadas", "Pagamentos seguros", "Gestão de documentação"]
  },
  {
    title: "Empreiteiros",
    description: "Empreiteiros especializados em diferentes áreas da construção.",
    icon: Building,
    benefits: ["Trabalhos especializados", "Rede de contactos", "Crescimento do negócio"]
  },
  {
    title: "Condomínios",
    description: "Gestores de condomínios e administradores de propriedades.",
    icon: Home,
    benefits: ["Soluções para manutenção", "Orçamentos competitivos", "Acompanhamento de obras"]
  },
  {
    title: "Imobiliários",
    description: "Agentes e agências imobiliárias que necessitam de parceiros de construção.",
    icon: Landmark,
    benefits: ["Valorização de imóveis", "Parceiros de confiança", "Serviço integrado"]
  }
]

const benefits = [
  {
    icon: Users,
    title: "Rede de Contactos",
    description: "Acesso a uma vasta rede de clientes e profissionais do setor."
  },
  {
    icon: Shield,
    title: "Projetos Validados",
    description: "Todos os projetos são pré-validados pela nossa equipa."
  },
  {
    icon: TrendingUp,
    title: "Crescimento",
    description: "Aumente a sua carteira de clientes e projetos."
  }
]

export default function JunteSePage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Junte-se a Nós</span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight text-foreground text-balance">
              Faça parte da rede Limarestas
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Conectamos profissionais qualificados com projetos de construção em todo o Portugal. 
              Junte-se à nossa rede e expanda o seu negócio.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <benefit.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-card">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground">
              Categorias Profissionais
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Selecione a sua categoria e descubra como podemos ajudá-lo a crescer.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionCategories.map((category) => (
              <Card key={category.title} className="hover:shadow-lg transition-shadow group">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <category.icon className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {category.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="#contacto-profissional">
                      Saber Mais
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contacto-profissional" className="py-20 bg-background">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-serif">Registe o seu interesse</CardTitle>
              <CardDescription>
                Preencha o formulário e a nossa equipa entrará em contacto consigo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="nome" className="text-sm font-medium text-foreground">
                      Nome Completo
                    </label>
                    <input
                      id="nome"
                      type="text"
                      placeholder="O seu nome"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="empresa" className="text-sm font-medium text-foreground">
                      Empresa
                    </label>
                    <input
                      id="empresa"
                      type="text"
                      placeholder="Nome da empresa"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="email@exemplo.com"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="telefone" className="text-sm font-medium text-foreground">
                      Telefone
                    </label>
                    <input
                      id="telefone"
                      type="tel"
                      placeholder="+351 000 000 000"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="categoria" className="text-sm font-medium text-foreground">
                    Categoria Profissional
                  </label>
                  <select
                    id="categoria"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="arquiteto">Arquiteto</option>
                    <option value="engenheiro">Engenheiro</option>
                    <option value="construtor">Construtor</option>
                    <option value="empreiteiro">Empreiteiro</option>
                    <option value="condominio">Condomínio</option>
                    <option value="imobiliario">Imobiliário</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="mensagem" className="text-sm font-medium text-foreground">
                    Mensagem
                  </label>
                  <textarea
                    id="mensagem"
                    rows={4}
                    placeholder="Descreva a sua experiência e áreas de atuação..."
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none"
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
                  Enviar Candidatura
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}
