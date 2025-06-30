<template>
  <div class="min-h-screen bg-black text-white">
    <div class="max-w-7xl mx-auto p-4 md:p-6">
      <div v-if="isLoading" class="space-y-4">
        <v-skeleton-loader
          type="card-avatar, article, actions"
          class="mb-4 bg-gray-800"
          dark
        />
        <v-skeleton-loader
          type="card-avatar, article"
          class="mb-4 bg-gray-800"
          dark
        />
      </div>
      
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
      
      <div v-else-if="competition" class="space-y-6">
        <div class="bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg p-4 md:p-6">
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <v-btn
              icon="mdi-arrow-left"
              variant="text"
              color="white"
              @click="goBack"
              class="self-start sm:self-center"
            />
            
            <div class="flex-1 min-w-0">
              <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 break-words">
                {{ competition.name }}
              </h1>
              <div class="flex items-center gap-2 text-lg md:text-xl">
                <v-icon icon="mdi-map-marker" color="white" class="mr-1" />
                <span class="break-words">{{ competition.area.name }}</span>
              </div>
            </div>
            
            <div class="bg-blue-400 px-4 py-2 rounded-full">
              <span class="text-sm font-semibold uppercase">{{ competition.type }}</span>
            </div>
          </div>
        </div>
        
        <div class="flex justify-center mt-12 mb-8">
          <div class="w-full max-w-4xl">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div class="bg-gray-800 rounded-lg overflow-hidden">
                <div class="bg-blue-600 px-4 py-3 flex items-center">
                  <div class="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-3">
                    <v-icon icon="mdi-information" color="blue" size="small" />
                  </div>
                  <span class="font-semibold">General Information</span>
                </div>
                
                <div class="p-6 space-y-8 min-h-[400px] flex flex-col justify-around">
                  <div class="flex items-center p-4 bg-gray-700 rounded-lg">
                    <div class="w-8 h-8 bg-blue-500 rounded flex items-center justify-center mr-4 flex-shrink-0">
                      <v-icon icon="mdi-trophy" color="white" size="small" />
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-gray-400 text-sm mb-1">Name</p>
                      <p class="text-white font-medium break-words">{{ competition.name }}</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center p-4 bg-gray-700 rounded-lg">
                    <div class="w-8 h-8 bg-blue-500 rounded flex items-center justify-center mr-4 flex-shrink-0">
                      <v-icon icon="mdi-code-tags" color="white" size="small" />
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-gray-400 text-sm mb-1">Code</p>
                      <p class="text-white font-medium">{{ competition.code }}</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center p-4 bg-gray-700 rounded-lg">
                    <div class="w-8 h-8 bg-blue-500 rounded flex items-center justify-center mr-4 flex-shrink-0">
                      <v-icon icon="mdi-shape" color="white" size="small" />
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-gray-400 text-sm mb-1">Type</p>
                      <p class="text-white font-medium break-words">{{ competition.type }}</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center p-4 bg-gray-700 rounded-lg">
                    <div class="w-8 h-8 bg-blue-500 rounded flex items-center justify-center mr-4 flex-shrink-0">
                      <v-icon icon="mdi-earth" color="white" size="small" />
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-gray-400 text-sm mb-1">Region</p>
                      <p class="text-white font-medium break-words">{{ competition.area.name }}</p>
                    </div>
                  </div>
                  
                  <div v-if="competition.currentSeason" class="flex items-center p-4 bg-gray-700 rounded-lg">
                    <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center mr-4 flex-shrink-0">
                      <v-icon icon="mdi-calendar-range" color="white" size="small" />
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-gray-400 text-sm mb-1">Current Season</p>
                      <p class="text-white font-medium break-words">
                        {{ formatDate(competition.currentSeason.startDate) }} - 
                        {{ formatDate(competition.currentSeason.endDate) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="bg-gray-800 rounded-lg overflow-hidden">
                <div class="bg-teal-500 px-4 py-3 flex items-center justify-center">
                  <div class="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-3">
                    <v-icon icon="mdi-chart-box" color="teal" size="small" />
                  </div>
                  <span class="font-semibold">Statistics</span>
                </div>
                
                <div class="p-6 flex items-center justify-center min-h-[400px]">
                  <div class="space-y-8 w-full max-w-sm">
                    <div class="text-center">
                      <div class="w-20 h-20 md:w-24 md:h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <v-icon icon="mdi-map-marker" color="white" size="large" />
                      </div>
                      <h2 class="text-xl md:text-2xl font-bold text-blue-400 mb-1 break-words">
                        {{ competition.area.name }}
                      </h2>
                      <p class="text-gray-400 text-sm">Region</p>
                    </div>
                    
                    <div class="h-px bg-gray-600 w-full"></div>
                    
                    <div class="text-center">
                      <div class="w-20 h-20 md:w-24 md:h-24 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <v-icon :icon="getTypeIcon(competition.type)" color="white" size="large" />
                      </div>
                      <h2 class="text-xl md:text-2xl font-bold text-teal-400 mb-1 break-words">
                        {{ competition.type }}
                      </h2>
                      <p class="text-gray-400 text-sm">Competition Type</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./CompetitionDetail.ts"></script>
