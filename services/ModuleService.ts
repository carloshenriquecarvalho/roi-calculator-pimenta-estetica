"use server"

import { moduleRepository } from "../domains/module/repository";
import { Module } from "../domains/module/types";
import { AppError } from "../lib/errors";

export async function getModulesByCourseId(courseId: string): Promise<Module[]> {
  return moduleRepository.getByCourseId(courseId);
}

export async function getModuleById(id: string): Promise<Module> {
  const moduleData = await moduleRepository.getById(id);
  if (!moduleData) throw new AppError("Módulo não encontrado", 404);
  return moduleData;
}

export async function createModule(payload: Omit<Module, "id" | "createdAt" | "updatedAt">): Promise<Module> {
  if (!payload.title || payload.title.trim() === "") {
    throw new AppError("Título do módulo é obrigatório");
  }
  return moduleRepository.create(payload);
}

export async function updateModule(id: string, payload: Partial<Omit<Module, "id" | "courseId" | "createdAt" | "updatedAt">>): Promise<Module> {
  await getModuleById(id);
  return moduleRepository.update(id, payload);
}

export async function deleteModule(id: string): Promise<void> {
  await getModuleById(id);
  return moduleRepository.delete(id);
}
