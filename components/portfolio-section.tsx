"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    id: 1,
    title: "Moradia T4 em Cascais",
    category: "Construção",
    description: "Construção de raiz de uma moradia moderna com 4 quartos, piscina e jardim paisagístico.",
    image: "/modern-luxury-villa-cascais-portugal-swimming-pool.jpg",
    location: "Cascais, Lisboa",
    year: "2024",
    area: "350m²",
    duration: "14 meses",
  },
  {
    id: 2,
    title: "Remodelação de Apartamento",
    category: "Remodelação",
    description: "Remodelação integral de apartamento T3 no centro do Porto, com design contemporâneo.",
    image: "/modern-apartment-renovation-porto-interior-design.jpg",
    location: "Porto",
    year: "2024",
    area: "120m²",
    duration: "4 meses",
  },
  {
    id: 3,
    title: "Escritório Corporativo",
    category: "Comercial",
    description: "Projeto de interiores para escritório de empresa tecnológica com espaços colaborativos.",
    image: "/modern-corporate-office-interior-design-coworking.jpg",
    location: "Lisboa",
    year: "2023",
    area: "500m²",
    duration: "6 meses",
  },
  {
    id: 4,
    title: "Restaurante Gourmet",
    category: "Comercial",
    description: "Construção e design de interiores para restaurante fine dining com cozinha aberta.",
    image: "/luxury-restaurant-interior-design-fine-dining.jpg",
    location: "Comporta",
    year: "2023",
    area: "280m²",
    duration: "8 meses",
  },
  {
    id: 5,
    title: "Casa de Campo",
    category: "Construção",
    description: "Construção sustentável de casa de campo com materiais ecológicos e energia solar.",
    image: "/sustainable-country-house-portugal-solar-panels.jpg",
    location: "Alentejo",
    year: "2024",
    area: "220m²",
    duration: "12 meses",
  },
  {
    id: 6,
    title: "Jardim e Piscina",
    category: "Paisagismo",
    description: "Projeto de paisagismo completo com piscina infinita e jardim mediterrânico.",
    image: "/mediterranean-garden-infinity-pool-landscaping.jpg",
    location: "Sintra",
    year: "2024",
    area: "800m²",
    duration: "3 meses",
  },
]

const categories = ["Todos", "Construção", "Remodelação", "Comercial", "Paisagismo"]

export function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)

  const filteredProjects =
    selectedCategory === "Todos" ? projects : projects.filter((p) => p.category === selectedCategory)

  const currentIndex = selectedProject ? filteredProjects.findIndex((p) => p.id === selectedProject.id) : -1

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setSelectedProject(filteredProjects[currentIndex - 1])
    }
  }

  const goToNext = () => {
    if (currentIndex < filteredProjects.length - 1) {
      setSelectedProject(filteredProjects[currentIndex + 1])
    }
  }

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Portfólio</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-serif font-medium text-foreground">Projetos realizados</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça alguns dos projetos que ajudámos a concretizar com sucesso.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-primary text-primary-foreground" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-2xl overflow-hidden cursor-pointer bg-card border border-border hover:border-accent/50 transition-all hover:shadow-lg"
              onClick={() => setSelectedProject(project)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <Badge variant="secondary" className="mb-3">
                  {project.category}
                </Badge>
                <h3 className="text-lg font-semibold text-foreground mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                  <span>{project.location}</span>
                  <span>•</span>
                  <span>{project.area}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10"
            onClick={() => setSelectedProject(null)}
          >
            <X className="w-6 h-6" />
          </Button>

          {currentIndex > 0 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
              onClick={goToPrevious}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>
          )}

          {currentIndex < filteredProjects.length - 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
              onClick={goToNext}
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
          )}

          <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8">
            <div className="aspect-[4/3] rounded-xl overflow-hidden">
              <img
                src={selectedProject.image || "/placeholder.svg"}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <Badge variant="secondary" className="w-fit mb-4">
                {selectedProject.category}
              </Badge>
              <h3 className="text-2xl font-serif font-medium text-foreground mb-4">{selectedProject.title}</h3>
              <p className="text-muted-foreground mb-6">{selectedProject.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Localização</p>
                  <p className="font-medium text-foreground">{selectedProject.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ano</p>
                  <p className="font-medium text-foreground">{selectedProject.year}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Área</p>
                  <p className="font-medium text-foreground">{selectedProject.area}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duração</p>
                  <p className="font-medium text-foreground">{selectedProject.duration}</p>
                </div>
              </div>
              <Button className="mt-8 w-fit bg-accent hover:bg-accent/90 text-accent-foreground">
                Quero um projeto semelhante
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
