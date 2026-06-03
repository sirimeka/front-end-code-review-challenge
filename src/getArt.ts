import { ImageType, Response } from "./types"

const fields = [
    'id',
    '_score',
    'image_id',
    'title',
    'artist_display'
].join(',')

export const artFetcher = async (search: string = '') => {
    const params = new URLSearchParams({ q: search, fields })
    const url = `https://api.artic.edu/api/v1/artworks/search?${params}`

    const r = await fetch(url)
    if (!r.ok) throw new Error(`API error ${r.status}`)
    const json = await r.json()
    return json.data as ImageType[]
}
