import { GeneralFilterModel } from "../app-reusables/data-table/data-table.models";
export interface PostStatsFilterModel extends GeneralFilterModel {
    PostId?: number;
    StatType?: string;
    DateFrom?: string | null;
    DateTo?: string | null;
    Status?: string | null;
    UserId?: string | null;
    StoreId?: number | null;
    CategoryIds?: number[] | null;
    IsFeatured?: boolean | null;
    IsReposted?: boolean | null;
}
export interface PostStatListViewModel {
    postStatsId: number;
    postId: number | null;
    postTitle: string | null;
    statTypeName: string | null;
    statType: string | null;
    statValue: string | null;
    date: Date;
    userId: string | null;
    userName: string | null;
    storeTitle: string | null;
    mobileNumber: string | null;
    description: string | null;
}



export interface PostReportListViewModel {
    postId: number;
    postTitle: string | null;
    userId: string | null;
    userName: string | null;
    storeTitle: string | null;
    mobileNumber: string | null;
    postStatus: string | null;
    totalReports: number;
    lastReportDate: string | null;
}

