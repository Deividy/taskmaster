const { Context } = require('../../core/context');
const { AuthenticateUserService } = require('../services/AuthenticateUserService');

class SessionsController {
    async create(request, response) {
        const context = new Context();

        const { email, password } = request.body;

        const authenticateUser = new AuthenticateUserService(context);

        const serviceResponse = await authenticateUser.execute({
            email,
            password
        });

        return response.status(serviceResponse.status).json(serviceResponse);
    };
};

module.exports = {
    SessionsController
};
