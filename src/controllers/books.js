const model = require('../models/book')

function getAll (req, res, next) {
  const data = model.getAll()
  res.status(200).json({ data })
}

function create (req, res, next) {
  const result = model.create(req.body)

  if (result.errors) {
    return next({ status: 400, message: `Could not create new book`, errors: result.errors })
  }

  res.status(201).json({ data: result })
}

function show (req, res, next) {
  const id = req.params.id
  const data = model.show(id)


  res.status(200).json({ data })
}

function modify (req, res, next) {
  const id = req.params.id
  const data = model.modify(id, req.body)

  res.status(200).json({ data })
}

function remove (req, res, next) {
  const id = req.params.id
  const data = model.remove(id)
  res.status(200).json({ data })
}

function addAuthor (req, res, next) {
  const result = model.addAuthor(req.params.id, req.body.authorIds)
  if (!req.body.authorIds) {
    return next({ status: 400, message: `Please populate authorIds with comma-space separated ids`, errors: result.errors })
  }
  if (result.errors) {
    return next({ status: 400, message: `Could not add new authors`, errors: result.errors })
  }

  res.status(201).json({ data: result })
}

function removeAuthor (req, res, next) {
  const result = model.removeAuthor(req.params.id, req.body.authorId)
  if (!req.body.authorId) {
    return next({ status: 400, message: `Please populate authorId`, errors: result.errors })
  }
  if (result.errors) {
    return next({ status: 400, message: `Could not remove author`, errors: result.errors })
  }

  res.status(201).json({ data: result })
}

module.exports = { getAll, create, show, modify, remove, addAuthor, removeAuthor}
