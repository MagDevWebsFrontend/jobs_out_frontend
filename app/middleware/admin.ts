import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuthStore()

  // 1. No logueado → fuera
  if (!auth.isAuthenticated) {
    return navigateTo('/login')
  }

  // 2. Asegurar que el usuario esté cargado
  if (!auth.loading) {
    await auth.fetchMe()
  }

  // 3. Si aun así no hay usuario → fuera
  if (!auth.user) {
    return navigateTo('/login')
  }

  // 4. Validar rol
  const isAdmin =
    auth.user.role === 'admin' ||
    auth.user.permissions?.includes('admin') ||
    auth.user.isAdmin === true

    console.log('el rol es')
    console.log(auth.user.role)

  if (!isAdmin) {
    return navigateTo('/')
  }

  console.log('USER:', auth.user)
console.log('ROLE:', auth.user?.role)

})
