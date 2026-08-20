<script setup>
import { ref } from 'vue'
import LandingNav from '@/components/LandingNav.vue'
import LandingCta from '@/components/LandingCta.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import { useStartUrl } from '@/lib/app'
import { useReveal } from '@/lib/landing'

const rootRef = ref(null)
const startUrl = useStartUrl()
useReveal(rootRef)
</script>

<template>
  <div ref="rootRef" class="landing-page relative min-h-screen overflow-x-hidden">
    <div class="pointer-events-none absolute inset-0 bg-hero-glow" />
    <div class="pointer-events-none absolute inset-x-0 top-0 h-[520px] hero-grid opacity-60" />

    <LandingNav />

    <main>
      <p class="mx-auto max-w-6xl px-6 pt-10 text-sm text-muted">{{ $t('cases.shared.disclaimer') }}</p>
      <slot :start-url="startUrl" />
    </main>

    <LandingCta reveal />
    <SiteFooter />
  </div>
</template>
