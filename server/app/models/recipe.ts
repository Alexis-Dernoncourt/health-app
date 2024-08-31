import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import Image from './image.js'
import type { HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Recipe extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare imageId: number

  @hasOne(() => Image)
  declare image: HasOne<typeof Image>

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
    caloriesUnit: string | undefined
  }

  @manyToMany(() => User, {
    pivotTable: 'user_favorites',
  })
  declare usersWhoFavorited: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
