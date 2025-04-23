"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useToast } from "@/components/ui/use-toast"

type NotificationContextType = {
  showNotification: (message: string, type?: "success" | "error" | "info") => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast()

  const showNotification = (message: string, type: "success" | "error" | "info" = "info") => {
    const variantMap = {
      success: "default",
      error: "destructive",
      info: "default",
    }

    toast({
      title: type === "success" ? "Sucesso!" : type === "error" ? "Erro!" : "Informação",
      description: message,
      variant: variantMap[type] as any,
    })
  }

  return <NotificationContext.Provider value={{ showNotification }}>{children}</NotificationContext.Provider>
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}
