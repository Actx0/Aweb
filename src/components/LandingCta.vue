<script setup>
import { useStartUrl } from '@/lib/app'

defineProps({
  reveal: { type: Boolean, default: false },
})

const startUrl = useStartUrl()
</script>

<template>
  <section class="relative overflow-hidden py-24">
    <div class="pointer-events-none absolute inset-0 bg-hero-glow" />
    <div class="relative mx-auto max-w-3xl px-6 text-center">
      <h2 class="text-4xl font-semibold tracking-tight md:text-5xl" :class="{ reveal }">
        {{ $t('landing.cta.title_before') }} <span class="hero-gradient-text">{{ $t('landing.cta.title_highlight') }}</span>
      </h2>
      <p class="mt-4 text-lg text-muted" :class="{ reveal }">
        {{ $t('landing.cta.subtitle') }}
      </p>
      <div class="mt-8 flex flex-wrap items-center justify-center gap-3" :class="{ reveal }">
        <a :href="startUrl" class="landing-btn">{{ $t('landing.cta.get_started') }}</a>
        <router-link to="/#pricing" class="landing-btn-outline">{{ $t('landing.cta.see_pricing') }}</router-link>
      </div>
    </div>
  </section>
</template>
