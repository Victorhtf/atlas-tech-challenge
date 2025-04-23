"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Motorista } from "@/services/api"
import DriverForm from "./driver-form"

type DriverModalProps = {
  open: boolean
  initialData?: Motorista
  onClose: () => void
  onSave: (data: Motorista) => void
}

export default function DriverModal({ open, onClose, initialData, onSave }: DriverModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Editar Motorista" : "Novo Motorista"}</DialogTitle>
        </DialogHeader>

        <DriverForm
          initialData={initialData}
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
