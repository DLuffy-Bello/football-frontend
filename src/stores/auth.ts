import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { IResponse } from '../types/api';
import type { ILoginResponse, IRegisterCredentials, IRegisterResponse, IUser, IUserCredentials } from '../types/auth';
import { isCorrectResponse } from '../utils/api'
import apiClient from '../plugins/axios';
import { updateAbility, ability } from '../plugins/casl';
import { useLoadingStore } from './loading';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<IUser | null>(null);

    const loadingStore = useLoadingStore();

    const isAuthenticated = computed(() => !!user.value)
    const isAdmin = computed(() => user.value?.roles.includes('admin') || false)
    const isViewer = computed(() => user.value?.roles.includes('viewer') || false)

    const canViewCompetitions = computed(() =>
        ability.can('view_competitions', 'competitions')
    )
    const canViewCompetitionDetails = computed(() =>
        ability.can('view_details_competitions', 'competitions')
    )
    const canViewTeams = computed(() =>
        ability.can('view_teams', 'teams')
    )
    const canViewTeamDetails = computed(() =>
        ability.can('view_details_teams', 'teams')
    )
    const canViewPlayers = computed(() =>
        ability.can('view_players', 'players')
    )
    const canViewPlayerDetails = computed(() =>
        ability.can('view_details_players', 'players')
    )

    const login = async (credentials: IUserCredentials): Promise<boolean> => {
        try {
            loadingStore.setLoading(true);
            const response = await apiClient.post<IResponse<ILoginResponse>>('/auth/login', credentials);
            if (isCorrectResponse(response.status) && response.data.data) {
                const { data: { user: userData, token } } = response.data;
                user.value = userData;
                localStorage.setItem('auth_token', token);
                localStorage.setItem('user_data', JSON.stringify(userData));
                updateAbility(userData.permissions, userData.roles.includes('admin'));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        } finally {
            loadingStore.setLoading(false);
        }
    }

    const initializeAuth = async () => {
        const token = localStorage.getItem('auth_token')
        const userData = localStorage.getItem('user_data')

        if (token && userData) {
            try {
                const parsedUser = JSON.parse(userData) as IUser
                user.value = parsedUser

                updateAbility(parsedUser.permissions, parsedUser.roles.includes('admin'))

            } catch (err) {
                console.error('Error initializing auth:', err)
                await logout()
            }
        }
    }

    const logout = () => {
        user.value = null;
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        updateAbility([]);
    }

    const hasPermission = (permission: string): boolean => {
        if (!isAuthenticated.value || !user.value) {
            return false
        }

        if (isAdmin.value) {
            return true
        }

        return user.value.permissions.includes(permission)
    }

    const register = async (credentials: IRegisterCredentials): Promise<boolean> => {
    try {
        loadingStore.setLoading(true);
        const response = await apiClient.post<IResponse<IRegisterResponse>>('/auth/register', credentials);
        if (isCorrectResponse(response.status) && response.data.data) {
            const { data: { user: userData, token } } = response.data;
            user.value = userData;
            localStorage.setItem('auth_token', token);
            localStorage.setItem('user_data', JSON.stringify(userData));
            updateAbility(userData.permissions, userData.roles.includes('admin'));
            return true;
        }
        return false;
    } catch (error) {
        console.error('Register failed:', error);
        return false;
    } finally {
        loadingStore.setLoading(false);
    }
}

    return {
        user,
        isAuthenticated,
        isAdmin,
        isViewer,
        canViewCompetitions,
        canViewCompetitionDetails,
        canViewTeams,
        canViewTeamDetails,
        canViewPlayers,
        canViewPlayerDetails,
        login,
        logout,
        hasPermission,
        initializeAuth,
        register,
    };
});
