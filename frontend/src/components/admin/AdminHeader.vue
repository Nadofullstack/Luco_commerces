<template>
  <header
    class="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-midnight px-4 md:px-8 flex items-center justify-between z-10"
  >
    <div class="flex items-center gap-4 flex-1 max-w-xl">
      <!-- Mobile Toggle Button -->
      <button 
        @click="$emit('toggle-sidebar')"
        class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors lg:hidden"
      >
        <span class="material-symbols-outlined">menu</span>
      </button>
      <div class="relative w-full">
        <span
          class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl"
        >
          search
        </span>
        <input
          v-model="search"
          class="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/50 text-slate-100"
          placeholder="Search products, orders, or analytics..."
          type="text"
        />
      </div>
    </div>
    
    <div class="flex items-center gap-6">
      <button class="relative text-slate-400 hover:text-primary transition-colors">
        <span class="material-symbols-outlined">notifications</span>
        <span
          class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-midnight"
        ></span>
      </button>
      
      <div class="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
      
      <div class="flex items-center gap-3">
        <div class="text-right hidden sm:block">
          <p class="text-xs font-bold text-slate-900 dark:text-white">{{ userName }}</p>
          <p class="text-[10px] text-primary font-medium">{{ userRole }}</p>
        </div>
    
        <div
          class="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-primary/20 p-0.5 overflow-hidden"
        >
          <img
            class="w-full h-full rounded-full object-cover"
            :alt="`Profile avatar of ${userName}`"
            :src="avatarUrl || defaultAvatar"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'

// Props avec valeurs par défaut
const props = defineProps({
  modelValue: { 
    type: String, 
    default: '' 
  },
})

// Émits
const emit = defineEmits(['update:modelValue', 'toggle-sidebar'])

// Avatar par défaut (placeholder)
const defaultAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFTXSFRwD8zaq2xZLcS-mDX8AGpONw1d-52gxEcPc-YzHmJaq4yTGxknA9UBVpZdzBSafc7f4_vdX50-fzyiZ6XQS5prM7DFZRoZGTZhLasGafmtqfw6aVRTt-y6jQC0jn7oMVqfICIudljky6_E6gmC74NzlMKh8sdzl6TFptpRiAIlmmwAs37GW8EDww_cYuTVO-Vc14BhZPBtB-1HetWAtwAyu5xQWZt2pUwMH5rfGfI8J6HCp9yBE0XpDulnDyAwbV1FC5lDr_'

// Recherche locale
const search = ref(props.modelValue)

// Informations de l'admin connecté
const adminUser = ref(null)

// Computed pour le nom de l'utilisateur
const userName = computed(() => {
  return adminUser.value?.name || 'Administrateur'
})

// Computed pour le rôle de l'utilisateur
const userRole = computed(() => {
  return adminUser.value?.role || 'Admin'
})

// Computed pour l'avatar
const avatarUrl = computed(() => {
  return adminUser.value?.avatar || ''
})

// Récupérer les informations de l'admin depuis localStorage
const loadAdminInfo = () => {
  try {
    const storedUser = localStorage.getItem('adminUser')
    if (storedUser) {
      adminUser.value = JSON.parse(storedUser)
    }
  } catch (error) {
    console.error('Erreur lors du chargement des infos admin:', error)
  }
}

// Charger les infos au montage du composant
onMounted(() => {
  loadAdminInfo()
})

// Watcher pour émettre les changements
watch(search, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<style scoped>
/* Optionnel : pour s'assurer que l'image ne déborde pas */
img {
  max-width: 100%;
  height: 100%;
}
</style>