import { useSnackbar } from "notistack";
import { useSoccerLeagues } from "./queries/useSoccerLeagues";
import { useEffect, useMemo, useState } from "react";

export const ALL_SPORTS = 'all';
export const SPORTS = ['Soccer', 'Basketball', 'Motorsport'];

export function useApp() {
  const { data: leagues, isLoading, isError } = useSoccerLeagues();
  const { enqueueSnackbar } = useSnackbar();

  const [sport, setSport] = useState<string>(ALL_SPORTS);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (isError) {
      enqueueSnackbar('Failed to load sports leagues. Please try again.', {
        variant: 'error',
      });
    }
  }, [isError, enqueueSnackbar]);

  const filteredLeagues = useMemo(() => {
    const query = search.trim().toLowerCase();
    return (leagues ?? []).filter((league) => {
      const lowercaseSport = sport.toLowerCase();
      const matchesSport = lowercaseSport === ALL_SPORTS || league.strSport.toLowerCase() === lowercaseSport;
      const matchesSearch =
        query === '' || league.strLeague.toLowerCase().includes(query);
      return matchesSport && matchesSearch;
    });
  }, [leagues, sport, search]);

  return { leagues: filteredLeagues, isLoading, sport, search, setSport, setSearch };
}