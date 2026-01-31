// shared/types/pagination.ts

export interface PaginatedResponse<T> {
  success: boolean
  total: number
  limit: number
  offset: number
  data: T[]
}
