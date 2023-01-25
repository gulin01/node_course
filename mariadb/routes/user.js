const express = require("express");
const pool = require("../helpers/database");
const bcrypt = require("bcrypt");
const router = express.Router();

function toJson(data) {
  return JSON.stringify(data, (_, v) =>
    typeof v === "bigint" ? `${v}n` : v
  ).replace(/"(-?\d+)n"/g, (_, a) => a);
}
router.get("/:id", async (req, res) => {
  try {
    //
    const sqlQuery =
      "SELECT id, email, password, created_at FROM user WHERE id=?";

    const rows = await pool.query(sqlQuery, req.params.id);
    console.log(rows);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const encryptedPass = await bcrypt.hash(password, 8);
    const sqlQuery = "INSERT INTO user(email, password) VALUES(?,?)";
    const result = await pool.query(sqlQuery, [email, encryptedPass]);
    const jsonRes = toJson(result);
    const objRes = JSON.parse(jsonRes);
    res.status(200).json({ userId: objRes.insertId });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { id, password } = req.body;
    const sqlQuery = "SELECT password FROM user WHERE id=?";
    const rows = await pool.query(sqlQuery, id);
    if (rows) {
      const isValid = await bcrypt.compare(password, rows[0].password);
      return res.status(200).json({ isValid });
    }
    res.status(200).json({ message: "user" + id + "was not found" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
