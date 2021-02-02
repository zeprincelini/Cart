const mongoose = require('mongoose');

const DB = async () => {
    try{
        const conn = await mongoose.connect("mongodb://localhost:27017/shopping",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log(`mongodb connected: ${conn.connection.host}`)
    }catch(err){
        console.error(err);
        process.exit(1);
    }
}

module.exports = DB;