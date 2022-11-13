const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cors());

const mysqlConfig = {
  host: process.env.MY_SQL_HOST,

  user: process.env.MY_SQL_USER,

  password: process.env.MY_SQL_PASSWORD,

  database: process.env.MY_SQL_DATABASE,

  port: process.env.MY_SQL_PORT,
};

app.get("/", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);

    console.log("Success: " + con);

    res.send("Success");
  } catch (e) {
    console.log(e);
  }
});
app.get("/cars", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const responce = await con.execute("Select * From auto_park.Cars;");
    console.log("Success: " + con);

    res.send(responce[0]);
  } catch (e) {
    console.log(e);
  }
});
//   app.post("/Cars", async (req, res) => {
//     try {
//         const car = req.body;
//         if(car.title && car.image && car.price && car.platenumber){
//       const con = await mysql.createConnection(mysqlConfig);
//         const responce = await con.execute("Select * From auto_park.Cars;")
//       console.log("Success: " + con);

//       res.send(responce[0]);
//       await con.end;
//     } else{
//         res.status(400).send("BAD SYNTAX :(")
//     }
//     } catch (e) {
//       console.log(e);
//     }
//   });
app.get("/cars/:id?", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isInteger(id) || !req.params.id) {
      const con = await mysql.createConnection(mysqlConfig);
      const selectAll = "SELECT * FROM Cars";
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
app.post("/cars", async (req, res) => {
  try {
    const car = req.body;

    if (car.title && car.price && car.numberplate) {
      const con = await mysql.createConnection(mysqlConfig);

      const response = await con.execute(
        `INSERT INTO Cars (title, price, numberplate) values (${con.escape(
          car.title
        )}, ${con.escape(car.price)}, ${con.escape(car.numberplate)})`
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
app.delete("/Cars/:id", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const responce = await con.execute(
      `Delete  From auto_park.Cars Where id=${req.params.id};`
    );
    await con.end();
    res.send(responce[0]);
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
