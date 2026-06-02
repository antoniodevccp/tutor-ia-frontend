import { Box, Paper, Stack, Typography } from '@mui/material'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'

type Props = {
  userName: string
}

export default function WelcomeBanner({ userName }: Props) {
  return (
    <Paper
      sx={{
        p: { xs: 3, md: 4 },
        mb: 3,
        color: 'white',
        background: 'linear-gradient(135deg, #5B36F2 0%, #A020F0 50%, #3B82F6 100%)',
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
            bgcolor: 'rgba(255,255,255,0.16)',
          }}
        >
          <SchoolOutlinedIcon fontSize="large" />
        </Box>

        <Box>
          <Typography variant="h4">¡Bienvenido, {userName}!</Typography>
          <Typography sx={{ opacity: 0.9 }}>Continúa aprendiendo con TutorIA.</Typography>
        </Box>
      </Stack>
    </Paper>
  )
}