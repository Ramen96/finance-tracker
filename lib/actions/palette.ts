"use server"
import { cookies } from "next/headers"
import { Palette } from "@/context/usePalette"

export async function updatePaletteCookiesAction(palette: Palette) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: 'palette',
    value: palette,
    path: '/',
    maxAge: 34560000, // 400 days
    sameSite: 'lax'
  })
}
