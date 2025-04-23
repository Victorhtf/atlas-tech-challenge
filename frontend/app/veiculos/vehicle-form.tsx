"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { z } from "zod"
import type { Veiculo } from "@/services/api"

const veiculoSchema = z.object({
  placa: z
    .string()
    .regex(/^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}$/, "Placa inválida"),
  modelo: z.string().min(2, "Modelo deve ter pelo menos 2 caracteres"),
  tipo: z.enum(['Caminhão', 'Van', 'Ônibus', 'Carro', 'Motocicleta', 'Caminhonete', 'Outro']),
  capacidade: z
    .number({ invalid_type_error: "Capacidade deve ser um número" })
    .min(1, "Capacidade deve ser no mínimo 1"),
})

type VehicleFormProps = {
  initialData?: Veiculo
  onSave: (data: Veiculo) => void
  onCancel: () => void
}

export default function VehicleForm({ initialData, onSave, onCancel }: VehicleFormProps) {
  const [formData, setFormData] = useState<Veiculo>({
    placa: initialData?.placa || "",
    modelo: initialData?.modelo || "",
    tipo: initialData?.tipo || "Carro",
    capacidade: initialData?.capacidade || 1,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "capacidade" ? Number(value) : value,
    }))

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleTipoChange = (value: string) => {
    setFormData((prev) => ({ ...prev, tipo: value }))
    if (errors["tipo"]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors["tipo"]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      veiculoSchema.parse(formData)
      await onSave(formData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          const path = err.path.join(".")
          if (path) {
            newErrors[path] = err.message
          }
        })
        setErrors(newErrors)
      } else {
        console.error("Erro ao enviar formulário:", error)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="placa">Placa</Label>
          <Input
            id="placa"
            name="placa"
            value={formData.placa}
            onChange={handleChange}
            placeholder="ABC1D23"
            className={errors["placa"] ? "border-red-500" : ""}
          />
          {errors["placa"] && <p className="text-sm text-red-500">{errors["placa"]}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="modelo">Modelo</Label>
          <Input
            id="modelo"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            placeholder="Modelo do veículo"
            className={errors["modelo"] ? "border-red-500" : ""}
          />
          {errors["modelo"] && <p className="text-sm text-red-500">{errors["modelo"]}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tipo">Tipo</Label>
          <Select value={formData.tipo} onValueChange={handleTipoChange}>
            <SelectTrigger className={errors["tipo"] ? "border-red-500" : ""}>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              {["Caminhão", "Van", "Ônibus", "Carro", "Motocicleta", "Caminhonete", "Outro"].map((tipo) => (
                <SelectItem key={tipo} value={tipo}>
                  {tipo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors["tipo"] && <p className="text-sm text-red-500">{errors["tipo"]}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="capacidade">Capacidade</Label>
          <Input
            id="capacidade"
            name="capacidade"
            type="number"
            value={formData.capacidade}
            onChange={handleChange}
            placeholder="Ex: 30"
            className={errors["capacidade"] ? "border-red-500" : ""}
          />
          {errors["capacidade"] && <p className="text-sm text-red-500">{errors["capacidade"]}</p>}
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-[#f85404] hover:bg-[#e04a00]">
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  )
}
