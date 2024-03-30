import { Authenticator } from "@fastify/passport";
import { SingleStrategyCallback } from "@fastify/passport/dist/AuthenticationRoute";
import { Static, Type } from "@sinclair/typebox";
import { randomInt } from "crypto";
import { SelectUserSchema } from "./database/models";
import {
  Strategy as HttpBearerStrategy,
  VerifyFunction,
} from "passport-http-bearer";

const passport = new Authenticator();

const verifyFunc: VerifyFunction = async (token: string, done) => {
  try {
    // Verify token and fetch user
    return done(null, { id: randomInt(100000) });
  } catch (error) {
    // Error handling
    return done(error, null);
  }
};

const PassportUser = Type.Pick(SelectUserSchema, ["id"]);

export const sessionTokenCallback: SingleStrategyCallback = async (
  request,
  reply,
  err,
  user
) => {
  request.user = user as Static<typeof PassportUser>;
};

export const sessionTokenStrategy = new HttpBearerStrategy(verifyFunc);

passport.use("sessionToken", sessionTokenStrategy);

export default passport;
