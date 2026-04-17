import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import LocationSelector from '../../app/components/forms/LocationSelector.vue'

// MOCK useApi
const apiMock = vi.fn()
vi.mock('~/composables/useApi', () => ({
  useApi: () => apiMock
}))

describe('LocationSelector', () => {
  beforeEach(() => {
    apiMock.mockReset()

    apiMock.mockImplementation((url: string) => {
      if (url === '/api/provincias') {
        return Promise.resolve({
          data: [{ id: 'prov-1', nombre: 'La Habana' }]
        })
      }

      if (url.startsWith('/api/municipios')) {
        return Promise.resolve({
          data: [
            { id: 'm1', nombre: 'Habana' },
            { id: 'm2', nombre: 'Santiago' }
          ]
        })
      }
    })
  })

  it('carga municipios cuando el usuario cambia la provincia', async () => {
    const wrapper = mount(LocationSelector)

    // espera carga inicial de provincias
    await flushPromises()

    // simula selección REAL del usuario
    await wrapper.find('#provincia').setValue('prov-1')
    await flushPromises()

    const vm: any = wrapper.vm
    expect(vm.municipalities.length).toBe(2)
  })
})
