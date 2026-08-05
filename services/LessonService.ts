"use server"

import { lessonRepository } from "../domains/lesson/repository";
import { Lesson, LessonFile } from "../domains/lesson/types";
import { AppError } from "../lib/errors";

export async function getLessonsByModuleId(moduleId: string): Promise<Lesson[]> {
  return lessonRepository.getByModuleId(moduleId);
}

export async function getLessonById(id: string): Promise<Lesson> {
  const lesson = await lessonRepository.getById(id);
  if (!lesson) throw new AppError("Aula não encontrada", 404);
  return lesson;
}

export async function createLesson(payload: {
  moduleId: string;
  title: string;
  description?: string;
  videoUrl?: string;
  durationInSeconds?: number;
  orderIndex: number;
  isPreview?: boolean;
}): Promise<Lesson> {
  if (!payload.title || payload.title.trim() === "") {
    throw new AppError("Título da aula é obrigatório");
  }
  return lessonRepository.create(payload);
}

export async function updateLesson(id: string, payload: {
  title?: string;
  description?: string;
  videoUrl?: string;
  durationInSeconds?: number;
  orderIndex?: number;
  isPreview?: boolean;
}): Promise<Lesson> {
  await getLessonById(id);
  return lessonRepository.update(id, payload);
}

export async function deleteLesson(id: string): Promise<void> {
  await getLessonById(id);
  return lessonRepository.delete(id);
}

export async function getLessonFiles(lessonId: string): Promise<LessonFile[]> {
  return lessonRepository.getFilesByLessonId(lessonId);
}

export async function addLessonFile(lessonId: string, name: string, url: string, fileType: string): Promise<LessonFile> {
  await getLessonById(lessonId);
  return lessonRepository.addFile(lessonId, name, url, fileType);
}

export async function deleteLessonFile(fileId: string): Promise<void> {
  return lessonRepository.deleteFile(fileId);
}
