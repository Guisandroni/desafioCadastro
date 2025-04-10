import knexModule from 'knex'
import knexConfig from "../../knexfile.ts"
const knex = knexModule(knexConfig)

export default knex