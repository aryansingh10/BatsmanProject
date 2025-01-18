"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessages = void 0;
exports.ErrorMessages = {
    DATABASE_ERROR: (action) => `Failed to ${action} due to a database error.`,
    VALIDATION_ERROR: `Validation failed for the provided data.`,
    NOT_FOUND: (entity, id) => `${entity} with ID ${id} not found.`,
    NO_DATA_UPDATED: `No rows updated. Please check if the data has changed.`,
    INSERTION_FAILED: (entity) => `Failed to insert ${entity}.`,
    UPDATE_FAILED: (entity) => `Failed to update ${entity}.`,
    DELETION_FAILED: (entity) => `Failed to delete ${entity}.`,
    ALREADY_DELETED: (entity, id) => `${entity} with ID ${id} is already deleted.`,
    SOFT_DELETE_FAILED: 'Failed to soft delete the batsman.',
    HARD_DELETE_FAILED: 'Failed to hard delete the batsman.'
};
