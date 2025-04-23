"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Edit, Trash2, Search, Eye } from "lucide-react"
import Link from "next/link"
import type { Veiculo } from "@/services/api"
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

type VehicleListProps = {
  vehicles: Veiculo[]
  onDelete: (id: string) => void
}

export default function VehicleList({
  vehicles,
  onDelete,
}: VehicleListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [vehicleToDelete, setVehicleToDelete] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("pt-BR")
  }

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = () => {
    if (vehicleToDelete) {
      onDelete(vehicleToDelete)
      setVehicleToDelete(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar veículos..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredVehicles.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {searchTerm
            ? "Nenhum veículo encontrado"
            : "Nenhum veículo cadastrado"}
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Modelo</TableHead>
                <TableHead>Placa</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Capacidade (kg)</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles.map((vehicle) => (
                <TableRow key={vehicle._id}>
                  <TableCell className="font-medium">
                    <Link
                      href={`/veiculos/${vehicle._id}`}
                      className="hover:underline text-[#f85404]"
                    >
                      {vehicle.modelo}
                    </Link>
                  </TableCell>
                  <TableCell>{vehicle.placa}</TableCell>
                  <TableCell>{vehicle.tipo}</TableCell>
                  <TableCell>{vehicle.capacidade.toLocaleString()}</TableCell>
                  <TableCell>{formatDate(vehicle.createdAt)}</TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setVehicleToDelete(vehicle._id!)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog
        open={!!vehicleToDelete}
        onOpenChange={(open) => !open && setVehicleToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este veículo? Esta ação não pode
              ser desfeita.
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
