'use strict'

const Schema = use('Schema')

class OrdersTableSchema extends Schema {

    up () {
        this.create('orders', (table) => {
            table.increments()
            table.integer('user_id').unsigned().references('id').inTable('users')
            table.string('receiver', 20).notNullable()
            table.integer('count').notNullable()
            table.decimal('price', 8, 2).notNullable()
            table.timestamps()
        })
    }

    down () {
        this.drop('orders')
    }

}

module.exports = OrdersTableSchema
