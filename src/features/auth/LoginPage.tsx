import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useLogin } from './hooks/useLogin'
import { useNavigate } from 'react-router-dom'

type FormData = {
  email: string
  password: string
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<FormData>()
  const loginMutation = useLogin()
  const navigate = useNavigate()

  const onSubmit = async (data: FormData) => {
    try {
      await loginMutation.mutateAsync(data)
      navigate('/')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 420 }}>
        <Typography variant="h5" mb={3}>
          Iniciar sesión
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField label="Email" {...register('email')} fullWidth />
            <TextField label="Contraseña" type="password" {...register('password')} fullWidth />

            <Button
              variant="contained"
              size="large"
              type="submit"
              disabled={loginMutation.isPending}
            >
              Entrar
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}