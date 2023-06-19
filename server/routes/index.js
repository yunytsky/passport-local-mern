import express from "express";
import passport from "passport";
import User from "../models/User.js";
import {generatePassword} from "../lib/password.js";
const router = express.Router();

//Logging in
router.post("/log-in", (req, res, next) => {
   passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) return res.status(400).json({ error: true, errorMessage: "Wrong credentials"});
      else {
         req.logIn(user, (err) => {
            if (err) throw err;

            return res.status(200).json({ error: false, errorMessage: "", authenticated: true, userId: user.id })      
         });
      }
   })(req, res, next);
});

//Signing up
router.post("/sign-up", async (req, res) => {
   try{
      const user = await User.findOne({username: req.body.username});
      if(user){
         return res.status(400).json({error:true, errorMessage: "Username is already taken"});
      }

      const password = await generatePassword(req.body.password);
      const newUser = new User({
         username: req.body.username,
         password: password
      })

      await newUser.save();

      return res.status(201).json({error: false, errorMessage: ""});
   }catch(err){
      return res.status(400).json({ error: true, errorMessage: err.message
       });
   }
});

//Logging out
router.get("/log-out", (req, res) => {
   if (req.isAuthenticated()) {
      req.logout((err) => {
         if (err) {
            return res.status(500).json({ error: true, errorMessage: err.message, loggedOut: false });
         }
      });
      return res.status(200).json({ error: false, errorMessage: "", loggedOut: true });
   } else {
      return res.status(200).json({ error: false, errorMessage: "Not authorized", loggedOut: true });
   }
});

//Check if the user is authorized
router.get("/user/:id/isAuthorized", (req, res) => {
   const userId = req.params.id;
   if(req.isAuthenticated()){
      if (userId === req.user.id) {
      return res.status(200).json({ error: false, errorMessage: "", reqUserId: req.user.id, isAuthenticated: true, isAuthorized: true });
      }else {
      return res.status(403).json({ error: true, errorMessage: "Unauthorized", reqUserId: req.user.id, isAuthenticated: true, isAuthorized: false });
      }
   }else{
      return res.status(403).json({ error: true, errorMessage: "Unauthorized", isAuthenticated: false, isAuthorized: false });
   }


})

//Check if the request is authenticated
router.get("/isAuthenticated", (req, res) => {
   if (req.isAuthenticated()) {
      return res.status(200).json({ error: false, errorMessage: "", isAuthenticated: true, reqUserId: req.user.id});
   } else {
      return res.status(200).json({ error: false, errorMessage: "", isAuthenticated: false, reqUserId: null});
   }
})

//Get user information
router.get("/user/:id", (req, res) => {
   const userId = req.params.id;
   User.findById(userId)
      .then(user => {
         return res.status(200).json({error: false, errorMessage: "", username: user.username, userId: userId});
      })
      .catch(err => {
         return res.status(400).json({error: true, errorMessage: err.message});
      })
})

export default router;
