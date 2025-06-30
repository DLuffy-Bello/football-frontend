import { computed, defineComponent, onMounted, onUnmounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useCompetitionsStore } from "../../stores/competitions"
import { useLoadingStore } from "../../stores/loading"


export default defineComponent({
    name: 'CompetitionDetail',
    setup() {
        const route = useRoute()
        const router = useRouter()
        const competitionsStore = useCompetitionsStore()
        const loadingStore = useLoadingStore()

        const competition = computed(() => competitionsStore.currentCompetition)
        const isLoading = computed(() => loadingStore.isLoading)
        const error = computed(() => competitionsStore.error)

        const goBack = (): void => {
            router.back()
        }


        const loadCompetitionDetail = async (): Promise<void> => {
            const id = Number(route.params.id)
            if (id) {
                await competitionsStore.fetchCompetitionById(id)
            }
        }

        const getTypeColor = (type: string): string => {
            switch (type) {
                case 'LEAGUE': return 'primary'
                case 'CUP': return 'secondary'
                default: return 'grey'
            }
        }

        const getTypeIcon = (type: string): string => {
            switch (type) {
                case 'LEAGUE': return 'mdi-trophy'
                case 'CUP': return 'mdi-cup'
                default: return 'mdi-trophy-variant'
            }
        }

        const formatDate = (dateString: string): string => {
            return new Date(dateString).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        }

        onMounted(() => {
            loadCompetitionDetail()
        })

        onUnmounted(() => {
            competitionsStore.clearCurrentCompetition()
        })

        return {
            competition,
            isLoading,
            error,
            goBack,
            formatDate,
            loadCompetitionDetail,
            getTypeColor,
            getTypeIcon,
        }
    }
})