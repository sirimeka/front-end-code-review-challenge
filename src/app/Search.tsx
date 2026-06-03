
'use client'

import { useEffect, useState } from "react"
import { ImageType } from "../types"
import Results from "../Components/Results"
import { artFetcher } from "../getArt"

// Two pieces of state track the input when one would do. The submit action (Enter/button) could just read the current searchInputValue via a ref, 
// or the effect could key off a stable trigger. This pattern is confusing to maintain:


const Search = () => {
    const [error, setError] = useState(false)
    const [search, setSearch] = useState('')
    const [searchInputValue, setSearchInputValue] = useState('')
    const [data, setData] = useState([] as ImageType[])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        //If the user types quickly and triggers multiple fetches, responses can arrive out of order and display stale results
        //using ignore flag to avoid race condition
        let ignore = false 

        setError(false) // reset before each fetch
        setIsLoading(true)

        // fetch the art
        artFetcher(search)
            .then(data => {
                if (!ignore) {
                    setIsLoading(false)
                    setData(data)
                }
            })
            .catch((e) => {
                setIsLoading(false)
                setError(true)
            })
    }, [search])

    return (
        <div style={{ margin: '1em' }}>
            <div>
                <input 
                    value={searchInputValue}
                    onChange={e => setSearchInputValue(e.currentTarget.value)}
                    onKeyDown={e => e.key == 'Enter' && setSearch(e.currentTarget.value)}
                />
                <button onClick={() => setSearch(searchInputValue)}>Search</button>
            </div>
            {/*Using a paragraph of non-breaking space for visual spacing is a layout hack. Use CSS gap, margin, or padding instead.*/} 
            <p>&nbsp;</p>

            {error && 'There was an error fetching the art.'}
            {isLoading 
                ? 'Loading ...'
                : !data.length && 'No results.'
            }
            <Results isLoading={isLoading} data={data} />
        </div>

    )
}

export default Search

