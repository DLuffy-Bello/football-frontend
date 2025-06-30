<template>
  <v-container fluid class="pa-4 pa-md-6">
    <v-alert
      v-if="error"
      type="error"
      variant="tonal"
      class="mb-6"
      closable
      rounded="lg"
    >
      <template #prepend>
        <v-icon icon="mdi-alert-circle" />
      </template>
      {{ error }}
    </v-alert>
    
    <div v-else-if="team">
      <v-card class="mb-6 mb-md-8 overflow-hidden" elevation="8" rounded="xl">
        <div class="bg-gradient-to-r from-green-600 to-green-500 text-white">
          <v-container fluid class="pa-4 pa-md-6">
            <v-row align="center" no-gutters>
              <v-col cols="auto" class="mr-4">
                <v-btn
                  icon="mdi-arrow-left"
                  variant="text"
                  color="white"
                  @click="goBack"
                  size="large"
                />
              </v-col>
              
              <v-col cols="auto" class="mr-4" v-if="team.crest">
                <v-avatar :size="$vuetify.display.xs ? 56 : 72" class="elevation-4">
                  <v-img :src="team.crest" :alt="team.name" />
                </v-avatar>
              </v-col>
              
              <v-col class="flex-grow-1 min-w-0">
                <h1 class="text-h4 text-md-h3 font-weight-bold mb-2">
                  {{ team.name }}
                </h1>
                <div class="d-flex align-center text-h6">
                  <v-icon icon="mdi-shield" color="white" class="mr-2" />
                  <span class="text-truncate">{{ team.shortName }}</span>
                </div>
              </v-col>
              <v-row class="justify-end">
                <v-col cols="auto">
                  <v-btn 
                    @click="modalPlayers = true"
                    color="primary"
                    variant="elevated"
                    rounded="xl"
                    size="large"
                    class="text-white font-weight-bold"
                    :class="{
                      'px-6': $vuetify.display.mdAndUp,
                      'px-4': $vuetify.display.smAndDown
                    }"
                  >
                    <template #prepend>
                      <v-icon icon="mdi-account-group" class="mr-2" />
                    </template>
                    View Players
                  </v-btn>
                  
                  <ModalList 
                    :modalPlayers="modalPlayers"
                    :squad="team.squad"
                    @update:modalPlayers="handleModalUpdate" 
                  />
                </v-col>
                <v-col cols="auto">
                  <v-chip
                    color="white"
                    text-color="green"
                    :size="$vuetify.display.xs ? 'default' : 'large'"
                    variant="elevated"
                    class="font-weight-bold"
                  >
                    {{ team.tla }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-row>
          </v-container>
        </div>
      </v-card>
      
      <v-container fluid class="pa-0">
        <v-row justify="center">
          <v-col cols="12" xl="10" xxl="8">
            <v-row>
              <v-col cols="12" lg="6">
                <v-card elevation="6" rounded="xl" class="h-100">
                  <v-card-title class="bg-green-600 text-white d-flex align-center pa-4">
                    <v-icon icon="mdi-information" class="mr-2" />
                    General Information
                  </v-card-title>
                  <v-card-text class="pa-4 pa-md-6">
                    <div class="d-flex flex-column ga-4">
                      <v-card variant="outlined" class="pa-4" rounded="lg">
                        <div class="d-flex align-center ga-4">
                          <v-icon icon="mdi-shield" color="primary" size="large" />
                          <div class="flex-grow-1 min-w-0">
                            <p class="text-caption text-medium-emphasis mb-1">Name</p>
                            <p class="text-body-1 font-weight-medium text-truncate">{{ team.name }}</p>
                          </div>
                        </div>
                      </v-card>
                      
                      <v-card variant="outlined" class="pa-4" rounded="lg">
                        <div class="d-flex align-center ga-4">
                          <v-icon icon="mdi-code-tags" color="primary" size="large" />
                          <div class="flex-grow-1 min-w-0">
                            <p class="text-caption text-medium-emphasis mb-1">Short Name</p>
                            <p class="text-body-1 font-weight-medium text-truncate">{{ team.shortName }}</p>
                          </div>
                        </div>
                      </v-card>
                      
                      <v-card variant="outlined" class="pa-4" rounded="lg">
                        <div class="d-flex align-center ga-4">
                          <v-icon icon="mdi-alphabetical" color="primary" size="large" />
                          <div class="flex-grow-1 min-w-0">
                            <p class="text-caption text-medium-emphasis mb-1">Abbreviation</p>
                            <p class="text-body-1 font-weight-medium">{{ team.tla }}</p>
                          </div>
                        </div>
                      </v-card>
                      
                      <v-card v-if="team.founded" variant="outlined" class="pa-4" rounded="lg">
                        <div class="d-flex align-center ga-4">
                          <v-icon icon="mdi-calendar" color="success" size="large" />
                          <div class="flex-grow-1 min-w-0">
                            <p class="text-caption text-medium-emphasis mb-1">Founded</p>
                            <p class="text-body-1 font-weight-medium">{{ team.founded }}</p>
                          </div>
                        </div>
                      </v-card>
                      
                      <v-card v-if="team.venue" variant="outlined" class="pa-4" rounded="lg">
                        <div class="d-flex align-center ga-4">
                          <v-icon icon="mdi-stadium" color="info" size="large" />
                          <div class="flex-grow-1 min-w-0">
                            <p class="text-caption text-medium-emphasis mb-1">Stadium</p>
                            <p class="text-body-1 font-weight-medium text-truncate">{{ team.venue }}</p>
                          </div>
                        </div>
                      </v-card>
                      
                      <v-card v-if="team.clubColors" variant="outlined" class="pa-4" rounded="lg">
                        <div class="d-flex align-center ga-4">
                          <v-icon icon="mdi-palette" color="warning" size="large" />
                          <div class="flex-grow-1 min-w-0">
                            <p class="text-caption text-medium-emphasis mb-1">Club Colors</p>
                            <p class="text-body-1 font-weight-medium text-truncate">{{ team.clubColors }}</p>
                          </div>
                        </div>
                      </v-card>
                      
                      <v-card v-if="team.website" variant="outlined" class="pa-4" rounded="lg">
                        <div class="d-flex align-center ga-4">
                          <v-icon icon="mdi-web" color="secondary" size="large" />
                          <div class="flex-grow-1 min-w-0">
                            <p class="text-caption text-medium-emphasis mb-1">Website</p>
                            <a 
                              :href="team.website" 
                              target="_blank" 
                              class="text-body-1 font-weight-medium text-primary text-decoration-none"
                            >
                              Visit website
                            </a>
                          </div>
                        </div>
                      </v-card>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
              
              <v-col cols="12" lg="6">
                <v-card elevation="6" rounded="xl" class="h-100">
                  <v-card-title class="bg-blue-600 text-white d-flex align-center justify-center pa-4">
                    <v-icon icon="mdi-chart-box" class="mr-2" />
                    Statistics
                  </v-card-title>
                  <v-card-text class="pa-4 pa-md-6 d-flex align-center justify-center h-100">
                    <div class="d-flex flex-column ga-8 w-100">
                      <div class="text-center">
                        <v-avatar
                          size="96"
                          color="green"
                          class="mb-4 elevation-4"
                        >
                          <v-icon icon="mdi-calendar" color="white" size="48" />
                        </v-avatar>
                        <h2 class="text-h4 font-weight-bold text-green mb-2">
                          {{ team.founded }}
                        </h2>
                        <p class="text-body-1 text-medium-emphasis">Foundation Year</p>
                      </div>
                      
                      <v-divider />
                      
                      <div class="text-center">
                        <v-avatar
                          size="96"
                          color="blue"
                          class="mb-4 elevation-4"
                        >
                          <v-icon icon="mdi-shield" color="white" size="48" />
                        </v-avatar>
                        <h2 class="text-h4 font-weight-bold text-blue mb-2">
                          {{ team.tla }}
                        </h2>
                        <p class="text-body-1 text-medium-emphasis">Team Code</p>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script lang="ts" src="./TeamDetail.ts"></script>

<style scoped>
.bg-gradient-to-r {
  background: linear-gradient(to right, rgb(34, 197, 94), rgb(34, 197, 94));
}

.from-green-600 {
  --tw-gradient-from: #059669;
}

.to-green-500 {
  --tw-gradient-to: #10b981;
}

.v-card {
  transition: all 0.3s ease;
}

.v-card:hover {
  transform: translateY(-2px);
}

@media (max-width: 600px) {
  .v-card:hover {
    transform: none;
  }
}
</style>