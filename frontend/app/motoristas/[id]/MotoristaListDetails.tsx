import Link from "next/link"
import { viagemService } from "@/services/api"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Props = {
  motoristaId: string
}

export default async function MotoristaListDetails({ motoristaId }: Props) {
  const viagens = await viagemService.getByMotorista(motoristaId)

  const formatDate = (date: string) => new Date(date).toLocaleString("pt-BR")

  const getStatusBadge = (status: string = "Pendente") => {
    const statusConfig = {
      Planejada: { label: "Planejada", className: "bg-yellow-500 hover:bg-yellow-600" },
      "Em andamento": { label: "Em andamento", className: "bg-blue-500 hover:bg-blue-600" },
      Concluída: { label: "Concluída", className: "bg-green-500 hover:bg-green-600" },
      Cancelada: { label: "Cancelada", className: "bg-red-500 hover:bg-red-600" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] ?? {
      label: status,
      className: "bg-muted text-foreground",
    }

    return <Badge className={config.className}>{config.label}</Badge>
  }

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-2xl font-semibold">Viagens do Motorista</h2>

      {viagens.length === 0 ? (
        <p className="text-muted-foreground">Nenhuma viagem encontrada para este motorista.</p>
      ) : (
        <div className="bg-white border rounded-md shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Origem</TableHead>
                <TableHead>Destino</TableHead>
                <TableHead>Partida</TableHead>
                <TableHead>Chegada</TableHead>
                <TableHead>Veículo</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {viagens.map((viagem) => {
                const veiculo = viagem.veiculo
                  ? `${viagem.veiculo.modelo} - ${viagem.veiculo.placa}`
                  : "Não informado"
                const veiculoId = viagem.veiculo?._id

                return (
                  <TableRow key={viagem._id}>
                    <TableCell>{viagem.origem}</TableCell>
                    <TableCell>{viagem.destino}</TableCell>
                    <TableCell>{formatDate(viagem.dataPartida)}</TableCell>
                    <TableCell>{formatDate(viagem.previsaoChegada)}</TableCell>
                    <TableCell>
                      {veiculoId ? (
                        <Link href={`/veiculos/${veiculoId}`} className="text-orange-500 hover:text-orange-600">
                          {veiculo}
                        </Link>
                      ) : (
                        veiculo
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(viagem.status)}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
