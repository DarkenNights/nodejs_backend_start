const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  registerValidation,
  loginValidation,
} = require('../validations/authValidation');

router.post('/register', async (req, res) => {
  //VALIDATION
  const { error } = registerValidation(req.body, req.i18n);
  if (error) return res.status(400).send(error.details[0].message);

  //CHECKING EMAIL ALREADY EXIST
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).send(req.i18n.t('auth.email.error.exist'));

  //HASH THE PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //CREATE USER
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  //VALIDATION
  const { error } = loginValidation(req.body, req.i18n);
  if (error) return res.status(400).send(error.details[0].message);

  //GET USER
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send(req.i18n.t('auth.login.noUser'));

  //CHECKING PASSWORD
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send(req.i18n.t('auth.login.wrongPassword'));

  //JWT ASSIGN
  const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '3 days',
  });
  res.header('Authorization', 'Bearer ' + token).send(token);
});

module.exports = router;
