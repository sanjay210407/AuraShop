const { users } = require('../models/dataStore');

function sanitizeUser(user) {
  return { id: user.id, name: user.name, email: user.email };
}

function signup(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required.' });
  }

  const existing = users.find((user) => user.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(409).json({ message: 'Email already registered.' });
  }

  const user = {
    id: `u${users.length + 1}`,
    name,
    email,
    password
  };

  users.push(user);
  req.session.userId = user.id;

  return res.status(201).json({ user: sanitizeUser(user) });
}

function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = users.find(
    (entry) => entry.email.toLowerCase() === email.toLowerCase() && entry.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  req.session.userId = user.id;
  return res.json({ user: sanitizeUser(user) });
}

function logout(req, res) {
  req.session.destroy(() => {
    res.clearCookie('aurashop.sid');
    res.json({ message: 'Logged out successfully.' });
  });
}

function me(req, res) {
  if (!req.session.userId) {
    return res.json({ user: null });
  }

  const user = users.find((entry) => entry.id === req.session.userId);
  return res.json({ user: user ? sanitizeUser(user) : null });
}

module.exports = {
  signup,
  login,
  logout,
  me
};
