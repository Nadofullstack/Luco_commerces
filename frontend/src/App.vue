<template>
  <div
    class="bg-navy dark:bg-midnight text-slate-900 dark:text-slate-100 font-display transition-colors duration-300"
  >
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>
