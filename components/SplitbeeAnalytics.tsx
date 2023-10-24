import Script from 'next/script'

export const SplitbeeAnalytics = () =>
    typeof window != 'undefined' &&
        window.location.href.includes('https://slideshub.vercel.app') ? (
        <Script src="/bee.js" data-api="/_hive" strategy="afterInteractive" />
    ) : null