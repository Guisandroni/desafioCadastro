import type {Knex} from "knex"

const config: Knex.Config = {
    client:'sqlite',
    connection: {
        filename:'./src/database/db.sqlite'
    },
    migrations:{
        directory:'./src/database/migrations',
        extension:'ts'
    },
    useNullAsDefault:true
}

export default config