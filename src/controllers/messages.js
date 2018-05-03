const model = require('../models/message')

function getAll (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  const data = model.getAll()
  res.status(200).json({ data })
}

function create (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*")
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')

  const result = model.create(req.body)

  if (result.errors) {
    return next({ status: 400, message: `Could not create new message`, errors: result.errors })
  }

  res.status(201).json({ data: result })
}

function show (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  const id = req.params.id
  const data = model.show(id)


  res.status(200).json({ data })
}

function modify (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  const id = req.params.id
  const data = model.modify(id, req.body)

  res.status(200).json({ data })
}

function remove (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  const id = req.params.id
  const data = model.remove(id)
  res.status(200).json({ data })
}



module.exports = { getAll, create, show, modify, remove }
