'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

    up () {
        this.create('users', table => {
            table.increments()
            table.string('name', 80).notNullable()
            table.string('surname', 80).notNullable()
            table.string('email', 254).notNullable().unique()
            table.string('mobile').notNullable().unique()
            table.string('password', 60).notNullable()
            table.string('verify', 5).notNullable()
            table.boolean('active').defaultTo(false)
            table.timestamps()
        })
    }

    down () {
        this.drop('users')
    }

}

module.exports = UsersTableSchema
