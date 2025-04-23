import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Search, Trash2 } from "lucide-react"
import type { Viagem } from "@/services/api"

type TripListProps = {
  trips: Viagem[]
  onDelete: (id: string) => void
}

export default function TripList({ trips, onDelete }: TripListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [tripToDelete, setTripToDelete] = useState<string | null>(null)

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString)
    return date.toLocaleString("pt-BR")
  }

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

  const handleDelete = () => {
    if (tripToDelete) {
      onDelete(tripToDelete)
      setTripToDelete(null)
    }
  }

  const filteredTrips = trips.filter((trip) => {
    const motoristaNome = trip.motorista?.nome?.toLowerCase() || ""
    const veiculoInfo = trip.veiculo
      ? `${trip.veiculo.modelo} - ${trip.veiculo.placa}`.toLowerCase()
      : ""

    return (
      trip.origem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.destino.toLowerCase().includes(searchTerm.toLowerCase()) ||
      motoristaNome.includes(searchTerm.toLowerCase()) ||
      veiculoInfo.includes(searchTerm.toLowerCase()) ||
      (trip.status && trip.status.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar viagens..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredTrips.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {searchTerm ? "Nenhuma viagem encontrada" : "Nenhuma viagem cadastrada"}
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Origem</TableHead>
                <TableHead>Destino</TableHead>
                <TableHead>Partida</TableHead>
                <TableHead>Chegada</TableHead>
                <TableHead>Motorista</TableHead>
                <TableHead>Veículo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data de Criação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {filteredTrips.map((trip) => {
              if (!trip || !trip._id) return null;

              const motoristaNome = trip.motorista?.nome || "Motorista não informado"
              const motoristaId = trip.motorista?._id

              const veiculoInfo = trip.veiculo
                ? `${trip.veiculo.modelo} - ${trip.veiculo.placa}`
                : "Veículo não informado"
              const veiculoId = trip.veiculo?._id

                return (
                  <TableRow key={trip._id}>
                    <TableCell>{trip.origem}</TableCell>
                    <TableCell>{trip.destino}</TableCell>
                    <TableCell>{formatDateTime(trip.dataPartida)}</TableCell>
                    <TableCell>{formatDateTime(trip.previsaoChegada)}</TableCell>
                    <TableCell>
                      <Link href={`/motoristas/${motoristaId}`} className="text-orange-500 hover:text-orange-600">
                        {motoristaNome}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/veiculos/${veiculoId}`} className="text-orange-500 hover:text-orange-600">
                        {veiculoInfo}
                      </Link>
                    </TableCell>
                    <TableCell>{getStatusBadge(trip.status)}</TableCell>
                    <TableCell>{formatDateTime(trip.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setTripToDelete(trip._id!)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog
        open={!!tripToDelete}
        onOpenChange={(open) => !open && setTripToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta viagem? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
