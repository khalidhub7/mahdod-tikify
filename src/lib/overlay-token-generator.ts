import { createHash, randomBytes } from "node:crypto";

const generateOverlaySecret = () => {
  return randomBytes(32).toString("base64url");
};

const hashOverlaySecret = (secret: string) => {
  createHash("sha256").update(secret).digest("hex");
};

export { generateOverlaySecret, hashOverlaySecret };
