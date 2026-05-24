import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInitialSync } from '@/features/sync/hooks/useInitialSync'

export default function SyncPage() {
  const navigate = useNavigate()
  const { isLoading, isSuccess, isError, refetch } = useInitialSync()

  useEffect(() => {
    if (isSuccess) {
      navigate('/', { replace: true })
    }
  }, [isSuccess, navigate])

  useEffect(() => {
    if (isError) {
      const retryTimeout = setTimeout(() => {
        refetch()
      }, 1500)

      return () => clearTimeout(retryTimeout)
    }
  }, [isError, refetch])

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        bgcolor: 'background.default',
        px: 3,
      }}
    >
      <Stack alignItems="center" spacing={2}>
        <CircularProgress size={44} thickness={4} />

        <Typography variant="h6" fontWeight={700}>
          Preparando tu espacio de aprendizaje
        </Typography>

        <Typography color="text.secondary" textAlign="center">
          Estamos cargando tu sesión y sincronizando la información inicial...
        </Typography>

        {isLoading && (
          <Typography variant="body2" color="text.secondary">
            Esto tomará solo unos segundos.
          </Typography>
        )}

        {isError && (
          <Typography variant="body2" color="error">
            No se pudo sincronizar. Reintentando...
          </Typography>
        )}
      </Stack>
    </Box>
  )
}