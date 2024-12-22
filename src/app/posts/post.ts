import { GeneralFilterModel } from "../app-reusables/data-table/data-table.models";

export interface PostListViewModel {
	postId: number;
	title: string;
	description: string;
	postingDate: Date;
	price: number;
	isNegotiable: boolean;
	isFeatured: boolean;
	storeId: number;
	storeName: string;
    userId: string;
    userName: string;
    mobileNumber: string;
	categoryId: number;
	categoryName: string;
	parentCategoryId: number;
	parentCategoryName: string;
	totalViews: number;
	status: string;
	area: string;
	city: string;
	statusReason: string;
	lastActivatedBy: string;
	haveDelivery: boolean;
	totalOrders: number;
	currency: string;
}

export interface PostFilterModel {
    SearchQuery?: string;
    PageIndex: number;
    PageSize: number;
    SortActive: string;
    SortDirection: string;
    DateFrom?: Date;
    DateTo?: Date;
    Status?: string;
    UserId?: string;
    StoreId?: number;
	IsFeatured?: boolean;
	IsReposted?: boolean;
}

export interface Post {
	postId: number;
	title: string;
	thumbnailUrl: string;
	description: string;
	postingDate: Date;
	price: number;
	isNegotiable: boolean;
	isFeatured: boolean;
	storeId: number;
	categoryId: number;
	parentCategoryId: number;
	status: string;
	area: string;
	city: string;
	storeTitle: string;
	userMobile: string;
	postData: PostData[]
	postAttachment: PostAttachmentBindingModel[];
	statusReason: string;
	categoryName: string;
	parentCategoryName: string;
	lastActivatedBy: string;
	userId: string;
	dynamicStatus?: string;
	isReposted: boolean;
	postShipment: PostShipmentViewModel | null;
	currency: string;
}
export interface PostShipmentViewModel {
    postShipmentId: number;
    postId: number;
    userAddressId: number;
    deliveryMethodId: number;
    note: string | null;
    isFree: boolean;
    userAddressName: string | null;
    city: string | null;
    area: string | null;
    lon: number | null;
    lat: number | null;
    recipientName: string | null;
    recipientMobileNumber: string | null;
    userAddressInfo: string | null;
    isDefault: boolean;
    otherMobileNumber: string | null;
    deliveryMethodNameAr: string | null;
    deliveryMethodNameEn: string | null;
    descriptionAr: string | null;
    descriptionEn: string | null;
    logo: string | null;
}
export interface PostData {
	postDataId: number;
	parameterType: string;
	parameterTypeName: string;
	parameterValue: string;
	parameterCheckValue: boolean;
	postId: number;
	parameterLabel: string;
}

export interface Attachement {
	attachementId: number;
	filePath: string;
	fileName: string;
	fileType: string;
	creationDate: Date;
	paramters: string;
	fileExtension: string;
	isPrimary: boolean;
	url: string;
}


export interface PostAttachmentBindingModel {
	postAttachmentId: number;
	postId: number;
	attachementId: number;
	attachment: Attachement;
}
export interface ChangeStatusModel {
	PostId: number;
	Status: string;
	StatusReason: string;
}
export interface PostPriceLogViewModel {
    postPriceLogId: number;
    postId: number;
    logDate: string;
    systemUserId: string | null;
    systemUserName: string | null;
	price: number;
	currency: string;
}


