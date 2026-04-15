<template>
  <footer class="bg-navy pt-20 pb-10 border-t border-white/5">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20"
    >
      <div>
        <div class="flex items-center gap-2 mb-6">
          <span class="material-symbols-outlined text-primary text-3xl">diamond</span>
          <span class="text-xl font-bold tracking-tight text-white">Luco</span>
        </div>
        <p class="text-slate-400 leading-relaxed mb-6">
          Votre destination ultime pour des produits d'exception. Nous redéfinissons le shopping en
          ligne avec une attention particulière portée aux détails.
        </p>
        <div class="flex gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors text-slate-300"
          >
            <span class="material-symbols-outlined">social_leaderboard</span>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors text-slate-300"
          >
            <span class="material-symbols-outlined">camera_enhance</span>
          </a>
          <router-link
            to="/contact"
            class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors text-slate-300"
          >
            <span class="material-symbols-outlined">mail</span>
          </router-link>
        </div>
      </div>
      <div>
        <h4 class="text-taupe font-bold mb-6 text-lg">Navigation</h4>
        <ul class="space-y-4">
          <li>
            <router-link class="text-slate-400 hover:text-primary transition-colors" to="/">Accueil</router-link>
          </li>
          <li>
            <router-link class="text-slate-400 hover:text-primary transition-colors" :to="{ path: '/', hash: '#products' }">Produits</router-link>
          </li>
          <li>
            <router-link class="text-slate-400 hover:text-primary transition-colors" to="/panier">Panier</router-link>
          </li>
          <li>
            <router-link class="text-slate-400 hover:text-primary transition-colors" to="/contact">Contact</router-link>
          </li>
        </ul>
      </div>
      <div>
        <h4 class="text-taupe font-bold mb-6 text-lg">Support</h4>
        <ul class="space-y-4">
          <li><router-link class="text-slate-400 hover:text-primary transition-colors" to="/contact">FAQ</router-link></li>
          <li>
            <router-link class="text-slate-400 hover:text-primary transition-colors" to="/contact">Livraison</router-link>
          </li>
          <li>
            <router-link class="text-slate-400 hover:text-primary transition-colors" to="/contact">Retours</router-link>
          </li>
          <li>
            <router-link class="text-slate-400 hover:text-primary transition-colors" to="/contact">Confidentialité</router-link>
          </li>
        </ul>
      </div>
      <div>
        <h4 class="text-taupe font-bold mb-6 text-lg">Contact</h4>
        <ul class="space-y-4 text-slate-400">
          <li class="flex items-start gap-3">
            <span class="material-symbols-outlined text-primary">location_on</span>
            <span>Cotonou, Bénin</span>
          </li>
          <li class="flex items-center gap-3">
            <span class="material-symbols-outlined text-primary">phone</span>
            <a href="tel:+22940487428" class="hover:text-primary transition-colors">+229 40 48 74 28</a>
          </li>
          <li class="flex items-center gap-3">
            <span class="material-symbols-outlined text-primary">chat</span>
            <a href="https://wa.me/22940487428" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition-colors">WhatsApp</a>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4"
    >
    
    </div>
  </footer>
</template>
