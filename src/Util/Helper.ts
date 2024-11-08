export interface PaginatedList<T> {
  total: number
  page: number
  limit: number
  items: T[]
}

export const paginatedList = <T extends any>(
  items: T[],
  total: number,
  page: number = 1,
  limit: number = 25
) => {
  const list: PaginatedList<T> = {
    page,
    limit,
    total,
    items: items.map(item => item),
  }

  return list
}
