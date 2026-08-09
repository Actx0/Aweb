import { computed } from 'vue'
import { loadUserFromStorage } from '@/utils/storage'

export function getAppBaseUrl() {
  return (import.meta.env.VITE_APP_URL || 'https://app.actx0.com').replace(/\/$/, '')
}

export function getDocsUrl() {
  return (import.meta.env.VITE_DOCS_URL || 'https://docs.actx0.com').replace(/\/$/, '')
}

export function getStatusUrl() {
  return (import.meta.env.VITE_STATUS_URL || 'https://status.actx0.com').replace(/\/$/, '')
}

export function appPath(path) {
  const base = getAppBaseUrl()
  const suffix = path.startsWith('/') ? path : `/${path}`
  return `${base}${suffix}`
}

export function useStartUrl() {
  return computed(() => (loadUserFromStorage() ? appPath('/select-workspace') : appPath('/login')))
}
