const { Router } = require("express");
const Link = require("../models/Link");
const auth = require("../middleware/auth.middleware");
const config = require("config");
const shortid = require("shortid");

const router = Router();

router.post("/", auth, async (req, res) => {
  try {
    const baseUrl = config.get("baseURL");
    const { from } = req.body;

    const existing = await Link.findOne({ from });

    if (existing) {
      return res.json({ link: existing });
    }

    const code = shortid.generate();
    const to = baseUrl + "/t/" + code;

    const link = new Link({ from, to, code, owner: req.user.userId });

    await link.save();

    res.status(201).json({ link });
  } catch (error) {
    res.status(500).json({ message: "Шось пішло не так, попробуйте знову" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: "Шось пішло не так, попробуйте знову" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (error) {
    res.status(500).json({ message: "Шось пішло не так, попробуйте знову" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const link = await Link.findByIdAndDelete({ _id: req.params.id });
    res.json(link);
  } catch (e) {
    res.status(500).json({ message: "Не вдалось видалити" });
  }
});

module.exports = router;
