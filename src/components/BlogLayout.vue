<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import LandingNav from '@/components/LandingNav.vue'
import LandingCta from '@/components/LandingCta.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import BlogCard from '@/components/BlogCard.vue'
import { formatPostDate, relatedPosts } from '@/lib/blog'

const props = defineProps({
  post: { type: Object, required: true },
})

const { locale } = useI18n()
const showCover = ref(true)
const morePosts = computed(() => relatedPosts(props.post.slug))
</script>

<template>
  <div class="landing-page relative min-h-screen overflow-x-hidden">
    <div class="pointer-events-none absolute inset-0 bg-hero-glow" />
    <div class="pointer-events-none absolute inset-x-0 top-0 h-[520px] hero-grid opacity-60" />

    <LandingNav />

    <main>
      <article class="relative mx-auto max-w-3xl px-6 pb-16 pt-12 md:pt-16">
        <nav class="mb-8 text-sm text-muted">
          <router-link to="/blog" class="hover:text-theme-text">{{ $t('blog.breadcrumb') }}</router-link>
          <span class="mx-2">/</span>
          <span class="text-theme-text">{{ post.title }}</span>
        </nav>

        <p class="section-label">{{ $t('blog.label') }}</p>
        <h1 class="mt-3 text-3xl font-semibold tracking-tight text-theme-text md:text-5xl md:leading-tight">
          {{ post.title }}
        </h1>
        <p class="mt-4 text-lg text-muted">{{ post.description }}</p>
        <div class="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted">
          <time :datetime="post.date">{{ formatPostDate(post.date, locale) }}</time>
          <span v-if="post.updated !== post.date">· {{ $t('blog.updated') }} {{ formatPostDate(post.updated, locale) }}</span>
          <span v-for="tag in post.tags" :key="tag" class="blog-tag">{{ tag }}</span>
        </div>

        <div v-if="post.cover && showCover" class="blog-cover blog-cover-hero mt-10">
          <img :src="post.cover" :alt="post.title" loading="eager" decoding="async" @error="showCover = false" />
        </div>

        <div class="blog-prose mt-12">
          <slot />
        </div>
      </article>

      <section v-if="morePosts.length" class="section-alt py-24">
        <div class="mx-auto max-w-6xl px-6">
          <div class="mx-auto max-w-2xl text-center">
            <p class="section-label">{{ $t('blog.more_label') }}</p>
            <h2 class="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{{ $t('blog.more_title') }}</h2>
          </div>
          <div class="mt-12 grid gap-6 md:grid-cols-3">
            <BlogCard v-for="item in morePosts" :key="item.slug" :post="item" compact />
          </div>
        </div>
      </section>
    </main>

    <LandingCta />
    <SiteFooter />
  </div>
</template>
