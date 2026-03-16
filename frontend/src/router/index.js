import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LuxeView from '../views/LuxeView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import ContactView from '../views/ContactView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/luxe', name: 'luxe', component: LuxeView },
  { path: '/product/:id', name: 'product', component: ProductDetailView },
  { path: '/contact', name: 'contact', component: ContactView },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue'),
    meta: { requiresAdmin: true },
  },
  {
    path: '/admin/products',
    name: 'admin-products',
    component: () => import('../views/AdminView.vue'),
    meta: { requiresAdmin: true },
  },
  {
    path: '/admin/orders',
    name: 'admin-orders',
    component: () => import('../views/OrdersView.vue'),
    meta: { requiresAdmin: true },
  },
  {
    path: '/admin/settings',
    name: 'admin-settings',
    component: () => import('../views/AdminView.vue'),
    meta: { requiresAdmin: true },
  },
  {
    path: '/admin/support',
    name: 'admin-support',
    component: () => import('../views/AdminView.vue'),
    meta: { requiresAdmin: true },
  },
  { path: '/admin/login', name: 'admin-login', component: () => import('../views/AdminLoginView.vue') },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const requiresAdmin = to.meta.requiresAdmin
  const token = localStorage.getItem('adminToken')

  if (requiresAdmin && !token) {
    return next({ name: 'admin-login' })
  }

  if (to.name === 'admin-login' && token) {
    return next({ name: 'admin-products' })
  }

  next()
})

export default router
