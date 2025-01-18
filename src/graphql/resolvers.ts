import pool from '../database/db';
import { batsmanModel } from '../services/BatsmanModel';
import {
    batsmanDataArgs,
    batsmanStatsArgs,
    batsmanupdateDataArgs
} from '../interfaces/interfaces';

import { Batsman, BatsmanStats } from '../interfaces/types';
export const resolvers = {
    //  BatsmanData: {
    //      stats: async (batsman: Batsman): Promise<BatsmanStats | null> => {
    //          try {
    //              const [rows]: any = await pool.query(
    //                  `
    //         SELECT * FROM batsmanStats WHERE batsman_id = ?;
    //       `,
    //                  [batsman.id]
    //              );
    //              return rows.length > 0 ? rows[0] : null;
    //          } catch {
    //              throw new Error('Failed to fetch batsman stats.');
    //          }
    //      }
    //  },

    BatsmanStats: {
        batInfo: async (batsman: BatsmanStats): Promise<Batsman | null> => {
            try {
                const [rows]: any = await pool.query(
                    `SELECT * FROM batsmanData WHERE id= ?`,
                    [batsman.batsman_id]
                );

                return rows.length > 0 ? rows[0] : null;
            } catch {
                throw new Error(`Failed to fetch batsman stats.`);
            }
        }
    },

    Query: {
        fetchAllRetiredBatsmanInfo: async (): Promise<Batsman[]> =>
            await batsmanModel.fetchAllRetiredBatsmanInfo(),

        fetchBatsmanById: async (_: string, { id }: { id: number }) =>
            await batsmanModel.fetchBatsmanById(id),

        fetchAverageOfABatsman: async (_: number, { id }: { id: number }) =>
            await batsmanModel.fetchAverageOfABatsman(id),

        fetchAllBatsman: async () => await batsmanModel.fetchAllBatsman()
    },

    Mutation: {
        addBatsmanData: async (
            _: string,
            { input }: { input: batsmanDataArgs }
        ) => {
            return await batsmanModel.addBatsmanData(input);
        },
        addBatsmanStats: async (
            _: string,
            { input }: { input: batsmanStatsArgs }
        ) => {
            return await batsmanModel.addBatsmanStats(input);
        },

        updatePlayerInfo: async (
            _: string,
            { input }: { input: batsmanupdateDataArgs }
        ) => {
            return await batsmanModel.updatePlayerInfo(input);
        },

        updateStats: async (
            _: string,
            { input }: { input: batsmanStatsArgs }
        ) => {
            return await batsmanModel.updateStats(input);
        },

        softDelete: async (_: string, { id }: { id: number }) =>
            await batsmanModel.softDelete(id),
        hardDelete: async (_: string, { id }: { id: number }) =>
            await batsmanModel.hardDelete(id)
    }
};
