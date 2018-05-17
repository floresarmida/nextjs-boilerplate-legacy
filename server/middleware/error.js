module.exports = function errorHandler (err, req, res, next) {
  if (!err) {
    return res.sendStatus(500)
  }

  const error = { message: err.message || 'Internal Server Error.' }

  if (process.env.NODE_ENV === 'development') error.stack = err.stack

  if (err.errors) {
    error.errors = {}
    const { errors } = err
    for (const type in errors) {
      if (type in errors) {
        error.errors[type] = errors[type].message
      }
    }
  }

  res.status(err.status || 500).json(error)
}