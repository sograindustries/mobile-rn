export interface User {
  id: number;
  username: string;
  jwt: string | null;
  refreshToken: string | null;
  sub: string | null;
}
