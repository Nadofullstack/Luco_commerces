<template>
  <div
    class="bg-white dark:bg-midnight rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
  >
    <div class="p-6 border-b border-slate-200 dark:border-slate-800">
      <h3 class="font-bold text-lg text-slate-900 dark:text-white">Quick Add Product</h3>
    </div>
    <div class="p-6">
      <form class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5"
            >Product Name</label
          >
          <input
            class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 focus:ring-primary focus:border-primary text-slate-100"
            placeholder="e.g. Minimalist Lamp"
            type="text"
          />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5"
            >Description</label
          >
          <textarea
            class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 focus:ring-primary focus:border-primary text-slate-100"
            placeholder="Brief details about the product..."
            rows="3"
          ></textarea>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label
              class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5"
              >Price ($)</label
            >
            <input
              class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 focus:ring-primary focus:border-primary text-slate-100"
              placeholder="0.00"
              type="number"
            />
          </div>
          <div>
            <label
              class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5"
              >Category</label
            >
            <select
              class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 focus:ring-primary focus:border-primary text-slate-100"
            >
              <option>Select</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Beauty</option>
            </select>
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5"
            >Product Image</label
          >
          <div
            class="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-primary transition-colors cursor-pointer group bg-slate-50 dark:bg-slate-800/30"
          >
            <span
              class="material-symbols-outlined text-3xl text-slate-400 group-hover:text-primary mb-2 transition-colors"
              >cloud_upload</span
            >
            <p class="text-xs text-slate-500 font-medium">
              Drag &amp; drop or <span class="text-primary">browse</span>
            </p>
            <p class="text-[10px] text-slate-400 mt-1">PNG, JPG up to 5MB</p>
          </div>
        </div>
        <button
          class="w-full bg-midnight dark:bg-primary text-white dark:text-midnight font-bold py-3 rounded-xl shadow-lg hover:shadow-primary/30 active:scale-95 transition-all mt-2"
          type="submit"
        >
          Publish Product
        </button>
      </form>
    </div>
  </div>
</template>
