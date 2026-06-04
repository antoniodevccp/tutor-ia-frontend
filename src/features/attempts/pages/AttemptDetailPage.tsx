import { Box, Button, Chip, CircularProgress, Paper, Stack, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useAttemptDetail } from '@/features/attempts/hooks/useAttemptDetail'

export default function AttemptDetailPage() {
  const navigate = useNavigate()
  const { attemptId } = useParams()
  const { data, isLoading, isError } = useAttemptDetail(attemptId)

  if (isLoading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError || !data) {
    return <Typography color="error">No se pudo cargar el detalle.</Typography>
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: { xs: 2, md: 4 } }}>
      <Paper sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, md: 4 } }}>

        <Stack direction="row" justifyContent="space-between" mb={3}>
          <Box>
            <Typography variant="h4">Detalle del intento</Typography>
            <Typography color="text.secondary">{data.topicName}</Typography>
          </Box>

          <Chip label={data.grade} color={data.score >= 80 ? 'success' : data.score >= 60 ? 'warning' : 'error'} />
        </Stack>

        <Typography variant="h3" mb={2}>
          {data.score}/100
        </Typography>

        {data.questionText && (
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography fontWeight={800}>Pregunta</Typography>
            <Typography>{data.questionText}</Typography>
          </Paper>
        )}

        {data.studentAnswer && (
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography fontWeight={800}>Tu respuesta</Typography>
            <Typography>{data.studentAnswer}</Typography>
          </Paper>
        )}

        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Typography fontWeight={800}>Feedback</Typography>
          <Typography>{data.feedback ?? 'Sin feedback disponible.'}</Typography>
        </Paper>

        <Button variant="contained" onClick={() => navigate('/')}>
          Volver al dashboard
        </Button>
      </Paper>
    </Box>
  )
}