import { Box, Paper, useTheme } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'

import DashboardHeader from '@/features/dashboard/components/DashboardHeader'
import WelcomeBanner from '@/features/dashboard/components/WelcomeBanner'
import DashboardFilters from '@/features/dashboard/components/DashboardFilters'
import TopicsGrid from '@/features/dashboard/components/TopicsGrid'

import type { GradeLevel, Subject, Topic } from '@/features/catalog/types/syncTypes'
import type { MeResponse } from '@/features/auth/api/me'

type InitialSyncData = {
  me: MeResponse
  gradeLevels: GradeLevel[]
  subjects: Subject[]
  topics: Topic[]
}

export default function DashboardPage() {
  const theme = useTheme()
  const queryClient = useQueryClient()

  const data = queryClient.getQueryData<InitialSyncData>(['initial-sync'])

  const userName = data?.me.userName || data?.me.email || 'Usuario'
  const selectedGrade = data?.gradeLevels[0]
  const selectedSubject = data?.subjects.find((s) => s.name === 'History') ?? data?.subjects[0]
  const topics = data?.topics ?? []

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: theme.palette.mode === 'dark' ? '#070D1A' : 'background.default',
        color: 'text.primary',
        p: { xs: 0, md: 2 },
      }}
    >
      <Paper
        sx={{
          maxWidth: 1400,
          mx: 'auto',
          minHeight: { xs: '100vh', md: 'calc(100vh - 32px)' },
          p: { xs: 2, md: 3 },
          bgcolor: 'background.paper',
          borderRadius: { xs: 0, md: 4 },
        }}
      >
        <DashboardHeader userName={userName} subjectName={selectedSubject?.name} />

        <WelcomeBanner userName={userName} />

        <DashboardFilters
          gradeLevels={data?.gradeLevels ?? []}
          subjects={data?.subjects ?? []}
          selectedGradeLevelId={selectedGrade?.id}
          selectedSubjectId={selectedSubject?.id}
        />

        <TopicsGrid topics={topics} />
      </Paper>
    </Box>
  )
}