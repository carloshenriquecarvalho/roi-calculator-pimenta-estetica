import * as React from "react"
import { BookOpen, Award, Clock, Flame } from "lucide-react"

import { serverAuth } from "../../domains/auth/server"
import { courseRepository } from "../../domains/course/repository"
import { enrollmentRepository } from "../../domains/enrollment/repository"
import { progressRepository } from "../../domains/progress/repository"
import { moduleRepository } from "../../domains/module/repository"
import { lessonRepository } from "../../domains/lesson/repository"
import { StatCard } from "../../components/dashboard/stat-card"
import { CourseCard } from "../../domains/course/components/course-card"

export default async function DashboardPage() {
  const user = await serverAuth.getUser()
  
  if (!user) {
    return <div className="p-8 text-white">Carregando...</div>
  }

  // Use repositories
  const activeEnrollments = await enrollmentRepository.getActiveByUserId(user.id)
  const allCourses = await courseRepository.getAll()
  const enrolledCourses = allCourses.filter(c => activeEnrollments.some(e => e.courseId === c.id))

  const userProgress = await progressRepository.getByUserId(user.id)
  const completedLessons = userProgress.filter(p => p.completed).length

  // Calculate real course progress
  const ongoingCourses = []
  for (const course of enrolledCourses) {
    const modules = await moduleRepository.getByCourseId(course.id)
    let totalLessonsCount = 0
    let completedLessonsCount = 0

    for (const m of modules) {
      const lessons = await lessonRepository.getByModuleId(m.id)
      totalLessonsCount += lessons.length
      
      const completedInModule = lessons.filter(l => 
        userProgress.some(p => p.lessonId === l.id && p.completed)
      ).length
      
      completedLessonsCount += completedInModule
    }

    const calculatedProgress = totalLessonsCount === 0 ? 0 : Math.round((completedLessonsCount / totalLessonsCount) * 100)
    
    if (calculatedProgress > 0 && calculatedProgress < 100) {
      ongoingCourses.push({ ...course, calculatedProgress })
    } else if (calculatedProgress === 0) {
      // Show as 0 progress but enrolled
      ongoingCourses.push({ ...course, calculatedProgress: 0 })
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Olá, {user.name.split(" ")[0]} 👋</h1>
        <p className="text-gray-400">Continue seus estudos e domine a alta tecnologia estética.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Matrículas Ativas" 
          value={activeEnrollments.length} 
          icon={BookOpen} 
          description="Foco total!" 
        />
        <StatCard 
          title="Aulas Concluídas" 
          value={completedLessons} 
          icon={Award} 
          description="Excelente progresso." 
        />
        <StatCard 
          title="Horas Estudadas" 
          value="15h" 
          icon={Clock} 
          description="Nesta semana" 
        />
        <StatCard 
          title="Ofensiva" 
          value="5 dias" 
          icon={Flame} 
          description="Estudando todos os dias" 
        />
      </div>

      {ongoingCourses.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <span className="w-1 h-6 bg-[#D4AF37] rounded-full"></span>
            Continue Assistindo
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ongoingCourses.map((course) => (
              <CourseCard key={course.id} course={course} progress={course.calculatedProgress} />
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <span className="w-1 h-6 bg-[#D4AF37] rounded-full"></span>
          Meus Cursos
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {enrolledCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  )
}
