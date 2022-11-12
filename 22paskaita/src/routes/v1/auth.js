const express = require('express');
const Joi = require('joi');
const router = express.Router();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { dbConfig, jwtSecret } = require('../../config');

const userSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
});

router.post('/register', async (req, res) => {
  let userData = req.body;
  try {
    userData = await userSchema.validateAsync(userData);
    console.log(userData);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: 'Incorrect data sent' });
  }

  try {
    const hashedPassword = bcrypt.hashSync(userData.password);
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(
      `INSERT INTO participants_db.users (email, password) values (
        ${mysql.escape(userData.email)}, 
        '${hashedPassword}')`,
    );
    await con.end();
    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: 'Unexpected error. Please try again.' });
  }
});

router.post('/login', async (req, res) => {
  let userData = req.body;
  try {
    userData = await userSchema.validateAsync(userData);
    console.log(userData);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: 'Incorrect email or password' });
  }

  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
        SELECT * FROM participants_db.users
        WHERE email = ${mysql.escape(userData.email)}
    `);
   
    if (data.length === 0) {
      return res.status(400).send({ err: 'Incorrect email or paswword' });
    }

    const isAuthed = bcrypt.compareSync(userData.password, data[0].password);
    if (isAuthed) {
      const token = jwt.sign(
        { id: data[0].id, email: data[0].email },
        jwtSecret,
      );
      return res.send({ msg: 'Successfully logged in', token });
    }
    return res.status(400).send({ err: 'Incorrect email or paswword' });
    await con.end();
    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: 'Unexpected error. Please try again.' });
  }
});

module.exports = router;

