import { onMounted, onUnmounted } from 'vue'

export function useReveal(rootRef) {
  let revealObserver

  onMounted(() => {
    window.scrollTo({ top: 0, left: 0 })
    const items = rootRef.value?.querySelectorAll('.reveal') ?? []
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    items.forEach((item) => revealObserver.observe(item))
  })

  onUnmounted(() => {
    revealObserver?.disconnect()
  })
}
