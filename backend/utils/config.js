require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGO_DB_URI
// console.log("🚀 ~ file: config.js:5 ~ MONGODB_URI:", MONGODB_URI)
let SECRET = process.env.SECRET

if(process.env.NODE_ENV === 'test'){
    MONGODB_URI = process.env.MONGO_DB_URI_TEST
}

module.exports = {
    MONGODB_URI,
    PORT,
    SECRET
}