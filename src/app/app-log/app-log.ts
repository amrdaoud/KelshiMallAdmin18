import { GeneralFilterModel } from "../app-reusables/data-table/data-table.models";

export interface AppLogFilterModel extends GeneralFilterModel {
    DateFrom?: Date;
    DateTo?: Date;
}
export interface AppLog {
    appLogId: number;
    logDate: Date;
    appVersion?: string;
    platform?: string;
    deviceType?: string;
    deviceName?: string;
    version?: string;
    userId?: string;
    mobileNumber?: string;
    error?: string;

}