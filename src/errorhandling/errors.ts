export const ErrorMessages = {
    DATABASE_ERROR: (action: string) =>
        `Failed to ${action} due to a database error.`,

    VALIDATION_ERROR: `Validation failed for the provided data.`,

    NOT_FOUND: (entity: string, id: number) =>
        `${entity} with ID ${id} not found.`,

    NO_DATA_UPDATED: `No rows updated. Please check if the data has changed.`,

    INSERTION_FAILED: (entity: string) => `Failed to insert ${entity}.`,

    UPDATE_FAILED: (entity: string) => `Failed to update ${entity}.`,

    DELETION_FAILED: (entity: string) => `Failed to delete ${entity}.`,

    ALREADY_DELETED: (entity: string, id: number) =>
        `${entity} with ID ${id} is already deleted.`,

    SOFT_DELETE_FAILED: 'Failed to soft delete the batsman.',

    HARD_DELETE_FAILED: 'Failed to hard delete the batsman.'
};
