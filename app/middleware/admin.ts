import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuthStore()

  if (!auth.isAuthenticated) return navigateTo('/login')

  if (!auth.loading) await auth.fetchMe()

  if (!auth.user) return navigateTo('/login')

  const isAdmin =
    auth.user.rol === 'admin' ||
    auth.user.permissions?.includes('admin') ||
    auth.user.isAdmin === true

  if (!isAdmin) return navigateTo('/')

  console.log('USER:', auth.user)
})
