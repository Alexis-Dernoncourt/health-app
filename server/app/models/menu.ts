import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Recipe from './recipe.js'

export default class Menu extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare recipeId: number

  @hasOne(() => User)
  declare user: HasOne<typeof User>

  @hasOne(() => Recipe)
  declare recipe: HasOne<typeof Recipe>

  @column()
  declare meal: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert'

  @column()
  declare date: Date

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
