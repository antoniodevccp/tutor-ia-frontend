import { Box, Typography } from '@mui/material'
import type { Topic } from '@/features/catalog/types/syncTypes'
import TopicCard from './TopicCard'

type Props = {
  topics: Topic[]
}

export default function TopicsGrid({ topics }: Props) {
  return (
    <>
      <Typography variant="h5" mb={2}>
        Topics disponibles
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
          gap: 2,
        }}
      >
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </Box>
    </>
  )
}