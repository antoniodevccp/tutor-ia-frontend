import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEvaluateQuestion } from '@/features/evaluation/hooks/useEvaluateQuestion'

type AnswerPageState = {
  topicId?: number
  topicName?: string
  questionText?: string
}

export default function AnswerQuestionPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { questionId } = useParams()

  const [studentAnswer, setStudentAnswer] = useState('')
  const evaluateMutation = useEvaluateQuestion()

  const state = location.state as AnswerPageState | null

  const onSubmit = async () => {
    if (!questionId || !studentAnswer.trim()) return

    const result = await evaluateMutation.mutateAsync({
      questionId,
      payload: { studentAnswer },
    })

    navigate('/evaluation-result', {
      state: {
        result,
        topicId: state?.topicId,
      },
    })
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
          maxWidth: 900,
          mx: 'auto',
          minHeight: { xs: '100vh', md: 'calc(100vh - 32px)' },
          p: { xs: 2, sm: 3, md: 4 },
          bgcolor: 'background.paper',
          borderRadius: { xs: 0, md: 4 },
          border: { xs: 'none', md: '1px solid' },
          borderColor: 'divider',
        }}
      >
        <Typography variant="h4" color="text.primary" mb={1}>
          Responder pregunta
        </Typography>

        {state?.topicName && (
          <Typography color="text.secondary" mb={2}>
            Tema: {state.topicName}
          </Typography>
        )}

        {state?.questionText && (
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              mb: 3,
              bgcolor: 'background.default',
              borderColor: 'divider',
            }}
          >
            <Typography fontWeight={800} color="primary.main" mb={1}>
              Pregunta
            </Typography>

            <Typography color="text.primary">
              {state.questionText}
            </Typography>
          </Paper>
        )}

        <Typography color="text.secondary" mb={3}>
          Escribe tu respuesta con el mayor detalle posible.
        </Typography>

        <Stack spacing={3}>
          <TextField
            label="Tu respuesta"
            value={studentAnswer}
            onChange={(event) => setStudentAnswer(event.target.value)}
            multiline
            minRows={8}
            fullWidth
            color="primary"
            disabled={evaluateMutation.isPending}
          />

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onSubmit}
            disabled={evaluateMutation.isPending || !studentAnswer.trim()}
          >
            {evaluateMutation.isPending ? 'Evaluando...' : 'Enviar respuesta'}
          </Button>
        </Stack>
      </Paper>

      <Backdrop
        open={evaluateMutation.isPending}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: 'blur(6px)',
          bgcolor: 'rgba(15, 23, 42, 0.72)',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            maxWidth: 420,
            width: '90%',
            textAlign: 'center',
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Stack alignItems="center" spacing={2}>
            <CircularProgress color="primary" size={56} thickness={4} />

            <Typography variant="h5" color="text.primary">
              Evaluando tu respuesta
            </Typography>

            <Typography color="text.secondary">
              La IA está analizando tu respuesta, comparando conceptos clave y preparando tu retroalimentación.
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Esto puede tardar algunos segundos.
            </Typography>
          </Stack>
        </Paper>
      </Backdrop>
    </Box>
  )
}