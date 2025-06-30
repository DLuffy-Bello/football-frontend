import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCompetitionsStore } from '../../stores/competitions'
import type { ICompetition } from '../../types/competitions'
import { useNotifications } from '../../composables/useNotifications'
import { ability } from '../../plugins/casl'

export default defineComponent({
  name: 'Competitions',
  setup() {
    const competitionsStore = useCompetitionsStore()

    const searchQuery = ref('')
    const selectedType = ref<'ALL' | 'LEAGUE' | 'CUP'>('ALL')
    const selectedArea = ref<string | null>(null)

    const router = useRouter()
    const { showAccessDenied } = useNotifications()

    const typeOptions = [
      { title: 'All', value: 'ALL' },
      { title: 'Leagues', value: 'LEAGUE' },
      { title: 'Cups', value: 'CUP' }
    ]

    const areaOptions = computed(() => {
      const areas = new Set(competitionsStore.competitions.map(comp => comp.area.name))
      return Array.from(areas).sort().map(area => ({
        title: area,
        value: area
      }))
    })

    const filteredCompetitions = computed(() => {
      let filtered = competitionsStore.competitions

      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(comp =>
          comp.name.toLowerCase().includes(query) ||
          comp.area.name.toLowerCase().includes(query) ||
          comp.code.toLowerCase().includes(query)
        )
      }

      if (selectedType.value !== 'ALL') {
        filtered = filtered.filter(comp => comp.type === selectedType.value)
      }

      if (selectedArea.value) {
        filtered = filtered.filter(comp => comp.area.name === selectedArea.value)
      }

      return filtered
    })

    const loadCompetitions = async (): Promise<void> => {
      await competitionsStore.fetchCompetitions()
    }

    const clearFilters = (): void => {
      searchQuery.value = ''
      selectedType.value = 'ALL'
      selectedArea.value = null
    }

    const onCompetitionClick = (competition: ICompetition): void => {
      const canViewDetails = ability.can('view_details_competitions', 'competitions')

      if (canViewDetails) {
        competitionsStore.setCurrentCompetition(competition)
        router.push(`/competition/${competition.id}`)
      } else {
        showAccessDenied()
      }
    }



    onMounted(() => {
      if (competitionsStore.competitions.length === 0) {
        loadCompetitions()
      }
    })

    return {
      competitionsStore,
      searchQuery,
      selectedType,
      selectedArea,
      typeOptions,
      areaOptions,
      filteredCompetitions,
      loadCompetitions,
      clearFilters,
      onCompetitionClick
    }
  }
})