import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  const url = event.path || ''
  
  // Handle map files
  if (url.endsWith('.map')) {
    return new Response('', {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    })
  }
})
