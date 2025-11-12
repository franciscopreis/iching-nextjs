import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from 'next-themes'

// Tema do site
export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
