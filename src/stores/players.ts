import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiClient } from '../plugins/axios'
import type { IResponse } from '../types/api.ts'
import type { IPlayer, IPlayerDetail } from '../types/players.ts'
import { useLoadingStore } from './loading'

export const usePlayersStore = defineStore('players', () => {
  // State
  const players = ref<IPlayer[]>([])
  const currentPlayer = ref<IPlayerDetail | null>(null)
  const error = ref<string | null>(null)
  
  const loadingStore = useLoadingStore()
  
  // Getters
  const totalPlayers = computed(() => players.value.length)
  
  // Actions
  const fetchPlayers = async () => {
    loadingStore.setLoading(true)
    error.value = null
    
    try {
      const response = await apiClient.get<IResponse<IPlayer[]>>('/players')
      
      if (response.status === 200) {
        players.value = response.data.data || []
        return { success: true, status: response.status }
      } else {
        error.value = 'Error loading players'
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
  
  const fetchPlayerById = async (id: number) => {
    loadingStore.setLoading(true)
    error.value = null
    
    try {
      const response = await apiClient.get<IResponse<IPlayerDetail>>(`/players/${id}`)
      
      if (response.status === 200) {
        currentPlayer.value = response.data.data || null
        return { success: true, status: response.status }
      } else {
        error.value = 'Error loading player detail'
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
  
  const setCurrentPlayer = (player: IPlayer | null) => {
    currentPlayer.value = player
  }
  
  const clearCurrentPlayer = () => {
    currentPlayer.value = null
  }
  
  const clearError = () => {
    error.value = null
  }
  
  return {
    players,
    currentPlayer,
    error,
    totalPlayers,
    fetchPlayers,
    fetchPlayerById,
    setCurrentPlayer,
    clearCurrentPlayer,
    clearError
  }
})