// Vercel Serverless Function for Sree Water Solutions Live Site Data
import type { VercelRequest, VercelResponse } from '@vercel/node'

// Global memory cache across warm serverless invocations
let globalSiteData: any = null

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Security Headers against Clickjacking, MIME sniffing & XSS
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Set CORS headers for cross-origin client access
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method === 'POST' || req.method === 'PUT') {
    try {
      const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      const data = payload?.data || payload
      if (data && typeof data === 'object') {
        globalSiteData = data
        return res.status(200).json({ success: true, message: 'Live data updated', data: globalSiteData })
      }
    } catch (e) {
      return res.status(400).json({ error: 'Invalid JSON body' })
    }
  }

  // GET request
  return res.status(200).json({ success: true, data: globalSiteData })
}
