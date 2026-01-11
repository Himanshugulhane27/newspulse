import { useQuery, useMutation, useQueryClient } from 'react-query'
import { newsService, bookmarkService } from '../services/api'
import toast from 'react-hot-toast'

// News hooks
export const useNews = (params) => {
  return useQuery(
    ['news', params],
    () => newsService.getNews(params),
    {
      keepPreviousData: true,
      staleTime: 2 * 60 * 1000, // 2 minutes
    }
  )
}

export const useSearchNews = (params) => {
  return useQuery(
    ['searchNews', params],
    () => newsService.searchNews(params),
    {
      enabled: !!params.q,
      keepPreviousData: true,
    }
  )
}

export const useCategories = () => {
  return useQuery('categories', newsService.getCategories, {
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Bookmark hooks
export const useBookmarks = (params) => {
  return useQuery(
    ['bookmarks', params],
    () => bookmarkService.getBookmarks(params),
    {
      keepPreviousData: true,
    }
  )
}

export const useCreateBookmark = () => {
  const queryClient = useQueryClient()
  
  return useMutation(bookmarkService.createBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries('bookmarks')
      toast.success('Article bookmarked successfully!')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to bookmark article')
    }
  })
}

export const useDeleteBookmark = () => {
  const queryClient = useQueryClient()
  
  return useMutation(bookmarkService.deleteBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries('bookmarks')
      toast.success('Bookmark removed successfully!')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to remove bookmark')
    }
  })
}

export const useCheckBookmark = (url) => {
  return useQuery(
    ['checkBookmark', url],
    () => bookmarkService.checkBookmark(url),
    {
      enabled: !!url,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  )
}