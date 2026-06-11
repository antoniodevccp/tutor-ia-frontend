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
      <Box
        sx={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          bgcolor: 'background.default',
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    )
  }

  if (isError) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          bgcolor: 'background.default',
          p: 3,
        }}
      >
        <Typography color="error.main" fontWeight={700}>
          No se pudieron cargar los temas.
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        p: { xs: 0, md: 2 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 1100,
          mx: 'auto',
          minHeight: { xs: '100vh', md: 'calc(100vh - 32px)' },
          p: { xs: 2, sm: 3, md: 4 },
          bgcolor: 'background.paper',
          borderRadius: { xs: 0, md: 4 },
          border: { xs: 'none', md: '1px solid' },
          borderColor: 'divider',
        }}
      >
        <Button
          variant="text"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ mb: 2 }}
        >
          ← Volver al inicio
        </Button>

        <Typography variant="h4" color="text.primary" mb={1}>
          Temas disponibles
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Selecciona un tema para comenzar a practicar.
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
              No hay temas disponibles para esta selección.
            </Typography>
          </Stack>
        )}
      </Paper>
    </Box>
  )
}