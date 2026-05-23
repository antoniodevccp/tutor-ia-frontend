import { createContext, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'
import { ThemeProvider, CssBaseline, useMediaQuery } from '@mui/material'
import { createAppTheme } from './theme'

type ThemeMode = 'light' | 'dark'

type ThemeContextType = {
  mode: ThemeMode
}

const ThemeModeContext = createContext<ThemeContextType | undefined>(undefined)

export const useThemeMode = () => {
  const context = useContext(ThemeModeContext)

  if (!context) {
    throw new Error('useThemeMode must be used inside ThemeContextProvider')
  }

  return context
}

type Props = {
  children: ReactNode
}

export const ThemeContextProvider = ({ children }: Props) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const mode: ThemeMode = prefersDarkMode ? 'dark' : 'light'

  const theme = useMemo(() => createAppTheme(mode), [mode])

  return (
    <ThemeModeContext.Provider value={{ mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}