import { Box, Button, Paper, TextField, Typography, Alert } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { useRegister } from '@/features/auth/hooks/useRegister'

type RegisterFormData = {
  userName: string
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  dayOfBirth: string
}

export default function RegisterPage() {
  const navigate = useNavigate()
  const registerMutation = useRegister()

  const { register, handleSubmit } = useForm<RegisterFormData>({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      dayOfBirth: '',
    },
  })

  const onSubmit = async (data: RegisterFormData) => {
    await registerMutation.mutateAsync({
      ...data,
      dayOfBirth: new Date(data.dayOfBirth).toISOString(),
      roleName: 'Student',
      claims: [],
    })

    navigate('/login')
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 520 }}>
        <Typography variant="h5" mb={3}>
          Crear cuenta
        </Typography>

        {registerMutation.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            No se pudo crear la cuenta. Revisa los datos e intenta nuevamente.
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField label="Nombre de usuario" {...register('userName')} fullWidth required />
            <TextField label="Nombre" {...register('firstName')} fullWidth required />
            <TextField label="Apellido" {...register('lastName')} fullWidth required />
            <TextField label="Email" type="email" {...register('email')} fullWidth required />
            <TextField
              label="Fecha de nacimiento"
              type="date"
              {...register('dayOfBirth')}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Contraseña"
              type="password"
              {...register('password')}
              fullWidth
              required
              inputProps={{ minLength: 5, maxLength: 10 }}
            />
            <TextField
              label="Confirmar contraseña"
              type="password"
              {...register('confirmPassword')}
              fullWidth
              required
              inputProps={{ minLength: 5, maxLength: 10 }}
            />

            <Button variant="contained" size="large" type="submit" disabled={registerMutation.isPending}>
              Crear cuenta
            </Button>

            <Button component={RouterLink} to="/login">
              Ya tengo cuenta
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}