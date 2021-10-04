const { Database } = require('./Database');
const { User } = require('./models/User');

class Context {
    constructor() {
        this.database = new Database();
        this.user = new User(this);
    }
};

module.exports = {
    Context
};
