

const ErrorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
};

const asyncMiddleware = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      const errStatus = err.statusCode || 500;
      const errMsg = err.message || 'Internal server error';
      next({ err, statusCode: errStatus, message: errMsg });
    });
  };
};

export {
  ErrorHandler,
  asyncMiddleware
}