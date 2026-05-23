import { createTheme } from '@mui/material/styles'
import { darkColors, lightColors } from './colors'

export const createAppTheme = (mode: 'light' | 'dark') => {
  const colors = mode === 'light' ? lightColors : darkColors

  return createTheme({
    palette: {
      mode,

      primary: {
        main: colors.primary,
      },

      secondary: {
        main: colors.secondary,
      },

      background: {
        default: colors.background,
        paper: colors.paper,
      },

      text: {
        primary: colors.textPrimary,
        secondary: colors.textSecondary,
      },

      divider: colors.border,
    },

    typography: {
      fontFamily: ['Inter', 'Roboto', 'Arial', 'sans-serif'].join(','),

      h4: {
        fontWeight: 800,
      },

      h5: {
        fontWeight: 800,
      },

      button: {
        fontWeight: 700,
        textTransform: 'none',
      },
    },

    shape: {
      borderRadius: 14,
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            minHeight: 52,
            borderRadius: 12,
            boxShadow: 'none',
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 20,
          },
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
    },
  })
}