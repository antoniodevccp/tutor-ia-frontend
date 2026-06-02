import { Box, Button, Chip, LinearProgress, Paper, Stack, Typography } from '@mui/material'
import type { Topic } from '@/features/catalog/types/syncTypes'

type Props = {
  topic: Topic
}

export default function TopicCard({ topic }: Props) {
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
          background: 'linear-gradient(135deg, rgba(59,130,246,0.45), rgba(124,58,237,0.45))',
        }}
      />

      <Box p={2}>
        <Stack direction="row" justifyContent="space-between" gap={1} mb={1}>
          <Typography variant="h6" textTransform="capitalize">
            {topic.name}
          </Typography>

          {topic.contextNeedsRefresh && <Chip size="small" color="warning" label="Actualizar" />}
        </Stack>

        <Typography color="text.secondary" mb={2}>
          {topic.gradeLevelName} · {topic.subjectName}
        </Typography>

        <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
          <Typography variant="body2" color="text.secondary">
            Material v{topic.materialVersion}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={topic.contextNeedsRefresh ? 45 : 100}
            sx={{ flex: 1, height: 6, borderRadius: 999 }}
          />
        </Stack>

        <Button fullWidth variant="contained">
          Comenzar
        </Button>
      </Box>
    </Paper>
  )
}