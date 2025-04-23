"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Loader2 } from 'lucide-react'
import { useNotification } from "@/context/notification-context"
import { veiculoService, type Veiculo } from "@/services/api"
import VehicleModal from "./vehicle-modal"
import VehicleList from "./vehicle-list"

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Veiculo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState<Veiculo | null>(null)
  const { showNotification } = useNotification()

  useEffect(() => {
    loadVehicles()
  }, [])

  const loadVehicles = async () => {
    try {
      setIsLoading(true)
      const data = await veiculoService.getAll()
      setVehicles(data)
    } catch (error) {
      console.error("Erro ao carregar veículos:", error)
      showNotification("Erro ao carregar veículos", "error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveVehicle = async (vehicleData: Veiculo) => {
    try {
      if (editingVehicle?._id) {
        await veiculoService.update(editingVehicle._id, vehicleData)
        showNotification("Veículo atualizado com sucesso!", "success")
      } else {
        await veiculoService.create(vehicleData)
        showNotification("Veículo cadastrado com sucesso!", "success")
      }

      setIsFormOpen(false)
      setEditingVehicle(null)
      loadVehicles()
    } catch (error) {
      console.error("Erro ao salvar veículo:", error)
      showNotification("Erro ao salvar veículo", "error")
    }
  }

  const handleEditVehicle = (vehicle: Veiculo) => {
    setEditingVehicle(vehicle)
    setIsFormOpen(true)
  }

  const handleDeleteVehicle = async (id: string) => {
    try {
      await veiculoService.delete(id)
      showNotification("Veículo removido com sucesso!", "success")
      loadVehicles()
    } catch (error) {
      console.error("Erro ao remover veículo:", error)
      showNotification("Erro ao remover veículo", "error")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Veículos</h1>
        <Button
          onClick={() => {
            setEditingVehicle(null)
            setIsFormOpen(true)
          }}
          className="bg-[#f85404] hover:bg-[#e04a00]"
        >
          <Plus className="mr-2 h-4 w-4" /> Novo Veículo
        </Button>
      </div>

      <VehicleModal
        open={isFormOpen}
        initialData={editingVehicle || undefined}
        onClose={() => {
          setIsFormOpen(false)
          setEditingVehicle(null)
        }}
        onSave={handleSaveVehicle}
      />

      <Card>
        <CardHeader>
          <CardTitle>Lista de Veículos</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-[#f85404]" />
            </div>
          ) : (
            <VehicleList
              vehicles={vehicles}
              onDelete={handleDeleteVehicle}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
