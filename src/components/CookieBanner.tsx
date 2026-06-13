'use client'

import { useEffect, useState } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  function refuse() {
    localStorage.setItem('cookie-consent', 'refused')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white px-4 py-4 shadow-lg sm:px-6">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-700">
          Ce site utilise des cookies publicitaires (Google AdSense) et analytiques.
          En continuant, vous acceptez leur utilisation.{' '}
          <a href="/politique-confidentialite" className="text-blue-700 underline">
            En savoir plus
          </a>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={refuse}
            className="rounded-lg border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
          >
            Refuser
          </button>
          <button
            onClick={accept}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  )
}
