import { MenuItem, Stack, TextField } from '@mui/material'
import type { GradeLevel, Subject } from '@/features/catalog/types/syncTypes'

type Props = {
  gradeLevels: GradeLevel[]
  subjects: Subject[]
  selectedGradeLevelId?: number
  selectedSubjectId?: number
}

export default function DashboardFilters({
  gradeLevels,
  subjects,
  selectedGradeLevelId,
  selectedSubjectId,
}: Props) {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mb={4}>
      <TextField select label="Nivel" value={selectedGradeLevelId ?? ''} fullWidth>
        {gradeLevels.map((level) => (
          <MenuItem key={level.id} value={level.id}>
            {level.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField select label="Asignatura" value={selectedSubjectId ?? ''} fullWidth>
        {subjects.map((subject) => (
          <MenuItem key={subject.id} value={subject.id}>
            {subject.name}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  )
}