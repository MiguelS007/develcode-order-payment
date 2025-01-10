export interface JwtPayload {
  username: string;
  role: string;
  iat?: number;
  exp?: number;
}
