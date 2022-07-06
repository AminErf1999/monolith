const { Client } = require('pg');
const databaseConfig =require('./config')

const dbSingleton = (() => {
    let instance;
    function createInstance() {
        return new Client(databaseConfig.databaseConfig)
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

module.exports={connectDb};
