<template>
  <section class="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
    <div
      class="bg-white dark:bg-anthracite rounded-xl shadow-2xl p-8 md:p-12 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8"
    >
      <div class="flex-1">
        <div class="flex items-center gap-3 mb-4">
          <span class="flex h-3 w-3 rounded-full bg-primary animate-pulse"></span>
          <span class="text-primary font-semibold uppercase tracking-widest text-sm"
            >Support Prioritaire</span
          >
        </div>
        <h2 class="text-2xl md:text-3xl font-bold text-midnight dark:text-white mb-4">
          Assistance instantanée via WhatsApp
        </h2>
        <p class="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
          Passez commande, suivez votre colis ou obtenez des réponses immédiates en discutant
          directement avec nos conseillers shopping.
        </p>
      </div>
      <a
        class="inline-flex items-center justify-center gap-3 bg-primary hover:bg-[#20bd5a] text-midnight font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-lg group cursor-pointer"
        :href="whatsappUrl"
        target="_blank"
        rel="noopener noreferrer"
        @click="handleClick"
      >
        <span class="material-symbols-outlined text-2xl">chat</span>
        <span>Nous contacter sur WhatsApp</span>
      </a>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import whatsappService from '../../services/whatsappService'

const whatsappUrl = ref('#')

const generateUrl = async () => {
  try {
    const message = whatsappService.generateContactMessage()
    const result = await whatsappService.getWhatsAppLink(message)
    
    if (result.success && result.whatsappUrl) {
      whatsappUrl.value = result.whatsappUrl
    } else {
      whatsappUrl.value = whatsappService.generateFallbackWhatsAppLink(message)
    }
  } catch (error) {
    console.error('[WhatsAppSupport] Erreur:', error)
    const message = whatsappService.generateContactMessage()
    whatsappUrl.value = whatsappService.generateFallbackWhatsAppLink(message)
  }
}

const handleClick = () => {
  // Le lien s'ouvre déjà dans un nouvel onglet via target="_blank"
}

onMounted(() => {
  generateUrl()
})
</script>
