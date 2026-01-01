const db = require("../db");

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
