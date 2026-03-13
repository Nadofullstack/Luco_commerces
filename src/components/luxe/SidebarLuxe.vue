<template>
  <aside class="w-full lg:w-64 shrink-0 space-y-8">
    <div class="space-y-4">
      <h3 class="text-xs font-semibold uppercase tracking-widest text-primary">Filters</h3>
      <div class="relative lg:hidden">
        <span
          class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          >search</span
        >
        <input
          class="w-full bg-navy border-none rounded-lg py-3 pl-10 text-sm text-white"
          placeholder="Search items..."
          type="text"
        />
      </div>
    </div>
    <div class="space-y-4">
      <h4 class="text-sm font-medium text-slate-200">Categories</h4>
      <div class="flex flex-col gap-2">
        <label
          class="flex items-center gap-3 p-2 rounded-lg bg-primary/10 border border-primary/20 cursor-pointer group"
        >
          <span class="material-symbols-outlined text-primary">watch</span>
          <span class="text-sm font-medium text-white">Watches</span>
        </label>
        <label
          class="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group"
        >
          <span class="material-symbols-outlined text-slate-400 group-hover:text-primary"
            >apparel</span
          >
          <span class="text-sm font-medium text-slate-400 group-hover:text-white">Fashion</span>
        </label>
        <label
          class="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group"
        >
          <span class="material-symbols-outlined text-slate-400 group-hover:text-primary"
            >devices</span
          >
          <span class="text-sm font-medium text-slate-400 group-hover:text-white">Technology</span>
        </label>
        <label
          class="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group"
        >
          <span class="material-symbols-outlined text-slate-400 group-hover:text-primary">air</span>
          <span class="text-sm font-medium text-slate-400 group-hover:text-white">Perfume</span>
        </label>
      </div>
    </div>
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h4 class="text-sm font-medium text-slate-200">Price Range</h4>
        <span class="text-xs text-primary font-mono">$500 - $5,000</span>
      </div>
      <div class="relative h-1 bg-navy rounded-full">
        <div class="absolute inset-y-0 left-1/4 right-1/4 bg-primary rounded-full"></div>
        <div
          class="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-lg cursor-pointer"
        ></div>
        <div
          class="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-lg cursor-pointer"
        ></div>
      </div>
    </div>
    <div class="pt-6 border-t border-white/5">
      <h4 class="text-sm font-medium text-slate-200 mb-4">Availability</h4>
      <div class="space-y-3">
        <label class="flex items-center gap-3">
          <input
            checked
            class="rounded border-navy bg-navy text-primary focus:ring-primary h-4 w-4"
            type="checkbox"
          />
          <span class="text-sm text-slate-400">In Stock</span>
        </label>
        <label class="flex items-center gap-3">
          <input
            class="rounded border-navy bg-navy text-primary focus:ring-primary h-4 w-4"
            type="checkbox"
          />
          <span class="text-sm text-slate-400">On Sale</span>
        </label>
      </div>
    </div>
  </aside>
</template>
