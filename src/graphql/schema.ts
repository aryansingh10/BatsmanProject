import { gql } from "apollo-server-express";

const typeDefs = gql`
  type BatsmanData {
    id: Int
    firstName: String
    lastName: String!
    age: Int!
    isRetired: Boolean
    createdAt: String
    updatedAt: String
    is_deleted: Boolean
    stats: BatsmanStats
  }

  type BatsmanStats {
    batsman_id: Int
    runs: Int
    highestScore: Int
    average: Float
    strikeRate: Float
    batInfo: BatsmanData
    hundreds: Int
    fiftys: Int
    notOut: Int
    createdAt: String
    updatedAt: String
  }

  input batsmanDataArgs {
    firstName: String!
    lastName: String!
    age: Int
    isRetired: Boolean
  
  }

  input batsmanStatsArgs {
    batsman_id: Int!
    runs: Int
    highestScore: Int
    strikeRate: Float
    hundreds: Int
    fiftys: Int
    notOut: Int
  }

 input  batsmanupdateDataArgs{
   id:Int
  firstName:String,
  lastName:String,
  age:Int,
  isRetired:Boolean
 
}
  type Query {
    fetchAllRetiredBatsmanInfo: [BatsmanData]

    fetchBatsmanById(id: Int!): BatsmanData

    fetchAverageOfABatsman(id: Int!): Float

    fetchAllBatsman: [BatsmanData]!
  }

  type Mutation {
    addBatsmanData(input: batsmanDataArgs): String

    addBatsmanStats(input: batsmanStatsArgs): BatsmanStats!

    updatePlayerInfo(input:batsmanupdateDataArgs ): String

    updateStats(input:  batsmanStatsArgs): String

    softDelete(id: Int): String
    hardDelete(id: Int): String
  }
`;

export default typeDefs;
