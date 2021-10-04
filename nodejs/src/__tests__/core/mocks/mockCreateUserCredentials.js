const faker = require('faker');

const mockCreateUserCredentials = () => ({
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password(),
});

module.exports = {
    mockCreateUserCredentials
};
