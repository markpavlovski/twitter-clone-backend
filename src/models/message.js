const shortid = require('shortid')
const fs = require('fs')
const path=require('path')
const file = path.join(__dirname, 'db.json')
const DB = require('./db')
const db = new DB(file,'messages')



class Message {
  constructor({messageBody}){
    this.messageBody = messageBody
    this.id = shortid()
  }
}

let getAll = () => db.get('messages')
let show = (id) => db.get('messages').find(el => el.id === id)


let create = ({messageBody = ""}) => {

  let response = null
  let errors = []

  if (!messageBody) {
    errors.push('messageBody is required')
    response = { errors }
  } else {
    const messages = db.get('messages')
    const message = new Message({messageBody})
    messages.push(message)
    db.set('messages', messages)
    response = message
  }

  return response
}

let modify = (id, {messageBody =""}) => {

  const messages = db.get('messages')

    const message = messages.find(el => el.id === id)
    if (messageBody) message.messageBody = messageBody

  db.set('messages', messages)

  return message
}


let remove = (id) => {

  const messages = db.get('messages')

    const message = messages.find(el => el.id === id)
    let index = messages.findIndex(el => el.id === id)
    const removed = messages.splice(index, 1)

  db.set('messages', messages)
  return removed
}

module.exports = { getAll, create, show, modify, remove }
