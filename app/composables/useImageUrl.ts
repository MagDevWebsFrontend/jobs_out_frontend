export const useImageUrl = () => {
  const config = useRuntimeConfig()

  const getImageUrl = (path?: string | null) => {
    if (!path) return null

    // Ya es absoluta
    if (path.startsWith('http')) {
      return path
    }

    // Construir absoluta
    return `${config.public.apiBaseUrl}${path}`
  }

  return { getImageUrl }
}