import "server-only";

import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
} from "crypto";

function getKey(): Buffer {
  const value =
    process.env.INVITATION_ENCRYPTION_KEY;

  if (!value) {
    throw new Error(
      "Missing INVITATION_ENCRYPTION_KEY",
    );
  }

  const key = Buffer.from(value, "base64");

  if (key.length !== 32) {
    throw new Error(
      "INVITATION_ENCRYPTION_KEY must decode to 32 bytes.",
    );
  }

  return key;
}

export function encryptInvitationToken(
  token: string,
): string {
  const key = getKey();

  const iv = randomBytes(12);

  const cipher = createCipheriv(
    "aes-256-gcm",
    key,
    iv,
  );

  const encrypted = Buffer.concat([
    cipher.update(token, "utf8"),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  return [
    iv.toString("base64url"),
    authTag.toString("base64url"),
    encrypted.toString("base64url"),
  ].join(".");
}

export function decryptInvitationToken(
  encryptedToken: string,
): string {
  const key = getKey();

  const parts = encryptedToken.split(".");

  if (parts.length !== 3) {
    throw new Error(
      "Invalid encrypted invitation token.",
    );
  }

  const [ivPart, authTagPart, encryptedPart] =
    parts;

  const iv = Buffer.from(
    ivPart,
    "base64url",
  );

  const authTag = Buffer.from(
    authTagPart,
    "base64url",
  );

  const encrypted = Buffer.from(
    encryptedPart,
    "base64url",
  );

  const decipher = createDecipheriv(
    "aes-256-gcm",
    key,
    iv,
  );

  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}