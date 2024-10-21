export type JWT_ACCESS = {
    access: { token: string; expireIn: number };
    refresh: { token: string; expireIn: number };
};
