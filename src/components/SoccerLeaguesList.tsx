import { useState } from 'react'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import type { League } from '../services/TheSportsDB'
import { useLeagueDetails } from '../hooks/queries/useLeagueDetails'
import { ImageModal } from './ImageModal'

interface Props {
  leagues?: League[];
}

export function SoccerLeaguesList({ leagues }: Props) {
  const [selectedLeague, setSelectedLeague] = useState<League>();
  const { data: details, isLoading } = useLeagueDetails(selectedLeague?.idLeague);

  return (
    <>
      <List>
        {leagues?.map((league) => (
          <ListItem key={league.idLeague} divider disablePadding>
            <ListItemButton onClick={() => setSelectedLeague(league)}>
              <ListItemText
                primary={`${league.strLeague} (${league.strSport})`}
                secondary={league.strLeagueAlternate || undefined}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <ImageModal
        open={Boolean(selectedLeague)}
        title={selectedLeague?.strLeague}
        imageUrl={details?.strBadge}
        loading={isLoading}
        onClose={() => setSelectedLeague(undefined)}
      />
    </>
  )
}
