const globalError = require("./controller/errorController");
const CustomError = require("./utils/customError");
const authRoutes = require("./routes/authRoutes");
const requestRoutes = require("./routes/requestRoutes");
const chairRoutes = require("./routes/chairRoutes");
const instructorRoutes = require("./routes/instructorRoutes");
const studentRoutes = require("./routes/studentRoutes");
const token = require("./middleware/token/jwt");
const { ROLE, authRole } = require("./middleware/userRole/role");

/*
  *=====================================================*
                ? Libraries
  *=====================================================*
*/
require("dotenv").config();
const http = require("http");
const express = require("express");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
/*
  *=====================================================*
                ? Middleware
  *=====================================================*
*/
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(
  session({
    secret: "department_management",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

/*
  *=====================================================*
                ? Endpoints
  *=====================================================*
*/
app.get("/myserver", (req, res) => {
  res.status(200).json({ message: "Server is Running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/request", requestRoutes);
app.use(
  "/api/student",
  token.validateToken,
  authRole(ROLE.student),
  studentRoutes
);
app.use(
  "/api/instructor",
  token.validateToken,
  authRole(ROLE.instructor),
  instructorRoutes
);
app.use(
  "/api/chair",
  token.validateToken,
  authRole(ROLE.department_chair),
  chairRoutes
);

app.all("*", (req, res, next) => {
  const error = new CustomError(
    `Can't find ${req.originalUrl} on the server`,
    400
  );
  next(error);
});

/*
  *=====================================================*
                ? Error Response
  *=====================================================*
*/

app.use(globalError);

const server = http.createServer(app);
server.listen(process.env.SERVER);
