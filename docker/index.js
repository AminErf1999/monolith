const fs = require('fs');
const EventEmitter = require('events');
const Server = require('backpack2-promise-server');
const Router = require('backpack2-promise-router');
const config = require('./config');



const eventEmitter = new EventEmitter();

config.serverConfig.eventEmitter = eventEmitter;
config.routerConfig.eventEmitter = eventEmitter;

const server = new Server(config.serverConfig);
const router = new Router(config.routerConfig);

server.start();
loadApps();

function loadApps() {
    const appNames = fs.readdirSync(config.appsDirectory);
    appNames.forEach(appName => {
        const app = require(`${config.appsDirectory}/${appName}`);
        Object.keys(app.routes).forEach(route => {
            Object.keys(app.routes[route]).forEach(method => {
                const routeObj = {
                    route,
                    method,
                    function: app.routes[route][method].function,
                    middlewares: app.routes[route][method].middlewares
                };
                router.addRoute(routeObj);
            });
        });
    });
}
