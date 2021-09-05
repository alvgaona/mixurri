import { Buffer } from 'buffer';

export const formatUserId = (userId: string): string => {
  return `<@${userId}>`;
}

export const btoa = (value: string) => Buffer.from(value, "binary").toString("base64");
