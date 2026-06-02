import { Box, Button, CircularProgress, Paper, Stack, Typography } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTopics } from '@/features/topics/hooks/useTopics'
import TopicCard from '@/features/dashboard/components/TopicCard'

export default function TopicsPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const gradeLevelId = Number(searchParams.get('gradeLevelId'))
  const subjectId = Number(searchParams.get('subjectId'))

  const { data, isLoading, isError } = useTopics({
    gradeLevelId,
    subjectId,
  })

  if (isLoading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError) {
    return <Typography color="error">No se pudieron cargar los topics.</Typography>
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: { xs: 2, md: 4 } }}>
      <Paper sx={{ maxWidth: 1100, mx: 'auto', p: { xs: 2, md: 4 } }}>
        <Button variant="text" onClick={() => navigate('/')} sx={{ mb: 2 }}>
          ← Volver al dashboard
        </Button>
        <Typography variant="h4" mb={1}>
          Topics disponibles
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Selecciona un tópico para comenzar a practicar.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 2,
          }}
        >
          {data?.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </Box>

        {data?.length === 0 && (
          <Stack alignItems="center" py={6}>
            <Typography color="text.secondary">
              No hay topics disponibles para esta selección.
            </Typography>
          </Stack>
        )}
      </Paper>
    </Box>
  )
}