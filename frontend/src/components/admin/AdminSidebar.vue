<template>
  <aside 
    class="bg-navy dark:bg-midnight border-r border-slate-800 flex flex-col transition-all duration-300"
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
          item.highlight ? 'shadow-lg shadow-primary/20' : '',
          isCollapsed ? 'justify-center' : ''
        ]"
      >
        <span class="material-symbols-outlined" :class="item.iconBold ? 'font-bold' : ''">{{ item.icon }}</span>
        <span v-if="!isCollapsed" :class="item.highlight ? 'font-bold text-sm' : 'font-medium text-sm'">{{ item.name }}</span>
      </router-link>
      <div v-if="!isCollapsed" class="pt-4 pb-2 px-4">
        <p class="text-[10px] uppercase text-slate-500 font-bold tracking-widest">System</p>
      </div>
      <router-link
        to="/admin/settings"
        @click="handleLinkClick"
        class="flex items-center gap-3 px-3 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
        :class="isCollapsed ? 'justify-center' : ''"
      >
        <span class="material-symbols-outlined">settings</span>
        <span v-if="!isCollapsed" class="font-medium text-sm">Settings</span>
      </router-link>
      <router-link
        to="/admin/support"
        @click="handleLinkClick"
        class="flex items-center gap-3 px-3 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
        :class="isCollapsed ? 'justify-center' : ''"
      >
        <span class="material-symbols-outlined">help</span>
        <span v-if="!isCollapsed" class="font-medium text-sm">Support</span>
      </router-link>
    </nav>
     <div v-if="!isCollapsed" class="p-4 mt-auto">
      <div class="bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
        <p class="text-xs text-slate-400 mb-2">Storage Usage</p>
        <div class="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
          <div class="bg-primary h-full w-[72%]"></div>
        </div>
        <p class="text-[10px] text-slate-500 mt-2 text-right">72% of 10GB</p>
      </div> 
    </div>
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
  { name: 'Products', icon: 'inventory_2', path: '/admin/products', highlight: true, iconBold: true },
  { name: 'Orders', icon: 'shopping_cart', path: '/admin/orders' },
  { name: 'Customers', icon: 'group', path: '/admin/customers' },
]

const handleLinkClick = () => {
  // Émettre l'événement link-click pour fermer le sidebar en mobile
  emit('link-click')
}
</script>
