<template>
  <div class="min-h-screen bg-gradient-to-br from-midnight via-navy to-[#0b1835] text-white px-4 py-12 flex items-center justify-center">
    <div class="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-xl shadow-2xl p-6 md:p-8">
      <div class="mb-6 text-center">
        <div class="mx-auto w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center text-3xl shadow-lg shadow-primary/20 animate-pulse">
          <span class="material-symbols-outlined">security</span>
        </div>
        <p class="mt-3 text-xs uppercase tracking-[0.25em] text-primary font-semibold">Admin Workspace</p>
        <h1 class="mt-2 text-3xl font-extrabold text-white">Connexion Administrateur</h1>
        <p class="mt-2 text-slate-300 text-sm">Accédez à votre tableau de bord et gérez les produits, commandes et statistiques.</p>
      </div>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label class="text-slate-300 text-sm font-medium mb-1 block">Adresse e-mail</label>
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">email</span>
            <input
              v-model="email"
              type="email"
              placeholder="votre@admin.com"
              required
              class="w-full pl-10 pr-3 py-2.5 rounded-xl bg-navy border border-white/10 text-white placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/40 outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label class="text-slate-300 text-sm font-medium mb-1 block">Mot de passe</label>
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">lock</span>
            <input
              v-model="password"
              type="password"
              placeholder="********"
              required
              class="w-full pl-10 pr-3 py-2.5 rounded-xl bg-navy border border-white/10 text-white placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/40 outline-none transition-all"
            />
          </div>
        </div>

        <div class="flex items-center justify-between text-xs text-slate-300">
          <label class="inline-flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="remember" class="h-4 w-4 accent-primary rounded" />
            Se souvenir de moi
          </label>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-primary text-midnight font-bold py-2.5 rounded-xl shadow-lg shadow-primary/30 hover:bg-gold hover:text-midnight transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span class="material-symbols-outlined">login</span>
          <span v-if="!loading">Se connecter</span>
          <span v-else>Connexion…</span>
        </button>
      </form>

      <transition name="fade">
        <p v-if="error" class="mt-3 text-sm text-red-300 text-center">{{ error }}</p>
      </transition>

     
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const remember = ref(false)
const loading = ref(false)
const error = ref('')

const onSubmit = async () => {
  error.value = ''
  loading.value = true

  try {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value }),
    })
    const data = await response.json()
    loading.value = false

    if (!response.ok) {
      error.value = data.error || 'Échec de la connexion, réessayez.'
      return
    }

    // stocker token ou user (exemple localStorage)
    localStorage.setItem('adminToken', data.token)
    localStorage.setItem('adminUser', JSON.stringify(data.user))
    router.push('/admin/products')
  } catch (err) {
    loading.value = false
    error.value = 'Impossible de joindre le serveur. Vérifiez la connexion.'
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
