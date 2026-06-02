import { Box, Button, MenuItem, Paper, TextField, Typography } from '@mui/material'

export default function StartPage() {
  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>
        Selecciona nivel y tópico
      </Typography>

      <Box display="grid" gap={3}>
        <TextField select label="Nivel" fullWidth defaultValue="">
          <MenuItem value="">Selecciona un nivel</MenuItem>
        </TextField>

        <TextField select label="Asignatura" fullWidth defaultValue="">
          <MenuItem value="">Selecciona una asignatura</MenuItem>
        </TextField>

        <TextField label="Buscar tópico" fullWidth />

        <Button variant="contained" size="large">
          Continuar
        </Button>
      </Box>
    </Paper>
  )
}