const { verifyJwt } = require('../helpers/jwt');
const { getTokenFromHeaders } = require('../helpers/jwt');

const checkJwt = (req, res, next) => {
  const { url: path } = req;

  const excludedPaths = ['/auth/sign-in', '/auth/sign-up', '/auth/refresh'];
  const isExcluded = !!excludedPaths.find((p) => p.startsWith(path));

  if (isExcluded) return next();

  const token = getTokenFromHeaders(req.headers);

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
