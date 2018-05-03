const shortid = require('shortid')
const fs = require('fs')
const path=require('path')
const file = path.join(__dirname, 'db.json')
const DB = require('./db')
const db = new DB(file,'messages')



class Message {
  constructor({firstName,lastName,messages}){
    this.firstName = firstName
    this.lastName = lastName
    this.id = shortid()
  }
}

let getAll = () => db.get('messages')
let show = (id) => db.get('messages').find(el => el.id === id)


let create = ({firstName = "", lastName = ""}) => {

  let response = null
  let errors = []

  if (!firstName) {
    errors.push('firstName is required')
    response = { errors }
  } else if (!lastName){
    errors.push('lastName is required')
    response = { errors }
  } else {
    const messages = db.get('messages')
    const message = new Message({firstName, lastName})
    messages.push(message)
    db.set('messages', messages)
    response = message
  }

  return response
}

let modify = (id, {firstName ="", lastName=""}) => {

  const messages = db.get('messages')

    const message = messages.find(el => el.id === id)

    if (firstName) message.firstName = firstName
    if (lastName) message.lastName = lastName

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
