export const GA_MEASUREMENT_ID = 'G-2YXJJ248DY'

let scriptLoaded = false

function gtag() {
  window.dataLayer.push(arguments)
}

export function syncGoogleAnalytics(allowed) {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || gtag

  if (allowed) {
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = false

    if (!scriptLoaded) {
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
      document.head.appendChild(script)

      window.gtag('js', new Date())
      window.gtag('config', GA_MEASUREMENT_ID)
      scriptLoaded = true
      return
    }

    window.gtag('consent', 'update', { analytics_storage: 'granted' })
    return
  }

  if (scriptLoaded) {
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = true
    window.gtag('consent', 'update', { analytics_storage: 'denied' })
  }
}
