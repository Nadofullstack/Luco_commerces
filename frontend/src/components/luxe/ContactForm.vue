<template>
  <div>
    <h3 class="text-3xl font-bold text-midnight dark:text-white mb-8">Envoyez-nous un message</h3>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-600 dark:text-slate-400">Nom complet</label>
          <input
            v-model="form.name"
            class="w-full bg-transparent border-b-2 border-slate-200 dark:border-white/10 focus:border-primary outline-none py-3 transition-colors text-midnight dark:text-white placeholder-slate-400"
            placeholder="Jean Dupont"
            type="text"
            required
          />
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-600 dark:text-slate-400"
            >Email professionnel</label
          >
          <input
            v-model="form.email"
            class="w-full bg-transparent border-b-2 border-slate-200 dark:border-white/10 focus:border-primary outline-none py-3 transition-colors text-midnight dark:text-white placeholder-slate-400"
            placeholder="jean@exemple.com"
            type="email"
            required
          />
        </div>
      </div>
      <div class="space-y-2">
        <label class="text-sm font-medium text-slate-600 dark:text-slate-400">Sujet</label>
        <input
          v-model="form.subject"
          class="w-full bg-transparent border-b-2 border-slate-200 dark:border-white/10 focus:border-primary outline-none py-3 transition-colors text-midnight dark:text-white placeholder-slate-400"
          placeholder="Comment pouvons-nous vous aider ?"
          type="text"
          required
        />
      </div>
      <div class="space-y-2">
        <label class="text-sm font-medium text-slate-600 dark:text-slate-400">Message</label>
        <textarea
          v-model="form.message"
          class="w-full bg-transparent border-b-2 border-slate-200 dark:border-white/10 focus:border-primary outline-none py-3 transition-colors text-midnight dark:text-white placeholder-slate-400 resize-none"
          placeholder="Votre message..."
          rows="4"
          required
        ></textarea>
      </div>
      <button
        :disabled="isLoading"
        class="w-full md:w-auto bg-midnight dark:bg-white text-white dark:text-midnight font-bold py-4 px-12 rounded-lg hover:bg-navy dark:hover:bg-slate-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        type="submit"
      >
        <span v-if="isLoading">Envoi en cours...</span>
        <span v-else class="flex items-center gap-2">
          Envoyer le message
          <span class="material-symbols-outlined">send</span>
        </span>
      </button>
    </form>

    <!-- Toast Notification -->
    <Transition name="fade">
      <div
        v-if="notification.show"
        class="fixed bottom-6 right-6 px-6 py-4 rounded-lg shadow-xl z-50 flex items-center gap-3"
        :class="notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'"
      >
        <span class="material-symbols-outlined">{{ notification.type === 'success' ? 'check_circle' : 'error' }}</span>
        <span class="text-white font-medium">{{ notification.message }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isLoading = ref(false)
const notification = ref({
  show: false,
  message: '',
  type: 'success'
})

const showNotification = (message, type = 'success') => {
  notification.value = { show: true, message, type }
  setTimeout(() => {
    notification.value.show = false
  }, 4000)
}

const handleSubmit = async () => {
  if (isLoading.value) return
  
  isLoading.value = true
  
  try {
    const response = await fetch('/api/contact/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message
      })
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de l\'envoi du message')
    }
    
    // Reset form
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
    
    showNotification('Message envoyé avec succès! Nous vous répondrons bientôt.', 'success')
  } catch (error) {
    showNotification(error.message || 'Erreur lors de l\'envoi du message', 'error')
  } finally {
    isLoading.value = false
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
