<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-white/10 bg-background-dark/80 backdrop-blur-md"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center gap-8">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-3xl">diamond</span>
            <h1 class="text-xl font-bold tracking-tighter text-white">LUXE</h1>
          </div>
          <nav class="hidden md:flex items-center gap-6">
            <a
              class="text-sm font-medium text-slate-300 hover:text-primary transition-colors"
              href="#"
              >Collections</a
            >
            <a
              class="text-sm font-medium text-slate-300 hover:text-primary transition-colors"
              href="#"
              >Watches</a
            >
            <a
              class="text-sm font-medium text-slate-300 hover:text-primary transition-colors"
              href="#"
              >Fashion</a
            >
            <a
              class="text-sm font-medium text-slate-300 hover:text-primary transition-colors"
              href="#"
              >Tech</a
            >
          </nav>
        </div>
        <div class="flex items-center gap-4">
          <div class="relative hidden sm:block">
            <span
              class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl"
              >search</span
            >
            <input
              class="bg-navy border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary w-64 text-white"
              placeholder="Search luxury..."
              type="text"
            />
          </div>
          <button class="p-2 text-slate-300 hover:text-primary transition-colors">
            <span class="material-symbols-outlined">shopping_cart</span>
          </button>
          <button class="p-2 text-slate-300 hover:text-primary transition-colors">
            <span class="material-symbols-outlined">person</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
