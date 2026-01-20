import { useAuthStore } from "~/stores/auth"

// /middleware/guest.ts
export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()
  if (auth.isAuthenticated) {
    return navigateTo('/jobs')
  }
})