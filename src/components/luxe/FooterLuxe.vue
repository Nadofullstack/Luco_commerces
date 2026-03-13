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
            <li><a class="hover:text-primary transition-colors" href="#">About Us</a></li>
            <li><a class="hover:text-primary transition-colors" href="#">Collections</a></li>
            <li><a class="hover:text-primary transition-colors" href="#">Store Locator</a></li>
            <li><a class="hover:text-primary transition-colors" href="#">Press Room</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-bold mb-6">Support</h4>
          <ul class="space-y-4 text-sm text-slate-400">
            <li><a class="hover:text-primary transition-colors" href="#">Track Order</a></li>
            <li>
              <a class="hover:text-primary transition-colors" href="#">Returns &amp; Refunds</a>
            </li>
            <li><a class="hover:text-primary transition-colors" href="#">Contact Support</a></li>
            <li><a class="hover:text-primary transition-colors" href="#">WhatsApp Concierge</a></li>
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
          <a class="text-slate-500 hover:text-primary" href="#"
            ><span class="material-symbols-outlined text-xl">social_leaderboard</span></a
          >
          <a class="text-slate-500 hover:text-primary" href="#"
            ><span class="material-symbols-outlined text-xl">camera_alt</span></a
          >
          <a class="text-slate-500 hover:text-primary" href="#"
            ><span class="material-symbols-outlined text-xl">share</span></a
          >
        </div>
      </div>
    </div>
  </footer>
</template>
