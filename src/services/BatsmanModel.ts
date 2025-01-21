import { batsmanDataArgs, batsmanStatsArgs, batsmanupdateDataArgs } from '../interfaces/interfaces';
import { batsManSchema } from '../inputValidation/batsman.schema';
import { statsSchema } from '../inputValidation/stats.schema';
import { ErrorMessages } from '../errorhandling/errors';
import BatsmanData from '../database/models/batsmanData';
import BatsmanStats from '../database/models/batsmanStats';

export const batsmanModel = {
    fetchAllRetiredBatsmanInfo: async () => {
        try {
            const batsmen = await BatsmanData.findAll({
                where: { isRetired: true },
                include: {
                    model: BatsmanStats,
                    as: 'stats',
                    required: false
                }
            });

            return batsmen;
        } catch {
            throw new Error(ErrorMessages.DATABASE_ERROR('fetch retired batsman data with stats'));
        }
    },
    fetchBatsmanById: async (id: number) => {
        try {
            const batsman = await BatsmanData.findByPk(id);
            if (!batsman) {
                return new Error(ErrorMessages.NOT_FOUND('batsman', id));
            }

            return batsman;
        } catch {
            throw new Error(ErrorMessages.DATABASE_ERROR('fetch batsman data with stats'));
        }
    },

    fetchAverageOfABatsman: async (id: number) => {
        try {
            const batsman = await BatsmanStats.findOne({ where: { batsman_id: id } });
            return batsman?.dataValues.average;
        } catch {
            throw new Error(ErrorMessages.DATABASE_ERROR('fetch batsman average data'));
        }
    },

    fetchAllBatsman: async () => {
        try {
            const result = await BatsmanData.findAll({
                include: {
                    model: BatsmanStats,
                    as: 'stats',
                    required: false
                }
            });
            return result;
        } catch {
            throw new Error(ErrorMessages.DATABASE_ERROR('fetch all batsman data with stats'));
        }
    },

    addBatsmanData: async (input: batsmanDataArgs) => {
        try {
            const { firstName, lastName, isRetired, age } = input;
            batsManSchema.parse({ firstName, lastName, isRetired, age });

            const result = await BatsmanData.create({ firstName, lastName, isRetired, age });

            return `Player Added Successfully with ID ${result.dataValues.id}`;
        } catch {
            throw new Error(ErrorMessages.INSERTION_FAILED('batsman data'));
        }
    },

    addBatsmanStats: async (input: batsmanStatsArgs) => {
        try {
            const { batsman_id, runs, highestScore, strikeRate, hundreds, fiftys, notOut } = input;
            statsSchema.parse({
                batsman_id,
                runs,
                highestScore,
                strikeRate,
                hundreds,
                fiftys,
                notOut
            });

            const result = await BatsmanStats.create({ batsman_id, runs, highestScore, strikeRate, hundreds, fiftys, notOut });

            return `Batsman Stats Added for playerID ${result.dataValues.batsman_id}  `;
        } catch {
            throw new Error(ErrorMessages.INSERTION_FAILED('batsman stats'));
        }
    },

    updatePlayerInfo: async (input: batsmanupdateDataArgs) => {
        try {
            const { id, firstName, lastName, isRetired, age } = input;
            batsManSchema.parse({ firstName, lastName, isRetired, age });

            const result = await BatsmanData.update(
                { firstName: firstName, lastName: lastName, isRetired: isRetired, age: age },
                {
                    where: {
                        id: id
                    }
                }
            );

            if (result[0] === 0) {
                return new Error(ErrorMessages.NO_DATA_UPDATED);
            }
            return 'Player Info Updated Successfully';
        } catch {
            throw new Error(ErrorMessages.UPDATE_FAILED('player info'));
        }
    },

    updateStats: async (input: batsmanStatsArgs) => {
        try {
            const { batsman_id, runs, highestScore, strikeRate, hundreds, fiftys, notOut } = input;
            statsSchema.parse({
                batsman_id,
                runs,
                highestScore,
                strikeRate,
                hundreds,
                fiftys,
                notOut
            });
            const result = await BatsmanStats.update(
                { runs: runs, highestScore: highestScore, strikeRate: strikeRate, hundreds: hundreds, fiftys: fiftys, notOut: notOut },
                {
                    where: {
                        batsman_id: batsman_id
                    }
                }
            );

            if (result[0] === 0) {
                return new Error(ErrorMessages.NO_DATA_UPDATED);
            }
            return 'Stats Updated Successfully';
        } catch {
            throw new Error(ErrorMessages.UPDATE_FAILED('player stats'));
        }
    },

    softDelete: async (id: number) => {
        try {
            const result = await BatsmanData.update(
                { is_deleted: true },
                {
                    where: {
                        id: id
                    }
                }
            );

            if (result[0] === 0) {
                return new Error(ErrorMessages.ALREADY_DELETED('batsman', id));
            }

            return 'Soft Deleted Successfully';
        } catch {
            throw new Error(ErrorMessages.SOFT_DELETE_FAILED);
        }
    },

    hardDelete: async (id: number) => {
        try {
            const deletedBatsman = await BatsmanData.destroy({ where: { id: id } });
            if (deletedBatsman === 0) {
                return new Error(ErrorMessages.ALREADY_DELETED('batsman', id));
            }

            return 'Batsman Deleted Successfully';
        } catch {
            throw new Error(ErrorMessages.HARD_DELETE_FAILED);
        }
    }
};
