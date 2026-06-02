import { Box, Chip, Paper, Stack, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import type { EvaluationResponse } from '@/features/evaluation/types/evaluation.types'

export default function EvaluationResultPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const result = location.state as EvaluationResponse | null

  if (!result) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <Paper sx={{ p: 4 }}>
          <Typography mb={2}>No hay resultado disponible.</Typography>
          <Button variant="contained" onClick={() => navigate('/')}>
            Volver al dashboard
          </Button>
        </Paper>
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: { xs: 2, md: 4 } }}>
      <Paper sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, md: 4 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography variant="h4">Resultado evaluación</Typography>
            <Typography color="text.secondary">Feedback generado por IA</Typography>
          </Box>

          <Chip label={result.grade} color={result.score >= 80 ? 'success' : 'warning'} />
        </Stack>

        <Typography variant="h2" mb={2}>
          {result.score}/100
        </Typography>

        <Typography mb={4}>{result.feedback}</Typography>

        <Stack spacing={3}>
          <ResultBlock title="Fortalezas" items={result.strengths} />
          <ResultBlock title="Debilidades" items={result.weaknesses} />
          <ResultBlock title="Conceptos faltantes" items={result.missingConcepts} />

          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography fontWeight={700} mb={1}>
              Mejora sugerida
            </Typography>
            <Typography color="text.secondary">{result.suggestedImprovement}</Typography>
          </Paper>

          <Button variant="contained" onClick={() => navigate('/')}>
            Volver al dashboard
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}

function ResultBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography fontWeight={700} mb={1}>
        {title}
      </Typography>

      {items.length === 0 ? (
        <Typography color="text.secondary">Sin observaciones.</Typography>
      ) : (
        <Stack component="ul" sx={{ pl: 3 }}>
          {items.map((item) => (
            <Typography component="li" key={item}>
              {item}
            </Typography>
          ))}
        </Stack>
      )}
    </Paper>
  )
}