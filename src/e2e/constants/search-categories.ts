export const SEARCH_CATEGORIES = {
    PEOPLE: 'people',
    PLANETS: 'planets'
} as const;

export type SearchCategory = typeof SEARCH_CATEGORIES[keyof typeof SEARCH_CATEGORIES];