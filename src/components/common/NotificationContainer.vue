<template>
  <div class="notification-container">
    <TransitionGroup name="notification" tag="div">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="notification notification--warning"
      >
        <v-icon icon="mdi-alert" class="mr-2" />
        {{ notification.message }}
        <v-btn
          icon="mdi-close"
          size="small"
          variant="text"
          color="white"
          @click="removeNotification(notification.id)"
          class="ml-2"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useNotifications } from '../../composables/useNotifications';

const { notifications, removeNotification } = useNotifications()
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.notification {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  min-width: 300px;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.notification--warning {
  background-color: #ff9800;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
