"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.batsManSchema = void 0;
const zod_1 = require("zod");
exports.batsManSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, 'Name should be greater length than 1'),
    lastName: zod_1.z.string().min(1, 'LastName should be greater length than 1'),
    age: zod_1.z.number().min(0, 'Age should be greater than zero'),
    isRetired: zod_1.z.boolean()
});
