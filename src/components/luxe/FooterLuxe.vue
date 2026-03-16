<template>
  <footer class="mt-20 border-t border-white/5 bg-navy/50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div class="col-span-1 md:col-span-1">
          <div class="flex items-center gap-2 mb-6">
            <span class="material-symbols-outlined text-primary text-2xl">diamond</span>
            <h1 class="text-xl font-bold tracking-tighter text-white">LUXE</h1>
          </div>
          <p class="text-sm text-slate-400 leading-relaxed">
            Redefining luxury through curated excellence. Join the circle of elite collectors.
          </p>
        </div>
        <div>
          <h4 class="text-white font-bold mb-6">Quick Links</h4>
          <ul class="space-y-4 text-sm text-slate-400">
  
            <li><router-link class="hover:text-primary transition-colors" to="/">Collections</router-link></li>
            <li><router-link class="hover:text-primary transition-colors" to="/">Store Locator</router-link></li>
            <li><router-link class="hover:text-primary transition-colors" to="/">Press Room</router-link></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-bold mb-6">Support</h4>
          <ul class="space-y-4 text-sm text-slate-400">
            <li><router-link class="hover:text-primary transition-colors" to="/">Track Order</router-link></li>
            <li>
              <router-link class="hover:text-primary transition-colors" to="/">Returns &amp; Refunds</router-link>
            </li>
            <li><router-link class="hover:text-primary transition-colors" to="/">Contact Support</router-link></li>
            <li><router-link class="hover:text-primary transition-colors" to="/">WhatsApp Concierge</router-link></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-bold mb-6">Newsletter</h4>
          <p class="text-sm text-slate-400 mb-4">
            Subscribe to receive exclusive offers and early access.
          </p>
          <div class="flex gap-2">
            <input
              class="bg-navy border-none rounded-lg text-sm flex-1 focus:ring-1 focus:ring-primary text-white"
              placeholder="Email address"
              type="email"
            />
            <button
              class="bg-primary text-background-dark font-bold px-4 py-2 rounded-lg text-sm hover:bg-primary/90 transition-all"
            >
              Join
            </button>
          </div>
        </div>
      </div>
      <div
        class="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <p class="text-xs text-slate-500">© 2024 LUXE Premium Collections. All rights reserved.</p>
        <div class="flex gap-6">
          <router-link class="text-slate-500 hover:text-primary" to="/"
            ><span class="material-symbols-outlined text-xl">social_leaderboard</span></router-link
          >
          <router-link class="text-slate-500 hover:text-primary" to="/"
            ><span class="material-symbols-outlined text-xl">camera_alt</span></router-link
          >
          <router-link class="text-slate-500 hover:text-primary" to="/"
            ><span class="material-symbols-outlined text-xl">share</span></router-link
          >
        </div>
      </div>
    </div>
  </footer>
</template>
