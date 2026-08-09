import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('@/views/Landing.vue'),
    meta: {
      title: 'Zero Latency Memory for AI Agents',
      description:
        'Drop-in memory infrastructure for AI agents and apps. Zero-latency context that persists across sessions and agents. Built for production.',
    },
  },
  {
    path: '/cases/customer-support',
    name: 'CaseCustomerSupport',
    component: () => import('@/views/cases/CustomerSupport.vue'),
  },
  {
    path: '/cases/sales',
    name: 'CaseSales',
    component: () => import('@/views/cases/Sales.vue'),
  },
  {
    path: '/cases/healthcare',
    name: 'CaseHealthcare',
    component: () => import('@/views/cases/Healthcare.vue'),
  },
  {
    path: '/cases/education',
    name: 'CaseEducation',
    component: () => import('@/views/cases/Education.vue'),
  },
  {
    path: '/cases/devtools',
    name: 'CaseDevTools',
    component: () => import('@/views/cases/DevTools.vue'),
  },
  {
    path: '/cases/e-commerce',
    name: 'CaseECommerce',
    component: () => import('@/views/cases/ECommerce.vue'),
  },
  {
    path: '/status',
    name: 'Status',
    component: () => import('@/views/Status.vue'),
    meta: { title: 'Status', description: 'Actx0 platform status' },
  },
  {
    path: '/docs',
    name: 'Docs',
    component: () => import('@/views/Docs.vue'),
    meta: { title: 'Docs', description: 'Actx0 documentation' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

export default router
