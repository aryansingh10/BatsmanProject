"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statsSchema = void 0;
const zod_1 = require("zod");
exports.statsSchema = zod_1.z.object({
    batsman_id: zod_1.z.number(),
    runs: zod_1.z.number().min(0),
    highestScore: zod_1.z.number().min(0),
    strikeRate: zod_1.z.number().min(0),
    hundreds: zod_1.z.number().min(0),
    fiftys: zod_1.z.number().min(0),
    notOut: zod_1.z.number().min(0)
});
