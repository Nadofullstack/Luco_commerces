<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    <ProductCardLuxe v-for="item in products" :key="item.id" :product="item" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProductCardLuxe from './ProductCardLuxe.vue'

const products = ref([
  {
    id: 1,
    name: 'Obsidian Chrono',
    price: '$1,299',
    label: 'New Arrival',
    description: 'A timeless masterpiece featuring sapphire crystal and 48-hour power reserve.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD3l4ZAe5-tG38PaVUg-SR4jybIo-f35sQ0sS6YgA-jt5huB4086FpgC4FZMx39gLTJpBRvnsfYPU_KshVu3l9rToIFc1IKxPDANVxGVRoJ7HDqF-kqWG_egJpXD8Neb6pKLowk-7neW6sQ-eOSlE5MQ742QGEykMS7Q_RwTqM_-dIeEqjFCT7jb9YgXk7YobOqFML8jk7hMq6302PIRb0IMbQConC0XYDLIvjebJ1JVcyDwmTraD3-Zi7nBHLyh5Yk6yGkrjh_UlP0',
  },
  {
    id: 2,
    name: 'Elysian Gold',
    price: '$2,450',
    description: '18k rose gold plating with a genuine Italian leather strap. Pure sophistication.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDF9K5UH6-1RC1UerBg8BtL7uIz5X3Uj3vnYHk9fOR13VY7MbpLM2FfjLMJ1Xfo7ACvuzFfcQo-kBjAk40bZ5tha2gN2B4qTVQ2vzaMJjhBXcF8fJ05OXECJnTfKiK5zS_It-e0wLiIFD_Yc4-zBNKmmmv_tOhcMtMBpXFJmHqtVI2YyE213splOFGmJQ_mxGmQibm6KocCe6uiFmlIXjWNiiJah2qxhF1s9dPBnmcu81V0ZPul5stVDg-dtFqL0pziRLvVgxw1Y34t',
  },
  {
    id: 3,
    name: 'Azure Marine',
    price: '$1,800',
    description: 'Water-resistant dive watch with luminous hands and a sunray blue dial.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAi4Cm7G-BCAoGBPe6lB_zkeVvLdk2ty3JmAufW2KEe5nBO_Dc4qt78_qYkeoj3ohXq9qaQfWiDXMmq8xex9KhNZYPq0j8lqBnL7eyZH9XnXQiiLIo0PV4-a-VCLEqQtJTdrFHwr7bgANFV01J3C0fSKja0ZUCgwUEL8CNuH-YEF9DZD5RFD7erzA8d1owqRWLozdTUfEfWcnpB2B118JI3jXRCzjFjctPnyoGzXN58_KOcm1AexAzb9idyjf-Tcv4czEfaVQeb7Bsw',
  },
  {
    id: 4,
    name: 'Quantum Smart',
    price: '$899',
    description: 'The intersection of haute horlogerie and cutting-edge technology.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAv-N-uWRqicaH2Hu97t05qCwsCDxSysASITuPxIKAxCiBNxdhP3VU3OOCWdfJrxRxo1PjKXU8ypbbflyIqoV2wh1D9tu_S_InIEhQp6sVq-SthtUn47_38hhRgMmFKS6rkImk2hzQHJX3cZjVG-ILvQhR2M73tjjQY4RH9SZv64ZKunmxYiDgLMSluRhulq8ZIXp50bUuWZ0IMym3PsW-EQRc6UkUcxl6OCqLCcZ025SxNzs2q8lIx0usPSzayuTUZH31Qf3nwh2Nf',
  },
  {
    id: 5,
    name: 'Heritage Class',
    price: '$1,100',
    description: 'A tribute to the pioneers. Hand-wound movement with minimalist design.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC8Nug-XMiqdo8l4WbuKFFUES9mwRtnTG5_UCsbOCxZ-_AMZGQmVfCL5d9I-gtCafiOF4L3lBU5Ju6Q1nmtnIVyQ2Pdoro2fzSr0TVx9FTLIxxjdzVhxF_fCkiaZ8qwg9h8MH_yYSKpS-gQw6lKmIaePreKNWmHIngnKads_IHH63n2Y9avqhF3-OwB0gEUdMzRnuV9SVhnir2xS-cyALboy_mrK8f5kP4A5vcCCuCuBRGO1GopfBHTcqRFGlTyO6tM4KajxQsH_p58',
  },
  {
    id: 6,
    name: 'Core Skeleton',
    price: '$3,200',
    description: 'Exposed mechanical movement for the true watch enthusiast. Automatic winding.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD7_OtCVAAdPWdDLSMux8PTS42TKY-bFnx41Etmb57j7MgZ-TV6XfgVIubudX9lNhH769v2lmrvWd02ckxf5T1CvVZzs6OFiqkLJMkhk9KCXELCAYqC8Y5VQNWgcro3w_8Y7FE0MhcZJXa-xffnXGhb4GBZJUHEzw5lhJRI9M2fZciYYO_IZtYDRkPEX_JWAsasv13H-eoeds2t-F769CYY6iR62lAU9zTmbh17DxQdVLlzkiQXssY8RKxL3XDhdfSXWrWc4kTpS2xH',
  },
])
</script>
