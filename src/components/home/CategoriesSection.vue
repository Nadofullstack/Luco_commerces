<template>
  <section class="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-end mb-12">
      <div>
        <h2 class="text-3xl font-bold mb-2">Catégories</h2>
        <div class="h-1 w-20 bg-primary rounded-full"></div>
      </div>
      <a class="text-primary font-semibold flex items-center gap-1 hover:underline" href="#"
        >Tout voir <span class="material-symbols-outlined">chevron_right</span>
      </a>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="cat in categories"
        :key="cat.id"
        :class="['group relative h-64 overflow-hidden rounded-2xl cursor-pointer', { 'ring-4 ring-gold': cat.id === activeId } ]"
        @click="selectCategory(cat)"
      >
        <img
          :alt="cat.title"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          :src="cat.image"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-midnight/90 to-transparent flex items-end p-6"
        >
          <h3 class="text-white font-bold text-xl">{{ cat.title }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  categories: {
    type: Array,
    default: () => [
      {
        id: 'horlogerie',
        title: 'Horlogerie',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCLiZD0ICqH0wKNadND5NbpiH5qsc-7KTKM12m8k5zmL9rd2cxmVcTXPub3U32cmdkuPuZMMy07hR5NuxWZoLgli5-xD_eP-l48ZxTXMpMkA67NV0zEd07ipuYLen0EAS0b5jUHsk0nDLb9SOhH7TT06yyYvChXPmVbQcBi6Ue44m_taXbxzX4eF6YJJRBk4Jm3W3L2OfPBYpR968TneGujujFYo3eORjL5-TG8AfrbJLfPlit0K0LnUyXXaIaD3XE949z8W',
      },
      {
        id: 'technologie',
        title: 'Technologie',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAc4pNM5llrKDlNcJrtptB17k6oCu4nsJz9dmtWVaL4enxY33dJ1Xoa5dhNn9wsUzaprDgXJgT9OYUiCbks_h6jNH6D9JiZ6apaR2E43VxUX4R7qR8hzbAAKThIx5ij5QXzD6kqP4tmNtcsVZAp8QB-_UEAU2p-LK_vKCrRS-Ty9IbJmtSdz-yB9ct-bWjnGbcI7dd7x3PGDz7CgokfkQ6lyUv35qsDHrrVZwHpx7M7h97QOFtTwSP_sLLq2xhcSZzDnylPyeAKdbdI',
      },
      {
        id: 'mode-homme',
        title: 'Mode Homme',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDhBk2Nygz44mZd6B-xSqsO7UBCbOMCcFuav5SPAoA1hghMk6nyd453n0AX6Ofr1ozuseph8zFQZpT5K9odfvBLRCOgi-N07hyCDX0RqXgC4UhMmgk1aYe_lXMoQzf9ovVq349Jp1uSka6lKyVqTioGNqwxs4wvtZoL4UQyxIXq1hYws02sAq_4jDnMD4dvv9fexwDUpCz0MHzq5-LUVrHtrmyWCsDxvfd0XyTeUBU_79TQeAXC4u6-wyTMQ9NOpgc1ta9n_aPchx7eD',
      },
      {
        id: 'parfumerie',
        title: 'Parfumerie',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAu170X_5svL6AyZkFFwQeLrLNsqMYWzlYnIoVKCM_hdZN3pMDr8cyCG0ge-pG3r47kyT8hGWNyukErk60t75Y27ooQveQ0YAFZdbVTE1LPjyE9K5PrXH25WOXYpRXmZHn9aYSKSmTIRhGwEz2Funp5ewYkOozPI5agRsFNZNbsmZuNa4isZhe_vSCf-rMg6mgE0I2USrtm2y3VM-NP4dbxfRbfHQbMK7SGAKa_Y8z8UCCGxScyLIgbtdGZBhCKtvJBEE0HgDxf4MIV',
      },
    ],
  },
  activeId: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['select'])

function selectCategory(cat) {
  emit('select', cat)
}
</script>
