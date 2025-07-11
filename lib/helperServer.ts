"use server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { JwtDecode } from "@/types";

export async function getCookies(key: string) {
  const data = (await cookies()).get(key)?.value;
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch {
    return data; // it's a plain string
  }
}

export async function deleteCookies(key: string) {
  return (await cookies()).delete(key);
}

export async function setCookies(
  key: string,
  data: string | number | object,
  maxAge: number
) {
  const serializedData = typeof data === "string" ? data : JSON.stringify(data);

  (await cookies()).set(key, serializedData, {
    maxAge,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function logoutAction() {
  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");
}

export const isAdmin = async (): Promise<boolean> => {
  const token = await getCookies("accessToken");

  let decoded: JwtDecode;
  if (token) {
    decoded = jwtDecode(token);
    return decoded.adm;
  }
  return false;
};
