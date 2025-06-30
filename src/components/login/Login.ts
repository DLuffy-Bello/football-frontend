import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { IFormState } from '../../types/login';
import { useAuthStore } from '../../stores/auth';

export default defineComponent({
  name: 'Login',
  setup() {
    const router = useRouter();
    const formValidate = ref();
    const errorMessage = ref<string | null>(null);
    const form = ref<IFormState>({ email: '', password: '' });

    const authStore = useAuthStore();

    const emailRules = ref([
      (value: string) => !!value || 'Email is required',
      (value: string) => /.+@.+\..+/.test(value) || 'Email must be valid',
    ]);

    const passwordRules = ref([
      (value: string) => !!value || 'Password is required',
      (value: string) => value.length >= 4 || 'Password must be at least 4 characters long',
    ]);

    const onSubmit = async (): Promise<void> => {
      const { valid } = await formValidate.value.validate();
      if (!valid) return;
      const isCorrect = await authStore.login(form.value);
      if (isCorrect) {
        router.push('/');
      }
      errorMessage.value = 'Invalid email or password';
    }

    const goRegister = () => {
      router.push('/register');
    }

    const clearError = () => {
      errorMessage.value = null
    }

    return {
      form,
      formValidate,
      errorMessage,
      emailRules,
      passwordRules,
      onSubmit,
      clearError,
      goRegister,
    }
  }
});