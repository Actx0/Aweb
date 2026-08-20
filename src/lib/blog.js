import { defineAsyncComponent } from 'vue'

export const PAGE_SIZE = 12

const metas = import.meta.glob('../views/blog/posts/*.vue', { eager: true, import: 'meta' })
const loaders = import.meta.glob('../views/blog/posts/*.vue')

function slugFromPath(filePath) {
  return filePath.split('/').pop().replace(/\.vue$/, '')
}

export function formatPostDate(value, locale = 'en') {
  return new Date(`${value}T00:00:00`).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const posts = Object.keys(metas)
  .map((filePath) => {
    const slug = slugFromPath(filePath)
    const meta = metas[filePath]
    if (!meta) {
      throw new Error(`Blog post ${filePath} must export const meta`)
    }
    const date = meta.date
    const updated = meta.updated || date
    return {
      ...meta,
      slug,
      date,
      updated,
      path: `/blog/${slug}`,
      cover: meta.cover || `/covers/${slug}.jpg`,
      component: defineAsyncComponent(loaders[filePath]),
    }
  })
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

export function getPost(slug) {
  return posts.find((post) => post.slug === slug) ?? null
}

export function relatedPosts(slug, limit = 3) {
  return posts.filter((post) => post.slug !== slug).slice(0, limit)
}

export function pageCount(size = PAGE_SIZE) {
  return Math.max(1, Math.ceil(posts.length / size))
}

export function postsForPage(page, size = PAGE_SIZE) {
  const total = pageCount(size)
  const current = Math.min(Math.max(1, page), total)
  const start = (current - 1) * size
  return posts.slice(start, start + size)
}
