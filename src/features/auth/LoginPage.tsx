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

const logoSrc = '/branding/tutoria-logo.png'

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

  const heroGradient = `linear-gradient(
    135deg,
    ${theme.palette.primary.main} 0%,
    ${theme.palette.primary.light} 55%,
    ${theme.palette.secondary.main} 100%
  )`

  const buttonGradient = `linear-gradient(
    90deg,
    ${theme.palette.primary.main} 0%,
    ${theme.palette.secondary.main} 100%
  )`

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
          border: { xs: 'none', md: '1px solid' },
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        {!isMobile && (
          <Box
            sx={{
              p: 6,
              color: '#FFF',
              background: heroGradient,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography variant="h3" color="#FFF" fontWeight={900}>
                TutorIA
              </Typography>

              <Typography sx={{ color: 'rgba(255,255,255,0.92)', mt: 0.5 }}>
                Aprende. Entiende. Crece.
              </Typography>
            </Box>

            <Box
              sx={{
                alignSelf: 'center',
                width: '82%',
                maxWidth: 430,
                aspectRatio: '1 / 1',
                borderRadius: 6,
                bgcolor: 'rgba(255,255,255,0.24)',
                p: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Box
                component="img"
                src={logoSrc}
                alt="TutorIA"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: 4,
                  bgcolor: '#FFFFFF',
                }}
              />
            </Box>

            <Typography sx={{ color: 'rgba(255,255,255,0.92)' }}>
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
              <Box mb={5}>
                <Typography variant="h4" color="text.primary" fontWeight={900}>
                  TutorIA
                </Typography>

                <Typography color="text.secondary">
                  Aprende. Practica. Mejora.
                </Typography>
              </Box>
            )}

            <Typography variant="h4" mb={1} color="text.primary">
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
                  color="primary"
                  {...register('email', { required: true })}
                />

                <TextField
                  label="Contraseña"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  color="primary"
                  {...register('password', { required: true })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                          {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Box textAlign="right">
                  <Link component="button" type="button" underline="none" fontWeight={700}>
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loginMutation.isPending}
                  sx={{
                    background: buttonGradient,
                    boxShadow: `0 12px 28px ${theme.palette.primary.main}40`,
                  }}
                >
                  {loginMutation.isPending ? 'Ingresando...' : 'Ingresar'}
                </Button>

                <Typography textAlign="center" color="text.secondary">
                  ¿No tienes cuenta?{' '}
                  <Link underline="none" fontWeight={800}>
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