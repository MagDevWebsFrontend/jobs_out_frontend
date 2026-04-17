// tests/unit/EditProfile.spec.ts
import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import EditProfile from '../../app/pages/profile/edit.vue'

// mocks
const apiMock = vi.fn()
vi.mock('~/composables/useApi', () => ({ useApi: () => apiMock }))

const pushMock = vi.fn()
vi.mock('vue-router', async () => {
  return {
    useRouter: () => ({ push: pushMock, back: vi.fn() })
  }
})

// Mock auth store
const authStoreMock = {
  user: { id: 'user-1', nombre: 'Old Name' }
}
vi.mock('~/stores/auth', () => ({
  useAuthStore: () => authStoreMock
}))

describe('EditProfile page', () => {
  beforeEach(() => {
    apiMock.mockReset()
    pushMock.mockReset()
    // Default GET /api/usuarios/:id response
    apiMock.mockResolvedValueOnce({
      data: {
        nombre: 'Juan Pérez',
        email: 'juan@example.com',
        telefono_e164: '+5351234567',
        municipio_id: 'm1',
        avatar_url: null
      }
    })
  })

  it('CARGA datos y muestra en formulario', async () => {
    const wrapper = mount(EditProfile, { shallow: true })
    await flushPromises()
    // nombre debería estar cargado en el componente; Input es stubbed con shallow
    // buscamos que form.nombre se haya actualizado (accedemos al vm)
    const vm: any = wrapper.vm
    expect(vm.form.nombre).toBe('Juan Pérez')
    expect(vm.form.email).toBe('juan@example.com')
  })

  it('SUBMIT llama al endpoint PUT y actualiza auth.user y navega', async () => {
    // la primera llamada es GET (ya mockeada); ahora mockear PUT
    apiMock.mockResolvedValueOnce({
      data: {
        id: 'user-1',
        nombre: 'Nuevo Nombre',
        email: 'nuevo@example.com',
        telefono_e164: '+5351111111',
        municipio_id: 'm2'
      }
    })

    const wrapper = mount(EditProfile, { shallow: true })
    await flushPromises()

    // setear datos en form
    const vm: any = wrapper.vm
    vm.form.nombre = 'Nuevo Nombre'
    vm.form.email = 'nuevo@example.com'
    vm.form.municipio_id = 'm2'

    // llamar submit
    await vm.submitForm()
    await flushPromises()

    // assertions
    expect(apiMock).toHaveBeenCalledWith('/api/usuarios/user-1', expect.objectContaining({
      method: 'PUT'
    }))
    expect(authStoreMock.user.nombre).toBe('Nuevo Nombre')
    expect(pushMock).toHaveBeenCalledWith('/profile')
  })
})
