const partners = [
  { name: "CIN", logo: "/cin-paint-company-logo.jpg" },
  { name: "Leroy Merlin", logo: "/leroy-merlin-logo.png" },
  { name: "Saint-Gobain", logo: "/saint-gobain-logo.jpg" },
  { name: "Weber", logo: "/weber-construction-logo.jpg" },
  { name: "Revigrés", logo: "/revigres-tiles-logo.jpg" },
  { name: "Robbialac", logo: "/robbialac-paint-logo.jpg" },
]

export function PartnersSection() {
  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-muted-foreground mb-8">
          Trabalhamos com as melhores marcas do mercado
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners.map((partner) => (
            <div key={partner.name} className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all">
              <img
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                className="h-10 md:h-12 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
