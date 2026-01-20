import { useAuthStore } from "~/stores/auth"

// /middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()
  // Si no autenticado, redirigir y mantener path original en query redirect
  if (!auth.isAuthenticated) {
    return navigateTo(`/auth/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
})