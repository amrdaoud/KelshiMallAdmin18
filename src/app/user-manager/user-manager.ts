import { Languages } from "../app-models/generic";
import { GeneralFilterModel } from "../app-reusables/data-table/data-table.models";

export interface UserFilterModel {
    SearchQuery?: string;
    UserId?: string;
    PageIndex: number;
    PageSize: number;
    SortActive: string;
    SortDirection: string;
    CreatedAfter?: Date;
    SeenAfter?: Date;
    IsActive?: boolean;
    MembershipIds?: number[];
}
export interface UserListViewModel {
    userId: string;
    userName: string;
    mobileNumber: string;
    creationDate: Date;
    lastModified: Date;
    isActive: boolean;
    lastSeen: Date;
    area: string;
    city: string;
    whatsAppNumber: string;
    totalPosts: number;
    totalActivePosts: number;
    walletBalance: number;
    totalPurshaces: number;
    storeName: string;
    membershipName: string;
    membershipEndDate: Date;
    profilePicture: string;
    backgroundPictures: string[];
    storeId: number;
    lastOtp: string | null;
    callingNumber: string | null;
}
export interface SendSmsModel {
    MobileNumbers: string[];
    Body: string;
    Language: Languages;
}

export interface UserAddressListViewModel {
    userAddressId: number;
    userId: string;
    userAddressName: string | null;
    city: string | null;
    area: string | null;
    lon: number;
    lat: number;
    recipientName: string | null;
    recipientMobileNumber: string | null;
    userAddressInfo: string | null;
    isDefault: boolean;
    isDeleted: boolean;
    otherMobileNumber: string | null;
}

export interface AddressFilterModel extends GeneralFilterModel {
    UserId: string | null;
    Cities: string[] | null;
    Areas: string[] | null;
}