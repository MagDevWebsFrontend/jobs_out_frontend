export function getEnv(name: string, fallback?: string): string {
  const v = process.env[name]
  if (v && v.trim()) return v.trim()
  if (fallback !== undefined) return fallback
  throw new Error(`Missing required env var: ${name}`)
}

export function hasEnv(name: string): boolean {
  const v = process.env[name]
  return !!(v && v.trim())
}

export function getBaseUrl(): string {
  return getEnv('E2E_BASE_URL', 'http://localhost:3000')
}

export function getCredentials(): { username: string; password: string } {
  return {
    username: getEnv('E2E_USERNAME'),
    password: getEnv('E2E_PASSWORD')
  }
}

export function hasCredentials(): boolean {
  return hasEnv('E2E_USERNAME') && hasEnv('E2E_PASSWORD')
}
