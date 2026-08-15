<script setup>
import { onMounted, onUnmounted } from 'vue'
import LandingNav from '@/components/LandingNav.vue'

const props = defineProps({
  label: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  updated: { type: String, required: true },
})

function updatePageMeta() {
  document.title = `${props.title} · Actx0`
  document.querySelector('meta[name="description"]')?.setAttribute('content', props.description)
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', props.title)
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', props.description)
  document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', props.title)
  document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', props.description)
}

onMounted(() => {
  window.scrollTo({ top: 0, left: 0 })
  updatePageMeta()
})

onUnmounted(() => {
  document.title = 'Actx0 - Memory infrastructure for AI agents'
})
</script>

<template>
  <div class="landing-page min-h-screen bg-theme-bg">
    <LandingNav />

    <main class="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <p class="section-label">{{ label }}</p>
      <h1 class="mt-3 text-3xl font-semibold tracking-tight text-theme-text md:text-4xl">{{ title }}</h1>
      <p class="mt-3 text-sm text-muted">{{ updated }}</p>

      <div class="legal-prose mt-10">
        <slot />
      </div>
    </main>

    <footer class="border-t border-theme-border bg-theme-hover">
      <div class="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-muted">
        <router-link to="/" class="hover:text-theme-text">{{ $t('common.brand') }}</router-link>
        <div class="flex flex-wrap gap-4">
          <router-link to="/privacy-policy" class="hover:text-theme-text">{{ $t('landing.footer.privacy') }}</router-link>
          <router-link to="/terms-of-use" class="hover:text-theme-text">{{ $t('landing.footer.terms') }}</router-link>
          <a href="mailto:hello@actx0.com" class="hover:text-theme-text">{{ $t('landing.footer.contact') }}</a>
        </div>
      </div>
    </footer>
  </div>
</template>
