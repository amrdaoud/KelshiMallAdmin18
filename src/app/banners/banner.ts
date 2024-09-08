import { GeneralFilterModel } from "../app-reusables/data-table/data-table.models";

export interface Banner {
    bannerId: number;
    title: string;
    imageUrl: string;
    startDate: string;
    expiryDate: string;
    isActive: boolean;
    url: string;
    displayOrder: number;
}

export interface BannerBindingModel {
    bannerId: number;
    bannerTitle: string | null;
    // imageFile: FormFile | null;
    StartDate: Date | null;
    ExpiryDate: Date | null;
    isActive: boolean;
    url: string | null;
    displayOrder: number | null;
}

export interface BannerFilterModel extends GeneralFilterModel {
    isActive: boolean | null;
    isExpired: boolean | null;
    started: boolean | null;
}