import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete (L.Icon.Default.prototype as any)._getIconUrl

function resolveUrl(asset: any) {
    // Some bundlers return an object with `src`, others return the string URL directly
    return (asset && asset.src) || asset || ''
}

const CDN_BASE = 'https://unpkg.com/leaflet@1.9.4/dist/images/'

L.Icon.Default.mergeOptions({
    iconRetinaUrl: resolveUrl(markerIcon2x) || `${CDN_BASE}marker-icon-2x.png`,
    iconUrl: resolveUrl(markerIcon) || `${CDN_BASE}marker-icon.png`,
    shadowUrl: resolveUrl(markerShadow) || `${CDN_BASE}marker-shadow.png`,
})

// Debug: show what icon URLs are actually set at runtime
try {
    // eslint-disable-next-line no-console
    console.log('Leaflet default icon options:', L.Icon.Default.prototype.options)
} catch (e) {}