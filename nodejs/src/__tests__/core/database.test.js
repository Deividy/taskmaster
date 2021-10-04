const { Database } = require('../../core/database');

const database = new Database();

describe('Database', () => {
    afterAll(() => {
        return database.knex.destroy();
    });

    it('should be sane', () => {
        expect(database).toBeTruthy();
    });

    it('should have health connection', async () => {
        const result = await database.knex.raw('SELECT 1 AS health_check');

        expect(result).toBeTruthy(); 
    });
});
