const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const tokenHeader = req.header('Authorization');
  if (!tokenHeader)
    return res.status(401).send(req.i18n.t('auth.token.accessDenied'));

  try {
    const token = tokenHeader.split(' ')[1];
    req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (err) {
    res.status(400).send(req.i18n.t('auth.token.invalidToken'));
  }
};
