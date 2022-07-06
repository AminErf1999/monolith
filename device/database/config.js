const deviceDatabaseConfig = {
    user: 'docker',
    // host: '127.0.0.1',
    host:'db',
    database: 'docker ',
    password: '123456',
    port: 5432,
};

const userDatabaseConfig = {
    user: 'docker ',
    host: 'db',
    database: 'docker ',
    password: '123456',
    // port: 5432,
};

module.exports = {
    deviceDatabaseConfig,
    userDatabaseConfig
};