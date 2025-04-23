"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Loader2 } from "lucide-react"
import { useNotification } from "@/context/notification-context"
import {
  viagemService,
  motoristaService,
  veiculoService,
  type Motorista,
  type Veiculo,
  type Viagem,
} from "@/services/api"
import TripModal from "./trip-modal"
import TripList from "./trip-list"

export default function TripsPage() {
  const [trips, setTrips] = useState<Viagem[]>([])
  const [drivers, setDrivers] = useState<Motorista[]>([])
  const [vehicles, setVehicles] = useState<Veiculo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTrip, setEditingTrip] = useState<Viagem | null>(null)
  const { showNotification } = useNotification()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setIsLoading(true)
      const [tripsData, driversData, vehiclesData] = await Promise.all([
        viagemService.getAll(),
        motoristaService.getAll(),
        veiculoService.getAll(),
      ])

      setTrips(tripsData)
      setDrivers(driversData)
      setVehicles(vehiclesData)
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
      showNotification("Erro ao carregar dados", "error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveTrip = async (tripData: Viagem) => {
    try {
      if (editingTrip?._id) {
        await viagemService.update(editingTrip._id, tripData)
        showNotification("Viagem atualizada com sucesso!", "success")
      } else {
        await viagemService.create(tripData)
        showNotification("Viagem cadastrada com sucesso!", "success")
      }

      setIsFormOpen(false)
      setEditingTrip(null)

      loadData()
    } catch (error) {
      console.error("Erro ao salvar viagem:", error)
      showNotification("Erro ao salvar viagem", "error")
    }
  }

  const handleDeleteTrip = async (id: string) => {
    try {
      await viagemService.delete(id)
      showNotification("Viagem removida com sucesso!", "success")
      loadData()
    } catch (error) {
      console.error("Erro ao remover viagem:", error)
      showNotification("Erro ao remover viagem", "error")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Viagens</h1>
        <Button
          onClick={() => {
            setEditingTrip(null)
            setIsFormOpen(true)
          }}
          className="bg-[#f85404] hover:bg-[#e04a00]"
          disabled={drivers.length === 0 || vehicles.length === 0}
        >
          <Plus className="mr-2 h-4 w-4" /> Nova Viagem
        </Button>
      </div>

      <TripModal
        open={isFormOpen}
        initialData={editingTrip || undefined}
        drivers={drivers}
        vehicles={vehicles}
        onClose={() => {
          setIsFormOpen(false)
          setEditingTrip(null)
        }}
        onSave={handleSaveTrip}
      />

      <Card>
        <CardHeader>
          <CardTitle>Lista de Viagens</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-[#f85404]" />
            </div>
          ) : (
            <TripList
              trips={trips}
              onDelete={handleDeleteTrip}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
