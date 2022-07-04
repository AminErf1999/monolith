const { Client } = require('pg');
const dbConfig =require('./config')

const dbSingleton = (() => {
    let instance;
    function createInstance() {
        return new Client(dbConfig.deviceDatabaseConfig)
    }
    return {
        getInstance: function (){
            if (!instance){
                instance = createInstance();
                instance.connect();
            }
            return instance;
        }
    }

})();


async function connectDb(query,params) {

    const client = dbSingleton.getInstance();
    const resultQuery =await client.query(query,params);
    return resultQuery.rows;
}


const userDbSingleton = (() => {
    let instance;
    function createInstance() {
        return new Client(dbConfig.userDatabaseConfig)
    }
    return {
        getInstance: function (){
            if (!instance){
                instance = createInstance();
                instance.connect();
            }
            return instance;
        }
    }

})();


async function connectUserDb(query,params) {

    const client = userDbSingleton.getInstance();
    const resultQuery = await client.query(query,params);
    return resultQuery.rows;
}

module.exports={connectDb, connectUserDb};
