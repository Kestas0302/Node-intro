const express = require("express");

const mysql = require("mysql2/promise");

const PORT = 8080;

const app = express();
app.use(express.json());
const mysqlConfig = {
  host: "mysql-vigi26-do-user-12295532-0.b.db.ondigitalocean.com",

  user: "doadmin",

  password: "AVNS_IbR-HYhM9qDG9WmsypG",

  database: "defaultdb",

  port: "25060",
};

app.get("/shirts", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const responce = await con.execute(
      "SELECT * FROM defaultdb.shirts order by price asc limit 3;"
    );
    // console.log("Success: " + con);

    res.send(responce[0]);
    await con.end();
  } catch (e) {
    console.log(e);
  }
});
app.post("/shirts", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);

    const shirt = req.body;
    const responce = await con.execute(
      `INSERT INTO shirts (brand, model, size, price) values ('${shirt.brand}', '${shirt.model}', '${shirt.size}', '${shirt.price}')`
    );
    // console.log("Success: " + con);

    res.send(responce[0]);
    await con.end();
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
