const express = require("express");
const mysql = require("mysql");
const app = express();

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

const port = 3000;

const connection = mysql.createConnection(config);
connection.query(
  `CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id))`
);
connection.end();

app.get("/", (_, res) => {
  let html = "<h1>Full Cycle Rocks!</h1>";

  const connection = mysql.createConnection(config);
  connection.query(`INSERT INTO people(name) values ('Victor')`);
  connection.query(`SELECT * FROM people`, (_, people) => {
    people.forEach((person) => (html = html.concat(`<p>${person.name}</p>`)));

    res.send(html);
  });
  connection.end();
});

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});
