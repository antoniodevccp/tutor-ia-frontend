import { Box, Button, Chip, LinearProgress, Paper, Stack, Typography } from '@mui/material'
import type { Topic } from '@/features/catalog/types/syncTypes'
import { useNavigate } from 'react-router-dom'

type Props = {
  topic: Topic
}

export default function TopicCard({ topic }: Props) {
  const navigate = useNavigate()

  return (
    <Paper
      sx={{
        overflow: 'hidden',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          height: 120,
          background: (theme) => `
            linear-gradient(
              135deg,
              ${theme.palette.primary.light},
              ${theme.palette.secondary.main}
            )
          `,
        }}
      />

      <Box p={2}>
        <Stack direction="row" justifyContent="space-between" gap={1} mb={1}>
          <Typography
            variant="h6"
            textTransform="capitalize"
            color="text.primary"
            sx={{ fontWeight: 800 }}
          >
            {topic.name}
          </Typography>

          {topic.contextNeedsRefresh && (
            <Chip size="small" color="warning" label="Actualizar" />
          )}
        </Stack>

        <Typography color="text.secondary" mb={2}>
          {topic.gradeLevelName} · {topic.subjectName}
        </Typography>

        <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
          <Typography variant="body2" color="text.secondary">
            Versión {topic.materialVersion}
          </Typography>

          <LinearProgress
            color={topic.contextNeedsRefresh ? 'warning' : 'success'}
            variant="determinate"
            value={topic.contextNeedsRefresh ? 45 : 100}
            sx={{
              flex: 1,
              height: 8,
              borderRadius: 999,
              bgcolor: 'background.default',

              '& .MuiLinearProgress-bar': {
                borderRadius: 999,
              },
            }}
          />
        </Stack>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => navigate(`/topics/${topic.id}/questions`)}
        >
          Practicar
        </Button>
      </Box>
    </Paper>
  )
}