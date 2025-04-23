"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useNotification } from "@/context/notification-context"
import { motoristaService, type Motorista } from "@/services/api"
import DriverForm from "./driver-form"
import DriverList from "./driver-list"

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Motorista[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingDriver, setEditingDriver] = useState<Motorista | null>(null)
  const { showNotification } = useNotification()

  useEffect(() => {
    loadDrivers()
  }, [])

  const loadDrivers = async () => {
    try {
      setIsLoading(true)
      const data = await motoristaService.getAll()
      setDrivers(data)
    } catch (error) {
      console.error("Erro ao carregar motoristas:", error)
      showNotification("Erro ao carregar motoristas", "error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveDriver = async (driverData: Motorista) => {
    try {
      if (editingDriver?._id) {
        await motoristaService.update(editingDriver._id, driverData)
        showNotification("Motorista atualizado com sucesso!", "success")
      } else {
        await motoristaService.create(driverData)
        showNotification("Motorista cadastrado com sucesso!", "success")
      }

      setIsFormOpen(false)
      setEditingDriver(null)
      loadDrivers()
    } catch (error) {
      console.error("Erro ao salvar motorista:", error)
      showNotification("Erro ao salvar motorista", "error")
    }
  }

  const handleDeleteDriver = async (id: string) => {
    try {
      await motoristaService.delete(id)
      showNotification("Motorista removido com sucesso!", "success")
      loadDrivers()
    } catch (error) {
      console.error("Erro ao remover motorista:", error)
      showNotification("Erro ao remover motorista", "error")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Motoristas</h1>
        <Button
          onClick={() => {
            setEditingDriver(null)
            setIsFormOpen(true)
          }}
          className="bg-[#f85404] hover:bg-[#e04a00]"
        >
          <Plus className="mr-2 h-4 w-4" /> Novo Motorista
        </Button>
      </div>

      <Dialog open={isFormOpen} onOpenChange={(open) => {
        setIsFormOpen(open)
        if (!open) setEditingDriver(null)
      }}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{editingDriver ? "Editar Motorista" : "Novo Motorista"}</DialogTitle>
          </DialogHeader>
          <DriverForm
            initialData={editingDriver || undefined}
            onSave={handleSaveDriver}
            onCancel={() => {
              setIsFormOpen(false)
              setEditingDriver(null)
            }}
          />
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Motoristas</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-[#f85404]" />
            </div>
          ) : (
            <DriverList
              drivers={drivers}
              onDelete={handleDeleteDriver}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
