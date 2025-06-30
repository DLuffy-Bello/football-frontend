export interface ITeam {
  id: number
  name: string
  shortName: string
  tla: string
  crest: string
  address: string
  website: string
  founded: number
  clubColors: string | null
  venue: string | null
  lastUpdated: string,
  squad: ITeamPlayer[]
}

export interface ITeamDetail extends ITeam {
}

export interface ITeamPlayer {
  id: number
  name: string
  position: string
  dateOfBirth: string
  nationality: string
  shirtNumber?: number
  role: string
}

export interface ICoach {
  id: number
  name: string
  nationality: string
  dateOfBirth?: string
}