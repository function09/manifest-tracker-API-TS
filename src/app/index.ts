import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import cookieSession from "cookie-session";
import manifests from "./routes/manifestRoutes.js";
import users from "./routes/userRoutes.js";
import "dotenv/config";
import passport from "passport";
import User from "./models/users.js";
import LocalStrategy from "./middleware/localAuth.js";

interface User {
  username: string;
  id: string;
}

const app = express();

const corsOptions = {
  origin: process.env.CLIENT,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.set("trust proxy", 1);

app.use(
  cookieSession({
    name: "auth",
    keys: [process.env.SECRET],
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "none",
    secure: true,
    httpOnly: true,
  })
);
app.use(express.json());

// Passport authentication middleware
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

// passport.serializeUser((user: User, done: (err: any, id?: string | undefined) => void) => done(null, user.id));

passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return done(new Error(`No user with id ${id} is found"`));
    }
    return done(null, { id: user.id, username: user.username });
  } catch (error) {}
});

passport.use("local", LocalStrategy);

app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/api/v1/manifests", manifests);
app.use("/users", users);

// MongoDB connection
const { CONNECTION_STRING } = process.env;

mongoose.set("strictQuery", true);

async function main() {
  await mongoose.connect(CONNECTION_STRING);
}

main().catch((error) => {
  console.log(error);
});

export default app;
