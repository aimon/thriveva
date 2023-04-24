module.exports.createFilterFields = (req, filterFields) => {
  const where = {}
  filterFields.map(field => {
    if (typeof req.query[field] !== 'undefined' && req.query[field] !== '') {
      where[field] = req.query[field]
    }
  })
  return where
}
