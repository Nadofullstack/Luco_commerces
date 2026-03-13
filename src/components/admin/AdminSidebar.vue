<template>
  <aside class="w-64 bg-navy dark:bg-midnight border-r border-slate-800 flex flex-col">
    <div class="p-6 flex items-center gap-3">
      <div
        class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20"
      >
        <span class="material-symbols-outlined text-midnight font-bold">diamond</span>
      </div>
      <div>
        <h1 class="text-white font-bold text-lg leading-tight">LUXE</h1>
        <p class="text-sage text-xs uppercase tracking-widest font-semibold">Admin Panel</p>
      </div>
    </div>
    <nav class="flex-1 px-4 space-y-2 mt-4">
      <router-link
        v-for="item in menuItems"
        :key="item.name"
        :to="item.path"
        class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
        :class="[
          route.path === item.path ? 'bg-primary text-midnight' : 'text-slate-400 hover:text-white hover:bg-white/5',
          item.highlight ? 'shadow-lg shadow-primary/20' : ''
        ]"
      >
        <span class="material-symbols-outlined" :class="item.iconBold ? 'font-bold' : ''">{{ item.icon }}</span>
        <span :class="item.highlight ? 'font-bold text-sm' : 'font-medium text-sm'">{{ item.name }}</span>
      </router-link>
      <div class="pt-4 pb-2 px-4">
        <p class="text-[10px] uppercase text-slate-500 font-bold tracking-widest">System</p>
      </div>
      <router-link
        to="/admin/settings"
        class="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
      >
        <span class="material-symbols-outlined">settings</span>
        <span class="font-medium text-sm">Settings</span>
      </router-link>
      <router-link
        to="/admin/support"
        class="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
      >
        <span class="material-symbols-outlined">help</span>
        <span class="font-medium text-sm">Support</span>
      </router-link>
    </nav>
    <div class="p-4 mt-auto">
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

const menuItems = [
  { name: 'Dashboard', icon: 'dashboard', path: '/admin' },
  { name: 'Products', icon: 'inventory_2', path: '/admin', highlight: true, iconBold: true },
  { name: 'Orders', icon: 'shopping_cart', path: '/admin/orders' },
  { name: 'Customers', icon: 'group', path: '/admin/customers' },
]
</script>
