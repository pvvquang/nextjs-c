"use server";

import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";

// const SECRET_KEY = "TX57f8x|wed|O]$YoO#JODX}fk]_l7k1";
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || "";

export const decryptData = (encryptedData: string): Promise<any> => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const hashPassword = async (plainPassword: string) => {
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    return hashedPassword;
  } catch {}
};

export const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string
) => {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch {
    return false;
  }
};
