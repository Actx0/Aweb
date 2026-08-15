import { createRouter, createWebHistory } from 'vue-router'
import { getDocsUrl, getStatusUrl } from '@/lib/app'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('@/views/Landing.vue'),
    meta: {
      title: 'Memory infrastructure for AI agents',
      description:
        'Managed memory infrastructure for AI agents and apps. Session memories and workspace knowledge, retrieved in milliseconds. Built for production.',
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
    beforeEnter() {
      window.location.replace(getStatusUrl())
    },
  },
  {
    path: '/docs',
    name: 'Docs',
    beforeEnter() {
      window.location.replace(getDocsUrl())
    },
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import('@/views/PrivacyPolicy.vue'),
    meta: {
      title: 'Privacy Policy',
      description: 'How Actx0 collects, uses, and protects personal data.',
    },
  },
  {
    path: '/terms-of-use',
    name: 'TermsOfUse',
    component: () => import('@/views/TermsOfUse.vue'),
    meta: {
      title: 'Terms of Use',
      description: 'Terms governing use of the Actx0 website and services.',
    },
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
