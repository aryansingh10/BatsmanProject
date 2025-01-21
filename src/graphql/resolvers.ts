import { batsmanModel } from '../services/BatsmanModel';
import { batsmanDataArgs, batsmanStatsArgs, batsmanupdateDataArgs } from '../interfaces/interfaces';

export const resolvers = {
    Query: {
        fetchAllRetiredBatsmanInfo: async () => await batsmanModel.fetchAllRetiredBatsmanInfo(),
        fetchBatsmanById: async (_: string, { id }: { id: number }) => await batsmanModel.fetchBatsmanById(id),
        fetchAverageOfABatsman: async (_: number, { id }: { id: number }) => await batsmanModel.fetchAverageOfABatsman(id),
        fetchAllBatsman: async () => await batsmanModel.fetchAllBatsman()
    },

    Mutation: {
        addBatsmanData: async (_: string, { input }: { input: batsmanDataArgs }) => await batsmanModel.addBatsmanData(input),
        addBatsmanStats: async (_: string, { input }: { input: batsmanStatsArgs }) => await batsmanModel.addBatsmanStats(input),
        updatePlayerInfo: async (_: string, { input }: { input: batsmanupdateDataArgs }) => await batsmanModel.updatePlayerInfo(input),
        updateStats: async (_: string, { input }: { input: batsmanStatsArgs }) => await batsmanModel.updateStats(input),
        softDelete: async (_: string, { id }: { id: number }) => await batsmanModel.softDelete(id),
        hardDelete: async (_: string, { id }: { id: number }) => await batsmanModel.hardDelete(id)
    }
};
