const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const [users] = await db.query("select * from users");
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name)
    return res.status(404).json({ message: "tolong isi nama terlebih dahulu" });
  try {
    const [result] = await db.query("insert into users (name) values(?)", [
      name,
    ]);
    res.status(201).json({ message: "Nama Berhasil Ditambahkan" });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query("delete from users where id = ?", [id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "id tidak ditemukan" });
  } catch (err) {
    res.status(500).json(err.message);
  }

  next(err);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const [result] = await db.query("update users set name = ? where id = ?", [
      name,
      id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "ID tidak ditemukan" });
    res.json({ message: "Data sudah diupdate" });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
