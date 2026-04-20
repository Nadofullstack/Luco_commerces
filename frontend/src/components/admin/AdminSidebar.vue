<template>
  <aside 
    class="bg-navy dark:bg-midnight border-r border-slate-800 flex flex-col transition-all duration-300 h-full"
    :class="isCollapsed ? 'w-20' : 'w-64'"
  >
    <div class="p-4 flex items-center gap-3" :class="isCollapsed ? 'justify-center' : ''">
      <div
        class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0"
      >
        <span class="material-symbols-outlined text-midnight font-bold">diamond</span>
      </div>
      <div v-if="!isCollapsed">
        <h1 class="text-white font-bold text-lg leading-tight">LUXE</h1>
        <p class="text-sage text-xs uppercase tracking-widest font-semibold">Admin Panel</p>
      </div>
    </div>
    
    <!-- Toggle Button (Desktop) / Close Button (Mobile) -->
    <div class="flex justify-center mb-4">
      <button 
        @click="$emit('toggle', 'desktop')"
        class="hidden lg:flex p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
      >
        <span class="material-symbols-outlined">{{ isCollapsed ? 'chevron_right' : 'chevron_left' }}</span>
      </button>
      <button 
        @click="$emit('toggle', 'mobile')"
        class="lg:hidden p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
      >
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    
    <nav class="flex-1 px-2 lg:px-4 space-y-2 mt-2">
      <router-link
        v-for="item in menuItems"
        :key="item.name"
        :to="item.path"
        @click="handleLinkClick"
        class="flex items-center gap-3 px-3 py-3 rounded-xl transition-all"
        :class="[
          route.path === item.path ? 'bg-primary text-midnight' : 'text-slate-400 hover:text-white hover:bg-white/5',
          isCollapsed ? 'justify-center' : ''
        ]"
      >
        <span class="material-symbols-outlined" :class="route.path === item.path ? 'font-bold' : ''">{{ item.icon }}</span>
        <span v-if="!isCollapsed" class="font-medium text-sm">{{ item.name }}</span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

defineProps({
  isCollapsed: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle', 'link-click'])

const menuItems = [
  { name: 'Dashboard', icon: 'dashboard', path: '/admin' },
  { name: 'Products', icon: 'inventory_2', path: '/admin/products' },
  { name: 'Orders', icon: 'shopping_cart', path: '/admin/orders' },
]

const handleLinkClick = () => {
  // Émettre l'événement pour fermer le sidebar en mobile
  emit('link-click')
}
</script>