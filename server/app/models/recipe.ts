import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Recipe extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column({})
  // image_id from table images
  declare image: number

  @column()
  declare description: string

  @column()
  declare ingredients: string
  // MUST BE :
  // {
  //   name: string
  //   quantity: number
  //   unit: string | null
  // }[]

  @column()
  declare steps: string
  // MUST BE :
  // {
  //   number: number | null
  //   text: string
  //   warning: string | null
  // }[]

  @column()
  declare calories: {
    for100gr: number
    total: number
    totalWeight: number
    caloriesUnit: string | null
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
