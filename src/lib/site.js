export const SITE_ORIGIN = 'https://actx0.com'

export function siteUrl(path = '/') {
  if (!path || path === '/') return `${SITE_ORIGIN}/`
  return `${SITE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`
}

export function jsonLdFor(page) {
  const url = siteUrl(page.path)
  if (page.type === 'article') {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: String(page.title || '').replace(/ · Actx0$/, ''),
      description: page.description,
      datePublished: page.date,
      dateModified: page.updated || page.date,
      mainEntityOfPage: url,
      url,
      image: page.image || `${SITE_ORIGIN}/logo.png`,
      author: { '@type': 'Organization', name: 'Actx0', url: SITE_ORIGIN },
      publisher: {
        '@type': 'Organization',
        name: 'Actx0',
        url: SITE_ORIGIN,
        logo: { '@type': 'ImageObject', url: `${SITE_ORIGIN}/logo.png` },
      },
    }
  }
  if (page.path === '/blog') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Actx0 Blog',
      description: page.description,
      url,
      publisher: { '@type': 'Organization', name: 'Actx0', url: SITE_ORIGIN },
    }
  }
  if (page.path === '/') {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Actx0',
      applicationCategory: 'DeveloperApplication',
      description: page.description,
      url,
      publisher: { '@type': 'Organization', name: 'Actx0', url: SITE_ORIGIN },
    }
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url,
  }
}
