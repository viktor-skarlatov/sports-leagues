import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { SoccerLeaguesList } from './components/SoccerLeaguesList'
import { ListSkeleton } from './components/ListSkeleton'
import { ALL_SPORTS, SPORTS, useApp } from './hooks/useApp';

function App() {
  const { sport, search, isLoading, leagues, setSearch, setSport } = useApp();

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sports Leagues
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          mb: 2,
        }}
      >
        <FormControl sx={{ minWidth: 160 }} size="small">
          <InputLabel id="sport-filter-label">Sport</InputLabel>
          <Select
            labelId="sport-filter-label"
            label="Sport"
            value={sport}
            onChange={(event) => setSport(event.target.value)}
          >
            <MenuItem value={ALL_SPORTS}>All sports</MenuItem>
            {SPORTS.map((sportName) => (
              <MenuItem key={sportName} value={sportName}>
                {sportName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          size="small"
          label="Search leagues"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </Box>

      {isLoading ? (
        <ListSkeleton />
      ) : (
        <SoccerLeaguesList leagues={leagues} />
      )}
    </Container>
  )
}

export default App
