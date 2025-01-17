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

export interface BatsmanData {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    isRetired: boolean;
    createdAt: string;
    updatedAt: string;
    is_deleted: boolean;
}

export interface BatsmanStats {
    batsman_id: number;
    runs: number;
    highestScore: number;
    strikeRate: number;
    hundreds: number;
    fiftys: number;
    notOut: number;
    createdAt: string;
    updatedAt: string;
    average: number; // You can compute this in your resolver or database query
}
