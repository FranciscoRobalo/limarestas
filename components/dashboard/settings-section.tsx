"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useActivityLog } from "@/hooks/use-activity-log"
import { useTheme } from "@/components/theme-provider"
import { storage } from "@/lib/storage"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { User, Bell, Shield, Palette, Save, CheckCircle } from "lucide-react"

export function SettingsSection() {
  const { user } = useAuth()
  const { addLog } = useActivityLog()
  const { theme, setTheme } = useTheme()
  const [saved, setSaved] = useState(false)
  const [passwords, setPasswords] = useState({ atual: "", nova: "", confirmar: "" })
  const [settings, setSettings] = useState({
    nome: user?.name || "",
    email: "",
    telefone: "",
    notificacoesEmail: true,
    notificacoesSMS: false,
    notificacoesPush: true,
    temaEscuro: theme === "dark",
  })

  useEffect(() => {
    const stored = storage.get<typeof settings>(`limarestas_settings_${user?.username ?? "guest"}`)
    if (stored) setSettings({ ...stored, temaEscuro: theme === "dark" })
  }, [theme, user?.username])

  const handleSave = () => {
    if (!settings.nome.trim()) {
      toast.error("Indique o nome completo")
      return
    }
    if (settings.email && !/^\S+@\S+\.\S+$/.test(settings.email)) {
      toast.error("Indique um email válido")
      return
    }
    if (passwords.nova || passwords.confirmar || passwords.atual) {
      if (!passwords.atual || passwords.nova.length < 8 || passwords.nova !== passwords.confirmar) {
        toast.error("Confirme a palavra-passe", { description: "A nova palavra-passe deve ter pelo menos 8 caracteres e coincidir." })
        return
      }
      setPasswords({ atual: "", nova: "", confirmar: "" })
      toast.success("Palavra-passe atualizada nesta demonstração")
    }
    storage.set(`limarestas_settings_${user?.username ?? "guest"}`, settings)
    addLog("Atualização de Definições", "Definições de conta atualizadas", "usuario")
    setSaved(true)
    toast.success("Definições guardadas")
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Definições de Conta</h2>
        <p className="text-muted-foreground">Gerir as suas preferências e informações</p>
      </div>

      {/* Perfil */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Informações do Perfil
          </CardTitle>
          <CardDescription>Atualize os seus dados pessoais</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                id="nome"
                value={settings.nome}
                onChange={(e) => setSettings({ ...settings, nome: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Nome de Utilizador</Label>
              <Input id="username" value={user?.username || ""} disabled className="bg-secondary" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                type="tel"
                placeholder="+351 900 000 000"
                value={settings.telefone}
                onChange={(e) => setSettings({ ...settings, telefone: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Função</Label>
            <div className="px-3 py-2 bg-secondary rounded-md text-sm">
              {user?.role === "admin" && "Administrador"}
              {user?.role === "tecnico" && "Técnico"}
              {user?.role === "cliente" && "Cliente"}
              {user?.role === "construtor" && "Construtor"}
              {user?.role === "empreiteiro" && "Empreiteiro"}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notificações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notificações
          </CardTitle>
          <CardDescription>Configure como pretende receber notificações</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notificações por Email</p>
              <p className="text-sm text-muted-foreground">Receber atualizações e alertas por email</p>
            </div>
            <Switch
              checked={settings.notificacoesEmail}
              onCheckedChange={(checked) => setSettings({ ...settings, notificacoesEmail: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notificações por SMS</p>
              <p className="text-sm text-muted-foreground">Receber alertas urgentes por SMS</p>
            </div>
            <Switch
              checked={settings.notificacoesSMS}
              onCheckedChange={(checked) => setSettings({ ...settings, notificacoesSMS: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notificações Push</p>
              <p className="text-sm text-muted-foreground">Receber notificações no navegador</p>
            </div>
            <Switch
              checked={settings.notificacoesPush}
              onCheckedChange={(checked) => setSettings({ ...settings, notificacoesPush: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Aparência */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Aparência
          </CardTitle>
          <CardDescription>Personalize a aparência da aplicação</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Tema Escuro</p>
              <p className="text-sm text-muted-foreground">Alternar entre tema claro e escuro</p>
            </div>
            <Switch
              checked={settings.temaEscuro}
              onCheckedChange={(checked) => {
                setSettings({ ...settings, temaEscuro: checked })
                setTheme(checked ? "dark" : "light")
              }}
              aria-label="Alternar tema escuro"
            />
          </div>
        </CardContent>
      </Card>

      {/* Segurança */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Segurança
          </CardTitle>
          <CardDescription>Opções de segurança da conta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password-atual">Palavra-passe Atual</Label>
            <Input
              id="password-atual"
              type="password"
              autoComplete="current-password"
              value={passwords.atual}
              onChange={(event) => setPasswords({ ...passwords, atual: event.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password-nova">Nova Palavra-passe</Label>
              <Input
                id="password-nova"
                type="password"
                autoComplete="new-password"
                value={passwords.nova}
                onChange={(event) => setPasswords({ ...passwords, nova: event.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-confirmar">Confirmar Palavra-passe</Label>
              <Input
                id="password-confirmar"
                type="password"
                autoComplete="new-password"
                value={passwords.confirmar}
                onChange={(event) => setPasswords({ ...passwords, confirmar: event.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="min-w-[200px]">
          {saved ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Guardado!
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Guardar Alterações
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
