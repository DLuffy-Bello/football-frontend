<template>
  <div class="d-flex align-center justify-center min-h-screen pa-4">
    <v-card 
      class="w-100 elevation-8" 
      :max-width="$vuetify.display.xs ? '100%' : '480px'"
      rounded="xl"
    >
      <v-form ref="formValidate">
        <div class="pa-6 pa-md-8">
          <div class="text-center mb-6 mb-md-8">
            <v-avatar 
              size="64" 
              color="primary" 
              class="mb-4 elevation-4"
            >
              <v-icon size="32" color="white">mdi-soccer</v-icon>
            </v-avatar>
            <h1 class="text-h4 text-md-h3 font-weight-bold mb-2">
              Welcome Back
            </h1>
            <p class="text-body-1 text-medium-emphasis">
              Sign in to your Football App account
            </p>
          </div>

          <v-alert
            v-if="errorMessage"
            type="error"
            variant="tonal"
            class="mb-6"
            closable
            rounded="lg"
            @click:close="clearError"
          >
            <v-alert-title>Login Error</v-alert-title>
            {{ errorMessage }}
          </v-alert>

          <div class="mb-6">
            <v-text-field
              v-model="form.email"
              :rules="emailRules"
              label="Email"
              type="email"
              required
              variant="outlined"
              density="comfortable"
              rounded="lg"
              prepend-inner-icon="mdi-email"
              class="mb-4"
              hide-details="auto"
            />
            
            <v-text-field
              v-model="form.password"
              :rules="passwordRules"
              label="Password"
              type="password"
              required
              variant="outlined"
              density="comfortable"
              rounded="lg"
              prepend-inner-icon="mdi-lock"
              hide-details="auto"
            />
          </div>

          <div class="d-flex flex-column ga-3">
            <v-btn
              @click="onSubmit()"
              color="primary"
              variant="elevated"
              size="large"
              block
              rounded="lg"
              class="font-weight-medium text-h6"
            >
              Login
            </v-btn>
            
            <v-btn
              color="secondary"
              variant="outlined"
              size="large"
              block
              rounded="lg"
              class="font-weight-medium"
              @click="goRegister()"
            >
              Register
            </v-btn>
          </div>
        </div>
      </v-form>
    </v-card>
  </div>
</template>
<script lang="ts" src="./Login.ts" ></script>
<style src="./Login.css" ></style>