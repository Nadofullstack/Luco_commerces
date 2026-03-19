<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-navy to-slate-900 flex items-center justify-center px-4 py-12">
    <div class="max-w-md w-full">
      <!-- Logo -->
      <div class="text-center mb-8">
        <router-link to="/" class="inline-flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-4xl">diamond</span>
          <span class="text-2xl font-bold tracking-tight text-gold">Luco</span>
        </router-link>
      </div>

      <!-- Login Card -->
      <div class="bg-slate-800/50 backdrop-blur-sm border border-navy/50 rounded-2xl p-8 shadow-2xl">
        <h1 class="text-2xl font-bold text-white mb-2">Connexion Client</h1>
        <p class="text-slate-400 mb-6">Accédez à votre espace personnel</p>

        <!-- Error Message -->
        <div v-if="errorMessage" class="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
          {{ errorMessage }}
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-slate-300 mb-2">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="votre@email.com"
            />
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-slate-300 mb-2">Mot de passe</label>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                <span v-if="showPassword" class="material-symbols-outlined">visibility_off</span>
                <span v-else class="material-symbols-outlined">visibility</span>
              </button>
            </div>
          </div>

          <!-- Forgot Password -->
          <div class="flex justify-end">
            <a href="#" class="text-sm text-primary hover:text-gold transition-colors">Mot de passe oublié ?</a>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 px-4 bg-gradient-to-r from-primary to-gold hover:from-primary/80 hover:to-gold/80 text-midnight font-semibold rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            <span v-if="loading" class="material-symbols-outlined animate-spin">sync</span>
            <span>{{ loading ? 'Connexion...' : 'Se connecter' }}</span>
          </button>
        </form>

        <!-- Register Link -->
        <div class="mt-6 text-center">
          <p class="text-slate-400">
            Pas encore de compte ?
            <router-link to="/client/register" class="text-primary hover:text-gold font-medium transition-colors">
              Créer un compte
            </router-link>
          </p>
        </div>
      </div>

      <!-- Back to Home -->
      <div class="mt-6 text-center">
        <router-link to="/" class="text-slate-400 hover:text-white text-sm transition-colors">
          ← Retour à l'accueil
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useCartStore } from '../stores/cartStore'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const cartStore = useCartStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const loading = computed(() => authStore.loading)
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''
  
  if (!email.value || !password.value) {
    errorMessage.value = 'Veuillez remplir tous les champs'
    return
  }

  const result = await authStore.login(email.value, password.value)
  
  if (result.success) {
    // Sync cart with server after login
    await cartStore.syncCartWithServer()
    
    // Redirect to query param or default to luxe
    const redirect = route.query.redirect || '/luxe'
    router.push(redirect)
  } else {
    errorMessage.value = result.message
  }
}
</script>
