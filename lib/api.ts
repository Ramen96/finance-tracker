import { useAuth } from "@clerk/nextjs";
import { useCallback } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useApi() {
  const { getToken } = useAuth();

  const endpointMap = {
    income: "api/transactions",
    expenses: "api/transactions",
    assets: "api/assets",
    liabilities: "api/liabilities"
  }

  const authFetch = useCallback(
    async (path: string, options: RequestInit = {}) => {
      const token = await getToken();

      const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || `Request failed: ${res.status}`)
      }

      return res.json();
    },
    [getToken]
  );
  return { authFetch };
}
