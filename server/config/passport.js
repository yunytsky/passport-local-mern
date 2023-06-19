import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import {validatePassword} from "../lib/password.js";
import User from "../models/User.js";


//Authenticate a user
const passportConfig = (passport) => {
   passport.use(new LocalStrategy(async (username, password, done) => {

      try {
         const user = await User.findOne({ username: username });

         if (!user) {
            return done(null, false);
         }

         const isValid = await validatePassword(password, user.password)

         if (isValid) {
            return done(null, user);
         } else {
            return done(null, false);
         }
      }
      catch (err) {
         done(err);
      }
   }))

   //Serialize a user
   passport.serializeUser((user, done) => {
      done(null, user.id);
   })

   //Deserialize a user
   passport.deserializeUser((userId, done) => {
      User.findById(userId)
         .then(user => {
            done(null, user);
         })
         .catch(err => {
            done(err);
         })
   })
}

export default passportConfig;