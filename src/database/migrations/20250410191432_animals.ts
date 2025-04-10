import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw(
        ` Create type animal_sexo as ENUM('macho','femea')
        
            Create Table animals(
                id uuid not null constraints pk_animals 
                primary key default(gen_random_uuid()),

                nome text not null,
                idade int not null,
                raca text not null,
                sexo animal_sexo not null,
                endereco text not null,
                tutor text
            )
        `
    )
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        Drop Table animals
        `)
}

