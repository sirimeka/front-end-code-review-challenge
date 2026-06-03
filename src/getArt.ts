import { ImageType, Response } from "./types"

// added join at the declaration level to avoid invocation at every artFetcher call 
const fields = [
    'id',
    '_score',
    'image_id',
    'title',
    'artist_display'
].join(',')

export const artFetcher = async (search: string = '') => {

    // URL sanitization using native method instaed of regex
    const params = new URLSearchParams({ q: search, fields })
    const url = `https://api.artic.edu/api/v1/artworks/search?${params}`

    // Http error handling to avoid downstream crash errors handling undefined data in case of errors
    const r = await fetch(url)
    if (!r.ok) throw new Error(`API error ${r.status}`)
    const json = await r.json()
    return json.data as ImageType[]
}
