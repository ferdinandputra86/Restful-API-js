const db = require("../db");
const bcrypt = require("bcrypt");

exports.getUser = async (req, res, next) => {
  try {
    const [users] = await db.query("select * from users");
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  const { name } = req.body;

  try {
    const [result] = await db.query("insert into users (name) values (?) ", [
      name,
    ]);
    res.json({ message: "user berhasil dibuat" });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("delete from users where id = ?", [id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "id tersebut tidak ada" });
    res.json({ message: "user berhasil dihapus" });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const [result] = await db.query("update users set name = ? where id = ?", [
      name,
      id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Id tidak ditemukan" });
    res.json({ message: "Nama berhasil diubah" });
  } catch (err) {
    next(err);
  }
};

exports.registerUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(404)
      .json({ message: "email atau password tidak boleh kosong" });

  try {
    const [exist] = await db.query("select id from users where email = ?", [
      email,
    ]);
    if (exist.length > 0)
      return res
        .status(409)
        .json({ message: "email sudah digunakan, silahkan login" });

    const hashedpassword = await bcrypt.hash(password, 10);

    await db.query("insert into users (email,password) values (?,?)", [
      email,
      hashedpassword,
    ]);
    res.status(201).json({ message: "Registrasi berhasil" });
  } catch (err) {
    next(err);
  }
};
