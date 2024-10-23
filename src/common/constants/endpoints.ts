import { SUPPORTED_SOURCES } from "./neworg.config";
import { SUPPORTED_TOPICS } from "./topics.values";

export const NEWS_ORG_ENDPOINTS = {
    FETCH_ALL: {
        URL: (topic: SUPPORTED_TOPICS, day: string, apiKey: string, sortOrder: string) => `/v2/everything?q=${topic.toLowerCase()}&from=${day}&sortBy=${sortOrder}&apiKey=${apiKey}`,
        RATE_LIMIT_IN_HOUR: 41 // BASICALLY IT'S 1000 REQUEST PER HOUR
    },
    TOP_HEADLINES: {
        URL: (source: SUPPORTED_SOURCES, apiKey: string) => `/v2/top-headlines?sources=${source}&apiKey=${apiKey}`
    }
}