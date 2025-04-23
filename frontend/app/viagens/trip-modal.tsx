"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Motorista, Veiculo, Viagem } from "@/services/api"
import TripForm from "./trip-form"

type TripModalProps = {
  open: boolean
  initialData?: Viagem
  drivers: Motorista[]
  vehicles: Veiculo[]
  onClose: () => void
  onSave: (data: Viagem) => void
}

export default function TripModal({
  open,
  initialData,
  drivers,
  vehicles,
  onClose,
  onSave,
}: TripModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Editar Viagem" : "Nova Viagem"}</DialogTitle>
        </DialogHeader>

        <TripForm
          initialData={initialData}
          drivers={drivers}
          vehicles={vehicles}
          onSave={(data) => {
            onSave(data)
            onClose()
          }}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  )
}
