import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import allowedOrigins from "./config/allowedOrigins.js";
//Configurations
const app = express();
dotenv.config();

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(session({
   secret: process.env.SECRET,
   resave: false,
   saveUninitialized: true,
   store: MongoStore.create({ mongoUrl: process.env.MONGO_URL, collectionName: "sessions" }),
   cookie: {
      maxAge: 1000 * 60 * 60 * 24
   }
}));

app.use(cookieParser(process.env.SECRET));


import passportConfig from "./config/passport.js";
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

//Router
app.use(routes);


//Database, server setup
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
      console.log("Database connection has been established");
      const PORT = process.env.PORT || 6001;
      app.listen(PORT, () => { console.log(`App is listeting on PORT ${PORT}`); });


   })
   .catch((err) => {
      console.log(`Database connection error: ${err}`);
   })
