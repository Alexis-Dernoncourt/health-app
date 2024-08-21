import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Menu extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user: number

  @column()
  declare recipe: number

  @column()
  declare meal: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert'

  @column()
  declare date: Date

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
