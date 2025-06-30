import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePlayersStore } from '../../stores/players'
import { useLoadingStore } from '../../stores/loading'
import { useNotifications } from '../../composables/useNotifications'
import type { IPlayer } from '../../types/players'
import { ability } from '../../plugins/casl'

export default defineComponent({
  name: 'Players',
  setup() {
    const router = useRouter()
    const playersStore = usePlayersStore()
    const loadingStore = useLoadingStore()
    const { showAccessDenied } = useNotifications()

    const searchQuery = ref('')
    const selectedPosition = ref<string | null>(null)
    const selectedNationality = ref<string | null>(null)

    const positionOptions = [
      { title: 'Goalkeeper', value: 'Goalkeeper' },
      { title: 'Defender', value: 'Defence' },
      { title: 'Midfielder', value: 'Midfield' },
      { title: 'Forward', value: 'Offence' }
    ]

    const nationalityOptions = computed(() => {
      const nationalities = new Set(playersStore.players.map(player => player.nationality))
      return Array.from(nationalities).sort().map(nationality => ({
        title: nationality,
        value: nationality
      }))
    })

    const filteredPlayers = computed(() => {
      let filtered = playersStore.players

      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(player =>
          player.name.toLowerCase().includes(query) ||
          player.position.toLowerCase().includes(query) ||
          player.nationality.toLowerCase().includes(query) ||
          player.currentTeam?.name.toLowerCase().includes(query)
        )
      }

      if (selectedPosition.value) {
        filtered = filtered.filter(player => player.position === selectedPosition.value)
      }

      if (selectedNationality.value) {
        filtered = filtered.filter(player => player.nationality === selectedNationality.value)
      }

      return filtered
    })

    const loadPlayers = async (): Promise<void> => {
      await playersStore.fetchPlayers()
    }

    const clearFilters = (): void => {
      searchQuery.value = ''
      selectedPosition.value = null
      selectedNationality.value = null
    }

    const onPlayerClick = (player: IPlayer): void => {
      const canViewDetails = ability.can('view_details_players', 'players')

      if (canViewDetails) {
        playersStore.setCurrentPlayer(player)
        router.push(`/player/${player.id}`)
      } else {
        showAccessDenied()
      }
    }

    onMounted(() => {
      if (playersStore.players.length === 0) {
        loadPlayers()
      }
    })

    return {
      playersStore,
      loadingStore,
      searchQuery,
      selectedPosition,
      selectedNationality,
      positionOptions,
      nationalityOptions,
      filteredPlayers,
      loadPlayers,
      clearFilters,
      onPlayerClick
    }
  }
})