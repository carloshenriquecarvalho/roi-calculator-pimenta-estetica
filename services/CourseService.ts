"use server"

import { courseRepository } from "../domains/course/repository";
import { Course } from "../domains/course/types";
import { AppError } from "../lib/errors";

export async function getAllCourses(): Promise<Course[]> {
  return courseRepository.getAll();
}

export async function getCourseById(id: string): Promise<Course> {
  const course = await courseRepository.getById(id);
  if (!course) throw new AppError("Curso não encontrado", 404);
  return course;
}

export async function getCourseBySlug(slug: string): Promise<Course> {
  const course = await courseRepository.getBySlug(slug);
  if (!course) throw new AppError("Curso não encontrado", 404);
  return course;
}

export async function createCourse(payload: Omit<Course, "id" | "createdAt" | "updatedAt">): Promise<Course> {
  if (!payload.title || !payload.slug) {
    throw new AppError("Título e Slug são obrigatórios");
  }
  const existing = await courseRepository.getBySlug(payload.slug);
  if (existing) {
    throw new AppError("Já existe um curso com este slug.");
  }
  return courseRepository.create(payload);
}

export async function updateCourse(id: string, payload: Partial<Omit<Course, "id" | "createdAt" | "updatedAt">>): Promise<Course> {
  await getCourseById(id);
  return courseRepository.update(id, payload);
}

export async function deleteCourse(id: string): Promise<void> {
  await getCourseById(id);
  return courseRepository.delete(id);
}

export async function updateCourseInstructors(courseId: string, instructorIds: string[]): Promise<void> {
  const current = await courseRepository.getInstructorsForCourse(courseId);
  
  // Remove deleted
  for (const ci of current) {
    if (!instructorIds.includes(ci.instructorId)) {
      await courseRepository.removeInstructorFromCourse(courseId, ci.instructorId);
    }
  }
  
  // Add new
  const currentIds = current.map(ci => ci.instructorId);
  for (const id of instructorIds) {
    if (!currentIds.includes(id)) {
      await courseRepository.addInstructorToCourse(courseId, id);
    }
  }
}
