const { Context } = require('../../core/context');

const context = new Context();

describe('Context', () => {
    it('should be sane', () => {
        expect(context).toBeTruthy();
    });

    it('should have database', () => {
        expect(context.database).toBeTruthy();
    });
});

