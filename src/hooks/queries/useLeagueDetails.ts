import { useQuery } from '@tanstack/react-query'
import { fetchLeagueDetails } from '../../services/TheSportsDB';
import { QueryKeys } from './queryKeys';

export function useLeagueDetails(id?: string) {
  return useQuery({
    queryKey: [QueryKeys.leagueDetails, id],
    queryFn: () => fetchLeagueDetails(id!),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 60, // 1 hour — a league's badge effectively never changes
  });
}
