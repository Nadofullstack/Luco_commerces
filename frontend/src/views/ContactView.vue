<template>
  <div>
    <main>
      <ContactHero />
      <WhatsAppSupport />
      <section class="max-w-7xl mx-auto px-4 py-24">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <ContactForm />
          </div>
          <div>
            <StoreInfo />
          </div>
        </div>
      </section>
    </main>
    <FooterLuxe />
  </div>
</template>

<script setup>
import FooterLuxe from '../components/luxe/FooterLuxe.vue'
import ContactHero from '../components/luxe/ContactHero.vue'
import WhatsAppSupport from '../components/luxe/WhatsAppSupport.vue'
import ContactForm from '../components/luxe/ContactForm.vue'
import StoreInfo from '../components/luxe/StoreInfo.vue'
</script>
