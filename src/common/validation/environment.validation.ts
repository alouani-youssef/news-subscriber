import { z } from "zod";

import { EnvironmentType } from "../types";

const Config = z.object({
    NODE_ENV: z.nativeEnum(EnvironmentType).default(EnvironmentType.development),
    PORT: z.preprocess((port) => Number(port), z.number()),
    POSTGRES_HOST: z.string(),
    POSTGRES_USERNAME: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_PORT: z.preprocess((port) => Number(port), z.number()),
    POSTGRES_DATABASE: z.string(),
    REDIS_HOST: z.string(),
    REDIS_USERNAME: z.string(),
    REDIS_PASSWORD: z.string(),
    REDIS_PORT: z.preprocess((port) => Number(port), z.number()),
    REDIS_DATABASE: z.preprocess((port) => Number(port), z.number()),
    SENTRY_URL: z.string().url(),
    BASE_URL: z.string().url(),
});

export function EnvironmentVariablesValidation(
    config: Record<string, unknown>
) {
    return Config.parse(config);
}

export type EnvironmentVariables = z.infer<typeof Config>;
