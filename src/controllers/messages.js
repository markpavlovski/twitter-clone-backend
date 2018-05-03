const model = require('../models/author')

function getAll (req, res, next) {
  const data = model.getAll()
  res.status(200).json({ data })
}

function create (req, res, next) {
  console.log("ASDASDASD");
  const result = model.create(req.body)

  if (result.errors) {
    return next({ status: 400, message: `Could not create new author`, errors: result.errors })
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



module.exports = { getAll, create, show, modify, remove }
