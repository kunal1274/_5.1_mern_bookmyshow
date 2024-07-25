import expressBMS from "express";
import { config } from "dotenv";
import corsBMS from "cors";
import cookieParser from "cookie-parser";
import cl from "./utility/cl.js";
// import cl from "./utility/cl.js";
//import userRoutes from "./routes/user.routes.js";
/*
import { userRouterV1, userRouterV2 } from "./routes/user.routes.js";

import connectToDB from "./database/mongoDB.js";

import { movieRouterV1, movieRouterV2 } from "./routes/movie.routes.js";
import {
  reportsMovieRouterV1,
  reportsMovieRouterV2,
} from "./routes/reports.movie.routes.js";
import { theatreRouterV1, theatreRouterV2 } from "./routes/theatre.routes.js";
import { showsRouterV1, showsRouterV2 } from "./routes/shows.routes.js";
*/
// dotenv config run //
config();

// express app instance //
const appBMS = expressBMS();

// middle ware //
//cors
appBMS.use(corsBMS());

// body parser
appBMS.use(expressBMS.json());

// cookie parser
appBMS.use(cookieParser());

const logger = (req, res, next) => {
  console.log(`${req.method} and ${req.url} with response ${res.statusCode}`);
  next();
};
appBMS.use(logger);

// Routing //
// user related routes
/*
appBMS.use("/bms/api/v1/user", userRouterV1);
appBMS.use("/bms/api/v2/user", userRouterV2);

// movie related routes
appBMS.use("/bms/api/v1/movie", movieRouterV1);
appBMS.use("/bms/api/v2/movie", movieRouterV2);

// theatre related routes
appBMS.use("/bms/api/v1/theatre", theatreRouterV1);
appBMS.use("/bms/api/v2/theatre", theatreRouterV2);

// shows related routes
appBMS.use("/bms/api/v1/shows", showsRouterV1);
appBMS.use("/bms/api/v2/shows", showsRouterV2);

// all reports related routes
appBMS.use("/bms/api/v1/reports/movie", reportsMovieRouterV1);
appBMS.use("/bms/api/v2/reports/movie", reportsMovieRouterV2);
*/
// ping
appBMS.get("/ping", (req, res) => {
  res.status(200).send({ message: `Server is up at ${PORT}` });
});

// final route
appBMS.use((req, res) => {
  res.status(400).send(`This is final and invalid path`);
});

// server listening //
// Centralized error handling middleware
appBMS.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .send(
      "Something broke! Uncaught Error. It could be internet Issue or glitch. Retry again."
    );
});

const PORT = process.env.DEV_PORT;
// cl(process.env.DEV_PORT);
const startServer = async () => {
  try {
    //await connectToDB();
    appBMS.listen(PORT, () => {
      console.log(`Node JS Server is running at port: ${PORT}`);
    });
  } catch (error) {
    console.error(
      `Failed to start server or connect to database: ${error.message}`
    );
    process.exit(1); // Exit the process with a failure code
  }
};

startServer();

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});
