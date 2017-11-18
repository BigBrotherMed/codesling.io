import jwt from 'jsonwebtoken';

import log from '../lib/log';

export const generateToken = ({ username, id }) => {
  const token = {};

  token.accessToken = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    username,
    id,
  }, process.env.TOKEN_SECRET);

  return token;
};

export const verifyUserWithJWT = (req, res, next) => {
  try {
    jwt.verify(req.headers.authorization.slice(7), process.env.TOKEN_SECRET);
    log('token verified');
    next();
  } catch (e) {
    console.log('AUTTHHH ', req.headers)
    log('token not verified');
    next(e);
  }
};
