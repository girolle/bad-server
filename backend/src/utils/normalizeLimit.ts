import { MAX_LIMIT } from './constants'

export const getNormalizeLimit = (limit: number) =>
    Number(limit) >= MAX_LIMIT ? MAX_LIMIT : Number(limit)
