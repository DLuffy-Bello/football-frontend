<template>
  <v-dialog
    :model-value="modalPlayers"
    @update:model-value="val => emit('update:modalPlayers', val)"
    max-width="700"
    max-height="600"
    :fullscreen="$vuetify.display.mobile"
    scrollable
  >
      <v-card style="background-color: #2a2a2a; color: white;">
      <v-card-title class="d-flex align-center justify-space-between text-white">
        <div class="d-flex align-center">
          <v-icon class="mr-2">mdi-account-group</v-icon>
          <span class="text-h5">Team Squad</span>
          <v-chip class="ml-3" size="small" variant="elevated" color="grey">{{ squad.length }} Players</v-chip>
        </div>
        <v-btn
          @click="emit('update:modalPlayers', false)"
          color="white"
          icon="mdi-close"
          variant="text"
        />
      </v-card-title>

      <v-card-text class="pa-0">
        <div class="text-center py-8" v-if="squad.length === 0">
          <v-icon color="grey-lighten-2" size="64">mdi-account-off</v-icon>
          <p class="text-h6 text-grey mt-4">No players found</p>
        </div>

        <div v-else>
          <div class="pa-3">
            <v-row dense>
              <v-col
                :key="player.id"
                cols="12"
                :sm="$vuetify.display.mobile ? 12 : 6"
                v-for="player in squad"
              >
                <v-card class="player-card" hover variant="outlined" style="background-color: #2a2a2a; border-color: #444;">
                  <v-card-text :class="$vuetify.display.mobile ? 'pa-3' : 'pa-2'">
                    <div class="d-flex align-center">
                      <v-avatar color="grey" :class="$vuetify.display.mobile ? 'mr-3' : 'mr-2'" :size="$vuetify.display.mobile ? 40 : 32">
                        <span class="text-white font-weight-bold" :class="$vuetify.display.mobile ? 'text-body-2' : 'text-caption'">{{ player.shirtNumber || '?' }}</span>
                      </v-avatar>

                      <div class="flex-grow-1">
                        <div class="mb-1">
                          <h4 :class="$vuetify.display.mobile ? 'text-subtitle-1' : 'text-body-1'" class="font-weight-bold text-white">{{ player.name }}</h4>
                        </div>

                        <div class="player-details">
                          <div class="d-flex align-center mb-1">
                            <v-icon class="mr-1" :size="$vuetify.display.mobile ? 16 : 12" color="grey-lighten-1">mdi-flag</v-icon>
                            <span :class="$vuetify.display.mobile ? 'text-body-2' : 'text-caption'" class="text-grey-lighten-1">{{ player.nationality }}</span>
                          </div>
                          
                          <div class="d-flex align-center">
                            <v-icon class="mr-1" :size="$vuetify.display.mobile ? 16 : 12" color="grey-lighten-1">mdi-calendar</v-icon>
                            <span :class="$vuetify.display.mobile ? 'text-body-2' : 'text-caption'" class="text-grey-lighten-1">{{ calculateAge(player.dateOfBirth) }} years old</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-card-text>

      <v-card-actions :class="$vuetify.display.mobile ? 'pa-4' : 'pa-2'" style="background-color: #2a2a2a;">
        <v-spacer />
        <v-btn
          @click="emit('update:modalPlayers', false)"
          color="white"
          prepend-icon="mdi-check"
          variant="elevated"
          :size="$vuetify.display.mobile ? 'default' : 'small'"
        >Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { ITeamPlayer } from "../../types/teams";

defineProps({
  modalPlayers: {
    type: Boolean,
    required: true,
  },
  squad: {
    type: Array as () => ITeamPlayer[],
    required: true,
  },
});

const emit = defineEmits(["update:modalPlayers"]);

const calculateAge = (dateOfBirth: string): number => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};
</script>

<style scoped>
.player-card {
  border-radius: 12px;
  transition: all 0.2s ease;
}

.player-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.player-details {
  line-height: 1.2;
}

@media (max-width: 600px) {
  .player-card {
    margin-bottom: 8px;
  }
  
  .player-details {
    line-height: 1.3;
  }
}
</style>