"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import type { Motorista } from "@/services/api"

const motoristaSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  cpf: z.string().length(11, "CPF deve ter 11 dígitos"),
  cnh: z.object({
    numero: z.string().min(5, "Número da CNH deve ter pelo menos 5 caracteres"),
    validade: z.string().min(10, "Data de validade é obrigatória"),
  }),
})

type DriverFormProps = {
  initialData?: Motorista
  onSave: (data: Motorista) => void
  onCancel: () => void
}

export default function DriverForm({ initialData, onSave, onCancel }: DriverFormProps) {
  const [formData, setFormData] = useState<Motorista>({
    nome: initialData?.nome || "",
    cpf: initialData?.cpf || "",
    cnh: {
      numero: initialData?.cnh?.numero || "",
      validade: initialData?.cnh?.validade?.substring(0, 10) || "",
    },
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      motoristaSchema.parse(formData)
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
          <Label htmlFor="nome">Nome</Label>
          <Input
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Nome completo"
            className={errors["nome"] ? "border-red-500" : ""}
          />
          {errors["nome"] && <p className="text-sm text-red-500">{errors["nome"]}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cpf">CPF</Label>
          <Input
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            placeholder="12345678901"
            className={errors["cpf"] ? "border-red-500" : ""}
          />
          {errors["cpf"] && <p className="text-sm text-red-500">{errors["cpf"]}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cnh.numero">Número da CNH</Label>
          <Input
            id="cnh.numero"
            name="cnh.numero"
            value={formData.cnh.numero}
            onChange={handleChange}
            placeholder="Número da CNH"
            className={errors["cnh.numero"] ? "border-red-500" : ""}
          />
          {errors["cnh.numero"] && <p className="text-sm text-red-500">{errors["cnh.numero"]}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cnh.validade">Validade da CNH</Label>
          <Input
            id="cnh.validade"
            name="cnh.validade"
            type="date"
            value={formData.cnh.validade}
            onChange={handleChange}
            className={errors["cnh.validade"] ? "border-red-500" : ""}
          />
          {errors["cnh.validade"] && <p className="text-sm text-red-500">{errors["cnh.validade"]}</p>}
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
