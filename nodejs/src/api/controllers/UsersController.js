const { Context } = require('../../core/context');
const { CreateUserService } = require('../services/CreateUserService');

class UsersController {
    async create(request, response) {
        const context = new Context();

        const { name, email, password } = request.body;

        const createUserService = new CreateUserService(context);

        const serviceResponse = await createUserService.execute({
            name,
            email,
            password
        });

        if (serviceResponse.ok) {
            const { user } = serviceResponse.data;

            delete user.password;

            return response.status(serviceResponse.status).json(serviceResponse);
        } else {
            return response.status(serviceResponse.status).json(serviceResponse)
        }
    };
};

module.exports = {
    UsersController
};
