import { defineComponent, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePlayersStore } from '../../stores/players'
import { useLoadingStore } from '../../stores/loading'

export default defineComponent({
  name: 'PlayerDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const playersStore = usePlayersStore()
    const loadingStore = useLoadingStore()
    
    const player = computed(() => playersStore.currentPlayer)
    const isLoading = computed(() => loadingStore.isLoading)
    const error = computed(() => playersStore.error)
    
    const goBack = (): void => {
      router.back()
    }
    
    const formatDate = (dateString: string): string => {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
    
    const calculateAge = (dateString: string): number => {
      const birthDate = new Date(dateString)
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      
      return age
    }
    
    const getPositionIcon = (position: string): string => {
      switch (position) {
        case 'Goalkeeper': return 'mdi-soccer-field'
        case 'Defence': return 'mdi-shield'
        case 'Midfield': return 'mdi-run'
        case 'Offence': return 'mdi-soccer'
        default: return 'mdi-account'
      }
    }
    
    const getPositionColor = (position: string): string => {
      switch (position) {
        case 'Goalkeeper': return 'orange'
        case 'Defence': return 'blue'
        case 'Midfield': return 'green'
        case 'Offence': return 'red'
        default: return 'grey'
      }
    }
    
    const loadPlayerDetail = async (): Promise<void> => {
      const id = Number(route.params.id)
      if (id) {
        await playersStore.fetchPlayerById(id)
      }
    }
    
    onMounted(() => {
      loadPlayerDetail()
    })
    
    onUnmounted(() => {
      playersStore.clearCurrentPlayer()
    })
    
    return {
      player,
      isLoading,
      error,
      goBack,
      formatDate,
      calculateAge,
      getPositionIcon,
      getPositionColor,
      loadPlayerDetail
    }
  }
})