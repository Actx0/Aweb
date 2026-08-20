<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BlogLayout from '@/components/BlogLayout.vue'
import { getPost } from '@/lib/blog'

const route = useRoute()
const router = useRouter()
const post = computed(() => getPost(route.params.slug))

watch(
  post,
  (value) => {
    if (!value) router.replace('/blog')
  },
  { immediate: true }
)
</script>

<template>
  <BlogLayout v-if="post" :post="post">
    <component :is="post.component" />
  </BlogLayout>
</template>
