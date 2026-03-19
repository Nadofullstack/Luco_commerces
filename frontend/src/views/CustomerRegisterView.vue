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

      <!-- Register Card -->
      <div class="bg-slate-800/50 backdrop-blur-sm border border-navy/50 rounded-2xl p-8 shadow-2xl">
        <h1 class="text-2xl font-bold text-white mb-2">Créer un compte</h1>
        <p class="text-slate-400 mb-6">Rejoignez Luco pour une expérience shopping exclusive</p>

        <!-- Error Message -->
        <div v-if="errorMessage" class="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
          {{ errorMessage }}
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm">
          {{ successMessage }}
        </div>

        <!-- Register Form -->
        <form @submit.prevent="handleRegister" class="space-y-4">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-slate-300 mb-2">Nom complet</label>
            <input
              id="name"
              v-model="name"
              type="text"
              required
              class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Votre nom"
            />
          </div>

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

          <!-- Phone -->
          <div>
            <label for="phone" class="block text-sm font-medium text-slate-300 mb-2">Téléphone (optionnel)</label>
            <input
              id="phone"
              v-model="phone"
              type="tel"
              class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="+229 XX XX XX XX"
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
                minlength="6"
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
            <p class="text-xs text-slate-500 mt-1">Minimum 6 caractères</p>
          </div>

          <!-- Confirm Password -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-slate-300 mb-2">Confirmer le mot de passe</label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              required
              class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 px-4 bg-gradient-to-r from-primary to-gold hover:from-primary/80 hover:to-gold/80 text-midnight font-semibold rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 mt-6"
          >
            <span v-if="loading" class="material-symbols-outlined animate-spin">sync</span>
            <span>{{ loading ? 'Création...' : 'Créer mon compte' }}</span>
          </button>
        </form>

        <!-- Login Link -->
        <div class="mt-6 text-center">
          <p class="text-slate-400">
            Déjà client ?
            <router-link to="/client/login" class="text-primary hover:text-gold font-medium transition-colors">
              Se connecter
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
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const loading = computed(() => authStore.loading)

// Email validation
const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const handleRegister = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  // Validation
  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    errorMessage.value = 'Veuillez remplir tous les champs obligatoires'
    return
  }

  if (!isValidEmail(email.value)) {
    errorMessage.value = 'Veuillez entrer une adresse email valide'
    return
  }

  if (password.value.length < 6) {
    errorMessage.value = 'Le mot de passe doit contenir au moins 6 caractères'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Les mots de passe ne correspondent pas'
    return
  }

  const customerData = {
    name: name.value,
    email: email.value,
    password: password.value,
    phone: phone.value || undefined
  }

  const result = await authStore.register(customerData)
  
  if (result.success) {
    successMessage.value = 'Compte créé avec succès ! Vous pouvez maintenant vous connecter.'
    
    // Redirect to login after 2 seconds
    setTimeout(() => {
      router.push('/client/login')
    }, 2000)
  } else {
    errorMessage.value = result.message
  }
}
</script>
