<template>
  <div>
    <Navbar />

    <HeroSection
      @primaryClick="onHeroPrimary"
      @secondaryClick="onHeroSecondary"
    />

    <BenefitsSection />

    <CategoriesSection
      :categories="categories"
      :activeId="selectedCategory ? selectedCategory.id : null"
      @select="onCategorySelect"
    />

    <FeaturedProducts
      :products="filteredProducts"
      @order="handleOrder"
      @view="handleView"
    />

    <CTABanner @contact="onContact" />

    <Footer />
    <WhatsAppButton />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/layout/Navbar.vue'
import HeroSection from '../components/home/HeroSection.vue'
import BenefitsSection from '../components/home/BenefitsSection.vue'
import CategoriesSection from '../components/home/CategoriesSection.vue'
import FeaturedProducts from '../components/home/FeaturedProducts.vue'
import CTABanner from '../components/home/CTABanner.vue'
import Footer from '../components/layout/Footer.vue'
import WhatsAppButton from '../components/ui/WhatsAppButton.vue'

const router = useRouter()

// sample data (could be fetched from an API)
const products = ref([
  {
    id: 1,
    category: 'horlogerie',
    name: 'Classic Silver Edition',
    price: '123 765 FCFA',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCcZ6WU5OLcA-0oCNVfl2JtAjych7YTPI5jrG2SSRXWhY2gk_gaRlTMMgwW6Ta0VtMAOYawMqC_hpJkD_PtfkueMOk1qim8IO9gErwRbN7mhCIABtnARmy27Kuk6u4rvUdpu38uYz4oAysaJwHwbFT49zElyTa_GLG_vKpM1RCLe49wxvwf7jD10arTw71bLh1cty3l_rDN5e4hCdCDl3nGNyvEDwUmKRJ0bc5KyzM0Pit1RLLp7wspWCvmW7u4atB72ZY8TNPP5tYz',
    description: 'Montre analogique de précision avec cadran en saphir.',
  },
  {
    id: 2,
    category: 'technologie',
    name: 'Audio Pro Max',
    price: '227 275 FCFA',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB_mghSYzkBFP360StNUWQ0Cbavh7pd9miz2IllnWxWaQBJQ7mMLsFFcP4OuqbFx4lPrHx-p46OQrvW9Q14tj8MidymwvaN4Ak1p6RzHJMhJBVK9wXr38_Ka7GUs9KVgrUZWpO_OvhY7qvvjxxHaSnQi474jqsOC6LxlZHyN9BKl3mxm0r4PrO6XOya2Xt-pJ3GT9reKcr2FpynZXFRQ9wj0XpUhoIBbH0c947ILAAZ89ubDkZmrxoCoIF2rouV6A38ZaP5qknsq34U',
    description: 'Casque audio haute fidélité avec réduction de bruit active.',
  },
  {
    id: 3,
    category: 'mode-homme',
    name: 'Urban Stealth',
    price: '83 985 FCFA',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBzzeHnO2Nnbj62doM770eEQg_PTo-IWgv6Xopam-nDCv6j_F0GbLariSdvMTEQWkL-ueFgiQDG6V6fDQNQiVqqdMnlIBDZuS1v2YOyrgC4UhMmgk1aYe_lXMoQzf9ovVq349Jp1uSka6lKyVqTioGNqwxs4wvtZoL4UQyxIXq1hYws02sAq_4jDnMD4dvv9fexwDUpCz0MHzq5-LUVrHtrmyWCsDxvfd0XyTeUBU_79TQeAXC4u6-wyTMQ9NOpgc1ta9n_aPchx7eD',
    description: 'Baskets de ville minimalistes en cuir de qualité premium.',
  },
  {
    id: 4,
    category: 'parfumerie',
    name: 'Retro Vision X',
    price: '139 945 FCFA',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD6arAfhcm-sR31WiwZq34B1w6Xm0nF2-Y64TfHmypXwbXTwBfHiwX_IiKQIdwKr4Za4ngbNWF1nJmVnvTASxMK4OjhJyPvxNGtwNIjpLsz6NwWX65XdRxzJFjvrXSAqcNxGhpSSBvDB2_9tjEwz4BiD7e5c96mnnjBNcBpWPUUOtA1EpXUsHU0PG1pYhM1mFB27AcdRUBGJDOVDBbQKmz6XhxTQjAy0SvsdRYnSj7ycYdKXVw5KAK1SYn7T2iuYOc4SrFy5i8eQ1el',
    description: 'Appareil photo instantané au design iconique des années 70.',
  },
])

const categories = ref([
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
])

const selectedCategory = ref(null)

const filteredProducts = computed(() => {
  if (!selectedCategory.value) return products.value
  return products.value.filter((p) => p.category === selectedCategory.value.id)
})

function onCategorySelect(cat) {
  selectedCategory.value = cat
}

function handleOrder(product) {
  const phone = '22900000000' // placeholder
  const text = encodeURIComponent(`Bonjour, je souhaite commander : ${product.name}`)
  window.open(`https://wa.me/${phone}?text=${text}`, '_blank')
}

function handleView(product) {
  router.push(`/product/${product.id}`)
}

function onHeroPrimary() {
  const el = document.getElementById('products')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function onHeroSecondary() {
  // future: navigate to about/story
  console.log('hero secondary clicked')
}

function onContact() {
  router.push('/contact')
}
</script>
