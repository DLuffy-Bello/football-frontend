import { defineStore } from "pinia";
import { ref } from "vue";


export const useLoadingStore = defineStore('loading', () => {
    const isLoading = ref<boolean>(false);

    const setLoading = (loading: boolean) => {
        isLoading.value = loading;
    };

    return {
        isLoading,
        setLoading,
    }
});