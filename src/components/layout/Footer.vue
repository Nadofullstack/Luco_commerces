<template>
  <footer class="bg-navy pt-20 pb-10 border-t border-white/5">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20"
    >
      <div>
        <div class="flex items-center gap-2 mb-6">
          <span class="material-symbols-outlined text-primary text-3xl">diamond</span>
          <span class="text-xl font-bold tracking-tight text-white">PremiumMarket</span>
        </div>
        <p class="text-slate-400 leading-relaxed mb-6">
          Votre destination ultime pour des produits d'exception. Nous redéfinissons le shopping en
          ligne avec une attention particulière portée aux détails.
        </p>
        <div class="flex gap-4">
          <router-link
            class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors text-slate-300"
            to="/"
          >
            <span class="material-symbols-outlined">social_leaderboard</span>
          </router-link>
          <router-link
            class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors text-slate-300"
            to="/"
          >
            <span class="material-symbols-outlined">camera_enhance</span>
          </router-link>
          <router-link
            class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors text-slate-300"
            to="/"
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
            <router-link class="text-slate-400 hover:text-primary transition-colors" to="/">Nouveautés</router-link>
          </li>
          <li>
            <router-link class="text-slate-400 hover:text-primary transition-colors" to="/">Best Sellers</router-link>
          </li>
          <li>
            <router-link class="text-slate-400 hover:text-primary transition-colors" to="/">À Propos</router-link>
          </li>
        </ul>
      </div>
      <div>
        <h4 class="text-taupe font-bold mb-6 text-lg">Support</h4>
        <ul class="space-y-4">
          <li><router-link class="text-slate-400 hover:text-primary transition-colors" to="/">FAQ</router-link></li>
          <li>
            <router-link class="text-slate-400 hover:text-primary transition-colors" to="/">Livraison</router-link>
          </li>
          <li>
            <router-link class="text-slate-400 hover:text-primary transition-colors" to="/">Retours</router-link>
          </li>
          <li>
            <router-link class="text-slate-400 hover:text-primary transition-colors" to="/">Confidentialité</router-link>
          </li>
        </ul>
      </div>
      <div>
        <h4 class="text-taupe font-bold mb-6 text-lg">Contact</h4>
        <ul class="space-y-4 text-slate-400">
          <li class="flex items-start gap-3">
            <span class="material-symbols-outlined text-primary">location_on</span>
            <span>123 Avenue du Luxe, 75008 Paris, France</span>
          </li>
          <li class="flex items-center gap-3">
            <span class="material-symbols-outlined text-primary">phone</span>
            <span>+33 1 23 45 67 89</span>
          </li>
          <li class="flex items-center gap-3">
            <span class="material-symbols-outlined text-primary">chat</span>
            <span>+33 6 12 34 56 78</span>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4"
    >
      <p class="text-taupe text-sm">© 2024 PremiumMarket. Tous droits réservés.</p>
      <div class="flex gap-6">
        <img
          alt="Payment"
          class="h-6 opacity-40 grayscale"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuClYcrZEmB-h51eqioNpyfd_JW6LDwjIbk5v24LV0IydogPCBG4yYd09iSokJTCoDQXyyU_biUrtLWs7jNt7XauPdcY41F7cArDx3mt3IvU8k4okQZaEisjFGG70-95xqiaoOTXGtjM__FHCRg0Jr5xxPjAY_R-xqRb06MWp2FW_3KMATfFrZ7onXVzpwJFXdNT-6l13DeJAM9O2TlkXA1U7WEmLa0FSRQVUrTzoZhUJDkJAqrBRcebjtAgXOCcP1RpmPXOx-7-xet1"
        />
        <img
          alt="Payment"
          class="h-6 opacity-40 grayscale"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDe54Nkw41Ce17FIfvMrYxBI-cE5BBFS0U4W0BOJkqGl0zdrkk4biA8tByASM7m3-b0_60FbZJ2F5BQqQnpJyfQCkYKSuNDJkDMEwHBWu0QiYqx2vbStAwO4e7Q38ukEpdBvSqQZjel0gBkiFeM6aRph8kI0df7xAqJWi1JuQgtAAvXFfA80_F1jM0EX_l_9psJQIvD_MtKYaV-fW3JGIHsgG56Ob9n363IuGxiumlgQPnSvRrHIEQQav3eW5E4T_Dte4ZlYhiZzpyo"
        />
        <img
          alt="Payment"
          class="h-6 opacity-40 grayscale"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5UZjULox_9re05z78-ccKxbmxczKnsQxmCp4BlT-NT4BkX4x08rVXrbALYDIYEIKKtQV71nMluGdYOl5Q1x8MxNajFDsrEfe-h6sshf7Jqc_j2MZOncePpie1Meg5s8gL-YTTcbJ26Rscoslpx21cPE9jQAopzvnQ2m4onIX_Bu5inBFM916pCWcG2VhfXHwk4jShvQvrI5ZsXVHQNs8e4mMcYzghprIyta38iejK2YTa6zvyF4RZSf-XL27I1y2zFGrR2W2pHxV"
        />
      </div>
    </div>
  </footer>
</template>
