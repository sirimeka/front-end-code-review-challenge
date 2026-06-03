//rename the folder to start with lowercase
'use client'

import { ImageType } from "../types"

interface DisplayProps {
    _score: number
    title: string
    image_id: string
    artist_display: string
}

const Display: React.FC<DisplayProps> = (image) => {
    const { title, image_id, artist_display } = image
    return (
        <div style={{ 
            margin: '1em', 
            border: '1px solid', 
            padding: '1em',
            background: '#222',
            display: 'flex',
            maxWidth: '400px'
        }}>
            {/*1.Suppressing the ESLint rule to use a raw <img> instead of Next.js <Image> loses automatic image optimization (lazy loading, responsive size). 
            The right fix is to use <Image> with a configured remotePatterns domain in next.config.js:
            2. without width on img, the browser can't reserve layout space. Either set explicit dimensions or use aspect-ratio in CSS.
             eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`} alt={title} height="100" />
            <div style={{ marginLeft: '1em' }}>
                <h2 style={{ marginBottom: '0.5em' }}>{title}</h2>
                <p style={{ marginTop: '0.5em'}}>{artist_display}</p>
            </div>
        </div>
    )
}

type ResultsProps = {
    isLoading: boolean
    data: ImageType[]
}

// Relying on a regex over the title is brittle and easy to circumvent.
// Using Array.filter instead of a for loop with a manual push 

const filterOutNudity = (data: ImageType[]) =>
    data.filter(item => !/nud(e|ity)/i.test(item.title))

// JSX.Element is the older return type. Prefer React.ReactElement or just omit the explicit return annotation
const Results = ({ isLoading, data }: ResultsProps): JSX.Element => {
    if(isLoading) return <></>
    let sanitizedData = filterOutNudity(
        //mutating sorted data in render
        [...data].sort((a: ImageType, b: ImageType) => b._score - a._score)
    )
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {sanitizedData.map((image, i) => 
                <Display key={i} {...image} />
            )}
        </div>
    )
}

export default Results
