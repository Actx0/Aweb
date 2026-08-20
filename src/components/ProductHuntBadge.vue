<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const visible = ref(false)
const SCROLL_THRESHOLD = 120

function onScroll() {
  visible.value = window.scrollY > SCROLL_THRESHOLD
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <Transition name="ph-float">
    <a
      v-if="visible"
      href="https://www.producthunt.com/products/actx0?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-actx0"
      target="_blank"
      rel="noopener noreferrer"
      class="fixed bottom-6 left-4 z-[140] inline-flex drop-shadow-md sm:bottom-8 sm:left-6"
    >
      <img
        alt="Actx0 - Memory infrastructure for AI agents. | Product Hunt"
        width="250"
        height="54"
        class="h-11 w-auto sm:h-[54px]"
        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1227153&theme=neutral&t=1787259900699"
      />
    </a>
  </Transition>
</template>

<style scoped>
.ph-float-enter-active,
.ph-float-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.ph-float-enter-from,
.ph-float-leave-to {
  opacity: 0;
  transform: translateX(-0.75rem);
}
</style>
