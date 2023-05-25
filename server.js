var express = require("express");
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
require("./dbconnection");
let router = require("./route/route");
let http = require("http").createServer(app);
let io = require("socket.io")(http);

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
  console.log("listening on port:" + port);
});
