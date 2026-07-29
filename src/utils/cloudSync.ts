import { SiteData } from '../context/SiteContext'

const STORAGE_ENDPOINT_KEY = 'sree_water_custom_cloud_url'
const DEFAULT_CLOUD_OBJECT_ID = 'ff8081819f7e10ae019fafaa191a469e'
const DEFAULT_REST_API_BASE = 'https://api.restful-api.dev/objects'

export function getActiveCloudUrl(): string {
  const customUrl = localStorage.getItem(STORAGE_ENDPOINT_KEY)
  if (customUrl && customUrl.trim().length > 0) {
    return customUrl.trim()
  }
  return `${DEFAULT_REST_API_BASE}/${DEFAULT_CLOUD_OBJECT_ID}`
}

export function setActiveCloudUrl(url: string) {
  if (url && url.trim().length > 0) {
    localStorage.setItem(STORAGE_ENDPOINT_KEY, url.trim())
  } else {
    localStorage.removeItem(STORAGE_ENDPOINT_KEY)
  }
}

// Helper to sanitize payload and strip huge uncompressed base64 images (>150KB) so API never rejects with 500 error
function sanitizeDataForCloud(data: SiteData): SiteData {
  const cloned: SiteData = JSON.parse(JSON.stringify(data))

  const cleanImg = (val?: string) => {
    if (val && val.length > 150000 && val.startsWith('data:image')) {
      return ''
    }
    return val || ''
  }

  cloned.logoUrl = cleanImg(cloned.logoUrl)
  cloned.heroImageUrl = cleanImg(cloned.heroImageUrl)
  cloned.founderImgUrl = cleanImg(cloned.founderImgUrl)

  if (Array.isArray(cloned.services)) {
    cloned.services = cloned.services.map((s) => ({
      ...s,
      imageUrl: cleanImg(s.imageUrl),
    }))
  }

  if (Array.isArray(cloned.galleryItems)) {
    cloned.galleryItems = cloned.galleryItems.map((g) => ({
      ...g,
      imageUrl: cleanImg(g.imageUrl),
    }))
  }

  return cloned
}

export async function fetchRemoteSiteData(): Promise<Partial<SiteData> | null> {
  try {
    const url = getActiveCloudUrl()
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      console.warn(`[CloudSync] GET failed with status: ${response.status}`)
      return null
    }

    const result = await response.json()
    const data = result?.data || result
    if (data && typeof data === 'object') {
      return data as Partial<SiteData>
    }
  } catch (error) {
    console.error('[CloudSync] Error fetching remote site data:', error)
  }
  return null
}

export async function saveRemoteSiteData(data: SiteData): Promise<boolean> {
  try {
    const url = getActiveCloudUrl()
    const sanitized = sanitizeDataForCloud(data)

    const bodyPayload = JSON.stringify({
      name: 'Sree Water Solutions Website Live Data',
      data: sanitized,
    })

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: bodyPayload,
    })

    if (response.ok) {
      return true
    } else {
      console.warn(`[CloudSync] PUT failed with status: ${response.status}`)
      return false
    }
  } catch (error) {
    console.error('[CloudSync] Error saving remote site data:', error)
    return false
  }
}
