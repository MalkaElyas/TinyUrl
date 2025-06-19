
import crypto from 'crypto'

const logMiddleware = (req, res, next) => {
  req.UUID = crypto.randomUUID();
  console.log(`request ${req.UUID} started.`);
  next();
};

export default logMiddleware;