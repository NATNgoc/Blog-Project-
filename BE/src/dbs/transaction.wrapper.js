const mongoose = require("mongoose");

class TransactionWrapper {
    constructor(functionForWrapper) {
        this.functionToWrap = functionForWrapper;
    }

    async process(parameters) {
        const session = await mongoose.startSession();
        let result = {};
        try {
            session.startTransaction();
            result = await this.functionToWrap(parameters, session);
            await session.commitTransaction();
        } catch (error) {
            console.error(error)
            await session.abortTransaction();
            result = error
        } finally {
            await session.endSession();
            if ((result instanceof Error)) throw result
            return result;
        }
    }
}

module.exports = TransactionWrapper;