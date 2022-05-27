const c = require('../../../utils/config');
const response_handler = require('../../../utils/response-handler');

/*
** check root user not be deleted or updated.
** we do not have delete or update method for user in this project.
** another solution is to use trigger in database.
 */
module.exports.rootLimit = (req, res, next) => {
    if (req.method === 'PUT' || req.method === 'PATCH' || req.method === 'DELETE') {
        if (req.data.id === 1) {
            response_handler.sendFail(res, c.statusCodes.BAD_REQUEST, "root user cannot be deleted/updated")
        }
    } else next();
}