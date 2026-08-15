<script setup>
import { ref } from 'vue'
import { getDocsUrl, getStatusUrl, useStartUrl } from '@/lib/app'

defineProps({
  homePage: {
    type: Boolean,
    default: false,
  },
})

const mobileOpen = ref(false)
const startUrl = useStartUrl()
const docsUrl = getDocsUrl()
const statusUrl = getStatusUrl()

function closeMobile() {
  mobileOpen.value = false
}
</script>

<template>
  <header class="landing-header sticky top-0 z-50">
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <router-link to="/" class="flex items-center gap-2.5" @click="closeMobile">
        <img src="/logo.png" alt="Actx0" class="h-8 w-auto" />
        <span class="text-lg font-semibold tracking-tight">Actx0</span>
      </router-link>

      <div class="hidden items-center gap-8 md:flex">
        <component :is="homePage ? 'a' : 'router-link'" href="#developers" to="/#developers" class="landing-link">Developers</component>
        <component :is="homePage ? 'a' : 'router-link'" href="#pricing" to="/#pricing" class="landing-link">Pricing</component>
        <component :is="homePage ? 'a' : 'router-link'" href="#use-cases" to="/#use-cases" class="landing-link">Use Cases</component>
        <a :href="statusUrl" class="landing-link">Status</a>
        <a :href="docsUrl" class="landing-link">Docs</a>
      </div>

      <div class="hidden items-center gap-3 md:flex">
        <a :href="startUrl" class="landing-btn">Get Started</a>
      </div>

      <button
        type="button"
        class="rounded-lg p-2 text-theme-textLight hover:bg-theme-hover md:hidden"
        aria-label="Menu"
        @click="mobileOpen = !mobileOpen"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>

    <div v-show="mobileOpen" class="landing-header-menu border-t border-theme-border px-6 py-4 md:hidden">
      <div class="flex flex-col gap-4">
        <component :is="homePage ? 'a' : 'router-link'" href="#developers" to="/#developers" class="landing-link" @click="closeMobile">Developers</component>
        <component :is="homePage ? 'a' : 'router-link'" href="#pricing" to="/#pricing" class="landing-link" @click="closeMobile">Pricing</component>
        <component :is="homePage ? 'a' : 'router-link'" href="#use-cases" to="/#use-cases" class="landing-link" @click="closeMobile">Use Cases</component>
        <a :href="statusUrl" class="landing-link" @click="closeMobile">Status</a>
        <a :href="docsUrl" class="landing-link" @click="closeMobile">Docs</a>
        <a :href="startUrl" class="landing-btn w-fit" @click="closeMobile">Get Started</a>
      </div>
    </div>
  </header>
</template>
