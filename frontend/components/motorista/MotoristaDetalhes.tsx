"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  User,
  CreditCard,
  Calendar,
  AlertTriangle,
  Info,
  Clock,
  Hash,
} from "lucide-react"
import { Motorista } from "@/services/api"

type Props = {
  motorista: Motorista | Motorista[]
}

export default function MotoristaDetalhes({ motorista }: Props) {
  const motoristaInfo = Array.isArray(motorista) ? motorista[0] : motorista

  const isCnhExpired = (validityDate: string): boolean => {
    if (!validityDate) return false
    const today = new Date()
    const validity = new Date(validityDate)
    return validity < today
  }

  const cnhVencida = isCnhExpired(motoristaInfo?.cnh?.validade || "")

  const formatarData = (data: string): string => {
    if (!data) return "Não disponível"
    return new Date(data).toLocaleDateString("pt-BR")
  }

  const formatarDataHora = (data: string): string => {
    if (!data) return "Não disponível"
    return new Date(data).toLocaleString("pt-BR")
  }

  return (
    <Card className="shadow-sm">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <p className="text-sm font-medium">Nome</p>
            </div>
            <p className="text-lg font-medium">{motoristaInfo?.nome || "Não disponível"}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CreditCard className="h-4 w-4" />
              <p className="text-sm font-medium">CPF</p>
            </div>
            <p className="text-lg">
              {motoristaInfo?.cpf
                ? motoristaInfo.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
                : "Não disponível"}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CreditCard className="h-4 w-4" />
              <p className="text-sm font-medium">CNH</p>
            </div>
            <p className="text-lg">{motoristaInfo?.cnh?.numero || "Não disponível"}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <p className="text-sm font-medium">Validade da CNH</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-lg">
                {formatarData(motoristaInfo?.cnh?.validade || "")}
              </p>
              {cnhVencida ? (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Vencida
                </Badge>
              ) : motoristaInfo?.cnh?.validade ? (
                <Badge className="bg-green-500 hover:bg-green-600">
                  Válida
                </Badge>
              ) : null}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Hash className="h-4 w-4" />
              <p className="text-sm font-medium">ID</p>
            </div>
            <p className="text-lg">{motoristaInfo?._id || "Não disponível"}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <p className="text-sm font-medium">Criado em</p>
            </div>
            <p className="text-lg">{formatarDataHora(motoristaInfo?.createdAt || "")}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <p className="text-sm font-medium">Atualizado em</p>
            </div>
            <p className="text-lg">{formatarDataHora(motoristaInfo?.updatedAt || "")}</p>
          </div>

        </div>
      </CardContent>
    </Card>
  )
}
