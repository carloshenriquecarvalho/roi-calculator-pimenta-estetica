"use server"

import { instructorRepository } from "../domains/instructor/repository";
import { Instructor } from "../domains/instructor/types";
import { AppError } from "../lib/errors";

export async function getAllInstructors(): Promise<Instructor[]> {
  return instructorRepository.getAll();
}

export async function getInstructorById(id: string): Promise<Instructor> {
  const instructor = await instructorRepository.getById(id);
  if (!instructor) {
    throw new AppError("Instrutor não encontrado", 404);
  }
  return instructor;
}

export async function createInstructor(payload: Omit<Instructor, "id" | "createdAt">): Promise<Instructor> {
  if (!payload.name || payload.name.trim() === "") {
    throw new AppError("Nome é obrigatório");
  }
  if (!payload.bio || payload.bio.trim() === "") {
    throw new AppError("Biografia é obrigatória");
  }
  return instructorRepository.create(payload);
}

export async function updateInstructor(id: string, payload: Partial<Omit<Instructor, "id" | "createdAt">>): Promise<Instructor> {
  await getInstructorById(id);
  return instructorRepository.update(id, payload);
}

export async function deleteInstructor(id: string): Promise<void> {
  await getInstructorById(id);
  return instructorRepository.delete(id);
}
