const express = require("express");

const mysql = require("mysql2/promise");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
const mysqlConfig = {
  host: process.env.MY_SQL_HOST,

  user: process.env.MY_SQL_USER,

  password: process.env.MY_SQL_PASSWORD,

  database: process.env.MY_SQL_DATABASE,

  port: process.env.MY_SQL_PORT,
};

app.get("/api/users", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const responce = await con.execute("Select * From users_db.users;");
    console.log("Success: " + con);

    res.send(responce[0]);
  } catch (e) {
    console.log(e);
  }
});
app.get("/api/users/names", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const responce = await con.execute("Select id, name From users_db.users;");
    console.log("Success: " + con);

    res.send(responce[0]);
  } catch (e) {
    console.log(e);
  }
});
app.get("/api/users/emails", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const responce = await con.execute(
      "Select id, name, email From users_db.users;"
    );
    console.log("Success: " + con);

    res.send(responce[0]);
  } catch (e) {
    console.log(e);
  }
});

app.get("/api/users/address", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const responce = await con.execute(
      "Select id, name, address From users_db.users;"
    );
    console.log("Success: " + con);

    res.send(responce[0]);
  } catch (e) {
    console.log(e);
  }
});

app.get("/api/users/:id?", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isInteger(id) || !req.params.id) {
      const con = await mysql.createConnection(mysqlConfig);
      const selectAll = "SELECT * FROM users";
      const selectOne = `${selectAll} WHERE id=${id}`;
      const response = await con.execute(id ? selectOne : selectAll);
      res.send(response[0]);
      await con.end();
    } else {
      res.status(400).send([]);
    }
  } catch (e) {
    if (e.code === "ER_ACCESS_DENIED_ERROR") {
      res.status(401).send("Unauthorized");
    }
    console.log(e);
  }
});

app.get("/", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);

    console.log("Success: " + con);

    res.send("Success");
  } catch (e) {
    console.log(e);
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const user = req.body;

    if (users.name && users.email && users.address) {
      const con = await mysql.createConnection(mysqlConfig);

      const response = await con.execute(
        `INSERT INTO users (name, email, address) values (${con.escape(
          users.name
        )}, ${con.escape(users.email)}, ${con.escape(users.address)})`
      );

      res.send(response[0]);

      await con.end();
    } else {
      res.status(400).send("Bad syntax");
    }
  } catch (e) {
    console.log(e);
  }
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found :(");

  res.send("Success");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
