const express = require("express");
const app = express();
const cors = require("cors")

const PORT = 8080;

app.use(cors());
app.use(express.json());

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

// app.listen(3000)

// "/" - base path(pagrindinis) pvz: localhost:3000
// req - sutrumpinimas request zodzio. Kvietimas is vartotojo puses.
// res - sutrumpinimas zodzio responce. Grazinimas is serverines dalies.


app.get("/", (req, res) => {
  res.send(["Bmw", "Audi", "WV"]);
});

app.listen(PORT, () => console.log(`Server isd running on port ${PORT}`));


app.post("/", (req, res) => {
  console.log(req.body);
  res.send("OK");
})