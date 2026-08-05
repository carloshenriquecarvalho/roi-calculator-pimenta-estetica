"use server"

import { enrollmentRepository } from "../domains/enrollment/repository"
import { Enrollment } from "../domains/enrollment/types"
import { serverAuth } from "../domains/auth/server"
import { AppError } from "../lib/errors"

export async function enrollInCourse(courseId: string): Promise<Enrollment> {
  const user = await serverAuth.getUser()
  if (!user) throw new AppError("Não autenticado", 401)
  
  return enrollmentRepository.create(user.id, courseId)
}

export async function getMyEnrollments(): Promise<Enrollment[]> {
  const user = await serverAuth.getUser()
  if (!user) throw new AppError("Não autenticado", 401)

  return enrollmentRepository.getActiveByUserId(user.id)
}
