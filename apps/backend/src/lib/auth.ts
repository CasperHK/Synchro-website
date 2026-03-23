import { SignJWT, jwtVerify } from 'jose'

const secretValue = process.env.JWT_SECRET ?? 'synchro-dev-secret-change-me'
const secret = new TextEncoder().encode(secretValue)

export async function createAdminToken(payload: { email: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)
}

export async function verifyAdminToken(token: string) {
  const { payload } = await jwtVerify(token, secret)
  return payload
}
