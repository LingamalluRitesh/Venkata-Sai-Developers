import { SiteData } from '../context/SiteContext'

const STORAGE_ENDPOINT_KEY = 'sree_water_custom_cloud_url'

export function getActiveCloudUrl(): string {
  const customUrl = localStorage.getItem(STORAGE_ENDPOINT_KEY)
  if (customUrl && customUrl.trim().length > 0) {
    return customUrl.trim()
  }
  if (typeof window !== 'undefined' && window.location?.origin) {
    return `${window.location.origin}/api/site-data`
  }
  return '/api/site-data'
}

export function setActiveCloudUrl(url: string) {
  if (url && url.trim().length > 0) {
    localStorage.setItem(STORAGE_ENDPOINT_KEY, url.trim())
  } else {
    localStorage.removeItem(STORAGE_ENDPOINT_KEY)
  }
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
    if (data && typeof data === 'object' && Object.keys(data).length > 0) {
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

    const bodyPayload = JSON.stringify({
      name: 'Sree Water Solutions Website Live Data',
      data: data,
    })

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: bodyPayload,
    })

    if (response.ok) {
      return true
    } else {
      console.warn(`[CloudSync] POST failed with status: ${response.status}`)
      return false
    }
  } catch (error) {
    console.error('[CloudSync] Error saving remote site data:', error)
    return false
  }
}
