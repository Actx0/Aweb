<script setup>
import { ref } from 'vue'
import LandingNav from '@/components/LandingNav.vue'
import { openCookiePreferences } from '@/lib/cookies'
import { getDocsUrl, getStatusUrl } from '@/lib/app'
import { useLandingPage, useStartUrl } from '@/lib/landingPage'

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
})

const rootRef = ref(null)
const startUrl = useStartUrl()
const docsUrl = getDocsUrl()
const statusUrl = getStatusUrl()

useLandingPage(rootRef, props)
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

    <section class="relative overflow-hidden py-24">
      <div class="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div class="relative mx-auto max-w-3xl px-6 text-center">
        <h2 class="reveal text-4xl font-semibold tracking-tight md:text-5xl">
          {{ $t('landing.cta.title_before') }} <span class="hero-gradient-text">{{ $t('landing.cta.title_highlight') }}</span>
        </h2>
        <p class="reveal mt-4 text-lg text-muted">
          {{ $t('landing.cta.subtitle') }}
        </p>
        <div class="reveal mt-8 flex flex-wrap items-center justify-center gap-3">
          <a :href="startUrl" class="landing-btn">{{ $t('landing.cta.get_started') }}</a>
          <router-link to="/#pricing" class="landing-btn-outline">{{ $t('landing.cta.see_pricing') }}</router-link>
        </div>
      </div>
    </section>

    <footer class="border-t border-theme-border bg-theme-hover">
      <div class="mx-auto max-w-6xl px-6 py-12">
        <div class="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <router-link to="/" class="flex items-center gap-2.5">
              <img src="/logo.png" alt="Actx0" class="h-7 w-auto" />
              <span class="font-semibold">Actx0</span>
            </router-link>
            <p class="mt-3 max-w-xs text-sm text-muted">{{ $t('landing.footer.tagline') }}</p>
          </div>
          <div class="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p class="text-sm font-medium">{{ $t('landing.footer.use_cases') }}</p>
              <ul class="mt-3 space-y-2 text-sm text-muted">
                <li><router-link to="/cases/customer-support" class="hover:text-theme-text">{{ $t('landing.use_cases.customer_support.label') }}</router-link></li>
                <li><router-link to="/cases/sales" class="hover:text-theme-text">{{ $t('landing.use_cases.sales.label') }}</router-link></li>
                <li><router-link to="/cases/healthcare" class="hover:text-theme-text">{{ $t('landing.use_cases.healthcare.label') }}</router-link></li>
                <li><router-link to="/cases/education" class="hover:text-theme-text">{{ $t('landing.use_cases.education.label') }}</router-link></li>
                <li><router-link to="/cases/devtools" class="hover:text-theme-text">{{ $t('landing.use_cases.devtools.label') }}</router-link></li>
                <li><router-link to="/cases/e-commerce" class="hover:text-theme-text">{{ $t('landing.use_cases.ecommerce.label') }}</router-link></li>
              </ul>
            </div>
            <div>
              <p class="text-sm font-medium">{{ $t('landing.footer.resources') }}</p>
              <ul class="mt-3 space-y-2 text-sm text-muted">
                <li><a :href="docsUrl" class="hover:text-theme-text">{{ $t('landing.footer.docs') }}</a></li>
                <li><a :href="statusUrl" class="hover:text-theme-text">{{ $t('landing.footer.status') }}</a></li>
              </ul>
            </div>
            <div>
              <p class="text-sm font-medium">{{ $t('landing.footer.company') }}</p>
              <ul class="mt-3 space-y-2 text-sm text-muted">
                <li><a href="mailto:hello@actx0.com" class="hover:text-theme-text">{{ $t('landing.footer.contact') }}</a></li>
                <li><router-link to="/privacy-policy" class="hover:text-theme-text">{{ $t('landing.footer.privacy') }}</router-link></li>
                <li><router-link to="/terms-of-use" class="hover:text-theme-text">{{ $t('landing.footer.terms') }}</router-link></li>
                <li>
                  <button type="button" class="hover:text-theme-text" @click="openCookiePreferences">
                    {{ $t('cookies.settings_link') }}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="mt-10 border-t border-theme-border pt-6 text-center text-sm text-primary-500">
          {{ $t('common.copyright') }}
        </div>
      </div>
    </footer>
  </div>
</template>
