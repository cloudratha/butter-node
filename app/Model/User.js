'use strict'

const Lucid = use('Lucid')
const Hash = use('Hash')

class User extends Lucid {

    static boot () {
        super.boot()

        /**
         * Hashing password before storing to the
         * database.
         */
        this.addHook('beforeCreate', function * (next) {
            this.password = yield Hash.make(this.password)
            yield next
        })
    }

    static get rules()
    {
        return {
            name: 'required|max:80',
            surname: 'required|max:80',
            email: 'required|email|max:254|unique:users,email',
            password: 'required|min:6',
            password_confirmation: 'same:password',
            mobile: 'required|unique:users,mobile|min:12|max:12'
        }
    }

    static get sanitizationRules()
    {
        return {
            name: 'strip_tags',
            surname: 'strip_tags',
            email: 'normalize_email'
        }
    }

    apiTokens () {
        return this.hasMany('App/Model/Token')
    }

}

module.exports = User
