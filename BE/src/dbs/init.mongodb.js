const devConfig = require('../configs/config.mongodb');
const { default: mongoose } = require('mongoose');

// const url = 'mongodb://127.0.0.1:27017';
const connectString = 'mongodb://' + devConfig.db.host + ":" + devConfig.db.port + "/" + devConfig.db.name
// const connectString = "mongodb://127.0.0.1:27001"

class DatabaseMongoDB {
    constructor() {
        this.connect();
    }

    async connect() {
        if (1 === 1) {
            mongoose.set('debug', true)
            mongoose.set('debug', { color: true })
        }
        mongoose.connect(connectString, {
            socketTimeoutMS: 30000,
            maxPoolSize: 30,
            replicaSet: "rs0",
            directConnection: true
        }).then(_ => {
            console.log("Connect mongoDB succesfully")
        }).catch(err => {
            console.log("Have some error in connection to MongoDB", err)
        })
    }

    static getInstance() {
        if (!DatabaseMongoDB.instance) {
            DatabaseMongoDB.instance = new DatabaseMongoDB()
        }
        return DatabaseMongoDB.instance
    }
}

const instanceMongodb = DatabaseMongoDB.getInstance()

module.exports = instanceMongodb

// config = {
//     _id: "rs0",
//     version: 1,
//     members: [
//       { _id: 0, host: "mongo-primary:27017", priority: 3 },
//       { _id: 1, host: "mongo_secondary-1:27017", priority: 2 },
//       { _id: 2, host: "mongo_secondary-2:27017", priority: 1 }
//     ]
//   };
  
//   rs.initiate(config);