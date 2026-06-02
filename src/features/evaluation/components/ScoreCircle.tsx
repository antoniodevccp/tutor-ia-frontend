import { Box, CircularProgress, Typography } from '@mui/material'

type Props = {
  score: number
}

export default function ScoreCircle({ score }: Props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        value={100}
        size={92}
        thickness={5}
        sx={{ color: 'rgba(148, 163, 184, 0.2)' }}
      />

      <CircularProgress
        variant="determinate"
        value={score}
        size={92}
        thickness={5}
        sx={{
          color: score >= 80 ? 'success.main' : score >= 60 ? 'warning.main' : 'error.main',
          position: 'absolute',
          left: 0,
        }}
      />

      <Box
        sx={{
          inset: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography fontWeight={800}>{score}%</Typography>
      </Box>
    </Box>
  )
}