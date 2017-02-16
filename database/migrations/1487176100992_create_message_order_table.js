'use strict'

const Schema = use('Schema')

class MessageOrderTableSchema extends Schema {

    up () {
        this.create('message_order', (table) => {
            table.integer('message_id').unsigned().references('id').inTable('messages')
            table.integer('order_id').unsigned().references('id').inTable('orders')
            table.boolean('status').defaultTo(false)
            table.dateTime('delivery').notNullable()
            table.timestamps()
        })
    }

    down () {
        this.drop('message_order')
    }

}

module.exports = MessageOrderTableSchema
