"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Truck, User, Hash, Clock } from "lucide-react"
import { Viagem } from "@/services/api"

type Props = {
  viagem: Viagem | Viagem[]
}

export default function ViagemDetalhes({ viagem }: Props) {
  const viagemInfo = Array.isArray(viagem) ? viagem[0] : viagem

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
              <Hash className="h-4 w-4" />
              <p className="text-sm font-medium">ID da Viagem</p>
            </div>
            <p className="text-lg font-medium">{viagemInfo?._id || "Não disponível"}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <p className="text-sm font-medium">Origem</p>
            </div>
            <p className="text-lg">{viagemInfo?.origem || "Não disponível"}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <p className="text-sm font-medium">Destino</p>
            </div>
            <p className="text-lg">{viagemInfo?.destino || "Não disponível"}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <p className="text-sm font-medium">Data da Viagem</p>
            </div>
            <p className="text-lg">{formatarDataHora(viagemInfo?.data)}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <p className="text-sm font-medium">Motorista</p>
            </div>
            <p className="text-lg">{viagemInfo?.motorista?.nome || "Não disponível"}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Truck className="h-4 w-4" />
              <p className="text-sm font-medium">Veículo</p>
            </div>
            <p className="text-lg">{viagemInfo?.veiculo?.modelo || "Não disponível"}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <p className="text-sm font-medium">Criado em</p>
            </div>
            <p className="text-lg">{formatarDataHora(viagemInfo?.createdAt)}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <p className="text-sm font-medium">Atualizado em</p>
            </div>
            <p className="text-lg">{formatarDataHora(viagemInfo?.updatedAt)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
