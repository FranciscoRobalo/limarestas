"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

export type UserRole = "admin" | "tecnico" | "cliente" | "construtor" | "empreiteiro"

interface User {
  username: string
  name: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const VALID_USERS: Record<string, { password: string; name: string; role: UserRole }> = {
  admin: { password: "admin", name: "Administrador", role: "admin" },
  tecnico: { password: "tecnico", name: "Mediador", role: "tecnico" },
  cliente: { password: "cliente", name: "Cliente", role: "cliente" },
  construtor: { password: "construtor", name: "Construtor", role: "construtor" },
  empreiteiro: { password: "empreiteiro", name: "Empreiteiro", role: "empreiteiro" },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("limarestas_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (username: string, password: string): boolean => {
    const validUser = VALID_USERS[username]
    if (validUser && validUser.password === password) {
      const userData: User = {
        username,
        name: validUser.name,
        role: validUser.role,
      }
      setUser(userData)
      localStorage.setItem("limarestas_user", JSON.stringify(userData))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("limarestas_user")
    router.push("/")
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
