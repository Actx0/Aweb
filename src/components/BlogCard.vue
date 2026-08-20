<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { formatPostDate } from '@/lib/blog'

const props = defineProps({
  post: { type: Object, required: true },
  compact: { type: Boolean, default: false },
  eager: { type: Boolean, default: false },
})

const { locale } = useI18n()
const showCover = ref(true)
</script>

<template>
  <router-link :to="post.path" class="use-case-card group block transition hover:border-primary-300">
    <div class="blog-cover">
      <img
        v-if="showCover && post.cover"
        :src="post.cover"
        :alt="post.title"
        :loading="eager ? 'eager' : 'lazy'"
        decoding="async"
        @error="showCover = false"
      />
      <div v-else class="blog-cover-fallback">{{ post.tags?.[0] || $t('blog.label') }}</div>
    </div>
    <div :class="compact ? 'p-6' : 'p-8'">
      <div class="flex flex-wrap items-center gap-2">
        <p class="use-case-label">{{ formatPostDate(post.date, locale) }}</p>
        <span v-for="tag in post.tags" :key="tag" class="blog-tag">{{ tag }}</span>
      </div>
      <component :is="compact ? 'h3' : 'h2'" :class="compact ? 'mt-3 text-lg font-semibold' : 'mt-4 text-2xl font-semibold tracking-tight'">
        {{ post.title }}
      </component>
      <p :class="compact ? 'mt-2 text-sm text-muted' : 'mt-3 text-muted'">{{ post.description }}</p>
      <p v-if="!compact" class="mt-6 text-sm font-medium text-primary-700">{{ $t('blog.read') }} →</p>
    </div>
  </router-link>
</template>
