class BaseModel {
    constructor(context) {
        this.context = context;
        this.database = context.database;
    };
};

module.exports = {
    BaseModel
};
