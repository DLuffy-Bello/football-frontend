
<template>
  <v-container class="pa-4 pa-md-6" fluid>
    <div
      class="d-flex flex-column flex-md-row justify-space-between align-start align-md-center mb-6 mb-md-8 ga-4"
    >
      <div class="flex-grow-1">
        <h1 class="text-h4 text-md-h3 font-weight-bold mb-2">Players</h1>
        <p class="text-body-1 text-md-h6 text-medium-emphasis">Explore all football players</p>
      </div>
      <div
        class="d-flex flex-column flex-sm-row align-start align-sm-center ga-3 ga-sm-4 w-100 w-md-auto"
      >
        <v-btn
          :block="$vuetify.display.xs"
          :loading="loadingStore.isLoading"
          @click="loadPlayers"
          color="primary"
          prepend-icon="mdi-refresh"
          rounded="lg"
          variant="outlined"
        >Reload</v-btn>

        <v-chip
          :size="$vuetify.display.xs ? 'default' : 'large'"
          class="px-3 px-sm-4"
          color="primary"
          prepend-icon="mdi-account"
          variant="elevated"
        >Total: {{ playersStore.totalPlayers }}</v-chip>
      </div>
    </div>

    <v-card class="mb-6 mb-md-8" elevation="2" rounded="xl">
      <v-card-text class="pa-4 pa-md-6">
        <div class="d-flex flex-column flex-md-row ga-4">
          <div class="flex-grow-1 flex-md-grow-0" style="flex: 1 1 auto;">
            <v-text-field
              clearable
              density="comfortable"
              hide-details
              label="Search players..."
              prepend-inner-icon="mdi-magnify"
              rounded="lg"
              v-model="searchQuery"
              variant="outlined"
            />
          </div>

          <div class="flex-grow-0" style="flex: 0 0 auto; min-width: 160px;">
            <v-select
              :items="positionOptions"
              clearable
              density="comfortable"
              hide-details
              label="Position"
              rounded="lg"
              v-model="selectedPosition"
              variant="outlined"
            />
          </div>

          <div class="flex-grow-0" style="flex: 0 0 auto; min-width: 160px;">
            <v-select
              :items="nationalityOptions"
              clearable
              density="comfortable"
              hide-details
              label="Nationality"
              rounded="lg"
              v-model="selectedNationality"
              variant="outlined"
            />
          </div>

          <div class="flex-grow-0 d-none d-md-flex" style="flex: 0 0 auto;">
            <v-btn
              @click="clearFilters"
              color="secondary"
              prepend-icon="mdi-filter-remove"
              rounded="lg"
              style="align-self: stretch;"
              variant="outlined"
            >Clear Filters</v-btn>
          </div>
        </div>

        <div
          class="mt-4"
          v-if="$vuetify.display.xs && (searchQuery || selectedPosition || selectedNationality)"
        >
          <v-btn
            @click="clearFilters"
            block
            color="secondary"
            prepend-icon="mdi-filter-remove"
            rounded="lg"
            size="small"
            variant="outlined"
          >Clear Filters</v-btn>
        </div>
      </v-card-text>
    </v-card>

    <div v-if="loadingStore.isLoading">
      <v-row dense>
        <v-col :key="n" cols="12" lg="3" md="4" sm="6" v-for="n in 8" xl="2">
          <v-skeleton-loader elevation="3" rounded="xl" type="card-avatar, article" />
        </v-col>
      </v-row>
    </div>

    <v-alert
      @click:close="playersStore.clearError"
      class="mb-6"
      closable
      rounded="lg"
      type="error"
      v-else-if="playersStore.error"
      variant="tonal"
    >
      <v-alert-title>Error loading players</v-alert-title>
      <div
        class="d-flex flex-column flex-sm-row justify-space-between align-start align-sm-center mt-2 ga-2"
      >
        <span class="text-body-2">{{ playersStore.error }}</span>
        <v-btn
          :block="$vuetify.display.xs"
          @click="loadPlayers"
          color="error"
          prepend-icon="mdi-refresh"
          rounded="lg"
          size="small"
          variant="outlined"
        >Retry</v-btn>
      </div>
    </v-alert>

    <v-card
      class="text-center pa-8 pa-md-12"
      elevation="2"
      rounded="xl"
      v-else-if="filteredPlayers.length === 0"
    >
      <v-icon
        :size="$vuetify.display.xs ? 60 : 80"
        class="mb-4"
        color="grey-lighten-1"
      >mdi-account-outline</v-icon>
      <h3 class="text-h6 text-md-h5 mb-2">No players found</h3>
      <p class="text-body-2 text-md-body-1 text-medium-emphasis mb-4">
        {{ searchQuery || selectedPosition || selectedNationality
        ? 'Try adjusting your search filters'
        : 'No players available at this time'
        }}
      </p>
      <v-btn
        :block="$vuetify.display.xs"
        :size="$vuetify.display.xs ? 'default' : 'large'"
        @click="clearFilters"
        color="primary"
        rounded="lg"
        v-if="searchQuery || selectedPosition || selectedNationality"
        variant="elevated"
      >Clear filters</v-btn>
      <v-btn
        :block="$vuetify.display.xs"
        :size="$vuetify.display.xs ? 'default' : 'large'"
        @click="loadPlayers"
        color="primary"
        rounded="lg"
        v-else
        variant="elevated"
      >Reload</v-btn>
    </v-card>

    <div v-else>
      <v-row dense>
        <v-col
          :key="player.id"
          cols="12"
          lg="3"
          md="4"
          sm="6"
          v-for="player in filteredPlayers"
          xl="2"
        >
          <v-card
            @click="onPlayerClick(player)"
            class="player-card h-100 cursor-pointer"
            elevation="3"
            hover
            rounded="xl"
          >
            <v-card-title class="pa-3 pa-sm-4 pb-2">
              <div class="d-flex align-center ga-3 w-100">
                <v-avatar :size="$vuetify.display.xs ? 32 : 40" class="flex-shrink-0">
                  <v-icon color="primary" icon="mdi-account" />
                </v-avatar>

                <div class="flex-grow-1 min-w-0">
                  <h3
                    class="text-body-1 text-sm-h6 font-weight-bold line-clamp-1 mb-1"
                  >{{ player.name }}</h3>
                  <p
                    class="text-caption text-sm-body-2 text-medium-emphasis line-clamp-1"
                  >{{ player.position || 'No position' }}</p>
                </div>

                <v-chip
                  class="flex-shrink-0"
                  color="secondary"
                  size="small"
                  v-if="player.shirtNumber"
                  variant="outlined"
                >#{{ player.shirtNumber }}</v-chip>
              </div>
            </v-card-title>

            <v-card-text class="pa-3 pa-sm-4 pt-0">
              <div class="d-flex flex-column ga-2">
                <div class="d-flex align-center" v-if="player.dateOfBirth">
                  <v-icon
                    :size="$vuetify.display.xs ? 'small' : 'default'"
                    class="mr-2 flex-shrink-0"
                    color="primary"
                    icon="mdi-calendar"
                  />
                  <span class="text-caption text-sm-body-2 line-clamp-1">{{ player.dateOfBirth }}</span>
                </div>

                <div class="d-flex align-center" v-if="player.nationality">
                  <v-icon
                    :size="$vuetify.display.xs ? 'small' : 'default'"
                    class="mr-2 flex-shrink-0"
                    color="info"
                    icon="mdi-flag"
                  />
                  <span class="text-caption text-sm-body-2 line-clamp-1">{{ player.nationality }}</span>
                </div>

                <div class="d-flex align-center" v-if="player.currentTeam">
                  <v-icon
                    :size="$vuetify.display.xs ? 'small' : 'default'"
                    class="mr-2 flex-shrink-0"
                    color="warning"
                    icon="mdi-shield"
                  />
                  <span
                    class="text-caption text-sm-body-2 line-clamp-1"
                  >{{ player.currentTeam.name }}</span>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div class="mt-6 text-center" v-if="!loadingStore.isLoading && filteredPlayers.length > 0">
      <v-chip class="px-4" color="surface-variant" size="large" variant="tonal">
        <v-icon class="mr-2" icon="mdi-information" />
        Showing {{ filteredPlayers.length }} player{{ filteredPlayers.length !== 1 ? 's' : '' }}
        {{ playersStore.totalPlayers !== filteredPlayers.length ? ` of ${playersStore.totalPlayers}` : '' }}
      </v-chip>
    </div>
  </v-container>
</template>
<script lang="ts" src="./Players.ts"></script>
<style src="./Players.css"></style>