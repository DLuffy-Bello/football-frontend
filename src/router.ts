import { createRouter, createWebHistory } from 'vue-router'
import { Login } from './components/login';
import { Register } from './components/register';
import { Competitions } from './components/competitons';
import { useAuthStore } from './stores/auth';
import { CompetitionDetail } from './components/competition-detail';
import { Teams } from './components/teams';
import { TeamDetail } from './components/team-detail';


const routes = [
  {
    path: '/',
    redirect: '/competitions'
  },
  {
    path: '/competitions',
    component: Competitions,
    meta: { requiresAuth: true }
  },
  {
    path: '/competition/:id',
    name: 'competition-detail',
    component: CompetitionDetail,
    meta: {
      requiresAuth: true,
      permission: 'view_details_competitions'
    }
  },
  {
    path: '/teams',
    name: 'teams',
    component: Teams,
    meta: {
      requiresAuth: true,
      casl: { action: 'view_teams', subject: 'teams' }
    }
  },
  {
    path: '/team/:id',
    name: 'team-detail',
    component: TeamDetail,
    meta: {
      requiresAuth: true,
      permission: 'view_details_competitions'

    }
  },
  {
    path: '/login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    component: Register,
    meta: { requiresGuest: true }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Inicializar auth
  if (!authStore.isAuthenticated && localStorage.getItem('auth_token')) {
    await authStore.initializeAuth()
  }

  // Rutas para invitados
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return next('/')
  }

  // Rutas que requieren auth
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next('/login')
  }

  // Verificar permisos específicos
  if (to.meta.permission && authStore.isAuthenticated) {
    const permission = to.meta.permission as string

    if (!authStore.hasPermission(permission)) {
      return next('/unauthorized')
    }
  }

  next()
})

export default router;