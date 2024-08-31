import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'images'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('user_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table
        .integer('recipe_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('recipes')
        .onDelete('CASCADE')

      table.unique(['user_id', 'recipe_id'])
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('user_id')
      table.dropColumn('recipe_id')
    })
  }
}
