import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Car, MapPin, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Atlas - Plataforma de Gerenciamento de Viagens</h1>
          <p className="text-xl text-gray-600 mb-8">
            Gerencie motoristas, veículos e viagens de forma simples e eficiente
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-[#f85404] hover:bg-[#e04a00]">
              <Link href="/motoristas">Gerenciar Motoristas</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-[#f85404] text-[#f85404] hover:bg-[#fff8f5]">
              <Link href="/viagens">Ver Viagens</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white rounded-lg shadow-sm">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Funcionalidades</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <Users className="w-12 h-12 mx-auto text-[#f85404]" />
                <CardTitle>Motoristas</CardTitle>
                <CardDescription>Cadastre e gerencie motoristas</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button asChild variant="outline" className="mt-4">
                  <Link href="/motoristas">Acessar</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Car className="w-12 h-12 mx-auto text-[#f85404]" />
                <CardTitle>Veículos</CardTitle>
                <CardDescription>Cadastre e gerencie veículos</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button asChild variant="outline" className="mt-4">
                  <Link href="/veiculos">Acessar</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <MapPin className="w-12 h-12 mx-auto text-[#f85404]" />
                <CardTitle>Viagens</CardTitle>
                <CardDescription>Crie e acompanhe viagens</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button asChild variant="outline" className="mt-4">
                  <Link href="/viagens">Acessar</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
