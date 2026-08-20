<script setup>
import { openCookiePreferences } from '@/lib/cookies'
import { getDocsUrl, getStatusUrl } from '@/lib/app'

const docsUrl = getDocsUrl()
const statusUrl = getStatusUrl()
</script>

<template>
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
              <li><router-link to="/blog" class="hover:text-theme-text">{{ $t('landing.footer.blog') }}</router-link></li>
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
</template>
