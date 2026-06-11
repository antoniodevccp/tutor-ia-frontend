import { Box, Paper, Stack, Typography, useTheme } from '@mui/material'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'

type Props = {
  userName: string
}

export default function WelcomeBanner({ userName }: Props) {
  const theme = useTheme()

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        mb: 3,
        color: '#FFF',
        background: `
          linear-gradient(
            135deg,
            ${theme.palette.primary.main} 0%,
            ${theme.palette.primary.light} 60%,
            ${theme.palette.secondary.main} 100%
          )
        `,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: 4,
            display: 'grid',
            placeItems: 'center',
            bgcolor: 'rgba(255,255,255,0.20)',
            backdropFilter: 'blur(6px)',
            flexShrink: 0,
          }}
        >
          <SchoolOutlinedIcon fontSize="large" />
        </Box>

        <Box>
          <Typography
            variant="h4"
            sx={{
              color: '#FFF',
              fontWeight: 800,
            }}
          >
            ¡Bienvenido, {userName}!
          </Typography>

          <Typography
            sx={{
              color: 'rgba(255,255,255,0.90)',
              mt: 0.5,
            }}
          >
            Continúa aprendiendo con TutorIA.
          </Typography>
        </Box>
      </Stack>
    </Paper>
  )
}