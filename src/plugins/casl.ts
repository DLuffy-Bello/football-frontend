import { createMongoAbility, type MongoAbility } from '@casl/ability'

export type Actions =
  | 'view_competitions'
  | 'view_details_competitions'
  | 'view_teams'
  | 'view_details_teams'
  | 'view_players'
  | 'view_details_players'
  | 'manage'

export type Subjects =
  | 'competitions'
  | 'teams'
  | 'players'
  | 'all'

export type AppAbility = MongoAbility<[Actions, Subjects]>;

export const ability = createMongoAbility<[Actions, Subjects]>()

export function updateAbility(userPermissions: string[], isAdmin: boolean = false): void {
  const rules: any[] = [];
  if (isAdmin) {
    ability.update([
      { action: 'manage', subject: 'all' }
    ])
    return;
  }

  userPermissions.forEach(permission => {
    switch (permission) {
      case 'view_competitions':
        rules.push({ action: 'view_competitions', subject: 'competitions' })
        break
      case 'view_details_competitions':
        rules.push({ action: 'view_details_competitions', subject: 'competitions' })
        break
      case 'view_teams':
        rules.push({ action: 'view_teams', subject: 'teams' })
        break
      case 'view_details_teams':
        rules.push({ action: 'view_details_teams', subject: 'teams' })
        break
      case 'view_players':
        rules.push({ action: 'view_players', subject: 'players' })
        break
      case 'view_details_players':
        rules.push({ action: 'view_details_players', subject: 'players' })
        break
    }
  })

  ability.update(rules)
}

export function clearAbility(): void {
  ability.update([])
}

export default ability
