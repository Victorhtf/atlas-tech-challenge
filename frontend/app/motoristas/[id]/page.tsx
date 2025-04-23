import { motoristaService } from "@/services/api"
import MotoristaDetalhes from "@/components/motorista/MotoristaDetalhes"
import MotoristaListDetails from "./MotoristaListDetails"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
  params: {
    id: string
  }
}

export default async function MotoristaPage({ params }: Props) {
  const id = (await params)?.id

  const motorista = await motoristaService.getById(id)

  if (!motorista) {
    notFound()
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/motoristas">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Detalhes do Motorista</h1>
      </div>

      <MotoristaDetalhes motorista={motorista} />
      <MotoristaListDetails motoristaId={id} />
    </div>
  )
}

