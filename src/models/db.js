const fs = require('fs')

class DB {
  constructor(file, ...args){
    this.file = file
    args.forEach(resource => {
      if (!this.getAll().hasOwnProperty(resource)) this.set(resource, [])
    })
  }

  getAll(){
    return JSON.parse(fs.readFileSync(this.file, 'utf-8'))
  }

  get(resource){
    return JSON.parse(fs.readFileSync(this.file, 'utf-8'))[resource]
  }

  set(resource,data){
    const db = this.getAll(resource)
    db[resource] = data
    fs.writeFileSync(this.file,JSON.stringify(db))
    return this.getAll(resource)
  }

  remove(resource){
    const db = this.getAll(resource)
    delete db[resource]
    fs.writeFileSync(this.file,JSON.stringify(db))
    return `Resource ${resource} has been removed.`
  }

}

module.exports = DB
