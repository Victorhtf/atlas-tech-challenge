"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Veiculo } from "@/services/api"
import VehicleForm from "./vehicle-form"

type VehicleModalProps = {
  open: boolean
  initialData?: Veiculo
  onClose: () => void
  onSave?: (data: Veiculo) => void
}

export default function VehicleModal({ open, onClose, initialData, onSave }: VehicleModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Editar Veículo" : "Novo Veículo"}</DialogTitle>
        </DialogHeader>

        <VehicleForm
          initialData={initialData}
          onCancel={onClose}
          onSave={(data) => {
            onSave(data)
            onClose()
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
