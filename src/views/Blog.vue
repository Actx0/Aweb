<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import LandingNav from '@/components/LandingNav.vue'
import LandingCta from '@/components/LandingCta.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import BlogCard from '@/components/BlogCard.vue'
import { pageCount, postsForPage } from '@/lib/blog'

const route = useRoute()
const totalPages = computed(() => pageCount())
const currentPage = computed(() => {
  const n = Number(route.query.page)
  if (!Number.isFinite(n) || n < 1) return 1
  return Math.min(Math.floor(n), totalPages.value)
})
const pagePosts = computed(() => postsForPage(currentPage.value))

function pageLink(page) {
  return page <= 1 ? '/blog' : { path: '/blog', query: { page: String(page) } }
}
</script>

<template>
  <div class="landing-page relative min-h-screen overflow-x-hidden">
    <div class="pointer-events-none absolute inset-0 bg-hero-glow" />
    <div class="pointer-events-none absolute inset-x-0 top-0 h-[520px] hero-grid opacity-60" />

    <LandingNav />

    <main>
      <section class="relative mx-auto max-w-6xl px-6 pb-12 pt-16 md:pt-24">
        <div class="mx-auto max-w-3xl text-center">
          <p class="section-label">{{ $t('blog.label') }}</p>
          <h1 class="hero-gradient-text mx-auto mt-4 w-fit text-4xl font-semibold leading-snug tracking-tight md:text-6xl md:leading-[1.2]">
            {{ $t('blog.title') }}
          </h1>
          <p class="mx-auto mt-6 max-w-2xl text-lg text-muted">
            {{ $t('blog.subtitle') }}
          </p>
        </div>
      </section>

      <section class="mx-auto max-w-6xl px-6 pb-24">
        <div class="grid gap-6 md:grid-cols-2">
          <BlogCard
            v-for="(post, index) in pagePosts"
            :key="post.slug"
            :post="post"
            :eager="index < 2"
          />
        </div>

        <nav v-if="totalPages > 1" class="mt-12 flex flex-wrap items-center justify-center gap-3" aria-label="Blog pages">
          <router-link
            v-if="currentPage > 1"
            :to="pageLink(currentPage - 1)"
            class="landing-btn-outline"
          >
            {{ $t('blog.newer') }}
          </router-link>
          <p class="text-sm text-muted">{{ $t('blog.page_of', { current: currentPage, total: totalPages }) }}</p>
          <router-link
            v-if="currentPage < totalPages"
            :to="pageLink(currentPage + 1)"
            class="landing-btn-outline"
          >
            {{ $t('blog.older') }}
          </router-link>
        </nav>
      </section>
    </main>

    <LandingCta />
    <SiteFooter />
  </div>
</template>
