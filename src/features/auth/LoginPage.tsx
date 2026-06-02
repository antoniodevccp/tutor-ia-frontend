import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '@/features/auth/hooks/useLogin'

type LoginFormData = {
  email: string
  password: string
}

export default function LoginPage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()
  const loginMutation = useLogin()
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
  await loginMutation.mutateAsync(data)
  navigate('/sync')
  }

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="background.default"
      px={{ xs: 0, md: 3 }}
      py={{ xs: 0, md: 4 }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 1280,
          minHeight: { xs: '100vh', md: 600 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          overflow: 'hidden',
          borderRadius: { xs: 0, md: 4 },
          boxShadow: { xs: 'none', md: '0 24px 80px rgba(15, 23, 42, 0.12)' },
        }}
      >
        {!isMobile && (
          <Box
            sx={{
              position: 'relative',
              p: 6,
              color: 'white',
              background:
                'linear-gradient(135deg, #5B36F2 0%, #A020F0 48%, #3B82F6 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 3,
                    display: 'grid',
                    placeItems: 'center',
                    bgcolor: 'rgba(255,255,255,0.16)',
                  }}
                >
                  <SchoolOutlinedIcon />
                </Box>

                <Box>
                  <Typography variant="h4">TutorIA</Typography>
                  <Typography sx={{ opacity: 0.9 }}>
                    Aprende. Practica. Mejora.
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Box
              sx={{
                alignSelf: 'center',
                width: '78%',
                height: 260,
                borderRadius: 4,
                bgcolor: 'rgba(15, 23, 42, 0.25)',
                display: 'grid',
                placeItems: 'center',
                boxShadow: '0 24px 50px rgba(15, 23, 42, 0.25)',
              }}
            >
              <SchoolOutlinedIcon sx={{ fontSize: 120, opacity: 0.32 }} />
            </Box>

            <Typography sx={{ opacity: 0.9 }}>
              Plataforma de aprendizaje inteligente
            </Typography>
          </Box>
        )}

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={{ xs: 3, sm: 6, md: 8 }}
          py={{ xs: 5, md: 6 }}
        >
          <Box width="100%" maxWidth={448}>
            {isMobile && (
              <Stack direction="row" spacing={1.5} alignItems="center" mb={5}>
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: 3,
                    display: 'grid',
                    placeItems: 'center',
                    color: 'white',
                    background:
                      'linear-gradient(135deg, #5B36F2 0%, #A020F0 100%)',
                  }}
                >
                  <SchoolOutlinedIcon />
                </Box>

                <Box>
                  <Typography variant="h5">TutorIA</Typography>
                  <Typography color="text.secondary">
                    Aprende. Practica. Mejora.
                  </Typography>
                </Box>
              </Stack>
            )}

            <Typography variant="h4" mb={1}>
              Iniciar sesión
            </Typography>

            <Typography color="text.secondary" mb={4}>
              Ingresa tus credenciales para continuar
            </Typography>

            {loginMutation.isError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                No se pudo iniciar sesión. Revisa tus credenciales.
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <TextField
                  label="Email"
                  placeholder="ejemplo@correo.com"
                  type="email"
                  fullWidth
                  {...register('email', { required: true })}
                />

                <TextField
                  label="Contraseña"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  {...register('password', { required: true })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <VisibilityOffOutlinedIcon />
                          ) : (
                            <VisibilityOutlinedIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Box textAlign="right">
                  <Link
                    component="button"
                    type="button"
                    underline="none"
                    fontWeight={600}
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loginMutation.isPending}
                  sx={{
                    background:
                      'linear-gradient(90deg, #5B5EF7 0%, #A020F0 100%)',
                    boxShadow: '0 16px 32px rgba(109, 93, 246, 0.28)',
                  }}
                >
                  {loginMutation.isPending ? 'Ingresando...' : 'Ingresar'}
                </Button>

                <Typography textAlign="center" color="text.secondary">
                  ¿No tienes cuenta?{' '}
                  <Link underline="none" fontWeight={700}>
                    Contacta a tu profesor
                  </Link>
                </Typography>
              </Stack>
            </form>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}