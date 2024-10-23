import { SUPPORTED_TOPICS } from "src/common/constants"

export type JobType = {
    topic: SUPPORTED_TOPICS,
    userID: number
} 