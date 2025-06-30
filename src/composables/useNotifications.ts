import { ref } from 'vue'

interface INotification {
  id: string
  message: string
  type: 'warning' | 'error' | 'success' | 'info'
}

const notifications = ref<INotification[]>([])

export const useNotifications = () => {
    const showAccessDenied = () => {
      const id = Date.now().toString()

      notifications.value.push({
        id,
        message: 'No have access to this resource',
        type: 'warning'
      })

      setTimeout(() => {
        removeNotification(id)
      }, 4000)
    }

    const removeNotification = (id: string) => {
      notifications.value = notifications.value.filter(n => n.id !== id)
    }

    return {
      notifications,
      showAccessDenied,
      removeNotification
    }
  }