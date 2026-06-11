import { Box, CircularProgress, Typography } from '@mui/material'

type Props = {
  score: number
}

export default function ScoreCircle({ score }: Props) {
  const scoreColor =
    score >= 80
      ? 'success.main'
      : score >= 60
        ? 'warning.main'
        : 'error.main'

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
      }}
    >
      <CircularProgress
        variant="determinate"
        value={100}
        size={92}
        thickness={5}
        sx={{
          color: 'divider',
        }}
      />

      <CircularProgress
        variant="determinate"
        value={score}
        size={92}
        thickness={5}
        sx={{
          color: scoreColor,
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
        <Typography
          variant="h6"
          fontWeight={800}
          color="text.primary"
        >
          {score}%
        </Typography>
      </Box>
    </Box>
  )
}