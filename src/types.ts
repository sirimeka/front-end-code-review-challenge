//This is never used in the current codebase, remove or add comments if for future use
interface Pagination {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
    next_url: string;
}

export interface ImageType {
    _score: number
    title: string
    image_id: string
    artist_display: string
}

// Rename it to be more specific - ArtSearchResponse or ArtApiResponse.
// Response type shadows the global Response of Fetch API type
export interface Response {
    pagination: Pagination;
    data: ImageType[];
}
