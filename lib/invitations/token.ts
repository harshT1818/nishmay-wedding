import "server-only";

import { createHash, randomBytes } from "crypto";

export function hashInvitationToken(token: string): string {
  return createHash("sha256")
    .update(token)
    .digest("hex");
}

export function generateInvitationToken(): string {
  return randomBytes(24).toString("base64url");
}