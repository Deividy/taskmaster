const { Context } = require('../../../core/context');
const { User } = require('../../../core/models/user');
const { mockCreateUserCredentials } = require('../mocks/mockCreateUserCredentials'); 

const context = new Context();
const user = new User(context);

describe('User', () => {
    afterAll(() => {
        context.database.knex.destroy();
    });

    it('should be sane', () => {
        expect(user).toBeTruthy();
    });

    it('should have context', () => {
        expect(user.context).toBeTruthy();
    });

    it('should have database', () => {
        expect(user.database).toBeTruthy();
    });

    it('should create a new user, and delete it right away', async () => {
        const userCredentials = mockCreateUserCredentials();
        const spyDelete = jest.spyOn(user, 'delete');
        const createdUser = await user.create(userCredentials);
        await user.delete({ id: createdUser.id });
        
        expect(createdUser.email).toBe(userCredentials.email);
        expect(spyDelete).toHaveBeenCalledWith({ id: createdUser.id });
    });

    it('should find an user by email', async () => {
        const userCredentials = mockCreateUserCredentials();
        const createdUser = await user.create(userCredentials);
        const foundUser = await user.findByEmail(userCredentials.email);
        await user.delete({ id: createdUser.id });

        expect(foundUser.email).toEqual(userCredentials.email);
    });
});
