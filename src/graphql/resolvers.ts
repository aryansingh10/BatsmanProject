import pool from "../database/db";
import { userModel } from "../models/BatsmanModel";
import { batsmanDataArgs, batsmanStatsArgs, batsmanupdateDataArgs } from "../interfaces/interfaces";
export const resolvers = {
  BatsmanData: {
    stats: async (batsman: any) => {
      try {
        const [rows]: any = await pool.query(
          `
          SELECT * FROM batsmanStats WHERE batsman_id = ?;
        `,
          [batsman.id]
        );

        return rows.length > 0 ? rows[0] : null;
      } catch (error) {
        console.error("Error in fetching batsman stats:", error);
        throw new Error("Failed to fetch batsman stats.");
      }
    },
  },

  BatsmanStats: {
    batInfo: async (batsman: any) => {
      try {
        const [rows]: any = await pool.query(
          `SELECT * FROM batsmanData WHERE id= ?`,
          [batsman.batsman_id]
        );

        return rows.length > 0 ? rows[0] : null;
      } catch (error) {
        console.error("Error in fetching batsman stats:", error);
        throw new Error("Failed to fetch batsman stats.");
      }
    },
  },

  Query: {
  fetchAllRetiredBatsmanInfo: async () => await userModel.fetchAllRetiredBatsmanInfo(),

  fetchBatsmanById: async (_: any, { id }: { id: number }) => await userModel.fetchBatsmanById(id),

  fetchAverageOfABatsman: async (_: any, { id }: { id: number }) =>  await userModel.fetchAverageOfABatsman(id),

  fetchAllBatsman: async () => await userModel.fetchAllBatsman(),
  },

  Mutation: {
    addBatsmanData: async (_: any, { input }: { input:batsmanDataArgs}) => {
      try {
        // console.log(input);
        const { firstName, lastName, age, isRetired } = input;
        return await userModel.addBatsmanData({ firstName,lastName,age, isRetired});
      } catch (err) {
        throw new Error("Error Adding batsman data");
      }
    },

    addBatsmanStats: async (_: any,{input}:{input:batsmanStatsArgs}) =>{
      try{
      const {batsman_id,runs,highestScore,strikeRate,hundreds,fiftys,notOut}=input
      return  await userModel.addBatsmanStats({  batsman_id,  runs,  highestScore, strikeRate, hundreds, fiftys, notOut});
      }
      catch(err){
        throw new Error("Error Adding batsman stats")
      }
    },
    
    updatePlayerInfo: async (  _: any,{ input}:{ input:batsmanupdateDataArgs }
    ) =>{
      try{
        const{id,firstName,lastName, isRetired, age}=input
  
      return await userModel.updatePlayerInfo( { id,firstName,lastName, isRetired, age})
      }catch(err){
        throw new Error("Error Updating Player")
      }
    },


    updateStats: async (_: any, {input  }: {input:batsmanStatsArgs }
    ) =>{
      try{
      const {batsman_id,runs,highestScore,strikeRate,hundreds,fiftys,notOut}=input
      return await userModel.updateStats( { batsman_id, runs,highestScore,strikeRate,hundreds,fiftys,notOut,})

      }catch(err){
        throw new Error("Error Updating Stats")
      }
      },

    softDelete: async (_: any, { id }: { id: number }) => await userModel.softDelete(id),
    hardDelete: async (_: any, { id }: { id: number }) => await userModel.hardDelete(id),

  },
};
