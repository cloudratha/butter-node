'use strict'

const Schema = use('Schema')

class MessagesTableSchema extends Schema {

    up () {
        this.create('messages', (table) => {
            table.increments()
            table.integer('type_id').unsigned().references('id').inTable('types')
            table.text('message')
            table.timestamps()
        })
    }

    down () {
        this.drop('messages')
    }

}

module.exports = MessagesTableSchema
