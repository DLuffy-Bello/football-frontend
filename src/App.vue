<template>
  <v-app theme="dark">
    <v-overlay
      class="d-flex align-center justify-center"
      persistent
      v-model="loadingStore.isLoading"
    >
      <v-progress-circular color="primary" indeterminate size="64" />
    </v-overlay>
    <v-navigation-drawer
      :permanent="!mobile"
      :temporary="mobile"
      :width="280"
      class="border-r"
      color="surface-variant"
      v-if="authStore.isAuthenticated"
      v-model="drawer"
    >
      <div class="pa-4 border-b">
        <div class="d-flex align-center">
          <v-avatar size="40" class="mr-3" color="primary">
            <v-icon size="large">mdi-soccer</v-icon>
          </v-avatar>
          <div class="flex-grow-1 min-w-0">
            <h3 class="text-h6 font-weight-bold text-truncate">Football App</h3>
            <p class="text-caption text-medium-emphasis text-truncate">Sports Management</p>
          </div>
        </div>
      </div>
      <div class="pa-4 border-b">
        <div class="d-flex align-center">
          <v-avatar class="mr-3" color="secondary" size="32">
            <span class="text-white font-weight-bold">{{ authStore.user?.name?.charAt(0) || 'U' }}</span>
          </v-avatar>
          <div class="flex-grow-1 min-w-0">
            <p
              class="text-body-2 font-weight-medium text-truncate"
            >{{ authStore.user?.name || 'User' }}</p>
            <p class="text-caption text-medium-emphasis text-truncate">{{ authStore.user?.email }}</p>
          </div>
          <v-chip
            :color="authStore.isAdmin ? 'success' : 'info'"
            class="flex-shrink-0"
            size="x-small"
            variant="flat"
          >{{ authStore.isAdmin ? 'Admin' : 'User' }}</v-chip>
        </div>
      </div>
      <v-list class="py-2" density="comfortable" nav>
        <v-list-item
          min-height="40"
          title="Competitions"
          exact
          prepend-icon="mdi-trophy"
          to="/competitions"
          v-if="authStore.canViewCompetitions"
        />
        <v-list-item
          min-height="40"
          title="Teams"
          exact
          prepend-icon="mdi-account-group"
          to="/teams"
          v-if="authStore.canViewTeams"
        />
        <v-list-item
          min-height="40"
          title="Players"
          exact
          prepend-icon="mdi-account"
          to="/players"
          v-if="authStore.canViewPlayers"
        />
      </v-list>
      <template v-slot:append>
        <div class="pa-2 border-t">
          <v-btn
            block
            prepend-icon="mdi-logout"
            @click="handleLogout"
            color="error"
            variant="outlined"
          >
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      color="surface-variant"
      density="comfortable"
      elevation="1"
      v-if="mobile && authStore.isAuthenticated"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title class="text-h6 font-weight-bold">Football App</v-toolbar-title>
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <v-avatar class="mr-2" color="secondary" size="32" v-bind="props">
            <span class="text-white font-weight-bold">{{ authStore.user?.name?.charAt(0) || 'U' }}</span>
          </v-avatar>
        </template>

        <v-card min-width="200">
          <v-card-text>
            <div class="d-flex align-center mb-2">
              <v-avatar class="mr-3" color="secondary" size="40">
                <span
                  class="text-white font-weight-bold"
                >{{ authStore.user?.name?.charAt(0) || 'U' }}</span>
              </v-avatar>
              <div>
                <p class="text-body-2 font-weight-medium">{{ authStore.user?.name || 'User' }}</p>
                <p class="text-caption text-medium-emphasis">{{ authStore.user?.email }}</p>
              </div>
            </div>
            <v-chip
              :color="authStore.isAdmin ? 'success' : 'info'"
              block
              class="mb-3"
              size="small"
              variant="flat"
            >{{ authStore.isAdmin ? 'Admin' : 'User' }}</v-chip>

            <v-btn
              @click="handleLogout"
              block
              color="error"
              prepend-icon="mdi-logout"
              size="small"
              variant="outlined"
            >Logout</v-btn>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-main>
      <div class="min-h-screen bg-gray">
        <div class="w-full">
          <RouterView />
        </div>
      </div>
    </v-main>

    <NotificationContainer />
  </v-app>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "./stores/auth";
import { useLoadingStore } from "./stores/loading";
import { useDisplay } from "vuetify";
import NotificationContainer from "./components/common/NotificationContainer.vue";

const router = useRouter();
const authStore = useAuthStore();
const loadingStore = useLoadingStore();
const { mobile } = useDisplay();

const drawer = ref(!mobile.value);

const updateDrawerState = () => {
  if (mobile.value) {
    drawer.value = false;
  } else {
    drawer.value = true;
  }
};

onMounted(() => {
  updateDrawerState();
  window.addEventListener("resize", updateDrawerState);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateDrawerState);
});

const handleLogout = async () => {
  await authStore.logout();
  router.push("/login");
};

const closeDrawerOnMobile = () => {
  if (mobile.value) {
    drawer.value = false;
  }
};
</script>

<style scoped>
.v-navigation-drawer {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.v-list-item {
  transition: all 0.2s ease;
}

.v-list-item:hover {
  transform: translateX(2px);
}

@media (max-width: 768px) {
  .mobile-hidden {
    display: none !important;
  }
}
</style>