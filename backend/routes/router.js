const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");

// router.get("/", (req, req) => {
//   console.log("connect");
// });

//register user
router.post("/register", async (req, res) => {
  const { name, email, age, mobile, work, add, desc } = req.body;

  if (!name || !email || !age || !mobile || !work || !add || !desc) {
    return res.status(400).json("Please fill in all the required fields");
  }

  try {
    const preuser = await users.findOne({ email: email });
    console.log(preuser);

    if (preuser) {
      return res.status(400).json("This user already exists");
    }

    const adduser = new users({
      name,
      email,
      age,
      mobile,
      work,
      add,
      desc,
    });

    await adduser.save();
    console.log(adduser);
    return res.status(201).json(adduser);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
});

// get userdata
router.get("/getdata", async (req, res) => {
  try {
    const userdata = await users.find();
    res.status(201).json(userdata);
    console.log(userdata);
  } catch (error) {
    res.status(404).json(error);
  }
});

// get individual user
router.get("/getuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const userindividual = await users.findById({ _id: id });
    console.log(userindividual);
    res.status(201).json(userindividual);
  } catch (error) {
    res.status(404).json(error);
  }
});

// update user data
router.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updateduser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    console.log(updateduser);
    res.status(201).json(updateduser);
  } catch (error) {
    res.status(404).json(error);
  }
});

// delete user
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletuser = await users.findByIdAndDelete({ _id: id });
    console.log(deletuser);
    res.status(201).json(deletuser);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
