import { Box, Button, Stack, Typography } from '@mui/material'
import type { Topic } from '@/features/catalog/types/syncTypes'
import TopicCard from './TopicCard'

type Props = {
  topics: Topic[]
  onViewAll?: () => void
}

export default function TopicsGrid({ topics, onViewAll }: Props) {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Topics disponibles</Typography>

        {onViewAll && (
          <Button variant="text" onClick={onViewAll}>
            Ver todos
          </Button>
        )}
      </Stack>

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