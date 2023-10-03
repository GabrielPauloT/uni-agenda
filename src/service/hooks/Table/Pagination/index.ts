// import { useState } from 'react'

// import { PaginationState } from '@tanstack/react-table'
// import { ApiPagination } from '@unipam/@types/API'

// import { usePaginationStateResult } from './types'

// const defaultPaginationState: PaginationState = { pageIndex: 0, pageSize: 10 }

// export function usePaginationState({
//   pageIndex = defaultPaginationState.pageIndex,
//   pageSize = defaultPaginationState.pageSize,
// }: Partial<PaginationState> = defaultPaginationState): usePaginationStateResult {
//   const [paginationState, setPaginationState] = useState<PaginationState>({
//     pageIndex,
//     pageSize,
//   })

//   return [paginationState, setPaginationState]
// }

// export function convertToApiPagination({
//   pageIndex,
//   pageSize,
// }: PaginationState): ApiPagination {
//   return {
//     page: pageIndex + 1,
//     limit: pageSize,
//   }
// }
