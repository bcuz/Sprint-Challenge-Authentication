const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { authenticate, jwtKey } = require('../auth/authenticate');
const Users = require('../database/users-model');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

async function register(req, res) {
  let user = req.body;

  if (!user.username || !user.password) {
    return res.status(400).json({ message: 'Need username and password' });
  }

  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash

  try {
    const created = await Users.add(user);
    const token = generateToken(created)

    // gets a token on register
      res.status(201).json({
        message: `Welcome ${created.username}!`,
        token
      });
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error adding the user',
    });
  }
}

async function login(req, res) {
  let { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Need username and password' });
  }

  try {
    let user = await Users.findBy({ username }).first()    

    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }

    } else {
      res.status(404).json({ message: 'user not found' });
    }

  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the user',
    });
  }
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

function generateToken(user) {
  return jwt.sign({
    userId: user.id,
  }, jwtKey, {
    expiresIn: '1d',
  })
}
