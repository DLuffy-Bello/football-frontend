<template>
  <v-container class="pa-4 pa-md-6" fluid>
    <div
      class="d-flex flex-column flex-md-row justify-space-between align-start align-md-center mb-6 mb-md-8 ga-4"
    >
      <div class="flex-grow-1">
        <h1 class="text-h4 text-md-h3 font-weight-bold mb-2">Teams</h1>
        <p class="text-body-1 text-md-h6 text-medium-emphasis">Explore all football teams</p>
      </div>
      <div
        class="d-flex flex-column flex-sm-row align-start align-sm-center ga-3 ga-sm-4 w-100 w-md-auto"
      >
        <v-btn
          :block="$vuetify.display.xs"
          :loading="loadingStore.isLoading"
          @click="loadTeams"
          color="primary"
          prepend-icon="mdi-refresh"
          rounded="lg"
          variant="outlined"
        >Reload</v-btn>

        <v-chip
          :size="$vuetify.display.xs ? 'default' : 'large'"
          class="px-3 px-sm-4"
          color="primary"
          prepend-icon="mdi-shield-account"
          variant="elevated"
        >Total: {{ teamsStore.totalTeams }}</v-chip>
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
              label="Search teams..."
              prepend-inner-icon="mdi-magnify"
              rounded="lg"
              v-model="searchQuery"
              variant="outlined"
            />
          </div>
          <div class="flex-grow-0" style="flex: 0 0 auto; min-width: 180px;">
            <v-select
              :items="clubColorsOptions"
              clearable
              density="comfortable"
              hide-details
              label="Club Colors"
              rounded="lg"
              v-model="selectedClubColors"
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
        <div class="mt-4" v-if="$vuetify.display.xs && (searchQuery || selectedClubColors)">
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
          <v-skeleton-loader elevation="3" rounded="xl" type="card" />
        </v-col>
      </v-row>
    </div>
    <v-alert
      @click:close="teamsStore.clearError"
      class="mb-6"
      closable
      rounded="lg"
      type="error"
      v-else-if="teamsStore.error"
      variant="tonal"
    >
      <v-alert-title>Error loading teams</v-alert-title>
      <div
        class="d-flex flex-column flex-sm-row justify-space-between align-start align-sm-center mt-2 ga-2"
      >
        <span class="text-body-2">{{ teamsStore.error }}</span>
        <v-btn
          :block="$vuetify.display.xs"
          @click="loadTeams"
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
      v-else-if="filteredTeams.length === 0"
    >
      <v-icon
        :size="$vuetify.display.xs ? 60 : 80"
        class="mb-4"
        color="grey-lighten-1"
      >mdi-account-group-outline</v-icon>
      <h3 class="text-h6 text-md-h5 mb-2">No teams found</h3>
      <p class="text-body-2 text-md-body-1 text-medium-emphasis mb-4">
        {{ searchQuery || selectedClubColors
        ? 'Try adjusting your search filters'
        : 'No teams available at this time'
        }}
      </p>
      <v-btn
        :block="$vuetify.display.xs"
        :size="$vuetify.display.xs ? 'default' : 'large'"
        @click="clearFilters"
        color="primary"
        rounded="lg"
        v-if="searchQuery || selectedClubColors"
        variant="elevated"
      >Clear filters</v-btn>
      <v-btn
        :block="$vuetify.display.xs"
        :size="$vuetify.display.xs ? 'default' : 'large'"
        @click="loadTeams"
        color="primary"
        rounded="lg"
        v-else
        variant="elevated"
      >Reload</v-btn>
    </v-card>
    <div v-else>
      <v-row dense>
        <v-col :key="team.id" cols="12" lg="3" md="4" sm="6" v-for="team in filteredTeams" xl="2">
          <v-card
            @click="onTeamClick(team)"
            class="team-card h-100 cursor-pointer"
            elevation="3"
            hover
            rounded="xl"
          >
            <v-card-title class="pa-3 pa-sm-4 pb-2">
              <div class="d-flex align-center ga-3 w-100">
                <v-avatar :size="$vuetify.display.xs ? 32 : 40" class="flex-shrink-0">
                  <v-img :alt="team.name" :src="team.crest" v-if="team.crest" />
                  <v-icon color="primary" icon="mdi-shield" v-else />
                </v-avatar>

                <div class="flex-grow-1 min-w-0">
                  <h3
                    class="text-body-1 text-sm-h6 font-weight-bold line-clamp-1 mb-1"
                  >{{ team.name }}</h3>
                  <p
                    class="text-caption text-sm-body-2 text-medium-emphasis line-clamp-1"
                  >{{ team.shortName }}</p>
                </div>

                <v-chip
                  class="flex-shrink-0"
                  color="secondary"
                  size="small"
                  variant="outlined"
                >{{ team.tla }}</v-chip>
              </div>
            </v-card-title>

            <v-card-text class="pa-3 pa-sm-4 pt-0">
              <div class="d-flex flex-column ga-2">
                <div class="d-flex align-center" v-if="team.founded">
                  <v-icon
                    :size="$vuetify.display.xs ? 'small' : 'default'"
                    class="mr-2 flex-shrink-0"
                    color="primary"
                    icon="mdi-calendar"
                  />
                  <span class="text-caption text-sm-body-2 line-clamp-1">Founded {{ team.founded }}</span>
                </div>

                <div class="d-flex align-center" v-if="team.venue">
                  <v-icon
                    :size="$vuetify.display.xs ? 'small' : 'default'"
                    class="mr-2 flex-shrink-0"
                    color="info"
                    icon="mdi-stadium"
                  />
                  <span class="text-caption text-sm-body-2 line-clamp-1">{{ team.venue }}</span>
                </div>

                <div class="d-flex align-center" v-if="team.clubColors">
                  <v-icon
                    :size="$vuetify.display.xs ? 'small' : 'default'"
                    class="mr-2 flex-shrink-0"
                    color="warning"
                    icon="mdi-palette"
                  />
                  <span class="text-caption text-sm-body-2 line-clamp-1">{{ team.clubColors }}</span>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="mt-6 text-center" v-if="!loadingStore.isLoading && filteredTeams.length > 0">
      <v-chip class="px-4" color="surface-variant" size="large" variant="tonal">
        <v-icon class="mr-2" icon="mdi-information" />
        Showing {{ filteredTeams.length }} team{{ filteredTeams.length !== 1 ? 's' : '' }}
        {{ teamsStore.totalTeams !== filteredTeams.length ? ` of ${teamsStore.totalTeams}` : '' }}
      </v-chip>
    </div>
  </v-container>
</template>
<script lang="ts" src="./Teams.ts"></script>
<style src="./Teams.css"></style>