'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

export default function AdSenseScript() {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    function checkConsent() {
      setConsented(localStorage.getItem('cookie-consent') === 'accepted')
    }
    checkConsent()
    window.addEventListener('storage', checkConsent)
    return () => window.removeEventListener('storage', checkConsent)
  }, [])

  if (!consented) return null

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}
