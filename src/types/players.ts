export interface IPlayer {
  id: number
  name: string
  position: string
  dateOfBirth: string
  nationality: string
  shirtNumber?: number
  currentTeam?: {
    id: number
    name: string
    logo?: string
    area: {
      name: string
    }
  }
  lastUpdated?: string
}

export interface IPlayerDetail extends IPlayer {
  firstName?: string
  lastName?: string
  section?: string
  role?: string
}

export interface IPlayerStats {
  appearances: number
  goals: number
  assists: number
  yellowCards: number
  redCards: number
  minutesPlayed: number
}

export interface IPlayerCareer {
  team: string
  from: string
  to?: string
  appearances: number
  goals: number
}