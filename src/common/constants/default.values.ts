export const RATE_LIMITER = {
    WINDOW_MS: 15 * 60 * 1000,
    MAX: 100,
    MESSAGE: 'Too many requests from this IP, please try again later.'
};
export const AUTH_STRATEGY = {
    NAME: 'jwt',
    EXPERIS_IN_MINUTES: 60,
    REFRECH_EXPERIES_IN_MINUTES: 60 * 24,
    SECRET: '9df6a610acb41046627385c3d5cf2804d22e8073c79c4c8a664ddece19f45290afad29c3291023e95f8b07923bf26b8a8a2388a7b5590d2a6da4f2e761152884'
};
export const USERS = {
    LOGIN_DELAY: {
        MIN: 15,
        MAX: 80,
    },
    MAX_SUBSCRIBTIONS: 10,
    EMAIL_VERFICATION_EXPIRATION_IN_MS: 1000 * 60 * 60,// 1 Hour
};

export const SECRETS = {
    HASH_KEY: 'vpRX12W6sIaO2dv91IUOn',
}