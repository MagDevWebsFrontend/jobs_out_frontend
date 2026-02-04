import type { Municipio } from '#shared/types/structures'

export const useMunicipios = () => {
  const municipios = ref<Municipio[]>([])

  const fetchMunicipios = async () => {
    const res = await $fetch<any>('http://localhost:4000/api/municipios')
    municipios.value = res.data
  }

  const createMunicipio = (payload: { nombre: string; provincia_id: string }) =>
    $fetch('http://localhost:4000/api/municipios', {
      method: 'POST',
      body: payload
    })

  const updateMunicipio = (id: string, payload: { nombre: string }) =>
    $fetch(`http://localhost:4000/api/municipios/${id}`, {
      method: 'PUT',
      body: payload
    })

  const deleteMunicipio = (id: string) =>
    $fetch(`http://localhost:4000/api/municipios/${id}`, {
      method: 'DELETE'
    })

  return {
    municipios,
    fetchMunicipios,
    createMunicipio,
    updateMunicipio,
    deleteMunicipio
  }
}
