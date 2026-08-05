import { createClient } from "../lib/supabase/client"

export type BucketName = "avatars" | "course-thumbnails" | "course-banners" | "lesson-videos" | "lesson-files"

export const StorageService = {
  /**
   * Faz upload de um arquivo para o Supabase Storage.
   * Executado preferencialmente no client para evitar sobrecarga do servidor Node.
   */
  async uploadFile(bucket: BucketName, file: File, path?: string): Promise<string> {
    const supabase = createClient()
    
    // Create a unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
    const filePath = path ? `${path}/${fileName}` : fileName

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      throw new Error(`Erro no upload: ${error.message}`)
    }

    // Retorna a URL pública
    const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(data.path)
    return publicData.publicUrl
  },

  /**
   * Remove um arquivo do storage a partir de sua URL ou path interno.
   */
  async deleteFile(bucket: BucketName, fileUrlOrPath: string): Promise<void> {
    const supabase = createClient()
    
    // Extract path from URL if a full URL was provided
    let path = fileUrlOrPath
    if (fileUrlOrPath.startsWith('http')) {
      const urlParts = fileUrlOrPath.split(`/${bucket}/`)
      if (urlParts.length > 1) {
        path = urlParts[1]
      }
    }

    const { error } = await supabase.storage.from(bucket).remove([path])
    if (error) {
      throw new Error(`Erro ao deletar arquivo: ${error.message}`)
    }
  }
}
