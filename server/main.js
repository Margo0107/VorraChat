const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const authoeRoutes = require("./routes/authorRoutes");
const userRoutes = require("./routes/userRoutes");

const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

connectDB();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/author", authoeRoutes);
app.use("/api/users", userRoutes);

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log("joined room: ", roomId);
  });
  socket.on("send_message", (data) => {
    socket.to(data.roomId).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT;

server.listen(PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
