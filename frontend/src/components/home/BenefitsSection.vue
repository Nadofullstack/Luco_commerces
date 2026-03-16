<template>
  <section class="py-16 bg-navy/30 border-y border-white/5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div
          v-for="benefit in benefits"
          :key="benefit.title"
          class="flex items-center gap-5 p-6 rounded-xl hover:bg-white/5 transition-colors"
        >
          <div :class="['w-14 h-14 flex items-center justify-center rounded-full', benefit.bg]">
            <span :class="['material-symbols-outlined', benefit.color, 'text-3xl']">
              {{ benefit.icon }}
            </span>
          </div>
          <div>
            <h4 class="font-bold text-lg">{{ benefit.title }}</h4>
            <p class="text-slate-400 text-sm">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  benefits: {
    type: Array,
    default: () => [
      {
        icon: 'bolt',
        color: 'text-gold',
        bg: 'bg-gold/10',
        title: 'Commande Rapide',
        description: 'Passer commande en quelques secondes.',
      },
      {
        icon: 'verified_user',
        color: 'text-forest',
        bg: 'bg-forest/10',
        title: 'Vendeur Certifié',
        description: 'Garantie de qualité et d\'authenticité.',
      },
      {
        icon: 'chat_bubble',
        color: 'text-primary',
        bg: 'bg-primary/10',
        title: 'Support WhatsApp',
        description: 'Une équipe à votre écoute 24/7.',
      },
    ],
  },
})
</script>
