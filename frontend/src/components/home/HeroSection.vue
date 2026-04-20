<template>
  <header class="relative pt-20 overflow-hidden">
    <div class="absolute inset-0 z-0">
      <div
        class="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/80 to-transparent z-10"
      ></div>
      <img
        alt="Hero Background"
        class="w-full h-full object-cover"
        src=  'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80'
      />
    </div>
    <div
      class="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 flex flex-col items-start"
    >
      <div class="max-w-2xl">
        <span
          class="inline-block px-4 py-1.5 mb-6 rounded-full bg-forest/30 border border-forest text-primary text-xs font-bold uppercase tracking-widest"
          >Collection 2024</span
        >
        <h1 class="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6" v-html="title">
        </h1>
        <p class="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-light">
          {{ subtitle }}
        </p>
        <div class="flex flex-wrap gap-4">
          <button
            class="px-8 py-4 bg-primary text-midnight font-bold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2"
            @click.prevent="primaryClick"
          >
            {{ primaryLabel }}
            <span class="material-symbols-outlined">arrow_forward</span>
          </button>
          <button
            class="px-8 py-4 bg-white/10 text-gold font-bold rounded-lg border border-gold hover:bg-white/20 backdrop-blur-sm transition-all"
            @click.prevent="secondaryClick"
          >
            {{ secondaryLabel }}
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default:
      "Découvrez l'Excellence <br /><span class=\"text-primary\">du Marché</span>",
  },
  subtitle: {
    type: String,
    default:
      'Une sélection premium pour vos besoins quotidiens. L\'élégance et la qualité réunies dans un catalogue exclusif de produits raffinés.',
  },
  primaryLabel: { type: String, default: 'Voir les Produits' },
  secondaryLabel: { type: String, default: 'Nous Contacter' },
})
const emit = defineEmits(['primaryClick', 'secondaryClick'])

function primaryClick() {
  emit('primaryClick')
}

function secondaryClick() {
  emit('secondaryClick')
}
</script>
