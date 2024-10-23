/**
 * @module NewORGAPIs
 * @description
 * for more details check the following url 
 * url: https://newsapi.org/
 */
export const NEWS_ORG_API = {
    BASE_URL: 'https://newsapi.org'
};

export enum SORT_TYPES {
    POPULAR = 'popular', // sorted by popular publishers first
    RECENT = 'publishedAt' // sorted by recent first
};

export enum SUPPORTED_SOURCES {
    TECHCRUNCH = 'techcrunch',
}