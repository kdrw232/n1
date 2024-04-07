const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const {registerSchema} = require("../models/validationSchemas");
const generateToken = require("../models/generateToken");



const prisma = new PrismaClient();
// const createId = uuidv4();
// const randomId = createId.substring(0,12);
// create new user
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, username, password} = req.body;
    // const validation = registerSchema.safeParse({
    // username,
    // email,
    // fullName,
    // password,
    // });
    // if (!validation.success) {
    // return res.status(400).json({ message: validation.error.errors[0].message });
    // }
    // const existingUser = await prisma.user.findUnique({
    //   where: { email },
    //   where: { username },
    // });

    // if (existingUser) {
    //   return res.status(400).json({ message: "This user already registered" });
    // }
    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        username,
        password,

      },
    });
    const userData = {
      id: newUser.userId,
      isAdmin: newUser.isAdmin,
      username: newUser.username
    }
    const token = generateToken(userData)
    res.status(201).json({...newUser,token});
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

router.put("/update/:userId", async (req, res) => {
    
  try {
    const userId = parseInt(req.params.userId);
    const { fullName, email, username, password } = req.body;

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        fullName,
        email,
        password,
        username
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user" });
  }
});

module.exports = router;
