<template>
  <div class="bg-white dark:bg-midnight rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
    <div class="p-6 border-b border-slate-200 dark:border-slate-800">
      <h3 class="font-bold text-lg text-slate-900 dark:text-white">Quick Add Product</h3>
    </div>
    <div class="p-6">
      <form class="space-y-4" @submit.prevent="submitProduct">
        <div>
          <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">Product Name</label>
          <input v-model="name" type="text" required placeholder="e.g. Minimalist Lamp" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 focus:ring-primary focus:border-primary text-slate-900" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">SKU</label>
          <input v-model="sku" type="text" required placeholder="SKU-001" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 focus:ring-primary focus:border-primary text-slate-900" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">Description</label>
          <textarea v-model="description" rows="3" placeholder="Brief details..." class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 focus:ring-primary focus:border-primary text-slate-900"></textarea>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">Price ($)</label>
            <input v-model="price" type="number" min="0" step="0.01" required placeholder="0.00" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 focus:ring-primary focus:border-primary text-slate-900" />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">Category</label>
            <select v-model="category" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 focus:ring-primary focus:border-primary text-slate-900">
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Beauty</option>
              <option>Accessories</option>
            </select>
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">Stock Status</label>
          <select v-model="status" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 focus:ring-primary focus:border-primary text-slate-900">
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">Image Upload</label>
          <input type="file" @change="onImageSelected" accept="image/*" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 focus:ring-primary focus:border-primary text-slate-900" />
          <div v-if="previewImage" class="mt-2">
            <img :src="previewImage" alt="Preview" class="h-20 rounded-lg object-cover border border-slate-200" />
          </div>
        </div>
        <button type="button" @click="showConfirm = true" class="w-full bg-primary text-white font-bold py-2.5 rounded-xl shadow-lg hover:bg-blue-600 transition-all">Publish Product</button>
      </form>
    </div>
  </div>

  <div v-if="showConfirm" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
      <h3 class="text-lg font-bold text-slate-900 mb-3">Confirmer l'ajout</h3>
      <p class="text-sm text-slate-600 mb-5">Voulez-vous vraiment ajouter ce produit ?</p>
      <div class="flex gap-2 justify-end">
        <button @click="showConfirm = false" class="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100">Annuler</button>
        <button @click="confirmAdd" class="px-4 py-2 rounded-lg bg-primary text-white font-bold hover:bg-blue-600">Ajouter</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['create'])

const name = ref('')
const sku = ref('')
const description = ref('')
const price = ref('')
const category = ref('Electronics')
const status = ref('In Stock')
const imageFile = ref(null)
const previewImage = ref('')
const showConfirm = ref(false)

const onImageSelected = (event) => {
  const file = event.target.files[0]
  if (!file) return
  imageFile.value = file
  previewImage.value = URL.createObjectURL(file)
}

const submitProduct = () => {
  if (!name.value || !sku.value || !price.value) return
  emit('create', {
    name: name.value,
    sku: sku.value,
    description: description.value,
    category: category.value,
    price: Number(price.value),
    status: status.value,
    imageFile: imageFile.value,
  })
  name.value = ''
  sku.value = ''
  description.value = ''
  price.value = ''
  category.value = 'Electronics'
  status.value = 'In Stock'
  imageFile.value = null
  previewImage.value = ''
  showConfirm.value = false
}

const confirmAdd = () => {
  submitProduct()
}
</script>

<style scoped>
</style>