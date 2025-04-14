const express = require("express");
require("dotenv").config();

const ListenPortHandler = require("./handlers/ListenPortHandler.js");

const app = express();

app.listen(process.env.PORT, ListenPortHandler);
