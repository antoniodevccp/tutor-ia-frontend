import { Box, Paper } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import DashboardHeader from '@/features/dashboard/components/DashboardHeader'
import WelcomeBanner from '@/features/dashboard/components/WelcomeBanner'
import DashboardFilters from '@/features/dashboard/components/DashboardFilters'
import TopicsGrid from '@/features/dashboard/components/TopicsGrid'
import RecentAttemptsList from '@/features/dashboard/components/RecentAttemptsList'

import type { MeResponse } from '@/features/auth/api/me'
import type { GradeLevel, Subject, Topic } from '@/features/catalog/types/syncTypes'

type InitialSyncData = {
  me: MeResponse
  gradeLevels: GradeLevel[]
  subjects: Subject[]
  topics: Topic[]
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<InitialSyncData>(['initial-sync'])

  const userName = data?.me.userName || data?.me.email || 'Usuario'
  const selectedGrade = data?.gradeLevels[0]
  const selectedSubject =
    data?.subjects.find((subject) => subject.name === 'History') ?? data?.subjects[0]

  const topics = data?.topics ?? []

  const goToTopics = () => {
    if (!selectedGrade?.id || !selectedSubject?.id) return

    navigate(`/topics?gradeLevelId=${selectedGrade.id}&subjectId=${selectedSubject.id}`)
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
          maxWidth: 1400,
          mx: 'auto',
          minHeight: { xs: '100vh', md: 'calc(100vh - 32px)' },
          p: { xs: 2, sm: 3, md: 4 },
          bgcolor: 'background.paper',
          borderRadius: { xs: 0, md: 4 },
          border: { xs: 'none', md: '1px solid' },
          borderColor: 'divider',
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

        <TopicsGrid topics={topics.slice(0, 3)} onViewAll={goToTopics} />

        <RecentAttemptsList />
      </Paper>
    </Box>
  )
}