const logger = require('../../core/logger');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

class AuthenticateUserService {
    constructor(context) {
        this.context = context;
    }; 

    async execute({ email, password }) {
        try {
            const foundUser = await this.context.user.findByEmail(email);

            if (!foundUser) {
                return { ok: false, status: 401, data: { error: 'Incorret email/password combination.'}};
            }

            const passwordMatch = await bcrypt.compare(password, foundUser.password);

            if (!passwordMatch) {
                return { ok: false, status: 401, data: { error: 'Incorret email/password combination.'}};
            }

            delete foundUser.password;

            const token = crypto.randomBytes(20).toString('hex');


            return { ok: true, status: 200, data: { token } };
        } catch (err) {
            logger.error(err); 
        } 
    };
};

module.exports = {
    AuthenticateUserService,
};
