export interface batsmanDataArgs {
    firstName: string;
    lastName: string;
    age: number;
    isRetired: boolean;
}

export interface batsmanStatsArgs {
    batsman_id: number;
    runs: number;
    highestScore: number;
    strikeRate: number;
    hundreds: number;
    fiftys: number;
    notOut: number;
}

export interface batsmanupdateDataArgs {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    isRetired: boolean;
}
