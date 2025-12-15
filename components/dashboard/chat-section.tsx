"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { Send, User, Bot, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { useMensagens } from "@/hooks/use-mensagens"
import { useState } from "react"

interface ChatUser {
  id: string
  name: string
  status: "online" | "offline" | "away"
  lastSeen?: Date
}

const mockUsers: ChatUser[] = [
  { id: "1", name: "Suporte Técnico", status: "online" },
  { id: "2", name: "João Silva", status: "away" },
  { id: "3", name: "Maria Santos", status: "offline", lastSeen: new Date(Date.now() - 3600000) },
]

export function ChatSection() {
  const { user } = useAuth()
  const { mensagens, addMensagem } = useMensagens()

  const [newMessage, setNewMessage] = useState("")
  const [selectedChat, setSelectedChat] = useState<ChatUser>(mockUsers[0])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [mensagens])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    addMensagem(newMessage, user?.name || "Utilizador", "user")
    setNewMessage("")

    // Simulate response after a short delay
    setTimeout(() => {
      const responses = [
        "Obrigado pela sua mensagem! Vamos analisar e responder em breve.",
        "Recebemos a sua mensagem. A nossa equipa está a trabalhar nisso.",
        "Entendido! Dê-nos alguns minutos para verificar.",
        "Obrigado por nos contactar. Vamos ajudá-lo com isso.",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      addMensagem(randomResponse, selectedChat.name, "support")
    }, 1500)
  }

  const getStatusColor = (status: ChatUser["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      default:
        return "bg-muted-foreground/50"
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif text-foreground mb-2">Mensagens</h2>
        <p className="text-muted-foreground">Comunique com a nossa equipa e outros utilizadores.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
        {/* Users list */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Contactos</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {mockUsers.map((chatUser) => (
                <button
                  key={chatUser.id}
                  onClick={() => setSelectedChat(chatUser)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 text-left
                    hover:bg-secondary transition-colors
                    ${selectedChat.id === chatUser.id ? "bg-secondary" : ""}
                  `}
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(chatUser.status)}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">{chatUser.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {chatUser.status === "online"
                        ? "Online"
                        : chatUser.status === "away"
                          ? "Ausente"
                          : chatUser.lastSeen
                            ? `Visto às ${chatUser.lastSeen.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" })}`
                            : "Offline"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat area */}
        <Card className="lg:col-span-3 flex flex-col">
          {/* Chat header */}
          <CardHeader className="border-b border-border pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(selectedChat.status)}`}
                  />
                </div>
                <div>
                  <CardTitle className="text-base">{selectedChat.name}</CardTitle>
                  <CardDescription className="text-xs">
                    {selectedChat.status === "online" ? "Online agora" : "Offline"}
                  </CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {mensagens.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.remetente === "user" ? "flex-row-reverse" : ""}`}>
                <div
                  className={`
                  w-8 h-8 rounded-full flex items-center justify-center shrink-0
                  ${message.remetente === "user" ? "bg-accent" : "bg-primary/10"}
                `}
                >
                  {message.remetente === "user" ? (
                    <span className="text-xs font-semibold text-accent-foreground">
                      {user?.name.charAt(0).toUpperCase()}
                    </span>
                  ) : (
                    <Bot className="w-4 h-4 text-primary" />
                  )}
                </div>
                <div
                  className={`
                  max-w-[70%] rounded-2xl px-4 py-2
                  ${
                    message.remetente === "user"
                      ? "bg-accent text-accent-foreground rounded-br-md"
                      : "bg-secondary text-foreground rounded-bl-md"
                  }
                `}
                >
                  <p className="text-sm">{message.conteudo}</p>
                  <p
                    className={`
                    text-xs mt-1
                    ${message.remetente === "user" ? "text-accent-foreground/70" : "text-muted-foreground"}
                  `}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Message input */}
          <div className="p-4 border-t border-border">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Escreva a sua mensagem..."
                className="flex-1"
              />
              <Button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                disabled={!newMessage.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
}
