<template>
  <div>
    <h3 class="text-3xl font-bold text-midnight dark:text-white mb-8">Envoyez-nous un message</h3>
    <form class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-600 dark:text-slate-400">Nom complet</label>
          <input
            class="w-full bg-transparent border-b-2 border-slate-200 dark:border-white/10 focus:border-primary outline-none py-3 transition-colors text-midnight dark:text-white placeholder-slate-400"
            placeholder="Jean Dupont"
            type="text"
          />
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-600 dark:text-slate-400"
            >Email professionnel</label
          >
          <input
            class="w-full bg-transparent border-b-2 border-slate-200 dark:border-white/10 focus:border-primary outline-none py-3 transition-colors text-midnight dark:text-white placeholder-slate-400"
            placeholder="jean@exemple.com"
            type="email"
          />
        </div>
      </div>
      <div class="space-y-2">
        <label class="text-sm font-medium text-slate-600 dark:text-slate-400">Sujet</label>
        <input
          class="w-full bg-transparent border-b-2 border-slate-200 dark:border-white/10 focus:border-primary outline-none py-3 transition-colors text-midnight dark:text-white placeholder-slate-400"
          placeholder="Comment pouvons-nous vous aider ?"
          type="text"
        />
      </div>
      <div class="space-y-2">
        <label class="text-sm font-medium text-slate-600 dark:text-slate-400">Message</label>
        <textarea
          class="w-full bg-transparent border-b-2 border-slate-200 dark:border-white/10 focus:border-primary outline-none py-3 transition-colors text-midnight dark:text-white placeholder-slate-400 resize-none"
          placeholder="Votre message..."
          rows="4"
        ></textarea>
      </div>
      <button
        class="w-full md:w-auto bg-midnight dark:bg-white text-white dark:text-midnight font-bold py-4 px-12 rounded-lg hover:bg-navy dark:hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
        type="submit"
      >
        Envoyer le message
        <span class="material-symbols-outlined">send</span>
      </button>
    </form>
  </div>
</template>
