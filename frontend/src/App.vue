<template>
  <div
    class="bg-navy dark:bg-midnight text-slate-900 dark:text-slate-100 font-display transition-colors duration-300"
  >
    <!-- Navbar - Affichée sur toutes les pages sauf les pages admin -->
    <Navbar v-if="!isAdminRoute" />

    <router-view :class="{ 'pt-20': !isAdminRoute }" />

    <!-- Footer - Affiché sur toutes les pages sauf les pages admin -->
    <Footer v-if="!isAdminRoute" />
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const route = useRoute()

    // Vérifie si la route actuelle est une page admin
    const isAdminRoute = computed(() => {
      return route.path.startsWith('/admin')
    })

    return {
      isAdminRoute,
    }
  },
})
</script>
