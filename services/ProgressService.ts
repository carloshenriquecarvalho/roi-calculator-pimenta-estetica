"use server"

import { progressRepository } from "../domains/progress/repository"
import { LessonProgress } from "../domains/progress/types"
import { serverAuth } from "../domains/auth/server"
import { AppError } from "../lib/errors"

export async function toggleLessonCompletion(lessonId: string, currentStatus: boolean): Promise<LessonProgress> {
  const user = await serverAuth.getUser()
  if (!user) throw new AppError("Não autenticado", 401)

  return progressRepository.upsertProgress(user.id, lessonId, !currentStatus)
}

// DB does not support last_position_seconds — this function is a no-op for now
// When the column is added to the schema, simply restore the upsertProgress call with the 4th arg
export async function updateLessonPosition(_lessonId: string, _seconds: number): Promise<void> {
  // no-op: lesson_progress table does not have a last_position_seconds column yet
}
