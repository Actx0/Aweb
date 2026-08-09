<template>
  <div id="app" class="min-h-screen">
    <CookieConsent />
    <Analytics v-if="analyticsAllowed" />
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Analytics } from '@vercel/analytics/vue'
import CookieConsent from '@/components/CookieConsent.vue'
import { consentRevision, isCategoryAllowed } from '@/lib/cookies'

const analyticsAllowed = computed(() => {
  consentRevision.value
  return isCategoryAllowed('analytics')
})
</script>
