const express = require("express");

const mysql = require("mysql2/promise");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
const mysqlConfig = {
  //   host: "mysql-vigi26-do-user-12295532-0.b.db.ondigitalocean.com",

  //   user: "doadmin",

  //   password: "AVNS_IbR-HYhM9qDG9WmsypG",

  //   database: "products",

  //   port: "25060",
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
app.get("/Cars", async (req, res) => {
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
app.post("/cars", async (req, res) => {
  try {
    const car = req.body;

    if (car.title && car.image && car.price && car.numberplate) {
      const con = await mysql.createConnection(mysqlConfig);

      const response = await con.execute(
        `INSERT INTO Cars (title, image, price, numberplate) values (${con.escape(
          car.title
        )}, ${con.escape(car.image)}, ${con.escape(car.price)}, ${con.escape(
          car.numberplate
        )})`
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
      const responce = await con.execute(`Delete * From auto_park.Cars Where id=${req.params.id};`);
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
