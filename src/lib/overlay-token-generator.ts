import { createHash, randomBytes } from "node:crypto";

// generate a secure random overlay secret
const generateOverlaySecret = () => randomBytes(32).toString("base64url");

// hash the overlay secret using SHA-256
const hashOverlaySecret = (secret: string) =>
  createHash("sha256").update(secret).digest("hex");

export { generateOverlaySecret, hashOverlaySecret };
