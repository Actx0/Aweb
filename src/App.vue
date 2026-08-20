<template>
  <div id="app" class="min-h-screen">
    <CookieConsent />
    <ProductHuntBadge />
    <template v-if="analyticsAllowed">
      <Analytics />
      <SpeedInsights />
    </template>
    <router-view />
  </div>
</template>

<script setup>
import { computed, watchEffect } from 'vue'
import { Analytics } from '@vercel/analytics/vue'
import { SpeedInsights } from '@vercel/speed-insights/vue'
import CookieConsent from '@/components/CookieConsent.vue'
import ProductHuntBadge from '@/components/ProductHuntBadge.vue'
import { consentRevision, isCategoryAllowed } from '@/lib/cookies'
import { syncGoogleAnalytics } from '@/lib/googleAnalytics'

const analyticsAllowed = computed(() => {
  consentRevision.value
  return isCategoryAllowed('analytics')
})

watchEffect(() => {
  syncGoogleAnalytics(analyticsAllowed.value)
})
</script>
