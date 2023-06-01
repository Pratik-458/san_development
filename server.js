import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dbconnection from "./dbconnection.js";
import router from "./route/route.js";
import { createServer } from "http";
import { Server } from "socket.io";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const http = createServer(app);
const io = new Server(http);

io.on("connection", (socket) => {
  console.log("a client is connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  setInterval(() => {
    socket.emit("number", parseInt(Math.random() * 10));
  }, 1000);
});

var port = process.env.port || 3000;

app.use("/", router);

http.listen(port, () => {
  console.log("listening on http://localhost:" + port);
});
