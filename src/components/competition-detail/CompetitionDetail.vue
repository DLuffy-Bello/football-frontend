<template>
  <div class="max-w-6xl mx-auto p-5">
    <!-- Loading -->
    <div v-if="isLoading" class="space-y-4">
      <v-skeleton-loader
        type="card-avatar, article, actions"
        class="mb-4"
      />
      <v-skeleton-loader
        type="card-avatar, article"
        class="mb-4"
      />
    </div>
    
    <!-- Error -->
    <v-alert
      v-else-if="error"
      type="error"
      variant="tonal"
      class="mb-6"
      closable
    >
      <template #prepend>
        <v-icon icon="mdi-alert-circle" />
      </template>
      {{ error }}
    </v-alert>
    
    <!-- Content -->
    <div v-else-if="competition" class="space-y-6">
      <!-- Hero Header -->
      <v-card class="overflow-hidden" elevation="8">
        <div class="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6">
          <div class="flex items-center">
            <v-btn
              icon="mdi-arrow-left"
              variant="text"
              color="white"
              @click="goBack"
              class="mr-4"
            />
            
            <div class="flex-1">
              <h1 class="text-4xl font-bold mb-2">
                {{ competition.name }}
              </h1>
              <div class="flex items-center text-xl">
                <v-icon icon="mdi-map-marker" color="white" class="mr-2" />
                {{ competition.area.name }}
              </div>
            </div>
            
            <v-chip
              :color="getTypeColor(competition.type)"
              size="large"
              variant="elevated"
              class="text-white font-bold"
            >
              {{ competition.type }}
            </v-chip>
          </div>
        </div>
      </v-card>
      
      <!-- Main Content - Centrado con mejor espaciado -->
      <div class="flex justify-center py-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl w-full">
          <!-- Info Card -->
          <v-card elevation="6" class="h-full">
            <v-card-title class="bg-blue-600 text-white flex items-center">
              <v-icon icon="mdi-information" class="mr-2" />
              Información General
            </v-card-title>
            <v-card-text class="p-6">
              <div class="space-y-4">
                <div class="flex items-center p-4 bg-gray-50 rounded-lg border">
                  <v-icon icon="mdi-trophy" color="primary" class="mr-4" size="large" />
                  <div>
                    <p class="text-sm text-gray-500 mb-1">Nombre</p>
                    <p class="text-lg font-semibold text-gray-800">{{ competition.name }}</p>
                  </div>
                </div>
                
                <div class="flex items-center p-4 bg-gray-50 rounded-lg border">
                  <v-icon icon="mdi-code-tags" color="primary" class="mr-4" size="large" />
                  <div>
                    <p class="text-sm text-gray-500 mb-1">Código</p>
                    <p class="text-lg font-semibold text-gray-800">{{ competition.code }}</p>
                  </div>
                </div>
                
                <div class="flex items-center p-4 bg-gray-50 rounded-lg border">
                  <v-icon icon="mdi-shape" color="primary" class="mr-4" size="large" />
                  <div>
                    <p class="text-sm text-gray-500 mb-1">Tipo</p>
                    <p class="text-lg font-semibold text-gray-800">{{ competition.type }}</p>
                  </div>
                </div>
                
                <div class="flex items-center p-4 bg-gray-50 rounded-lg border">
                  <v-icon icon="mdi-earth" color="primary" class="mr-4" size="large" />
                  <div>
                    <p class="text-sm text-gray-500 mb-1">Región</p>
                    <p class="text-lg font-semibold text-gray-800">{{ competition.area.name }}</p>
                  </div>
                </div>
                
                <div v-if="competition.currentSeason" class="flex items-center p-4 bg-gray-50 rounded-lg border">
                  <v-icon icon="mdi-calendar-range" color="success" class="mr-4" size="large" />
                  <div>
                    <p class="text-sm text-gray-500 mb-1">Temporada Actual</p>
                    <p class="text-lg font-semibold text-gray-800">
                      {{ formatDate(competition.currentSeason.startDate) }} - 
                      {{ formatDate(competition.currentSeason.endDate) }}
                    </p>
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
          
          <!-- Stats Card -->
          <v-card elevation="6" class="h-full">
            <v-card-title class="bg-teal-500 text-white text-center">
              <v-icon icon="mdi-chart-box" class="mr-2" />
              Estadísticas
            </v-card-title>
            <v-card-text class="p-6 h-full flex items-center">
              <div class="space-y-6 w-full">
                <div class="text-center">
                  <div class="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <v-icon icon="mdi-map-marker" color="white" size="x-large" />
                  </div>
                  <h2 class="text-2xl font-bold text-blue-600 mb-1 break-words">
                    {{ competition.area.name }}
                  </h2>
                  <p class="text-gray-600 text-base">Región</p>
                </div>
                
                <v-divider class="my-4" />
                
                <div class="text-center">
                  <div class="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <v-icon :icon="getTypeIcon(competition.type)" color="white" size="x-large" />
                  </div>
                  <h2 class="text-2xl font-bold text-teal-600 mb-1 break-words">
                    {{ competition.type }}
                  </h2>
                  <p class="text-gray-600 text-base">Tipo de Competición</p>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./CompetitionDetail.ts"></script>
