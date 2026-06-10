import axios from 'axios'
import { CONFIG } from '../config'

const axiosClient = axios.create({ baseURL: CONFIG.BASE_URL });

export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate?: string;
}

interface AllSoccerLeaguesResponse {
  leagues: League[];
}

export async function fetchAllSoccerLeagues(): Promise<League[]> {
  const { data } = await axiosClient.get<AllSoccerLeaguesResponse>('3/all_leagues.php');
  return data.leagues ?? [];
}

export interface Season {
  strSeason: string;
  strBadge: string | null;
}

interface LeagueDetailsResponse {
  seasons: Season[];
}

export async function fetchLeagueDetails(id: string): Promise<Season | undefined> {
  const { data } = await axiosClient.get<LeagueDetailsResponse>('3/search_all_seasons.php', {
    params: { badge: 1, id },
  });

  return data.seasons?.[0];
}
