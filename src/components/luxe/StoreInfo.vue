<template>
  <div class="space-y-12">
    <div>
      <h3 class="text-3xl font-bold text-midnight dark:text-white mb-8">Informations de contact</h3>
      <div class="space-y-8">
        <div class="flex items-start gap-6">
          <div class="bg-primary/10 p-4 rounded-xl text-primary">
            <span class="material-symbols-outlined text-3xl">call</span>
          </div>
          <div>
            <p class="text-sm font-medium text-slate-500 uppercase tracking-widest mb-1">
              Téléphone
            </p>
            <p class="text-xl font-semibold text-midnight dark:text-white">+33 (0)1 23 45 67 89</p>
            <p class="text-slate-400 text-sm mt-1">Lun - Ven, 9h00 - 19h00</p>
          </div>
        </div>
        <div class="flex items-start gap-6">
          <div class="bg-primary/10 p-4 rounded-xl text-primary">
            <span class="material-symbols-outlined text-3xl">mail</span>
          </div>
          <div>
            <p class="text-sm font-medium text-slate-500 uppercase tracking-widest mb-1">Email</p>
            <p class="text-xl font-semibold text-midnight dark:text-white">
              contact@luxe-premium.fr
            </p>
            <p class="text-slate-400 text-sm mt-1">Réponse sous 24 heures</p>
          </div>
        </div>
        <div class="flex items-start gap-6">
          <div class="bg-primary/10 p-4 rounded-xl text-primary">
            <span class="material-symbols-outlined text-3xl">location_on</span>
          </div>
          <div>
            <p class="text-sm font-medium text-slate-500 uppercase tracking-widest mb-1">
              Boutique Flagship
            </p>
            <p class="text-xl font-semibold text-midnight dark:text-white">
              15 Avenue Montaigne, 75008 Paris
            </p>
            <p class="text-slate-400 text-sm mt-1">France</p>
          </div>
        </div>
      </div>
    </div>
    <div class="relative h-64 w-full rounded-2xl overflow-hidden border border-white/10 group">
      <div
        class="absolute inset-0 bg-navy grayscale group-hover:grayscale-0 transition-all duration-700 bg-cover bg-center"
        style="
          background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCvK5_IAQmoEw2Uf68jdcdm4dZWEX-Ewec2ZeddpqFbHY54i7lF74mTlW7R6Bgt7pTxt4aOdyM4_RGjj376ddOBPO67eKzzXCBOmUD8kyhY3HQLy91cXHndbXMgKBmmp1XYqN0mrRGUGsKrkbpTWjSQCvIHSul8AAdgw-pbwZNChe7-aEWLvqufI1qyGirYaln49a9YeVsISs_DgNdsa-lvEFyYUkPl8fGsJQR1_bGObJNeuv4qz25mzXQYz75PtyNRDIvap1U-IE90');
        "
      ></div>
      <div class="absolute inset-0 bg-midnight/40 flex items-center justify-center">
        <div class="bg-white p-3 rounded-full shadow-lg">
          <span class="material-symbols-outlined text-midnight text-3xl">push_pin</span>
        </div>
      </div>
    </div>
  </div>
</template>
