"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import type { Motorista } from "@/services/api"

type DriverListProps = {
  drivers: Motorista[]
  onDelete: (id: string) => void
}

export default function DriverList({ drivers, onDelete }: DriverListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [driverToDelete, setDriverToDelete] = useState<string | null>(null)

  const formatCPF = (cpf: string) => {
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("pt-BR")
  }

  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.cpf.includes(searchTerm) ||
      driver.cnh.numero.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const confirmDelete = (id: string) => {
    setDriverToDelete(id)
  }

  const handleDelete = () => {
    if (driverToDelete) {
      onDelete(driverToDelete)
      setDriverToDelete(null)
    }
  }

  const isCnhExpired = (validityDate: string): boolean => {
    const today = new Date()
    const validity = new Date(validityDate)
    return validity < today
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar motoristas..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredDrivers.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {searchTerm ? "Nenhum motorista encontrado" : "Nenhum motorista cadastrado"}
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>CNH</TableHead>
                <TableHead>Validade</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDrivers.map((driver) => (
                <TableRow key={driver._id}>
                  <TableCell className="font-medium">
                    <Link href={`/motoristas/${driver._id}`} className="hover:underline text-[#f85404]">
                      {driver.nome}
                    </Link>
                  </TableCell>
                  <TableCell>{formatCPF(driver.cpf)}</TableCell>
                  <TableCell>{driver.cnh.numero}</TableCell>
                  <TableCell>
                    <span className={isCnhExpired(driver.cnh.validade) ? "text-red-500" : "text-green-500"}>
                      {new Date(driver.cnh.validade).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(driver.createdAt)}</TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setDriverToDelete(driver._id!)}
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

      <AlertDialog open={!!driverToDelete} onOpenChange={(open) => !open && setDriverToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este motorista? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
