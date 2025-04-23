import { veiculoService } from "@/services/api"
import VeiculoDetalhes from "@/components/veiculo/VeiculoDetalhes"

interface Props {
  params: { id: string }
}

export default async function VehiclePage({ params }: Props) {
  const veiculo = await veiculoService.getById(params.id)

  return <VeiculoDetalhes veiculo={veiculo} />
}