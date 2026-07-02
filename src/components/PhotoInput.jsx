import { useRef } from 'react'

// Photo picker that downscales in the browser before storing.
// Keeps data URLs small enough for the localStorage skeleton;
// SUPABASE: the same component later hands the blob to
// supabase.storage.from('covers').upload() and stores the URL.
async function fileToDataUrl(file, maxEdge = 900) {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL('image/jpeg', 0.82)
}

export default function PhotoInput({ onPhoto, className = '', children }) {
  const ref = useRef(null)
  async function handleChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      onPhoto(await fileToDataUrl(file))
    } catch {
      // Unreadable file: silently ignore, the SVG fallback covers us.
    }
    e.target.value = ''
  }
  return (
    <button type="button" onClick={() => ref.current?.click()} className={className}>
      {children}
      <input
        ref={ref}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        aria-label="Choose a photo"
      />
    </button>
  )
}
