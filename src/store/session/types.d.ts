export interface User {
    username: string;
    jwt: string | null;
    refreshToken: string | null;
    sub: string | null;
}
