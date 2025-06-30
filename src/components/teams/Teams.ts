import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTeamsStore } from '../../stores/teams'
import { useLoadingStore } from '../../stores/loading'
import { useNotifications } from '../../composables/useNotifications'
import type { ITeam } from '../../types/teams'
import { ability } from '../../plugins/casl'

export default defineComponent({
  name: 'Teams',
  setup() {
    const router = useRouter()
    const teamsStore = useTeamsStore()
    const loadingStore = useLoadingStore()
    const { showAccessDenied } = useNotifications()
    
    const searchQuery = ref('')
    const selectedClubColors = ref<string | null>(null)
    
    const clubColorsOptions = computed(() => {
      const colors = new Set(
        teamsStore.teams
          .filter(team => team.clubColors)
          .map(team => team.clubColors!)
      )
      return Array.from(colors).sort().map(color => ({
        title: color,
        value: color
      }))
    })
    
    const filteredTeams = computed(() => {
      let filtered = teamsStore.teams
      
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(team =>
          team.name.toLowerCase().includes(query) ||
          team.shortName.toLowerCase().includes(query) ||
          team.tla.toLowerCase().includes(query) ||
          team.venue?.toLowerCase().includes(query)
        )
      }
      
      if (selectedClubColors.value) {
        filtered = filtered.filter(team => team.clubColors === selectedClubColors.value)
      }
      
      return filtered
    })
    
    const loadTeams = async (): Promise<void> => {
      await teamsStore.fetchTeams()
    }
    
    const clearFilters = (): void => {
      searchQuery.value = ''
      selectedClubColors.value = null
    }
    
    const onTeamClick = (team: ITeam): void => {
      const canViewDetails = ability.can('view_details_teams', 'teams')
      
      if (canViewDetails) {
        console.log('Team clicked:', team.name)
        teamsStore.setCurrentTeam(team)
        router.push(`/team/${team.id}`)
      } else {
        showAccessDenied()
      }
    }
    
    onMounted(() => {
      if (teamsStore.teams.length === 0) {
        loadTeams()
      }
    })
    
    return {
      teamsStore,
      loadingStore,
      searchQuery,
      selectedClubColors,
      clubColorsOptions,
      filteredTeams,
      loadTeams,
      clearFilters,
      onTeamClick
    }
  }
})