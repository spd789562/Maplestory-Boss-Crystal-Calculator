import React, { useEffect } from 'react'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const GoogleAd = () => {
  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <ins
      className="adsbygoogle adbanner-customize"
      style={{
        display: 'block',
      }}
      data-ad-format="fluid"
      data-ad-client={`ca-pub-${publicRuntimeConfig.GOOGLE_AD_ID}`}
      data-ad-slot={publicRuntimeConfig.GOOGLE_AD_SLOT_TEST}
      data-ad-layout-key={publicRuntimeConfig.GOOGLE_AD_LAYOUT_TEST}
      data-full-width-responsive
    />
  )
}

export default GoogleAd
