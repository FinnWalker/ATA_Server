const mongoose = require("./js/mongoose.js");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const http = require("http").createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));


const active_participants = require("./js/active_participants.js");
const waiver = require("./js/waiver.js");
const quiz = require("./js/quiz.js");
const exit = require("./js/exit.js");
const play = require("./js/play.js");
const vr = require("./js/vr.js");

app.get("/active_participants", active_participants);
app.post("/waiver", waiver);
app.post("/quiz", quiz);
app.post("/exit", exit);
app.post("/play", play);
app.post("/vr", vr);

const port = 3000;
http.listen(port, "0.0.0.0", () => console.log(`Listening on port ${port}`));