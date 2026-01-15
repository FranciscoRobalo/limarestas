"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Como funciona o serviço da Limarestas?",
    answer:
      "O nosso processo é simples: primeiro, recebemos os detalhes do seu projeto. Depois, contactamos a nossa rede de empresas validadas e apresentamos-lhe até 3 orçamentos comparáveis. Acompanhamos todo o processo até à conclusão da obra, garantindo qualidade e cumprimento de prazos.",
  },
  {
    question: "O serviço tem custos para o cliente?",
    answer:
      "Não! O nosso serviço é totalmente gratuito para o cliente. Somos remunerados pelas empresas parceiras apenas quando o projeto é adjudicado. Isto significa que trabalhamos para si sem qualquer compromisso financeiro da sua parte.",
  },
  {
    question: "Que tipo de projetos fazem?",
    answer:
      "Trabalhamos com todo o tipo de projetos de construção: construção de raiz, remodelações, ampliações, projetos comerciais, paisagismo, piscinas, e muito mais. Desde pequenas reparações a grandes empreendimentos, temos parceiros para todas as necessidades.",
  },
  {
    question: "Como garantem a qualidade das empresas parceiras?",
    answer:
      "Todas as empresas da nossa rede passam por um processo rigoroso de validação. Verificamos licenciamento, seguros, histórico de projetos, referências de clientes anteriores e estabilidade financeira. Apenas trabalhamos com empresas que cumpram os nossos padrões de excelência.",
  },
  {
    question: "Quanto tempo demora a receber orçamentos?",
    answer:
      "Normalmente, apresentamos os primeiros orçamentos em 5 a 10 dias úteis, dependendo da complexidade do projeto. Para projetos mais simples, pode ser ainda mais rápido. Priorizamos a qualidade dos orçamentos sobre a velocidade.",
  },
  {
    question: "O que acontece se houver problemas durante a obra?",
    answer:
      "Acompanhamos todas as obras que intermediamos. Se surgir algum problema, mediamos a comunicação entre o cliente e a empresa, procurando sempre a melhor solução. O nosso objetivo é que todos os projetos terminem com sucesso e satisfação de todas as partes.",
  },
  {
    question: "Trabalham em todo o país?",
    answer:
      "Sim! Temos parceiros em todas as regiões de Portugal Continental e ilhas. A nossa rede está em constante crescimento para garantir cobertura nacional com a mesma qualidade de serviço.",
  },
  {
    question: "Posso escolher entre os orçamentos apresentados?",
    answer:
      "Absolutamente. Apresentamos sempre múltiplas opções para que possa comparar preços, prazos e abordagens. A decisão final é sempre sua. Estamos disponíveis para esclarecer dúvidas e ajudar na análise comparativa dos orçamentos.",
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-20 md:py-32 bg-card">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Perguntas Frequentes</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-serif font-medium text-foreground">Dúvidas? Temos respostas</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Encontre respostas às perguntas mais comuns sobre os nossos serviços.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-background rounded-xl border border-border px-6 data-[state=open]:border-accent/50"
            >
              <AccordionTrigger className="text-left text-foreground hover:text-accent hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
