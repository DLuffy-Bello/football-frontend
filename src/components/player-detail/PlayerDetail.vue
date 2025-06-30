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
    <div v-else-if="player" class="space-y-6">
      <!-- Hero Header -->
      <v-card class="overflow-hidden" elevation="8">
        <div class="bg-gradient-to-r from-purple-600 to-purple-500 text-white p-6">
          <div class="flex items-center">
            <v-btn
              icon="mdi-arrow-left"
              variant="text"
              color="white"
              @click="goBack"
              class="mr-4"
            />
            
            <v-avatar size="60" color="white" class="mr-4">
              <v-icon icon="mdi-account" color="purple" size="large" />
            </v-avatar>
            
            <div class="flex-1">
              <h1 class="text-4xl font-bold mb-2">
                {{ player.name }}
              </h1>
              <div class="flex items-center text-xl">
                <v-icon :icon="getPositionIcon(player.position)" color="white" class="mr-2" />
                {{ player.position }}
              </div>
            </div>
            
            <v-chip
              :color="getPositionColor(player.position)"
              size="large"
              variant="elevated"
              class="text-white font-bold"
            >
              {{ player.position }}
            </v-chip>
          </div>
        </div>
      </v-card>
      
      <!-- Main Content - Centrado -->
      <div class="flex justify-center py-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl w-full">
          <!-- Info Card -->
          <v-card elevation="6" class="h-full">
            <v-card-title class="bg-purple-600 text-white flex items-center">
              <v-icon icon="mdi-information" class="mr-2" />
              Información Personal
            </v-card-title>
            <v-card-text class="p-6">
              <div class="space-y-4">
                <div class="flex items-center p-4 bg-gray-50 rounded-lg border">
                  <v-icon icon="mdi-account" color="primary" class="mr-4" size="large" />
                  <div>
                    <p class="text-sm text-gray-500 mb-1">Nombre</p>
                    <p class="text-lg font-semibold text-gray-800">{{ player.name }}</p>
                  </div>
                </div>
                
                <div class="flex items-center p-4 bg-gray-50 rounded-lg border">
                  <v-icon :icon="getPositionIcon(player.position)" color="primary" class="mr-4" size="large" />
                  <div>
                    <p class="text-sm text-gray-500 mb-1">Posición</p>
                    <p class="text-lg font-semibold text-gray-800">{{ player.position }}</p>
                  </div>
                </div>
                
                <div class="flex items-center p-4 bg-gray-50 rounded-lg border">
                  <v-icon icon="mdi-flag" color="primary" class="mr-4" size="large" />
                  <div>
                    <p class="text-sm text-gray-500 mb-1">Nacionalidad</p>
                    <p class="text-lg font-semibold text-gray-800">{{ player.nationality }}</p>
                  </div>
                </div>
                
                <div class="flex items-center p-4 bg-gray-50 rounded-lg border">
                  <v-icon icon="mdi-calendar" color="success" class="mr-4" size="large" />
                  <div>
                    <p class="text-sm text-gray-500 mb-1">Fecha de Nacimiento</p>
                    <p class="text-lg font-semibold text-gray-800">
                      {{ formatDate(player.dateOfBirth) }}
                      <span class="text-sm text-gray-600">({{ calculateAge(player.dateOfBirth) }} años)</span>
                    </p>
                  </div>
                </div>
                
                <div v-if="player.shirtNumber" class="flex items-center p-4 bg-gray-50 rounded-lg border">
                  <v-icon icon="mdi-numeric" color="info" class="mr-4" size="large" />
                  <div>
                    <p class="text-sm text-gray-500 mb-1">Número de Camiseta</p>
                    <p class="text-lg font-semibold text-gray-800">#{{ player.shirtNumber }}</p>
                  </div>
                </div>
                
                <div v-if="player.currentTeam" class="flex items-center p-4 bg-gray-50 rounded-lg border">
                  <v-icon icon="mdi-shield" color="warning" class="mr-4" size="large" />
                  <div>
                    <p class="text-sm text-gray-500 mb-1">Equipo Actual</p>
                    <p class="text-lg font-semibold text-gray-800">{{ player.currentTeam.name }}</p>
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
          
          <!-- Stats Card -->
          <v-card elevation="6" class="h-full">
            <v-card-title class="bg-orange-500 text-white text-center">
              <v-icon icon="mdi-chart-box" class="mr-2" />
              Estadísticas
            </v-card-title>
            <v-card-text class="p-6 h-full flex items-center">
              <div class="space-y-6 w-full">
                <div class="text-center">
                  <div class="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <v-icon icon="mdi-flag" color="white" size="x-large" />
                  </div>
                  <h2 class="text-2xl font-bold text-purple-600 mb-1 break-words">
                    {{ player.nationality }}
                  </h2>
                  <p class="text-gray-600 text-base">Nacionalidad</p>
                </div>
                
                <v-divider class="my-4" />
                
                <div class="text-center">
                  <div class="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <v-icon :icon="getPositionIcon(player.position)" color="white" size="x-large" />
                  </div>
                  <h2 class="text-2xl font-bold text-orange-600 mb-1 break-words">
                    {{ player.position }}
                  </h2>
                  <p class="text-gray-600 text-base">Posición</p>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./PlayerDetail.ts"></script>