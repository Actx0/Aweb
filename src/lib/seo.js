import { SITE_ORIGIN, jsonLdFor, siteUrl } from '@/lib/site'

const DEFAULT_IMAGE = `${SITE_ORIGIN}/logo.png`

function upsertMeta(selector, attrs) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    document.head.appendChild(el)
  }
  Object.entries(attrs).forEach(([key, value]) => {
    if (value == null) el.removeAttribute(key)
    else el.setAttribute(key, value)
  })
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertJsonLd(data) {
  let el = document.getElementById('ld-json')
  if (!data) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.id = 'ld-json'
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export function applyPageSeo({
  title,
  description,
  path,
  type = 'website',
  image = DEFAULT_IMAGE,
  published,
  updated,
}) {
  const url = siteUrl(path)
  document.title = title

  upsertMeta('meta[name="description"]', { name: 'description', content: description })
  upsertMeta('meta[property="og:type"]', { property: 'og:type', content: type })
  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title })
  upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description })
  upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url })
  upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image })
  upsertMeta('meta[name="twitter:card"]', {
    name: 'twitter:card',
    content: image.endsWith('/logo.png') ? 'summary' : 'summary_large_image',
  })
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
  upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
  upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image })
  upsertLink('canonical', url)

  const publishedEl = document.head.querySelector('meta[property="article:published_time"]')
  const modifiedEl = document.head.querySelector('meta[property="article:modified_time"]')
  if (type === 'article' && published) {
    upsertMeta('meta[property="article:published_time"]', {
      property: 'article:published_time',
      content: published,
    })
    upsertMeta('meta[property="article:modified_time"]', {
      property: 'article:modified_time',
      content: updated || published,
    })
  } else {
    publishedEl?.remove()
    modifiedEl?.remove()
  }

  upsertJsonLd(jsonLdFor({ path, title, description, type, date: published, updated, image }))
}
