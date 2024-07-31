import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Recipe extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare image: string

  @column()
  declare description: string

  @column()
  declare ingredients: {
    name: string
    quantity: string
    unit: string | null
  }[]

  @column()
  declare steps: {
    id: string | number | null
    text: string
    warning: string | null
  }[]

  @column()
  declare calories: {
    for100gr: number
    total: number
    totalWeight: number
    caloriesUnit: string | null
  }[]

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
