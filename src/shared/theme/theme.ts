import { createTheme } from '@mui/material/styles'
import { darkColors, lightColors } from './colors'

export const createAppTheme = (mode: 'light' | 'dark') => {
  const colors = mode === 'light' ? lightColors : darkColors

  return createTheme({
    palette: {
      mode,

      primary: {
        main: colors.primary,
        light: colors.primaryLight,
        dark: colors.primaryDark,
        contrastText: '#FFFFFF',
      },

      secondary: {
        main: colors.secondary,
        light: colors.secondaryLight,
        dark: colors.secondaryDark,
        contrastText: '#FFFFFF',
      },

      success: {
        main: colors.success,
        light: colors.successLight,
      },

      warning: {
        main: colors.warning,
        light: colors.warningLight,
      },

      error: {
        main: colors.error,
        light: colors.errorLight,
      },

      info: {
        main: colors.info,
        light: colors.infoLight,
      },

      background: {
        default: colors.background,
        paper: colors.paper,
      },

      text: {
        primary: colors.textPrimary,
        secondary: colors.textSecondary,
        disabled: colors.textDisabled,
      },

      divider: colors.divider,
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