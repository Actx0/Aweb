import { createRouter, createWebHistory } from 'vue-router'
import { getDocsUrl, getStatusUrl } from '@/lib/app'
import { applyPageSeo } from '@/lib/seo'
import { siteUrl } from '@/lib/site'
import { getPost } from '@/lib/blog'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('@/views/Landing.vue'),
    meta: {
      title: 'Actx0 - Memory infrastructure for AI agents',
      description:
        'Managed memory infrastructure for AI agents and apps. Session memories and workspace knowledge, retrieved in milliseconds. Built for production.',
    },
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/views/Blog.vue'),
    meta: {
      title: 'Blog · Actx0',
      description: 'Notes on agent memory, retrieval, and running AI in production — from the team building Actx0.',
    },
  },
  {
    path: '/blog/:slug',
    name: 'BlogPost',
    component: () => import('@/views/BlogPost.vue'),
  },
  {
    path: '/cases/customer-support',
    name: 'CaseCustomerSupport',
    component: () => import('@/views/cases/CustomerSupport.vue'),
    meta: {
      title: 'AI Memory for Customer Support | Actx0',
      description:
        'Give support agents session memory so they can retrieve ticket context instead of stuffing the whole thread into every prompt.',
    },
  },
  {
    path: '/cases/sales',
    name: 'CaseSales',
    component: () => import('@/views/cases/Sales.vue'),
    meta: {
      title: 'AI Memory for Sales & CRM | Actx0',
      description: 'Give a sales agent session memory for stakeholders, objections, and commitments. You still own the CRM.',
    },
  },
  {
    path: '/cases/healthcare',
    name: 'CaseHealthcare',
    component: () => import('@/views/cases/Healthcare.vue'),
    meta: {
      title: 'AI Memory for Care Operations | Actx0',
      description:
        'Give scheduling and intake assistants session memory for preferences and prior conversations. Not an EHR or clinical safety system.',
    },
  },
  {
    path: '/cases/education',
    name: 'CaseEducation',
    component: () => import('@/views/cases/Education.vue'),
    meta: {
      title: 'AI Memory for Education | Actx0',
      description: 'A tutor that remembers what clicked last time. Adaptive learning memory for student pace, style, and progress.',
    },
  },
  {
    path: '/cases/devtools',
    name: 'CaseDevTools',
    component: () => import('@/views/cases/DevTools.vue'),
    meta: {
      title: 'AI Memory for DevTools & Coding Agents | Actx0',
      description: 'Your coding agent forgets conventions between sessions. Actx0 remembers codebase context, decisions, and team standards.',
    },
  },
  {
    path: '/cases/e-commerce',
    name: 'CaseECommerce',
    component: () => import('@/views/cases/ECommerce.vue'),
    meta: {
      title: 'AI Memory for E-Commerce | Actx0',
      description: 'Shoppers shouldn\'t re-explain size and style every visit. Personal memory for recommendations that actually land.',
    },
  },
  {
    path: '/status',
    name: 'Status',
    beforeEnter() {
      window.location.replace(getStatusUrl())
      return false
    },
  },
  {
    path: '/docs',
    name: 'Docs',
    beforeEnter() {
      window.location.replace(getDocsUrl())
      return false
    },
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import('@/views/PrivacyPolicy.vue'),
    meta: {
      title: 'Privacy Policy · Actx0',
      description: 'How Actx0 collects, uses, and protects personal data.',
    },
  },
  {
    path: '/terms-of-use',
    name: 'TermsOfUse',
    component: () => import('@/views/TermsOfUse.vue'),
    meta: {
      title: 'Terms of Use · Actx0',
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

router.afterEach((to) => {
  if (to.name === 'BlogPost') {
    const post = getPost(to.params.slug)
    if (!post) return
    applyPageSeo({
      title: `${post.title} · Actx0`,
      description: post.description,
      path: post.path,
      type: 'article',
      published: post.date,
      updated: post.updated,
      image: post.cover ? siteUrl(post.cover) : undefined,
    })
    return
  }

  if (to.meta.title) {
    applyPageSeo({
      title: to.meta.title,
      description: to.meta.description,
      path: to.path,
    })
  }
})

export default router
