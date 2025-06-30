export interface IArea {
  id: number
  name: string
  code: string
  flag: string | null
}

export interface ICurrentSeason {
  id: number
  startDate: string
  endDate: string
  currentMatchday: number
  winner: IWinner | null
}

export interface IWinner {
  id: number
  name: string
  shortName: string
  tla: string
  crest: string
  address: string
  website: string
  founded: number
  clubColors: string
  venue: string
  lastUpdated: string
}

export interface ICompetition {
  id: number
  area: IArea
  name: string
  code: string
  type: 'LEAGUE' | 'CUP'
  emblem: string
  plan: string
  currentSeason: ICurrentSeason
  numberOfAvailableSeasons: number
  lastUpdated: string
}