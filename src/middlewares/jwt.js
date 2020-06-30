const { verifyJwt } = require('../helpers/jwt');

const checkJwt = (req, res, next) => {
  let token = req.headers['authorization'];
  token = token ? token.slice(7, token.length) : null;

  if (!token) {
    return res.jsonUnauthorized(null, 'Token inválido.');
  }

  try {
    const decoded = verifyJwt(token);
    req.accountId = decoded.id;
    next();
  } catch (error) {
    return res.jsonUnauthorized(null, 'Token inválido.');
  }
};

module.exports = checkJwt;
