import { defineStore } from 'pinia'
import type { Publicacion } from '#shared/types/publicaciones'

export const useGuardadosStore = defineStore('guardados', () => {
  const api = useApi()

  const guardados = ref<Publicacion[]>([])
  const loading = ref(false)

  async function obtenerGuardados() {
    loading.value = true
    const res: any = await api('/api/guardados?limit=50&offset=0')
    guardados.value = res.data.guardados.map((g: any) => g.publicacion)
    console.log(guardados.value)
    loading.value = false
  }

  async function eliminarGuardado(publicacionId: string) {
    await api(`/api/guardados/${publicacionId}`, { method: 'DELETE' })
    guardados.value = guardados.value.filter(p => p.id !== publicacionId)
  }

  return {
    guardados,
    loading,
    obtenerGuardados,
    eliminarGuardado
  }
})
