import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'menus'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('recipe').notNullable().references('id').inTable('recipes').onDelete('CASCADE')
      table.integer('user').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.enum('meal', ['breakfast', 'lunch', 'dinner', 'snack', 'dessert']).notNullable()
      table.date('date').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
