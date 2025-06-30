import { defineComponent, computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTeamsStore } from '../../stores/teams'
import ModalList from '../common/ModalList.vue'


export default defineComponent({
  name: 'TeamDetail',
  components: {
    ModalList
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const teamsStore = useTeamsStore()
    const modalPlayers = ref(false);
    const team = computed(() => teamsStore.currentTeam)
    const error = computed(() => teamsStore.error)
    
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
    
    const loadTeamDetail = async (): Promise<void> => {
      const id = Number(route.params.id)
      if (id) {
        await teamsStore.fetchTeamById(id)
      }
    }


    const handleModalUpdate = (val: boolean) => {
      modalPlayers.value = val;
    };
        
    onMounted(() => {
      loadTeamDetail()
    })
    
    onUnmounted(() => {
      teamsStore.clearCurrentTeam()
    })
    
    return {
      team,
      modalPlayers,
      handleModalUpdate,
      error,
      goBack,
      formatDate,
      loadTeamDetail
    }
  }
})