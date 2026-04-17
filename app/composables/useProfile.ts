export const useProfile = () => {
  const api = useApi()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const cambiarContrasena = async (data: {
    currentPassword: string 
    newPassword: string
  }) => {
    loading.value = true
    error.value = null

    try {
      const res: any = await api('/api/auth/change-password', {
        method: 'POST',
        body: data
      })

      return res
    } catch (e: any) {
      error.value = e?.data?.message || 'Error al cambiar contraseña'
      throw new Error(error.value)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    cambiarContrasena
  }
}