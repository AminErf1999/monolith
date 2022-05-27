const deviceDatabaseConfig = {
    user: 'postgres',
    host: '127.0.0.1',
    database: 'device',
    password: '123456',
    port: 5432,
};

const userDatabaseConfig = {
    user: 'postgres',
    host: '127.0.0.1',
    database: 'user',
    password: '123456',
    port: 5432,
};

module.exports = {
    deviceDatabaseConfig,
    userDatabaseConfig
};