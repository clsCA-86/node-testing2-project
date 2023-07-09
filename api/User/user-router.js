const router = require("express").Router();
const User = require("./user-model");

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.getAll();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({ message: "could not retrieve all users" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const selectedUser = await User.getById(id);
    res.status(200).json(selectedUser);
  } catch (err) {
    res.status(500).json({ message: "could not retrieve user" });
  }
});

router.post("/", (req, res) => {
  User.insert(req.body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ message: `User was not created:${err}` });
    });
});

module.exports = router;
