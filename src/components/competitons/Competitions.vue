<template>
  <v-container fluid class="pa-4 pa-md-6">
    <!-- Header responsive -->
    <div class="d-flex flex-column flex-md-row justify-space-between align-start align-md-center mb-6 mb-md-8 ga-4">
      <div class="flex-grow-1">
        <h1 class="text-h4 text-md-h3 font-weight-bold mb-2">Competitions</h1>
        <p class="text-body-1 text-md-h6 text-medium-emphasis">
          Explore all available competitions
        </p>
      </div>
      
      <div class="d-flex flex-column flex-sm-row align-start align-sm-center ga-3 ga-sm-4 w-100 w-md-auto">
        <v-btn
          color="primary"
          variant="outlined"
          prepend-icon="mdi-refresh"
          @click="loadCompetitions"
          rounded="lg"
          :block="$vuetify.display.xs"
          :size="$vuetify.display.xs ? 'default' : 'default'"
        >
          Reload
        </v-btn>
        
        <v-chip 
          color="primary" 
          variant="elevated" 
          prepend-icon="mdi-trophy"
          :size="$vuetify.display.xs ? 'default' : 'large'"
          class="px-3 px-sm-4"
        >
          Total: {{ competitionsStore.totalCompetitions }}
        </v-chip>
      </div>
    </div>

    <!-- Filtros responsivos -->
    <v-card class="mb-6 mb-md-8" elevation="2" rounded="xl">
      <v-card-text class="pa-4 pa-md-6">
        <!-- Filtros en columnas para móvil, fila para desktop -->
        <div class="d-flex flex-column flex-md-row ga-4">
          <!-- Search field -->
          <div class="flex-grow-1 flex-md-grow-0" style="flex: 1 1 auto;">
            <v-text-field
              v-model="searchQuery"
              label="Search competitions..."
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="comfortable"
              clearable
              hide-details
              rounded="lg"
            />
          </div>
          
          <!-- Type filter -->
          <div class="flex-grow-0" style="flex: 0 0 auto; min-width: 140px;">
            <v-select
              v-model="selectedType"
              :items="typeOptions"
              label="Type"
              variant="outlined"
              density="comfortable"
              hide-details
              rounded="lg"
            />
          </div>
          
          <!-- Region filter -->
          <div class="flex-grow-0" style="flex: 0 0 auto; min-width: 140px;">
            <v-select
              v-model="selectedArea"
              :items="areaOptions"
              label="Region"
              variant="outlined"
              density="comfortable"
              clearable
              hide-details
              rounded="lg"
            />
          </div>
        </div>
        
        <!-- Botón de limpiar filtros en móvil -->
        <div 
          v-if="$vuetify.display.xs && (searchQuery || selectedType !== 'ALL' || selectedArea)"
          class="mt-4"
        >
          <v-btn
            @click="clearFilters"
            variant="outlined"
            color="secondary"
            prepend-icon="mdi-filter-off"
            block
            rounded="lg"
            size="small"
          >
            Clear Filters
          </v-btn>
        </div>
      </v-card-text>
    </v-card>

    <!-- Error State -->
    <v-alert
      v-if="competitionsStore.error"
      type="error"
      variant="tonal"
      class="mb-6"
      closable
      rounded="lg"
      @click:close="competitionsStore.clearError"
    >
      <v-alert-title>Error loading competitions</v-alert-title>
      <div class="d-flex flex-column flex-sm-row justify-space-between align-start align-sm-center mt-2 ga-2">
        <span class="text-body-2">{{ competitionsStore.error }}</span>
        <v-btn
          color="error"
          variant="outlined"
          size="small"
          @click="loadCompetitions"
          prepend-icon="mdi-refresh"
          rounded="lg"
          :block="$vuetify.display.xs"
        >
          Retry
        </v-btn>
      </div>
    </v-alert>

    <!-- Empty State -->
    <v-card 
      v-else-if="filteredCompetitions.length === 0" 
      class="text-center pa-8 pa-md-12" 
      elevation="2"
      rounded="xl"
    >
      <v-icon 
        :size="$vuetify.display.xs ? 60 : 80" 
        color="grey-lighten-1" 
        class="mb-4"
      >
        mdi-trophy-outline
      </v-icon>
      <h3 class="text-h6 text-md-h5 mb-2">No competitions found</h3>
      <p class="text-body-2 text-md-body-1 text-medium-emphasis mb-4">
        {{ searchQuery || selectedType !== 'ALL' || selectedArea 
            ? 'Try adjusting your search filters' 
            : 'No competitions available at this time' 
        }}
      </p>
      <v-btn 
        v-if="searchQuery || selectedType !== 'ALL' || selectedArea"
        @click="clearFilters" 
        color="primary"
        variant="elevated"
        rounded="lg"
        :size="$vuetify.display.xs ? 'default' : 'large'"
        :block="$vuetify.display.xs"
      >
        Clear filters
      </v-btn>
    </v-card>

    <!-- Competitions Grid - Responsive -->
    <div v-else>
      <v-row dense>
        <v-col
          v-for="competition in filteredCompetitions"
          :key="competition.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
        >
          <v-card 
            @click="onCompetitionClick(competition)" 
            hover
            elevation="3"
            rounded="xl"
            class="competition-card h-100"
          >
            <!-- Card content adaptativo -->
            <v-card-title class="text-body-1 text-sm-h6 font-weight-bold pa-3 pa-sm-4 pb-2">
              <span class="line-clamp-2">{{ competition.name }}</span>
            </v-card-title>
            
            <v-card-text class="pa-3 pa-sm-4 pt-0">
              <div class="d-flex align-center">
                <v-icon 
                  color="primary" 
                  class="me-2 flex-shrink-0"
                  :size="$vuetify.display.xs ? 'small' : 'default'"
                >
                  mdi-map-marker
                </v-icon>
                <span class="text-caption text-sm-body-2 line-clamp-1">
                  {{ competition.area.name }}
                </span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script lang="ts" src="./Competitions.ts"></script>
<style lang="css" src="./Competitions.css" ></style>