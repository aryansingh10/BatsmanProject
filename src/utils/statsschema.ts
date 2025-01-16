import { z } from "zod";


export const statsSchema=z.object({
    batsman_id:z.number(),
    runs:z.number().min(0),
    highestScore:z.number().min(0),
    strikeRate:z.number().min(0),
    hundreds:z.number().min(0),
    fiftys:z.number().min(0),
    notOut:z.number().min(0)
})