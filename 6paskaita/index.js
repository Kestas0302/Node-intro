const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 8080;


app.listen(port, () => console.log(`Server is running ${port}`));
