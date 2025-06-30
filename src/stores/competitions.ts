import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ICompetition } from '../types/competitions'
import apiClient from '../plugins/axios'
import type { IResponse } from '../types/api'
import { useLoadingStore } from './loading'

export const useCompetitionsStore = defineStore('competitions', () => {
  const competitions = ref<ICompetition[]>([])
  const currentCompetition = ref<ICompetition | null>(null)
  const error = ref<string | null>(null)

  const loadingStore = useLoadingStore()

  const totalCompetitions = computed(() => competitions.value.length)

  const competitionsByType = computed(() => {
    return {
      leagues: competitions.value.filter(comp => comp.type === 'LEAGUE'),
      cups: competitions.value.filter(comp => comp.type === 'CUP')
    }
  })

  const competitionsByArea = computed(() => {
    const grouped = competitions.value.reduce((acc, comp) => {
      const areaName = comp.area.name
      if (!acc[areaName]) {
        acc[areaName] = []
      }
      acc[areaName].push(comp)
      return acc
    }, {} as Record<string, ICompetition[]>)
    return grouped
  })

  const getCompetitionById = computed(() => {
    return (id: number): ICompetition | undefined => {
      return competitions.value.find(comp => comp.id === id)
    }
  })

  const fetchCompetitions = async () => {
    loadingStore.setLoading(true)
    error.value = null

    try {
      const response = await apiClient.get<IResponse<ICompetition[]>>('/competitions')

      if (response.status === 200) {
        competitions.value = response.data.data || []
        return { success: true, status: response.status }
      } else {
        error.value = 'Error loadingStore  competitions'
        return { success: false, status: response.status, error: error.value }
      }
    } catch (err: any) {
      const status = err.response?.status || 0
      error.value = err.response?.data?.message || 'Connection error'
      return { success: false, status, error: error.value }
    } finally {
      loadingStore.setLoading(false)
    }
  }


  const setCurrentCompetition = (competition: ICompetition | null) => {
    currentCompetition.value = competition
  }

  const clearError = () => {
    error.value = null
  }

  const resetStore = () => {
    competitions.value = []
    currentCompetition.value = null
    error.value = null
  }

  const fetchCompetitionById = async (id: number) => {
    loadingStore.setLoading(true)
    error.value = null

    try {
      const response = await apiClient.get<IResponse<ICompetition>>(`/competitions/${id}`)

      if (response.status === 200) {
        currentCompetition.value = response.data.data || null
        return { success: true, status: response.status }
      } else {
        error.value = 'Error loading competition detail'
        return { success: false, status: response.status, error: error.value }
      }
    } catch (err: any) {
      const status = err.response?.status || 0
      error.value = err.response?.data?.message || 'Connection error'
      return { success: false, status, error: error.value }
    } finally {
      loadingStore.setLoading(false)
    }
  }

  const clearCurrentCompetition = () => {
    currentCompetition.value = null
  }

  return {
    competitions,
    currentCompetition,
    error,
    totalCompetitions,
    competitionsByType,
    competitionsByArea,
    getCompetitionById,
    fetchCompetitions,
    setCurrentCompetition,
    clearError,
    resetStore,
    fetchCompetitionById,
    clearCurrentCompetition
  }
})