import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_favorites'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('recipe_id').unsigned().references('id').inTable('recipes').onDelete('CASCADE')
      table.timestamps(true, true)

      // Ensure that each user can only favorite a specific recipe once
      table.unique(['user_id', 'recipe_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
