"use client"

import { Veiculo } from "@/services/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Truck, Hash, Clock } from "lucide-react"
import Link from "next/link"

interface VeiculoDetalhesProps {
  veiculo: Veiculo
}

export default function VeiculoDetalhes({ veiculo }: VeiculoDetalhesProps) {
  const veiculoInfo = Array.isArray(veiculo) ? veiculo[0] : veiculo

  const formatarDataHora = (data: string): string => {
    if (!data) return "Não disponível"
    return new Date(data).toLocaleString("pt-BR")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/veiculos">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Detalhes do Veículo</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Veículo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Modelo</p>
              <p className="text-lg">{veiculoInfo.modelo}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Placa</p>
              <p className="text-lg">{veiculoInfo.placa}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tipo</p>
              <p className="text-lg">{veiculoInfo.tipo}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Capacidade</p>
              <p className="text-lg">{veiculoInfo.capacidade}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">ID</p>
              <p className="text-lg">{veiculoInfo._id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Criado em</p>
              <p className="text-lg">{formatarDataHora(veiculoInfo.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Atualizado em</p>
              <p className="text-lg">{formatarDataHora(veiculoInfo.updatedAt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
