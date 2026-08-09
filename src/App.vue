<template>
  <div id="app" class="min-h-screen">
    <CookieConsent />
    <router-view />
  </div>
</template>

<script setup>
import CookieConsent from '@/components/CookieConsent.vue'
</script>
