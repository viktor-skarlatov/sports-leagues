import { useQuery } from '@tanstack/react-query'
import { fetchAllSoccerLeagues } from '../../services/TheSportsDB';
import { QueryKeys } from './queryKeys';

export function useSoccerLeagues() {
  return useQuery({
    queryKey: [QueryKeys.allSoccerLeagues],
    queryFn: fetchAllSoccerLeagues,
    refetchOnWindowFocus: false,
  });
}
