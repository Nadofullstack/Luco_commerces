import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import ContactView from '../views/ContactView.vue'
import CartView from '../views/CartView.vue'
import CheckoutView from '../views/CheckoutView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/luxe', name: 'luxe', component: () => import('../views/LuxeView.vue') },
  { path: '/product/:id', name: 'product', component: ProductDetailView },
  { path: '/contact', name: 'contact', component: ContactView },
  { path: '/panier', name: 'cart', component: CartView },
  { path: '/checkout', name: 'checkout', component: CheckoutView },
  
  // Admin Routes (protégées)
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
    path: '/admin/customers',
    name: 'admin-customers',
    component: () => import('../views/CustomersView.vue'),
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
  { 
    path: '/admin/login', 
    name: 'admin-login', 
    component: () => import('../views/AdminLoginView.vue'),
    meta: { hideForAdmin: true }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Guard pour protéger les routes admin
router.beforeEach((to, from, next) => {
  const requiresAdmin = to.meta.requiresAdmin
  const hideForAdmin = to.meta.hideForAdmin
  const adminToken = localStorage.getItem('adminToken')
  
  // Vérifier si le token a expiré (optionnel: peut être implémenté avec jwt decode)
  if (adminToken) {
    try {
      // Vérifier la validité basique du token
      const tokenParts = adminToken.split('.')
      if (tokenParts.length !== 3) {
        // Token invalide, le supprimer
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminUser')
        if (requiresAdmin) {
          return next({ name: 'admin-login' })
        }
      }
    } catch (e) {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminUser')
      if (requiresAdmin) {
        return next({ name: 'admin-login' })
      }
    }
  }

  // Protection routes admin
  if (requiresAdmin && !adminToken) {
    return next({ name: 'admin-login' })
  }

  // Si déjà connecté, rediriger depuis la page login
  if (hideForAdmin && adminToken) {
    return next({ name: 'admin-products' })
  }

  next()
})

export default router
