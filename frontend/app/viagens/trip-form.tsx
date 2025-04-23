import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Viagem, Motorista, Veiculo } from "@/services/api"

type TripFormProps = {
  initialData?: Viagem
  drivers: Motorista[]
  vehicles: Veiculo[]
  onSave: (data: Viagem) => void
  onCancel: () => void
}

export default function TripForm({
  initialData,
  drivers,
  vehicles,
  onSave,
  onCancel,
}: TripFormProps) {
  const [tripData, setTripData] = useState<Viagem>({
    origem: "",
    destino: "",
    dataPartida: "",
    previsaoChegada: "",
    motorista: "",
    veiculo: "",
  })

  useEffect(() => {
    if (initialData) {
      setTripData({
        origem: initialData.origem,
        destino: initialData.destino,
        dataPartida: initialData.dataPartida,
        previsaoChegada: initialData.previsaoChegada,
        motorista: initialData.motorista._id,
        veiculo: initialData.veiculo._id,
      })
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setTripData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setTripData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const isValidDate = (date: any) => {
    return date && !isNaN(new Date(date).getTime())
  }

  const handleSave = () => {
    const { origem, destino, dataPartida, previsaoChegada, motorista, veiculo } = tripData

    if (!isValidDate(dataPartida) || !isValidDate(previsaoChegada)) {
      alert("Data de partida ou previsão de chegada inválida")
      return
    }

    const viagemPayload = {
      origem,
      destino,
      dataPartida: new Date(dataPartida).toISOString(),
      previsaoChegada: new Date(previsaoChegada).toISOString(),
      motorista,
      veiculo,
    }

    onSave(viagemPayload)
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="origem" className="block text-sm font-medium text-gray-700">
          Origem
        </label>
        <Input
          type="text"
          name="origem"
          id="origem"
          value={tripData.origem}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="destino" className="block text-sm font-medium text-gray-700">
          Destino
        </label>
        <Input
          type="text"
          name="destino"
          id="destino"
          value={tripData.destino}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="dataPartida" className="block text-sm font-medium text-gray-700">
          Data de Partida
        </label>
        <Input
          type="datetime-local"
          name="dataPartida"
          id="dataPartida"
          value={tripData.dataPartida}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="previsaoChegada" className="block text-sm font-medium text-gray-700">
          Previsão de Chegada
        </label>
        <Input
          type="datetime-local"
          name="previsaoChegada"
          id="previsaoChegada"
          value={tripData.previsaoChegada}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="motorista" className="block text-sm font-medium text-gray-700">
          Motorista
        </label>
        <Select
          name="motorista"
          id="motorista"
          value={tripData.motorista}
          onValueChange={(value) => handleSelectChange("motorista", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o motorista" />
          </SelectTrigger>
          <SelectContent>
            {drivers.map((driver) => (
              <SelectItem key={driver._id} value={driver._id}>
                {driver.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="veiculo" className="block text-sm font-medium text-gray-700">
          Veículo
        </label>
        <Select
          name="veiculo"
          id="veiculo"
          value={tripData.veiculo}
          onValueChange={(value) => handleSelectChange("veiculo", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o veículo" />
          </SelectTrigger>
          <SelectContent>
            {vehicles.map((vehicle) => (
              <SelectItem key={vehicle._id} value={vehicle._id}>
                {vehicle.modelo}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={handleSave} className="bg-[#f85404] hover:bg-[#e04a00]">
          Salvar
        </Button>
      </div>
    </div>
  )
}
