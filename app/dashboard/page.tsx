import * as React from "react"
import { BookOpen, Award, Clock, Flame } from "lucide-react"
import { StatCard } from "../../components/dashboard/stat-card"

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Olá 👋</h1>
        <p className="text-gray-400">Continue seus estudos e domine a alta tecnologia estética.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Matrículas Ativas"
          value={0}
          icon={BookOpen}
          description="Foco total!"
        />
        <StatCard
          title="Aulas Concluídas"
          value={0}
          icon={Award}
          description="Excelente progresso."
        />
        <StatCard
          title="Horas Estudadas"
          value="0h"
          icon={Clock}
          description="Nesta semana"
        />
        <StatCard
          title="Ofensiva"
          value="0 dias"
          icon={Flame}
          description="Estudando todos os dias"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <span className="w-1 h-6 bg-[#D4AF37] rounded-full"></span>
          Meus Cursos
        </h2>
        <p className="text-gray-400">Nenhum curso disponível no momento.</p>
      </div>
    </div>
  )
}
