"use client"

import { useState } from "react"
import { Users, Building2, Euro, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const monthlyData = [
  { month: "Jan", obras: 12, receita: 45000, visitas: 28 },
  { month: "Fev", obras: 15, receita: 52000, visitas: 35 },
  { month: "Mar", obras: 18, receita: 68000, visitas: 42 },
  { month: "Abr", obras: 14, receita: 55000, visitas: 38 },
  { month: "Mai", obras: 22, receita: 82000, visitas: 55 },
  { month: "Jun", obras: 25, receita: 95000, visitas: 62 },
  { month: "Jul", obras: 20, receita: 78000, visitas: 48 },
  { month: "Ago", obras: 16, receita: 58000, visitas: 32 },
  { month: "Set", obras: 24, receita: 88000, visitas: 58 },
  { month: "Out", obras: 28, receita: 105000, visitas: 68 },
  { month: "Nov", obras: 26, receita: 98000, visitas: 64 },
  { month: "Dez", obras: 30, receita: 120000, visitas: 72 },
]

const obrasByType = [
  { name: "Construção", value: 35, color: "#1e3a5f" },
  { name: "Remodelação", value: 45, color: "#c9a227" },
  { name: "Paisagismo", value: 12, color: "#2d5a3d" },
  { name: "Comercial", value: 8, color: "#7c3238" },
]

const obrasByStatus = [
  { status: "Pendentes", count: 12, color: "bg-yellow-500" },
  { status: "Em Análise", count: 8, color: "bg-blue-500" },
  { status: "Aprovadas", count: 45, color: "bg-green-500" },
  { status: "Rejeitadas", count: 5, color: "bg-red-500" },
  { status: "Concluídas", count: 78, color: "bg-primary" },
]

export function AnalyticsSection() {
  const [period, setPeriod] = useState("year")

  const metrics = [
    {
      title: "Total de Obras",
      value: "148",
      change: "+12%",
      trend: "up",
      icon: Building2,
      description: "vs. período anterior",
    },
    {
      title: "Receita Total",
      value: "€943.000",
      change: "+18%",
      trend: "up",
      icon: Euro,
      description: "vs. período anterior",
    },
    {
      title: "Novos Clientes",
      value: "86",
      change: "+8%",
      trend: "up",
      icon: Users,
      description: "vs. período anterior",
    },
    {
      title: "Visitas Realizadas",
      value: "602",
      change: "-3%",
      trend: "down",
      icon: Calendar,
      description: "vs. período anterior",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Analytics</h2>
          <p className="text-muted-foreground">Visão geral do desempenho da plataforma</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Última Semana</SelectItem>
            <SelectItem value="month">Último Mês</SelectItem>
            <SelectItem value="quarter">Último Trimestre</SelectItem>
            <SelectItem value="year">Último Ano</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <metric.icon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {metric.trend === "up" ? (
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-600" />
                )}
                <span className={metric.trend === "up" ? "text-green-600" : "text-red-600"}>{metric.change}</span>
                <span className="text-xs text-muted-foreground">{metric.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Receita Mensal</CardTitle>
            <CardDescription>Evolução da receita ao longo do ano</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c9a227" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#c9a227" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(v) => `€${v / 1000}k`} />
                  <Tooltip
                    formatter={(value: number) => [`€${value.toLocaleString()}`, "Receita"]}
                    contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}
                  />
                  <Area type="monotone" dataKey="receita" stroke="#c9a227" fillOpacity={1} fill="url(#colorReceita)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Obras Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Obras por Mês</CardTitle>
            <CardDescription>Número de obras iniciadas mensalmente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))" }} />
                  <Bar dataKey="obras" fill="#1e3a5f" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart - Obras by Type */}
        <Card>
          <CardHeader>
            <CardTitle>Obras por Tipo</CardTitle>
            <CardDescription>Distribuição das obras por categoria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center">
              <ResponsiveContainer width="60%" height="100%">
                <PieChart>
                  <Pie
                    data={obrasByType}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {obrasByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Percentagem"]}
                    contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {obrasByType.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                    <span className="text-sm font-medium text-foreground ml-auto">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Estado das Obras</CardTitle>
            <CardDescription>Distribuição atual por estado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {obrasByStatus.map((item) => (
                <div key={item.status} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.status}</span>
                    <span className="font-medium text-foreground">{item.count}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all`}
                      style={{ width: `${(item.count / 148) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
