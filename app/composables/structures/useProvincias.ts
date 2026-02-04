import type { Provincia } from '#shared/types/structures'

export const useProvincias = () => {
  const provincias = ref<Provincia[]>([])
  const loading = ref(false)

  const fetchProvincias = async () => {
    loading.value = true
    const res = await $fetch<any>('http://localhost:4000/api/provincias')
    provincias.value = res.data
    loading.value = false
  }

  const createProvincia = (payload: { nombre: string }) =>
    $fetch('http://localhost:4000/api/provincias', {
      method: 'POST',
      body: payload
    })

  const updateProvincia = (id: string, payload: { nombre: string }) =>
    $fetch(`http://localhost:4000/api/provincias/${id}`, {
      method: 'PUT',
      body: payload
    })

  const deleteProvincia = (id: string) =>
    $fetch(`http://localhost:4000/api/provincias/${id}`, {
      method: 'DELETE'
    })

  return {
    provincias,
    loading,
    fetchProvincias,
    createProvincia,
    updateProvincia,
    deleteProvincia
  }
}
