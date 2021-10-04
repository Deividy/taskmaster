const { BaseModel } = require('./base');
const bcrypt = require('bcrypt');

class User extends BaseModel {
    async create({ name, email, password })  {
        const hashedPassword = await bcrypt.hash(password, 7);

        const { rows } = await this.database.knex.raw(
            `INSERT INTO users( name, email, password )
            VALUES (?, ?, ?) returning *;`,
            [name, email, hashedPassword]);

        return rows[0];
    };

    async findByEmail(email) {
        const { rows } = await this.database.knex.raw(
            `SELECT * FROM users WHERE email = ?;`,
            [email]    
        );

        return rows[0];
    };

    async delete({ id }) {
        await this.database.knex.raw(
            `DELETE FROM users WHERE id = ?;`,
            [id]
        );
    }
};

module.exports = {
    User
};
