import { SignJWT, jwtVerify, JWTPayload } from "jose";

// Define the secret key and algorithm for JWT
const secretKey = new TextEncoder().encode(
  process.env.JWT_SECRET! || "5Gu/vLjC8VXhBpZbZODm70NGTtNU/Zw/FndSbZxqeHo="
);
const issuer = process.env.APPLICATION_NAME! || "TGMAG";

// Define expiration times for tokens
const accessTokenExpiry = "1h"; // Access token valid for 1 hour

// Create JWT (Access Token)
export async function createJWT(payload: JWTPayload): Promise<string> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(issuer)
    .setExpirationTime(accessTokenExpiry)
    .sign(secretKey);

  return token;
}

// Validate JWT (Check if it’s valid)
export async function validateJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey, {
      issuer,
    });
    return payload;
  } catch (error) {
    console.error("JWT validation error:", error);
    return null;
  }
}

export async function decodeJWT(token: string): Promise<JWTPayload | null> {
  try {
    // Verify and decode the token
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secretKey.toString()),
      {
        algorithms: ["HS256"],
      }
    );

    // Return the decoded payload
    return payload;
  } catch (error) {
    console.error("Token validation error:", error);
    return null;
  }
}
