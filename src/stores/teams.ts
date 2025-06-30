import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '../plugins/axios';
import type { IResponse } from '../types/api';
import type { ITeam, ITeamDetail } from '../types/teams';
import { useLoadingStore } from './loading'

export const useTeamsStore = defineStore('teams', () => {
  const teams = ref<ITeam[]>([])
  const currentTeam = ref<ITeamDetail | null>(null)
  const error = ref<string | null>(null)
  
  const loadingStore = useLoadingStore()
  
  const totalTeams = computed(() => teams.value.length)
  

  const fetchTeams = async () => {
    loadingStore.setLoading(true)
    error.value = null
    
    try {
      const response = await apiClient.get<IResponse<ITeam[]>>('/teams')
      
      if (response.status === 200) {
        teams.value = response.data.data || []
        return { success: true, status: response.status }
      } else {
        error.value = 'Error loading teams'
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
  
  const fetchTeamById = async (id: number) => {
    loadingStore.setLoading(true)
    error.value = null
    
    try {
      const response = await apiClient.get<IResponse<ITeamDetail>>(`/teams/${id}`)
      
      if (response.status === 200) {
        currentTeam.value = response.data.data || null
        return { success: true, status: response.status }
      } else {
        error.value = 'Error loading team detail'
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
  
  const setCurrentTeam = (team: ITeam | null) => {
    currentTeam.value = team
  }
  
  const clearCurrentTeam = () => {
    currentTeam.value = null
  }
  
  const clearError = () => {
    error.value = null
  }
  
  return {
    teams,
    currentTeam,
    error,
    totalTeams,
    fetchTeams,
    fetchTeamById,
    setCurrentTeam,
    clearCurrentTeam,
    clearError
  }
})