import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import type { IRegisterCredentials } from '../../types/auth'

export default defineComponent({
  name: 'Register',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    
    const formValidate = ref()
    const errorMessage = ref<string | null>(null)
    const successMessage = ref<string | null>(null)
    
    const form = ref<IRegisterCredentials>({
      name: '',
      email: '',
      password: ''
    })

    const nameRules = ref([
      (value: string) => !!value || 'Name is required',
      (value: string) => value.length >= 2 || 'Name must be at least 2 characters',
    ])

    const emailRules = ref([
      (value: string) => !!value || 'Email is required',
      (value: string) => /.+@.+\..+/.test(value) || 'Email must be valid',
    ])

    const passwordRules = ref([
      (value: string) => !!value || 'Password is required',
      (value: string) => value.length >= 8 || 'Password must be at least 8 characters',
    ])

    const clearError = () => {
      errorMessage.value = null
    }

    const clearSuccess = () => {
      successMessage.value = null
    }

    const goToLogin = () => {
      router.push('/login')
    }

    const onSubmit = async (): Promise<void> => {
      const { valid } = await formValidate.value.validate()
      if (!valid) return

      try {
        const isCorrect = await authStore.register(form.value)
        if (isCorrect) {
          router.push('/');
        }
      } catch (error) {
        errorMessage.value = 'Registration failed. Please try again.'
      }
    }

    return {
      form,
      formValidate,
      errorMessage,
      successMessage,
      nameRules,
      emailRules,
      passwordRules,
      onSubmit,
      clearError,
      clearSuccess,
      goToLogin,
    }
  }
})