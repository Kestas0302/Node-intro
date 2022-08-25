const express =require("express");
const cors = require("cors");
const {MongoClient}=require("mongodb");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;
const uri = process.env.CONNECTION;

const client =  new MongoClient(uri);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));