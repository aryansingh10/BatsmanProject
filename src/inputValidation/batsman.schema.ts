import { z } from 'zod';

export const batsManSchema = z.object({
    firstName: z.string().min(1, 'Name should be greater length than 1'),
    lastName: z.string().min(1, 'LastName should be greater length than 1'),
    age: z.number().min(0, 'Age should be greater than zero'),
    isRetired: z.boolean()
});
