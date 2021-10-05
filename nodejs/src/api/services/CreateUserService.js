const logger = require('../../core/logger');

class CreateUserService {
    constructor(context) {
        this.context = context;
    }; 

    async execute({ name, email, password }) {
        try {
            const foundUser = await this.context.user.findByEmail(email);

            if (foundUser) {
                return { ok: false, status: 400, data: { error: 'Email already in use.' }}
            }

            const user = await this.context.user.create({
                name,
                email,
                password
            });

            return { ok: true, status: 201, data: { user } };
        } catch (err) {
            logger.error(err); 
        } 
    };
};

module.exports = {
    CreateUserService,
};
