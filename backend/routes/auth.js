const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../data/db.json");

// SIGNUP
router.post("/signup", (req, res) => {

  const { name, email, password } = req.body;

  const db = JSON.parse(fs.readFileSync(dbPath));

  const existingUser = db.users.find(u => u.email === email);

  if(existingUser){
    return res.status(400).json({message:"User already exists"});
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password
  };

  db.users.push(newUser);

  fs.writeFileSync(dbPath, JSON.stringify(db,null,2));

  res.json(newUser);
});

// LOGIN
router.post("/login",(req,res)=>{

  const {email,password} = req.body;

  const db = JSON.parse(fs.readFileSync(dbPath));

  const user = db.users.find(
    u => u.email === email && u.password === password
  );

  if(!user){
    return res.status(401).json({message:"Invalid credentials"});
  }

  res.json(user);
});

module.exports = router;