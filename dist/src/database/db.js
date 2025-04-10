import { open } from "node:sqlite";
const schemaSetupDataBase = async () => {
  const db = await open({
    filename: "/database.sqlite",
    driver: sqlite3.Database,
  });
  await db.exec(`
        Create table if not exist animal (
        id integer primary key autoincrement,
        name text not null,
        breed text not null,
        age text not null,
        tutor text,
        sexy text not null,
        address text ,
        species text not null,
        neighborhood 
        ) `);
  await db.run(
    `
        Insert into animal(name,breed,age,tutor,sexy,address,species,neighborhood) Values (?,?,?,?,?,?,?,?)`,
    [
      "linguica",
      "puddle",
      "9",
      "guilherme",
      "macho",
      "ibiuna",
      "cachorro",
      "vista linda",
    ],
  );
  const animals = await db.all("Select * from animal");
  console.log(animals);
  await db.close();
};
schemaSetupDataBase().catch(console.error);
