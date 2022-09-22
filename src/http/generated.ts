import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
import { ClientError } from 'graphql-request/dist/types';
import useSWR, { useSWRInfinite, SWRConfiguration as SWRConfigInterface, Key as SWRKeyInterface, SWRInfiniteConfiguration as SWRInfiniteConfigInterface } from 'swr';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BandDjsDataType = {
  __typename?: 'BandDjsDataType';
  hightlight?: Maybe<VideoUrl>;
  personInfo?: Maybe<PersonInfo>;
  pricing?: Maybe<Spp>;
  servicePricing?: Maybe<ServicePricings>;
  videoSample?: Maybe<Array<VideoUrl>>;
};

export type BandDjsDetailsInput = {
  highlight?: Maybe<VideoUrlInput>;
  personInfo?: Maybe<PersonInfoInput>;
  pricing?: Maybe<SppInput>;
  servicePricing?: Maybe<ServicePricingsInput>;
  videoSample?: Maybe<Array<VideoUrlInput>>;
};

export type BeautyProfessionalDataType = {
  __typename?: 'BeautyProfessionalDataType';
  personInfo?: Maybe<PersonInfo>;
  pricing?: Maybe<Spp>;
  servicePricing?: Maybe<ServicePricings>;
};

export type BeautyProfessionalDetailsInput = {
  personInfo?: Maybe<PersonInfoInput>;
  pricing?: Maybe<SppInput>;
  servicePricing?: Maybe<ServicePricingsInput>;
};

export type CakesDessertsDataType = {
  __typename?: 'CakesDessertsDataType';
  personInfo?: Maybe<PersonInfo>;
  pricing?: Maybe<Spp>;
  servicePricing?: Maybe<ServicePricings>;
};

export type CakesDessertsDetailsInput = {
  personInfo?: Maybe<PersonInfoInput>;
  pricing?: Maybe<SppInput>;
  servicePricing?: Maybe<ServicePricingsInput>;
};

export type CatererDataType = {
  __typename?: 'CatererDataType';
  personInfo?: Maybe<PersonInfo>;
  pricing?: Maybe<Spp>;
  servicePricing?: Maybe<ServicePricings>;
};

export type CatererDetailsInput = {
  personInfo?: Maybe<PersonInfoInput>;
  pricing?: Maybe<SppInput>;
  servicePricing?: Maybe<ServicePricingsInput>;
};

export type City = {
  __typename?: 'City';
  key: Scalars['String'];
  name: Scalars['String'];
};

export type Clap = {
  __typename?: 'Clap';
  key: Scalars['String'];
  name: Scalars['String'];
  values: Array<Scalars['String']>;
};

export type ClapInput = {
  key: Scalars['String'];
  name: Scalars['String'];
  values: Array<Scalars['String']>;
};

export type Connection = {
  __typename?: 'Connection';
  edges: Array<NodeEdge>;
  pageInfo: PageInfo;
};

export type ConnectionExtra = {
  __typename?: 'ConnectionExtra';
  district_id?: Maybe<Scalars['String']>;
  district_key?: Maybe<Scalars['String']>;
  edges: Array<NodeEdge>;
  pageInfo: PageInfo;
  vendor_type?: Maybe<VendorType>;
};

export type ConnectionNode = {
  __typename?: 'ConnectionNode';
  business_name: Scalars['String'];
  business_name_slug?: Maybe<Scalars['String']>;
  district_display_name?: Maybe<Scalars['String']>;
  gallery_photos: Array<Image>;
  id: Scalars['String'];
  vendor_type: VendorType;
};

export type CustomThumbnailInput = {
  id?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type District = {
  __typename?: 'District';
  cities: Array<City>;
  key: Scalars['String'];
  name: Scalars['String'];
};

export type Fixed = {
  __typename?: 'Fixed';
  price: Scalars['Float'];
};

export type FixedInput = {
  price?: Maybe<Scalars['Float']>;
};

export type FixedObject = {
  __typename?: 'FixedObject';
  price?: Maybe<Scalars['Float']>;
};

export type FloristsDataType = {
  __typename?: 'FloristsDataType';
  personInfo?: Maybe<PersonInfo>;
  pricing?: Maybe<Spp>;
  servicePricing?: Maybe<ServicePricings>;
};

export type FloristsDetailsInput = {
  personInfo?: Maybe<PersonInfoInput>;
  pricing?: Maybe<SppInput>;
  servicePricing?: Maybe<ServicePricingsInput>;
};

export type FrequentQuestion = {
  __typename?: 'FrequentQuestion';
  answer: Scalars['String'];
  question: Scalars['String'];
};

/** Edit common vendor details */
export type FrequentQuestionInput = {
  answer: Scalars['String'];
  question: Scalars['String'];
};

export type GalleryPhotoInput = {
  id?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type Geo = {
  __typename?: 'Geo';
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type GeoInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type Image = {
  __typename?: 'Image';
  ht: Scalars['Float'];
  id: Scalars['String'];
  wd: Scalars['Float'];
};

/** Register new vendor data */
export type ListInput = {
  districtID?: Maybe<Scalars['String']>;
  searchQuery?: Maybe<Scalars['String']>;
  vendorType?: Maybe<VendorType>;
};

export enum ListingStatus {
  PaymentPending = 'paymentPending',
  Pending = 'pending',
  Suspended = 'suspended',
  Unverified = 'unverified',
  Verified = 'verified'
}

export type LocationNode = {
  __typename?: 'LocationNode';
  id: Scalars['String'];
  key: Scalars['String'];
  name: Scalars['String'];
  parent_id?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword?: Maybe<VendorProfile>;
  confirmEmailVendor?: Maybe<Scalars['Boolean']>;
  forgotPassword: Scalars['Boolean'];
  vendorEditDetails: Scalars['Boolean'];
  vendorLogin?: Maybe<Scalars['Boolean']>;
  vendorLoginOtp?: Maybe<Scalars['Boolean']>;
  vendorLogout: Scalars['Boolean'];
  vendorRegister: Scalars['Boolean'];
  vendorRegisterOtp: Scalars['Boolean'];
};


export type MutationChangePasswordArgs = {
  data: VendorPasswordChangeInput;
};


export type MutationConfirmEmailVendorArgs = {
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationVendorEditDetailsArgs = {
  data: VendorDetailsInput;
};


export type MutationVendorLoginArgs = {
  password: Scalars['String'];
  phone: Scalars['String'];
};


export type MutationVendorLoginOtpArgs = {
  phone: Scalars['String'];
};


export type MutationVendorRegisterArgs = {
  address?: Maybe<Scalars['String']>;
  authCode: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
};


export type MutationVendorRegisterOtpArgs = {
  phone: Scalars['String'];
};

export type NodeEdge = {
  __typename?: 'NodeEdge';
  /** Used in `before` and `after` args */
  cursor: Scalars['String'];
  node: ConnectionNode;
};

export type PackageInput = {
  description?: Maybe<Scalars['String']>;
  min_price?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Array<PriceInput>>;
  short?: Maybe<Scalars['String']>;
};

export type PackageObject = {
  __typename?: 'PackageObject';
  description?: Maybe<Scalars['String']>;
  min_price?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Array<PriceObject>>;
  short?: Maybe<Scalars['String']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type PersonInfo = {
  __typename?: 'PersonInfo';
  name: Scalars['String'];
  person_photo: Image;
  position?: Maybe<Scalars['String']>;
};

export type PersonInfoInput = {
  name: Scalars['String'];
  personPhoto?: Maybe<PersonPhotoInput>;
  position?: Maybe<Scalars['String']>;
};

export type PersonPhotoInput = {
  token?: Maybe<Scalars['String']>;
};

export type PhotographerDataType = {
  __typename?: 'PhotographerDataType';
  personInfo?: Maybe<PersonInfo>;
  pricing?: Maybe<Spp>;
  servicePricing?: Maybe<ServicePricings>;
};

export type PhotographerDetailsInput = {
  personInfo?: Maybe<PersonInfoInput>;
  pricing?: Maybe<SppInput>;
  servicePricing?: Maybe<ServicePricingsInput>;
};

export type PriceInput = {
  fixed?: Maybe<FixedInput>;
  name?: Maybe<Scalars['String']>;
  price_type: PriceType;
  range?: Maybe<RangeInput>;
  starting?: Maybe<StartingInput>;
  unit?: Maybe<Scalars['String']>;
};

export type PriceObject = {
  __typename?: 'PriceObject';
  fixed?: Maybe<FixedObject>;
  name?: Maybe<Scalars['String']>;
  price_type: PriceType;
  range?: Maybe<RangeObject>;
  starting?: Maybe<StartingObject>;
  unit?: Maybe<Scalars['String']>;
};

export enum PriceType {
  Fixed = 'fixed',
  Range = 'range',
  Starting = 'starting'
}

export type Query = {
  __typename?: 'Query';
  cities: Array<LocationNode>;
  clapStore: Array<StoreClap>;
  districts: Array<LocationNode>;
  isVendorPhoneExist: Scalars['Boolean'];
  provinces: Array<LocationNode>;
  vendorDetails?: Maybe<VendorDetails>;
  vendorDetailsB?: Maybe<VendorDetails>;
  vendorDetailsExtra?: Maybe<VendorDetailsExtra>;
  vendorProfile?: Maybe<VendorProfile>;
  vendorSearch: Connection;
  vendorSearchWithExtra: ConnectionExtra;
};


export type QueryCitiesArgs = {
  districts_id?: Maybe<Scalars['String']>;
};


export type QueryClapStoreArgs = {
  vendorType: VendorType;
};


export type QueryDistrictsArgs = {
  province_id?: Maybe<Scalars['String']>;
};


export type QueryIsVendorPhoneExistArgs = {
  phone: Scalars['String'];
};


export type QueryVendorDetailsArgs = {
  vendorDataId: Scalars['String'];
};


export type QueryVendorDetailsBArgs = {
  businessName: Scalars['String'];
  vendorDataId?: Maybe<Scalars['String']>;
};


export type QueryVendorSearchArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Float']>;
  last?: Maybe<Scalars['Float']>;
  where?: Maybe<ListInput>;
};


export type QueryVendorSearchWithExtraArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Float']>;
  last?: Maybe<Scalars['Float']>;
  where?: Maybe<ListInput>;
};

export type Range = {
  __typename?: 'Range';
  from_price: Scalars['Float'];
  to_price: Scalars['Float'];
};

export type RangeInput = {
  from_price?: Maybe<Scalars['Float']>;
  to_price?: Maybe<Scalars['Float']>;
};

export type RangeObject = {
  __typename?: 'RangeObject';
  from_price?: Maybe<Scalars['Float']>;
  to_price?: Maybe<Scalars['Float']>;
};

export type ServicePrice = {
  __typename?: 'ServicePrice';
  class?: Maybe<Scalars['String']>;
  fixed?: Maybe<Fixed>;
  price_type: ServicePriceType;
  product?: Maybe<Scalars['String']>;
  range?: Maybe<Range>;
  starting?: Maybe<Starting>;
  unit?: Maybe<Scalars['String']>;
};

export type ServicePriceInput = {
  class?: Maybe<Scalars['String']>;
  fixed?: Maybe<FixedInput>;
  price_type: ServicePriceType;
  product?: Maybe<Scalars['String']>;
  range?: Maybe<RangeInput>;
  starting?: Maybe<StartingInput>;
  unit?: Maybe<Scalars['String']>;
};

export enum ServicePriceType {
  Fixed = 'Fixed',
  Range = 'Range',
  Starting = 'Starting'
}

export type ServicePricing = {
  __typename?: 'ServicePricing';
  min_spend?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  service_prices: Array<ServicePrice>;
};

export type ServicePricingInput = {
  min_spend?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  service_prices?: Maybe<Array<ServicePriceInput>>;
};

export type ServicePricings = {
  __typename?: 'ServicePricings';
  pricings?: Maybe<Array<ServicePricing>>;
};

export type ServicePricingsInput = {
  pricings?: Maybe<Array<ServicePricingInput>>;
};

export type SocialMedia = {
  __typename?: 'SocialMedia';
  facebook?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  pinterest?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type Spp = {
  __typename?: 'Spp';
  min_price?: Maybe<Scalars['Float']>;
  packages?: Maybe<Array<PackageObject>>;
};

export type SppInput = {
  min_price?: Maybe<Scalars['Float']>;
  packages?: Maybe<Array<PackageInput>>;
};

export type Starting = {
  __typename?: 'Starting';
  price: Scalars['Float'];
};

export type StartingInput = {
  price?: Maybe<Scalars['Float']>;
};

export type StartingObject = {
  __typename?: 'StartingObject';
  price?: Maybe<Scalars['Float']>;
};

export type StoreClap = {
  __typename?: 'StoreClap';
  key: Scalars['String'];
  name: Scalars['String'];
  values: Array<Scalars['String']>;
};

export type VendorDetails = {
  __typename?: 'VendorDetails';
  address?: Maybe<Scalars['String']>;
  business_name?: Maybe<Scalars['String']>;
  claps?: Maybe<Array<Clap>>;
  description?: Maybe<Scalars['String']>;
  frequent_questions?: Maybe<Array<FrequentQuestion>>;
  galleryPhoto?: Maybe<Array<Image>>;
  geo?: Maybe<Geo>;
  links?: Maybe<SocialMedia>;
  phone?: Maybe<Scalars['String']>;
  searchLocations?: Maybe<Array<District>>;
  vendorTypes?: Maybe<VendorTypes>;
  vendor_type?: Maybe<VendorType>;
};

export type VendorDetailsExtra = {
  __typename?: 'VendorDetailsExtra';
  address?: Maybe<Scalars['String']>;
  business_name?: Maybe<Scalars['String']>;
  claps?: Maybe<Array<Clap>>;
  description?: Maybe<Scalars['String']>;
  frequent_questions?: Maybe<Array<FrequentQuestion>>;
  galleryPhoto?: Maybe<Array<Image>>;
  geo?: Maybe<Geo>;
  isComplete?: Maybe<Scalars['Boolean']>;
  isLive?: Maybe<Scalars['Boolean']>;
  links?: Maybe<SocialMedia>;
  listingStatus?: Maybe<ListingStatus>;
  phone?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  searchLocations?: Maybe<Array<District>>;
  vendorTypes?: Maybe<VendorTypes>;
  vendor_type?: Maybe<VendorType>;
};

/** Edit common vendor details */
export type VendorDetailsInput = {
  address?: Maybe<Scalars['String']>;
  bandDjsDetails?: Maybe<BandDjsDetailsInput>;
  beautyProfessionalDetails?: Maybe<BeautyProfessionalDetailsInput>;
  businessName?: Maybe<Scalars['String']>;
  cakesDessertsDetails?: Maybe<CakesDessertsDetailsInput>;
  catererDetails?: Maybe<CatererDetailsInput>;
  cityIDs?: Maybe<Array<Scalars['String']>>;
  claps?: Maybe<Array<ClapInput>>;
  description?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  floristsDetails?: Maybe<FloristsDetailsInput>;
  frequentQuestion?: Maybe<Array<FrequentQuestionInput>>;
  gallery_photos?: Maybe<Array<GalleryPhotoInput>>;
  geo?: Maybe<GeoInput>;
  instagram?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  photographerDetails?: Maybe<PhotographerDetailsInput>;
  pinterest?: Maybe<Scalars['String']>;
  vendorType?: Maybe<VendorType>;
  venueDetails?: Maybe<VenueDetailsInput>;
  videographerDetails?: Maybe<VideographerDetailsInput>;
  website?: Maybe<Scalars['String']>;
};

/** vendor password change input */
export type VendorPasswordChangeInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type VendorProfile = {
  __typename?: 'VendorProfile';
  email?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  verified: Scalars['Boolean'];
};

export enum VendorType {
  Jewellery = 'bands_dj',
  BeautyProfessional = 'beauty_professional',
  CakesDessert = 'cakes_dessert',
  Caterer = 'caterer',
  Florist = 'florist',
  Photographer = 'photographer',
  Venue = 'venue',
  Videographer = 'videographer'
}

export type VendorTypes = {
  __typename?: 'VendorTypes';
  band_djs_type?: Maybe<BandDjsDataType>;
  beauty_professionals_type?: Maybe<BeautyProfessionalDataType>;
  cakes_desserts_type?: Maybe<CakesDessertsDataType>;
  caterer_type?: Maybe<CatererDataType>;
  florists_type?: Maybe<FloristsDataType>;
  photographer_type?: Maybe<PhotographerDataType>;
  venue_type?: Maybe<VenueDataType>;
  videographer_type?: Maybe<VideographerDataType>;
};

export type VenueDataType = {
  __typename?: 'VenueDataType';
  guestCapacity?: Maybe<Scalars['Float']>;
  hightlight?: Maybe<VideoUrl>;
  pricing?: Maybe<Spp>;
  servicePricing?: Maybe<ServicePricings>;
};

export type VenueDetailsInput = {
  guestCapacity?: Maybe<Scalars['Float']>;
  highlight?: Maybe<VideoUrlInput>;
  pricing?: Maybe<SppInput>;
  servicePricing?: Maybe<ServicePricingsInput>;
};

export type VideoUrl = {
  __typename?: 'VideoUrl';
  customThumbnail?: Maybe<Image>;
  videoTitle?: Maybe<Scalars['String']>;
  videoType?: Maybe<Scalars['String']>;
  vimeoUrl?: Maybe<Scalars['String']>;
  youtubeUrl?: Maybe<Scalars['String']>;
};

export type VideoUrlInput = {
  customThumbnail?: Maybe<CustomThumbnailInput>;
  videoTitle?: Maybe<Scalars['String']>;
  videoType?: Maybe<Scalars['String']>;
  vimeoUrl?: Maybe<Scalars['String']>;
  youtubeUrl?: Maybe<Scalars['String']>;
};

export type VideographerDataType = {
  __typename?: 'VideographerDataType';
  hightlight?: Maybe<VideoUrl>;
  personInfo?: Maybe<PersonInfo>;
  pricing?: Maybe<Spp>;
  servicePricing?: Maybe<ServicePricings>;
  videoSample?: Maybe<Array<VideoUrl>>;
};

export type VideographerDetailsInput = {
  highlight?: Maybe<VideoUrlInput>;
  personInfo?: Maybe<PersonInfoInput>;
  pricing?: Maybe<SppInput>;
  servicePricing?: Maybe<ServicePricingsInput>;
  videoSample?: Maybe<Array<VideoUrlInput>>;
};

export type TopWeddingVendorsQueryVariables = Exact<{ [key: string]: never; }>;


export type TopWeddingVendorsQuery = { __typename?: 'Query', vendorSearch: { __typename?: 'Connection', edges: Array<{ __typename?: 'NodeEdge', node: { __typename?: 'ConnectionNode', business_name: string, id: string, vendor_type: VendorType, district_display_name?: string | null | undefined, gallery_photos: Array<{ __typename?: 'Image', id: string, ht: number, wd: number }> } }> } };

export type LocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type LocationsQuery = { __typename?: 'Query', districts: Array<{ __typename?: 'LocationNode', id: string, name: string, key: string }> };

export type PricingFragment = { __typename?: 'Spp', min_price?: number | null | undefined, packages?: Array<{ __typename?: 'PackageObject', name?: string | null | undefined, short?: string | null | undefined, min_price?: number | null | undefined, description?: string | null | undefined, price?: Array<{ __typename?: 'PriceObject', name?: string | null | undefined, price_type: PriceType, unit?: string | null | undefined, fixed?: { __typename?: 'FixedObject', price?: number | null | undefined } | null | undefined, range?: { __typename?: 'RangeObject', from_price?: number | null | undefined, to_price?: number | null | undefined } | null | undefined, starting?: { __typename?: 'StartingObject', price?: number | null | undefined } | null | undefined }> | null | undefined }> | null | undefined };

export type PersonInfoItemsFragment = { __typename?: 'PersonInfo', name: string, position?: string | null | undefined, person_photo: { __typename?: 'Image', ht: number, wd: number, id: string } };

export type ServicePricingsItemsFragment = { __typename?: 'ServicePricings', pricings?: Array<{ __typename?: 'ServicePricing', name: string, min_spend?: number | null | undefined, service_prices: Array<{ __typename?: 'ServicePrice', price_type: ServicePriceType, product?: string | null | undefined, class?: string | null | undefined, unit?: string | null | undefined, fixed?: { __typename?: 'Fixed', price: number } | null | undefined, range?: { __typename?: 'Range', to_price: number, from_price: number } | null | undefined, starting?: { __typename?: 'Starting', price: number } | null | undefined }> }> | null | undefined };

export type VendorDetailsBQueryVariables = Exact<{
  businessName: Scalars['String'];
  vid?: Maybe<Scalars['String']>;
}>;


export type VendorDetailsBQuery = { __typename?: 'Query', vendorDetailsB?: { __typename?: 'VendorDetails', phone?: string | null | undefined, business_name?: string | null | undefined, vendor_type?: VendorType | null | undefined, description?: string | null | undefined, address?: string | null | undefined, galleryPhoto?: Array<{ __typename?: 'Image', id: string, ht: number, wd: number }> | null | undefined, frequent_questions?: Array<{ __typename?: 'FrequentQuestion', answer: string, question: string }> | null | undefined, vendorTypes?: { __typename?: 'VendorTypes', caterer_type?: { __typename?: 'CatererDataType', pricing?: { __typename?: 'Spp', min_price?: number | null | undefined, packages?: Array<{ __typename?: 'PackageObject', name?: string | null | undefined, short?: string | null | undefined, min_price?: number | null | undefined, description?: string | null | undefined, price?: Array<{ __typename?: 'PriceObject', name?: string | null | undefined, price_type: PriceType, unit?: string | null | undefined, fixed?: { __typename?: 'FixedObject', price?: number | null | undefined } | null | undefined, range?: { __typename?: 'RangeObject', from_price?: number | null | undefined, to_price?: number | null | undefined } | null | undefined, starting?: { __typename?: 'StartingObject', price?: number | null | undefined } | null | undefined }> | null | undefined }> | null | undefined } | null | undefined, personInfo?: { __typename?: 'PersonInfo', name: string, position?: string | null | undefined, person_photo: { __typename?: 'Image', ht: number, wd: number, id: string } } | null | undefined, servicePricing?: { __typename?: 'ServicePricings', pricings?: Array<{ __typename?: 'ServicePricing', name: string, min_spend?: number | null | undefined, service_prices: Array<{ __typename?: 'ServicePrice', price_type: ServicePriceType, product?: string | null | undefined, class?: string | null | undefined, unit?: string | null | undefined, fixed?: { __typename?: 'Fixed', price: number } | null | undefined, range?: { __typename?: 'Range', to_price: number, from_price: number } | null | undefined, starting?: { __typename?: 'Starting', price: number } | null | undefined }> }> | null | undefined } | null | undefined } | null | undefined, beauty_professionals_type?: { __typename?: 'BeautyProfessionalDataType', pricing?: { __typename?: 'Spp', min_price?: number | null | undefined, packages?: Array<{ __typename?: 'PackageObject', name?: string | null | undefined, short?: string | null | undefined, min_price?: number | null | undefined, description?: string | null | undefined, price?: Array<{ __typename?: 'PriceObject', name?: string | null | undefined, price_type: PriceType, unit?: string | null | undefined, fixed?: { __typename?: 'FixedObject', price?: number | null | undefined } | null | undefined, range?: { __typename?: 'RangeObject', from_price?: number | null | undefined, to_price?: number | null | undefined } | null | undefined, starting?: { __typename?: 'StartingObject', price?: number | null | undefined } | null | undefined }> | null | undefined }> | null | undefined } | null | undefined, personInfo?: { __typename?: 'PersonInfo', name: string, position?: string | null | undefined, person_photo: { __typename?: 'Image', ht: number, wd: number, id: string } } | null | undefined, servicePricing?: { __typename?: 'ServicePricings', pricings?: Array<{ __typename?: 'ServicePricing', name: string, min_spend?: number | null | undefined, service_prices: Array<{ __typename?: 'ServicePrice', price_type: ServicePriceType, product?: string | null | undefined, class?: string | null | undefined, unit?: string | null | undefined, fixed?: { __typename?: 'Fixed', price: number } | null | undefined, range?: { __typename?: 'Range', to_price: number, from_price: number } | null | undefined, starting?: { __typename?: 'Starting', price: number } | null | undefined }> }> | null | undefined } | null | undefined } | null | undefined, venue_type?: { __typename?: 'VenueDataType', guestCapacity?: number | null | undefined, pricing?: { __typename?: 'Spp', min_price?: number | null | undefined, packages?: Array<{ __typename?: 'PackageObject', name?: string | null | undefined, short?: string | null | undefined, min_price?: number | null | undefined, description?: string | null | undefined, price?: Array<{ __typename?: 'PriceObject', name?: string | null | undefined, price_type: PriceType, unit?: string | null | undefined, fixed?: { __typename?: 'FixedObject', price?: number | null | undefined } | null | undefined, range?: { __typename?: 'RangeObject', from_price?: number | null | undefined, to_price?: number | null | undefined } | null | undefined, starting?: { __typename?: 'StartingObject', price?: number | null | undefined } | null | undefined }> | null | undefined }> | null | undefined } | null | undefined, hightlight?: { __typename?: 'VideoUrl', vimeoUrl?: string | null | undefined, youtubeUrl?: string | null | undefined } | null | undefined, servicePricing?: { __typename?: 'ServicePricings', pricings?: Array<{ __typename?: 'ServicePricing', name: string, min_spend?: number | null | undefined, service_prices: Array<{ __typename?: 'ServicePrice', price_type: ServicePriceType, product?: string | null | undefined, class?: string | null | undefined, unit?: string | null | undefined, fixed?: { __typename?: 'Fixed', price: number } | null | undefined, range?: { __typename?: 'Range', to_price: number, from_price: number } | null | undefined, starting?: { __typename?: 'Starting', price: number } | null | undefined }> }> | null | undefined } | null | undefined } | null | undefined, photographer_type?: { __typename?: 'PhotographerDataType', servicePricing?: { __typename?: 'ServicePricings', pricings?: Array<{ __typename?: 'ServicePricing', name: string, min_spend?: number | null | undefined, service_prices: Array<{ __typename?: 'ServicePrice', price_type: ServicePriceType, product?: string | null | undefined, class?: string | null | undefined, unit?: string | null | undefined, fixed?: { __typename?: 'Fixed', price: number } | null | undefined, range?: { __typename?: 'Range', to_price: number, from_price: number } | null | undefined, starting?: { __typename?: 'Starting', price: number } | null | undefined }> }> | null | undefined } | null | undefined, pricing?: { __typename?: 'Spp', min_price?: number | null | undefined, packages?: Array<{ __typename?: 'PackageObject', name?: string | null | undefined, short?: string | null | undefined, min_price?: number | null | undefined, description?: string | null | undefined, price?: Array<{ __typename?: 'PriceObject', name?: string | null | undefined, price_type: PriceType, unit?: string | null | undefined, fixed?: { __typename?: 'FixedObject', price?: number | null | undefined } | null | undefined, range?: { __typename?: 'RangeObject', from_price?: number | null | undefined, to_price?: number | null | undefined } | null | undefined, starting?: { __typename?: 'StartingObject', price?: number | null | undefined } | null | undefined }> | null | undefined }> | null | undefined } | null | undefined, personInfo?: { __typename?: 'PersonInfo', name: string, position?: string | null | undefined, person_photo: { __typename?: 'Image', ht: number, wd: number, id: string } } | null | undefined } | null | undefined, videographer_type?: { __typename?: 'VideographerDataType', pricing?: { __typename?: 'Spp', min_price?: number | null | undefined, packages?: Array<{ __typename?: 'PackageObject', name?: string | null | undefined, short?: string | null | undefined, min_price?: number | null | undefined, description?: string | null | undefined, price?: Array<{ __typename?: 'PriceObject', name?: string | null | undefined, price_type: PriceType, unit?: string | null | undefined, fixed?: { __typename?: 'FixedObject', price?: number | null | undefined } | null | undefined, range?: { __typename?: 'RangeObject', from_price?: number | null | undefined, to_price?: number | null | undefined } | null | undefined, starting?: { __typename?: 'StartingObject', price?: number | null | undefined } | null | undefined }> | null | undefined }> | null | undefined } | null | undefined, servicePricing?: { __typename?: 'ServicePricings', pricings?: Array<{ __typename?: 'ServicePricing', name: string, min_spend?: number | null | undefined, service_prices: Array<{ __typename?: 'ServicePrice', price_type: ServicePriceType, product?: string | null | undefined, class?: string | null | undefined, unit?: string | null | undefined, fixed?: { __typename?: 'Fixed', price: number } | null | undefined, range?: { __typename?: 'Range', to_price: number, from_price: number } | null | undefined, starting?: { __typename?: 'Starting', price: number } | null | undefined }> }> | null | undefined } | null | undefined, personInfo?: { __typename?: 'PersonInfo', name: string, position?: string | null | undefined, person_photo: { __typename?: 'Image', ht: number, wd: number, id: string } } | null | undefined, hightlight?: { __typename?: 'VideoUrl', vimeoUrl?: string | null | undefined, youtubeUrl?: string | null | undefined } | null | undefined, videoSample?: Array<{ __typename?: 'VideoUrl', vimeoUrl?: string | null | undefined, youtubeUrl?: string | null | undefined, videoTitle?: string | null | undefined, videoType?: string | null | undefined, customThumbnail?: { __typename?: 'Image', id: string, ht: number, wd: number } | null | undefined }> | null | undefined } | null | undefined, band_djs_type?: { __typename?: 'BandDjsDataType', pricing?: { __typename?: 'Spp', min_price?: number | null | undefined, packages?: Array<{ __typename?: 'PackageObject', name?: string | null | undefined, short?: string | null | undefined, min_price?: number | null | undefined, description?: string | null | undefined, price?: Array<{ __typename?: 'PriceObject', name?: string | null | undefined, price_type: PriceType, unit?: string | null | undefined, fixed?: { __typename?: 'FixedObject', price?: number | null | undefined } | null | undefined, range?: { __typename?: 'RangeObject', from_price?: number | null | undefined, to_price?: number | null | undefined } | null | undefined, starting?: { __typename?: 'StartingObject', price?: number | null | undefined } | null | undefined }> | null | undefined }> | null | undefined } | null | undefined, servicePricing?: { __typename?: 'ServicePricings', pricings?: Array<{ __typename?: 'ServicePricing', name: string, min_spend?: number | null | undefined, service_prices: Array<{ __typename?: 'ServicePrice', price_type: ServicePriceType, product?: string | null | undefined, class?: string | null | undefined, unit?: string | null | undefined, fixed?: { __typename?: 'Fixed', price: number } | null | undefined, range?: { __typename?: 'Range', to_price: number, from_price: number } | null | undefined, starting?: { __typename?: 'Starting', price: number } | null | undefined }> }> | null | undefined } | null | undefined, personInfo?: { __typename?: 'PersonInfo', name: string, position?: string | null | undefined, person_photo: { __typename?: 'Image', ht: number, wd: number, id: string } } | null | undefined, hightlight?: { __typename?: 'VideoUrl', vimeoUrl?: string | null | undefined, youtubeUrl?: string | null | undefined } | null | undefined, videoSample?: Array<{ __typename?: 'VideoUrl', vimeoUrl?: string | null | undefined, youtubeUrl?: string | null | undefined }> | null | undefined } | null | undefined, florists_type?: { __typename?: 'FloristsDataType', pricing?: { __typename?: 'Spp', min_price?: number | null | undefined, packages?: Array<{ __typename?: 'PackageObject', name?: string | null | undefined, short?: string | null | undefined, min_price?: number | null | undefined, description?: string | null | undefined, price?: Array<{ __typename?: 'PriceObject', name?: string | null | undefined, price_type: PriceType, unit?: string | null | undefined, fixed?: { __typename?: 'FixedObject', price?: number | null | undefined } | null | undefined, range?: { __typename?: 'RangeObject', from_price?: number | null | undefined, to_price?: number | null | undefined } | null | undefined, starting?: { __typename?: 'StartingObject', price?: number | null | undefined } | null | undefined }> | null | undefined }> | null | undefined } | null | undefined, servicePricing?: { __typename?: 'ServicePricings', pricings?: Array<{ __typename?: 'ServicePricing', name: string, min_spend?: number | null | undefined, service_prices: Array<{ __typename?: 'ServicePrice', price_type: ServicePriceType, product?: string | null | undefined, class?: string | null | undefined, unit?: string | null | undefined, fixed?: { __typename?: 'Fixed', price: number } | null | undefined, range?: { __typename?: 'Range', to_price: number, from_price: number } | null | undefined, starting?: { __typename?: 'Starting', price: number } | null | undefined }> }> | null | undefined } | null | undefined, personInfo?: { __typename?: 'PersonInfo', name: string, position?: string | null | undefined, person_photo: { __typename?: 'Image', ht: number, wd: number, id: string } } | null | undefined } | null | undefined, cakes_desserts_type?: { __typename?: 'CakesDessertsDataType', pricing?: { __typename?: 'Spp', min_price?: number | null | undefined, packages?: Array<{ __typename?: 'PackageObject', name?: string | null | undefined, short?: string | null | undefined, min_price?: number | null | undefined, description?: string | null | undefined, price?: Array<{ __typename?: 'PriceObject', name?: string | null | undefined, price_type: PriceType, unit?: string | null | undefined, fixed?: { __typename?: 'FixedObject', price?: number | null | undefined } | null | undefined, range?: { __typename?: 'RangeObject', from_price?: number | null | undefined, to_price?: number | null | undefined } | null | undefined, starting?: { __typename?: 'StartingObject', price?: number | null | undefined } | null | undefined }> | null | undefined }> | null | undefined } | null | undefined, servicePricing?: { __typename?: 'ServicePricings', pricings?: Array<{ __typename?: 'ServicePricing', name: string, min_spend?: number | null | undefined, service_prices: Array<{ __typename?: 'ServicePrice', price_type: ServicePriceType, product?: string | null | undefined, class?: string | null | undefined, unit?: string | null | undefined, fixed?: { __typename?: 'Fixed', price: number } | null | undefined, range?: { __typename?: 'Range', to_price: number, from_price: number } | null | undefined, starting?: { __typename?: 'Starting', price: number } | null | undefined }> }> | null | undefined } | null | undefined, personInfo?: { __typename?: 'PersonInfo', name: string, position?: string | null | undefined, person_photo: { __typename?: 'Image', ht: number, wd: number, id: string } } | null | undefined } | null | undefined } | null | undefined, searchLocations?: Array<{ __typename?: 'District', name: string, cities: Array<{ __typename?: 'City', name: string }> }> | null | undefined, links?: { __typename?: 'SocialMedia', facebook?: string | null | undefined, instagram?: string | null | undefined, pinterest?: string | null | undefined, website?: string | null | undefined } | null | undefined, claps?: Array<{ __typename?: 'Clap', name: string, key: string, values: Array<string> }> | null | undefined } | null | undefined };

export type VendorSearchQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  searchQuery?: Maybe<Scalars['String']>;
  districtID?: Maybe<Scalars['String']>;
  vendorType?: Maybe<VendorType>;
}>;


export type VendorSearchQuery = { __typename?: 'Query', vendorSearchWithExtra: { __typename?: 'ConnectionExtra', district_key?: string | null | undefined, vendor_type?: VendorType | null | undefined, district_id?: string | null | undefined, edges: Array<{ __typename?: 'NodeEdge', cursor: string, node: { __typename?: 'ConnectionNode', business_name: string, business_name_slug?: string | null | undefined, id: string, vendor_type: VendorType, district_display_name?: string | null | undefined, gallery_photos: Array<{ __typename?: 'Image', id: string, ht: number, wd: number }> } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, endCursor?: string | null | undefined } } };

export type VendorLoginOtpMutationVariables = Exact<{
  phone: Scalars['String'];
}>;


export type VendorLoginOtpMutation = { __typename?: 'Mutation', vendorLoginOtp?: boolean | null | undefined };

export type VendorLoginMutationVariables = Exact<{
  phone: Scalars['String'];
  password: Scalars['String'];
}>;


export type VendorLoginMutation = { __typename?: 'Mutation', vendorLogin?: boolean | null | undefined };

export type GetVendorProfileIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVendorProfileIdQuery = { __typename?: 'Query', vendorProfile?: { __typename?: 'VendorProfile', id: string } | null | undefined };

export type GetVendorProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVendorProfileQuery = { __typename?: 'Query', vendorProfile?: { __typename?: 'VendorProfile', id: string, firstName: string, lastName: string, email?: string | null | undefined, phone: string, verified: boolean } | null | undefined };

export type VendorLogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type VendorLogoutMutation = { __typename?: 'Mutation', vendorLogout: boolean };

export type IsVendorPhoneExistQueryVariables = Exact<{
  phone: Scalars['String'];
}>;


export type IsVendorPhoneExistQuery = { __typename?: 'Query', isVendorPhoneExist: boolean };

export type VendorRegisterOtpMutationVariables = Exact<{
  phone: Scalars['String'];
}>;


export type VendorRegisterOtpMutation = { __typename?: 'Mutation', vendorRegisterOtp: boolean };

export type VendorRegisterMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  password: Scalars['String'];
  authCode: Scalars['String'];
}>;


export type VendorRegisterMutation = { __typename?: 'Mutation', vendorRegister: boolean };

export type EditVendorDetailsMutationVariables = Exact<{
  businessName?: Maybe<Scalars['String']>;
  vendorType?: Maybe<VendorType>;
  address?: Maybe<Scalars['String']>;
  galleryPhotos?: Maybe<Array<GalleryPhotoInput> | GalleryPhotoInput>;
  frequentQuestion?: Maybe<Array<FrequentQuestionInput> | FrequentQuestionInput>;
  geo?: Maybe<GeoInput>;
  phone?: Maybe<Scalars['String']>;
  cityIds?: Maybe<Array<Scalars['String']> | Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  pinterest?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  claps?: Maybe<Array<ClapInput> | ClapInput>;
  description?: Maybe<Scalars['String']>;
  catererDetails?: Maybe<CatererDetailsInput>;
  photographerDetails?: Maybe<PhotographerDetailsInput>;
  venueDetails?: Maybe<VenueDetailsInput>;
  videographerDetails?: Maybe<VideographerDetailsInput>;
  bandDjsDetails?: Maybe<BandDjsDetailsInput>;
  beautyProfessionalsDetails?: Maybe<BeautyProfessionalDetailsInput>;
  cakesDessertsDetails?: Maybe<CakesDessertsDetailsInput>;
  floristsDetails?: Maybe<FloristsDetailsInput>;
}>;


export type EditVendorDetailsMutation = { __typename?: 'Mutation', vendorEditDetails: boolean };

export type GetVendorDetailsExtraQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVendorDetailsExtraQuery = { __typename?: 'Query', vendorDetailsExtra?: { __typename?: 'VendorDetailsExtra', phone?: string | null | undefined, description?: string | null | undefined, address?: string | null | undefined, listingStatus?: ListingStatus | null | undefined, reason?: string | null | undefined, isLive?: boolean | null | undefined, vendor_type?: VendorType | null | undefined, business_name?: string | null | undefined, isComplete?: boolean | null | undefined, vendorTypes?: { __typename?: 'VendorTypes', caterer_type?: { __typename?: 'CatererDataType', pricing?: { __typename?: 'Spp', min_price?: number | null | undefined, packages?: Array<{ __typename?: 'PackageObject', name?: string | null | undefined, short?: string | null | undefined, min_price?: number | null | undefined, description?: string | null | undefined, price?: Array<{ __typename?: 'PriceObject', name?: string | null | undefined, price_type: PriceType, unit?: string | null | undefined, fixed?: { __typename?: 'FixedObject', price?: number | null | undefined } | null | undefined, range?: { __typename?: 'RangeObject', from_price?: number | null | undefined, to_price?: number | null | undefined } | null | undefined, starting?: { __typename?: 'StartingObject', price?: number | null | undefined } | null | undefined }> | null | undefined }> | null | undefined } | null | undefined, personInfo?: { __typename?: 'PersonInfo', name: string, position?: string | null | undefined, person_photo: { __typename?: 'Image', ht: number, wd: number, id: string } } | null | undefined } | null | undefined, beauty_professionals_type?: { __typename?: 'BeautyProfessionalDataType', pricing?: { __typename?: 'Spp', min_price?: number | null | undefined, packages?: Array<{ __typename?: 'PackageObject', name?: string | null | undefined, short?: string | null | undefined, min_price?: number | null | undefined, description?: string | null | undefined, price?: Array<{ __typename?: 'PriceObject', name?: string | null | undefined, price_type: PriceType, unit?: string | null | undefined, fixed?: { __typename?: 'FixedObject', price?: number | null | undefined } | null | undefined, range?: { __typename?: 'RangeObject', from_price?: number | null | undefined, to_price?: number | null | undefined } | null | undefined, starting?: { __typename?: 'StartingObject', price?: number | null | undefined } | null | undefined }> | null | undefined }> | null | undefined } | null | undefined, personInfo?: { __typename?: 'PersonInfo', name: string, position?: string | null | undefined, person_photo: { __typename?: 'Image', ht: number, wd: number, id: string } } | null | undefined } | null | undefined, venue_type?: { __typename?: 'VenueDataType', pricing?: { __typename?: 'Spp', min_price?: number | null | undefined, packages?: Array<{ __typename?: 'PackageObject', name?: string | null | undefined, short?: string | null | undefined, min_price?: number | null | undefined, description?: string | null | undefined, price?: Array<{ __typename?: 'PriceObject', name?: string | null | undefined, price_type: PriceType, unit?: string | null | undefined, fixed?: { __typename?: 'FixedObject', price?: number | null | undefined } | null | undefined, range?: { __typename?: 'RangeObject', from_price?: number | null | undefined, to_price?: number | null | undefined } | null | undefined, starting?: { __typename?: 'StartingObject', price?: number | null | undefined } | null | undefined }> | null | undefined }> | null | undefined } | null | undefined } | null | undefined, photographer_type?: { __typename?: 'PhotographerDataType', pricing?: { __typename?: 'Spp', min_price?: number | null | undefined, packages?: Array<{ __typename?: 'PackageObject', name?: string | null | undefined, short?: string | null | undefined, min_price?: number | null | undefined, description?: string | null | undefined, price?: Array<{ __typename?: 'PriceObject', name?: string | null | undefined, price_type: PriceType, unit?: string | null | undefined, fixed?: { __typename?: 'FixedObject', price?: number | null | undefined } | null | undefined, range?: { __typename?: 'RangeObject', from_price?: number | null | undefined, to_price?: number | null | undefined } | null | undefined, starting?: { __typename?: 'StartingObject', price?: number | null | undefined } | null | undefined }> | null | undefined }> | null | undefined } | null | undefined, personInfo?: { __typename?: 'PersonInfo', name: string, position?: string | null | undefined, person_photo: { __typename?: 'Image', ht: number, wd: number, id: string } } | null | undefined } | null | undefined, videographer_type?: { __typename?: 'VideographerDataType', pricing?: { __typename?: 'Spp', min_price?: number | null | undefined, packages?: Array<{ __typename?: 'PackageObject', name?: string | null | undefined, short?: string | null | undefined, min_price?: number | null | undefined, description?: string | null | undefined, price?: Array<{ __typename?: 'PriceObject', name?: string | null | undefined, price_type: PriceType, unit?: string | null | undefined, fixed?: { __typename?: 'FixedObject', price?: number | null | undefined } | null | undefined, range?: { __typename?: 'RangeObject', from_price?: number | null | undefined, to_price?: number | null | undefined } | null | undefined, starting?: { __typename?: 'StartingObject', price?: number | null | undefined } | null | undefined }> | null | undefined }> | null | undefined } | null | undefined, personInfo?: { __typename?: 'PersonInfo', name: string, position?: string | null | undefined, person_photo: { __typename?: 'Image', ht: number, wd: number, id: string } } | null | undefined } | null | undefined, band_djs_type?: { __typename?: 'BandDjsDataType', pricing?: { __typename?: 'Spp', min_price?: number | null | undefined, packages?: Array<{ __typename?: 'PackageObject', name?: string | null | undefined, short?: string | null | undefined, min_price?: number | null | undefined, description?: string | null | undefined, price?: Array<{ __typename?: 'PriceObject', name?: string | null | undefined, price_type: PriceType, unit?: string | null | undefined, fixed?: { __typename?: 'FixedObject', price?: number | null | undefined } | null | undefined, range?: { __typename?: 'RangeObject', from_price?: number | null | undefined, to_price?: number | null | undefined } | null | undefined, starting?: { __typename?: 'StartingObject', price?: number | null | undefined } | null | undefined }> | null | undefined }> | null | undefined } | null | undefined, personInfo?: { __typename?: 'PersonInfo', name: string, position?: string | null | undefined, person_photo: { __typename?: 'Image', ht: number, wd: number, id: string } } | null | undefined } | null | undefined, florists_type?: { __typename?: 'FloristsDataType', pricing?: { __typename?: 'Spp', min_price?: number | null | undefined, packages?: Array<{ __typename?: 'PackageObject', name?: string | null | undefined, short?: string | null | undefined, min_price?: number | null | undefined, description?: string | null | undefined, price?: Array<{ __typename?: 'PriceObject', name?: string | null | undefined, price_type: PriceType, unit?: string | null | undefined, fixed?: { __typename?: 'FixedObject', price?: number | null | undefined } | null | undefined, range?: { __typename?: 'RangeObject', from_price?: number | null | undefined, to_price?: number | null | undefined } | null | undefined, starting?: { __typename?: 'StartingObject', price?: number | null | undefined } | null | undefined }> | null | undefined }> | null | undefined } | null | undefined, personInfo?: { __typename?: 'PersonInfo', name: string, position?: string | null | undefined, person_photo: { __typename?: 'Image', ht: number, wd: number, id: string } } | null | undefined } | null | undefined, cakes_desserts_type?: { __typename?: 'CakesDessertsDataType', pricing?: { __typename?: 'Spp', min_price?: number | null | undefined, packages?: Array<{ __typename?: 'PackageObject', name?: string | null | undefined, short?: string | null | undefined, min_price?: number | null | undefined, description?: string | null | undefined, price?: Array<{ __typename?: 'PriceObject', name?: string | null | undefined, price_type: PriceType, unit?: string | null | undefined, fixed?: { __typename?: 'FixedObject', price?: number | null | undefined } | null | undefined, range?: { __typename?: 'RangeObject', from_price?: number | null | undefined, to_price?: number | null | undefined } | null | undefined, starting?: { __typename?: 'StartingObject', price?: number | null | undefined } | null | undefined }> | null | undefined }> | null | undefined } | null | undefined, personInfo?: { __typename?: 'PersonInfo', name: string, position?: string | null | undefined, person_photo: { __typename?: 'Image', ht: number, wd: number, id: string } } | null | undefined } | null | undefined } | null | undefined, searchLocations?: Array<{ __typename?: 'District', name: string, key: string, cities: Array<{ __typename?: 'City', name: string, key: string }> }> | null | undefined, geo?: { __typename?: 'Geo', latitude: number, longitude: number } | null | undefined, frequent_questions?: Array<{ __typename?: 'FrequentQuestion', question: string, answer: string }> | null | undefined, links?: { __typename?: 'SocialMedia', facebook?: string | null | undefined, instagram?: string | null | undefined, pinterest?: string | null | undefined, website?: string | null | undefined } | null | undefined, galleryPhoto?: Array<{ __typename?: 'Image', ht: number, wd: number, id: string }> | null | undefined, claps?: Array<{ __typename?: 'Clap', name: string, key: string, values: Array<string> }> | null | undefined } | null | undefined };

export type GetInitialDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInitialDataQuery = { __typename?: 'Query', vendorDetailsExtra?: { __typename?: 'VendorDetailsExtra', business_name?: string | null | undefined, vendor_type?: VendorType | null | undefined } | null | undefined };

export type GetDistrictsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDistrictsQuery = { __typename?: 'Query', districts: Array<{ __typename?: 'LocationNode', id: string, name: string, key: string, parent_id?: string | null | undefined }> };

export type GetCitiesQueryVariables = Exact<{
  districtId: Scalars['String'];
}>;


export type GetCitiesQuery = { __typename?: 'Query', cities: Array<{ __typename?: 'LocationNode', id: string, name: string, key: string, parent_id?: string | null | undefined }> };

export type GetClapStoreQueryVariables = Exact<{
  vendorType: VendorType;
}>;


export type GetClapStoreQuery = { __typename?: 'Query', clapStore: Array<{ __typename?: 'StoreClap', name: string, key: string, values: Array<string> }> };

export const PricingFragmentDoc = gql`
    fragment Pricing on Spp {
  min_price
  packages {
    name
    short
    min_price
    description
    price {
      name
      price_type
      fixed {
        price
      }
      range {
        from_price
        to_price
      }
      starting {
        price
      }
      unit
    }
  }
}
    `;
export const PersonInfoItemsFragmentDoc = gql`
    fragment PersonInfoItems on PersonInfo {
  name
  position
  person_photo {
    ht
    wd
    id
  }
}
    `;
export const ServicePricingsItemsFragmentDoc = gql`
    fragment ServicePricingsItems on ServicePricings {
  pricings {
    name
    service_prices {
      price_type
      product
      fixed {
        price
      }
      range {
        to_price
        from_price
      }
      starting {
        price
      }
      class
      unit
    }
    min_spend
  }
}
    `;
export const TopWeddingVendorsDocument = gql`
    query TopWeddingVendors {
  vendorSearch(first: 10) {
    edges {
      node {
        business_name
        id
        gallery_photos {
          id
          ht
          wd
        }
        vendor_type
        district_display_name
      }
    }
  }
}
    `;
export const LocationsDocument = gql`
    query Locations {
  districts {
    id
    name
    key
  }
}
    `;
export const VendorDetailsBDocument = gql`
    query VendorDetailsB($businessName: String!, $vid: String) {
  vendorDetailsB(businessName: $businessName, vendorDataId: $vid) {
    phone
    galleryPhoto {
      id
      ht
      wd
    }
    business_name
    frequent_questions {
      answer
      question
    }
    vendor_type
    vendorTypes {
      caterer_type {
        pricing {
          ...Pricing
        }
        personInfo {
          ...PersonInfoItems
        }
        servicePricing {
          ...ServicePricingsItems
        }
      }
      beauty_professionals_type {
        pricing {
          ...Pricing
        }
        personInfo {
          ...PersonInfoItems
        }
        servicePricing {
          ...ServicePricingsItems
        }
      }
      venue_type {
        pricing {
          ...Pricing
        }
        hightlight {
          vimeoUrl
          youtubeUrl
        }
        servicePricing {
          ...ServicePricingsItems
        }
        guestCapacity
      }
      photographer_type {
        servicePricing {
          ...ServicePricingsItems
        }
        pricing {
          ...Pricing
        }
        personInfo {
          ...PersonInfoItems
        }
      }
      videographer_type {
        pricing {
          ...Pricing
        }
        servicePricing {
          ...ServicePricingsItems
        }
        personInfo {
          ...PersonInfoItems
        }
        hightlight {
          vimeoUrl
          youtubeUrl
        }
        videoSample {
          vimeoUrl
          youtubeUrl
          videoTitle
          videoType
          customThumbnail {
            id
            ht
            wd
          }
        }
      }
      band_djs_type {
        pricing {
          ...Pricing
        }
        servicePricing {
          ...ServicePricingsItems
        }
        personInfo {
          ...PersonInfoItems
        }
        hightlight {
          vimeoUrl
          youtubeUrl
        }
        videoSample {
          vimeoUrl
          youtubeUrl
        }
      }
      florists_type {
        pricing {
          ...Pricing
        }
        servicePricing {
          ...ServicePricingsItems
        }
        personInfo {
          ...PersonInfoItems
        }
      }
      cakes_desserts_type {
        pricing {
          ...Pricing
        }
        servicePricing {
          ...ServicePricingsItems
        }
        personInfo {
          ...PersonInfoItems
        }
      }
    }
    searchLocations {
      cities {
        name
      }
      name
    }
    links {
      facebook
      instagram
      pinterest
      website
    }
    description
    address
    claps {
      name
      key
      values
    }
  }
}
    ${PricingFragmentDoc}
${PersonInfoItemsFragmentDoc}
${ServicePricingsItemsFragmentDoc}`;
export const VendorSearchDocument = gql`
    query VendorSearch($after: String, $searchQuery: String, $districtID: String, $vendorType: VendorType) {
  vendorSearchWithExtra(
    first: 12
    after: $after
    where: {districtID: $districtID, searchQuery: $searchQuery, vendorType: $vendorType}
  ) {
    district_key
    vendor_type
    district_id
    edges {
      cursor
      node {
        business_name
        business_name_slug
        id
        gallery_photos {
          id
          ht
          wd
        }
        vendor_type
        district_display_name
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
    }
  }
}
    `;
export const VendorLoginOtpDocument = gql`
    mutation vendorLoginOtp($phone: String!) {
  vendorLoginOtp(phone: $phone)
}
    `;
export const VendorLoginDocument = gql`
    mutation vendorLogin($phone: String!, $password: String!) {
  vendorLogin(phone: $phone, password: $password)
}
    `;
export const GetVendorProfileIdDocument = gql`
    query getVendorProfileId {
  vendorProfile {
    id
  }
}
    `;
export const GetVendorProfileDocument = gql`
    query getVendorProfile {
  vendorProfile {
    id
    firstName
    lastName
    email
    phone
    verified
  }
}
    `;
export const VendorLogoutDocument = gql`
    mutation vendorLogout {
  vendorLogout
}
    `;
export const IsVendorPhoneExistDocument = gql`
    query isVendorPhoneExist($phone: String!) {
  isVendorPhoneExist(phone: $phone)
}
    `;
export const VendorRegisterOtpDocument = gql`
    mutation vendorRegisterOtp($phone: String!) {
  vendorRegisterOtp(phone: $phone)
}
    `;
export const VendorRegisterDocument = gql`
    mutation vendorRegister($firstName: String!, $lastName: String!, $phone: String!, $password: String!, $authCode: String!) {
  vendorRegister(
    firstName: $firstName
    lastName: $lastName
    phone: $phone
    password: $password
    authCode: $authCode
  )
}
    `;
export const EditVendorDetailsDocument = gql`
    mutation editVendorDetails($businessName: String, $vendorType: VendorType, $address: String, $galleryPhotos: [GalleryPhotoInput!], $frequentQuestion: [FrequentQuestionInput!], $geo: GeoInput, $phone: String, $cityIds: [String!], $facebook: String, $pinterest: String, $instagram: String, $website: String, $claps: [ClapInput!], $description: String, $catererDetails: CatererDetailsInput, $photographerDetails: PhotographerDetailsInput, $venueDetails: VenueDetailsInput, $videographerDetails: VideographerDetailsInput, $bandDjsDetails: BandDjsDetailsInput, $beautyProfessionalsDetails: BeautyProfessionalDetailsInput, $cakesDessertsDetails: CakesDessertsDetailsInput, $floristsDetails: FloristsDetailsInput) {
  vendorEditDetails(
    data: {catererDetails: $catererDetails, photographerDetails: $photographerDetails, venueDetails: $venueDetails, videographerDetails: $videographerDetails, bandDjsDetails: $bandDjsDetails, beautyProfessionalDetails: $beautyProfessionalsDetails, cakesDessertsDetails: $cakesDessertsDetails, floristsDetails: $floristsDetails, businessName: $businessName, vendorType: $vendorType, address: $address, facebook: $facebook, gallery_photos: $galleryPhotos, frequentQuestion: $frequentQuestion, geo: $geo, instagram: $instagram, phone: $phone, pinterest: $pinterest, cityIDs: $cityIds, website: $website, claps: $claps, description: $description}
  )
}
    `;
export const GetVendorDetailsExtraDocument = gql`
    query getVendorDetailsExtra {
  vendorDetailsExtra {
    phone
    description
    address
    listingStatus
    reason
    isLive
    vendorTypes {
      caterer_type {
        pricing {
          min_price
          packages {
            name
            short
            min_price
            description
            price {
              name
              price_type
              fixed {
                price
              }
              range {
                from_price
                to_price
              }
              starting {
                price
              }
              unit
            }
          }
        }
        personInfo {
          name
          position
          person_photo {
            ht
            wd
            id
          }
        }
      }
      beauty_professionals_type {
        pricing {
          min_price
          packages {
            name
            short
            min_price
            description
            price {
              name
              price_type
              fixed {
                price
              }
              range {
                from_price
                to_price
              }
              starting {
                price
              }
              unit
            }
          }
        }
        personInfo {
          name
          position
          person_photo {
            ht
            wd
            id
          }
        }
      }
      venue_type {
        pricing {
          min_price
          packages {
            name
            short
            min_price
            description
            price {
              name
              price_type
              fixed {
                price
              }
              range {
                from_price
                to_price
              }
              starting {
                price
              }
              unit
            }
          }
        }
      }
      photographer_type {
        pricing {
          min_price
          packages {
            name
            short
            min_price
            description
            price {
              name
              price_type
              fixed {
                price
              }
              range {
                from_price
                to_price
              }
              starting {
                price
              }
              unit
            }
          }
        }
        personInfo {
          name
          position
          person_photo {
            ht
            wd
            id
          }
        }
      }
      videographer_type {
        pricing {
          min_price
          packages {
            name
            short
            min_price
            description
            price {
              name
              price_type
              fixed {
                price
              }
              range {
                from_price
                to_price
              }
              starting {
                price
              }
              unit
            }
          }
        }
        personInfo {
          name
          position
          person_photo {
            ht
            wd
            id
          }
        }
      }
      band_djs_type {
        pricing {
          min_price
          packages {
            name
            short
            min_price
            description
            price {
              name
              price_type
              fixed {
                price
              }
              range {
                from_price
                to_price
              }
              starting {
                price
              }
              unit
            }
          }
        }
        personInfo {
          name
          position
          person_photo {
            ht
            wd
            id
          }
        }
      }
      florists_type {
        pricing {
          min_price
          packages {
            name
            short
            min_price
            description
            price {
              name
              price_type
              fixed {
                price
              }
              range {
                from_price
                to_price
              }
              starting {
                price
              }
              unit
            }
          }
        }
        personInfo {
          name
          position
          person_photo {
            ht
            wd
            id
          }
        }
      }
      cakes_desserts_type {
        pricing {
          min_price
          packages {
            name
            short
            min_price
            description
            price {
              name
              price_type
              fixed {
                price
              }
              range {
                from_price
                to_price
              }
              starting {
                price
              }
              unit
            }
          }
        }
        personInfo {
          name
          position
          person_photo {
            ht
            wd
            id
          }
        }
      }
    }
    searchLocations {
      name
      key
      cities {
        name
        key
      }
    }
    geo {
      latitude
      longitude
    }
    frequent_questions {
      question
      answer
    }
    vendor_type
    links {
      facebook
      instagram
      pinterest
      website
    }
    business_name
    galleryPhoto {
      ht
      wd
      id
    }
    claps {
      name
      key
      values
    }
    isComplete
  }
}
    `;
export const GetInitialDataDocument = gql`
    query getInitialData {
  vendorDetailsExtra {
    business_name
    vendor_type
  }
}
    `;
export const GetDistrictsDocument = gql`
    query getDistricts {
  districts {
    id
    name
    key
    parent_id
  }
}
    `;
export const GetCitiesDocument = gql`
    query getCities($districtId: String!) {
  cities(districts_id: $districtId) {
    id
    name
    key
    parent_id
  }
}
    `;
export const GetClapStoreDocument = gql`
    query getClapStore($vendorType: VendorType!) {
  clapStore(vendorType: $vendorType) {
    name
    key
    values
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TopWeddingVendors(variables?: TopWeddingVendorsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TopWeddingVendorsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TopWeddingVendorsQuery>(TopWeddingVendorsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TopWeddingVendors');
    },
    Locations(variables?: LocationsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LocationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LocationsQuery>(LocationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Locations');
    },
    VendorDetailsB(variables: VendorDetailsBQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<VendorDetailsBQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<VendorDetailsBQuery>(VendorDetailsBDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'VendorDetailsB');
    },
    VendorSearch(variables?: VendorSearchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<VendorSearchQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<VendorSearchQuery>(VendorSearchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'VendorSearch');
    },
    vendorLoginOtp(variables: VendorLoginOtpMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<VendorLoginOtpMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<VendorLoginOtpMutation>(VendorLoginOtpDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'vendorLoginOtp');
    },
    vendorLogin(variables: VendorLoginMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<VendorLoginMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<VendorLoginMutation>(VendorLoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'vendorLogin');
    },
    getVendorProfileId(variables?: GetVendorProfileIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetVendorProfileIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetVendorProfileIdQuery>(GetVendorProfileIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getVendorProfileId');
    },
    getVendorProfile(variables?: GetVendorProfileQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetVendorProfileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetVendorProfileQuery>(GetVendorProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getVendorProfile');
    },
    vendorLogout(variables?: VendorLogoutMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<VendorLogoutMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<VendorLogoutMutation>(VendorLogoutDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'vendorLogout');
    },
    isVendorPhoneExist(variables: IsVendorPhoneExistQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<IsVendorPhoneExistQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<IsVendorPhoneExistQuery>(IsVendorPhoneExistDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'isVendorPhoneExist');
    },
    vendorRegisterOtp(variables: VendorRegisterOtpMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<VendorRegisterOtpMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<VendorRegisterOtpMutation>(VendorRegisterOtpDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'vendorRegisterOtp');
    },
    vendorRegister(variables: VendorRegisterMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<VendorRegisterMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<VendorRegisterMutation>(VendorRegisterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'vendorRegister');
    },
    editVendorDetails(variables?: EditVendorDetailsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<EditVendorDetailsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<EditVendorDetailsMutation>(EditVendorDetailsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'editVendorDetails');
    },
    getVendorDetailsExtra(variables?: GetVendorDetailsExtraQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetVendorDetailsExtraQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetVendorDetailsExtraQuery>(GetVendorDetailsExtraDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getVendorDetailsExtra');
    },
    getInitialData(variables?: GetInitialDataQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetInitialDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetInitialDataQuery>(GetInitialDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getInitialData');
    },
    getDistricts(variables?: GetDistrictsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetDistrictsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDistrictsQuery>(GetDistrictsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getDistricts');
    },
    getCities(variables: GetCitiesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCitiesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCitiesQuery>(GetCitiesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCities');
    },
    getClapStore(variables: GetClapStoreQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetClapStoreQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetClapStoreQuery>(GetClapStoreDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getClapStore');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export type SWRInfiniteKeyLoader<Data = unknown, Variables = unknown> = (
  index: number,
  previousPageData: Data | null
) => [keyof Variables, Variables[keyof Variables] | null] | null;
export function getSdkWithHooks(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  const sdk = getSdk(client, withWrapper);
  const utilsForInfinite = {
    generateGetKey: <Data = unknown, Variables = unknown>(
      id: any,
      getKey: SWRInfiniteKeyLoader<Data, Variables>
    ) => (pageIndex: number, previousData: Data | null) => {
      const key = getKey(pageIndex, previousData)
      return key ? [...key, ...id] : null
    },
    generateFetcher: <Query = unknown, Variables = unknown>(query: (variables: Variables) => Promise<Query>, variables?: Variables) => (
        fieldName: keyof Variables,
        fieldValue: Variables[typeof fieldName]
      ) => query({ ...variables, [fieldName]: fieldValue } as Variables)
  }
  const genKey = <V extends Record<string, unknown> = Record<string, unknown>>(name: string, object: V = {} as V): SWRKeyInterface => [name, ...Object.keys(object).sort().map(key => object[key])];
  return {
    ...sdk,
    useTopWeddingVendors(variables?: TopWeddingVendorsQueryVariables, config?: SWRConfigInterface<TopWeddingVendorsQuery, ClientError>) {
      return useSWR<TopWeddingVendorsQuery, ClientError>(genKey<TopWeddingVendorsQueryVariables>('TopWeddingVendors', variables), () => sdk.TopWeddingVendors(variables), config);
    },
    useLocations(variables?: LocationsQueryVariables, config?: SWRConfigInterface<LocationsQuery, ClientError>) {
      return useSWR<LocationsQuery, ClientError>(genKey<LocationsQueryVariables>('Locations', variables), () => sdk.Locations(variables), config);
    },
    useVendorDetailsB(variables: VendorDetailsBQueryVariables, config?: SWRConfigInterface<VendorDetailsBQuery, ClientError>) {
      return useSWR<VendorDetailsBQuery, ClientError>(genKey<VendorDetailsBQueryVariables>('VendorDetailsB', variables), () => sdk.VendorDetailsB(variables), config);
    },
    useVendorSearch(variables?: VendorSearchQueryVariables, config?: SWRConfigInterface<VendorSearchQuery, ClientError>) {
      return useSWR<VendorSearchQuery, ClientError>(genKey<VendorSearchQueryVariables>('VendorSearch', variables), () => sdk.VendorSearch(variables), config);
    },
    useVendorSearchInfinite(getKey: SWRInfiniteKeyLoader<VendorSearchQuery, VendorSearchQueryVariables>, variables?: VendorSearchQueryVariables, config?: SWRInfiniteConfigInterface<VendorSearchQuery, ClientError>) {
      return useSWRInfinite<VendorSearchQuery, ClientError>(
        utilsForInfinite.generateGetKey<VendorSearchQuery, VendorSearchQueryVariables>(genKey<VendorSearchQueryVariables>('VendorSearch', variables), getKey),
        utilsForInfinite.generateFetcher<VendorSearchQuery, VendorSearchQueryVariables>(sdk.VendorSearch, variables),
        config);
    },
    useGetVendorProfileId(variables?: GetVendorProfileIdQueryVariables, config?: SWRConfigInterface<GetVendorProfileIdQuery, ClientError>) {
      return useSWR<GetVendorProfileIdQuery, ClientError>(genKey<GetVendorProfileIdQueryVariables>('GetVendorProfileId', variables), () => sdk.getVendorProfileId(variables), config);
    },
    useGetVendorProfile(variables?: GetVendorProfileQueryVariables, config?: SWRConfigInterface<GetVendorProfileQuery, ClientError>) {
      return useSWR<GetVendorProfileQuery, ClientError>(genKey<GetVendorProfileQueryVariables>('GetVendorProfile', variables), () => sdk.getVendorProfile(variables), config);
    },
    useIsVendorPhoneExist(variables: IsVendorPhoneExistQueryVariables, config?: SWRConfigInterface<IsVendorPhoneExistQuery, ClientError>) {
      return useSWR<IsVendorPhoneExistQuery, ClientError>(genKey<IsVendorPhoneExistQueryVariables>('IsVendorPhoneExist', variables), () => sdk.isVendorPhoneExist(variables), config);
    },
    useGetVendorDetailsExtra(variables?: GetVendorDetailsExtraQueryVariables, config?: SWRConfigInterface<GetVendorDetailsExtraQuery, ClientError>) {
      return useSWR<GetVendorDetailsExtraQuery, ClientError>(genKey<GetVendorDetailsExtraQueryVariables>('GetVendorDetailsExtra', variables), () => sdk.getVendorDetailsExtra(variables), config);
    },
    useGetInitialData(variables?: GetInitialDataQueryVariables, config?: SWRConfigInterface<GetInitialDataQuery, ClientError>) {
      return useSWR<GetInitialDataQuery, ClientError>(genKey<GetInitialDataQueryVariables>('GetInitialData', variables), () => sdk.getInitialData(variables), config);
    },
    useGetDistricts(variables?: GetDistrictsQueryVariables, config?: SWRConfigInterface<GetDistrictsQuery, ClientError>) {
      return useSWR<GetDistrictsQuery, ClientError>(genKey<GetDistrictsQueryVariables>('GetDistricts', variables), () => sdk.getDistricts(variables), config);
    },
    useGetCities(variables: GetCitiesQueryVariables, config?: SWRConfigInterface<GetCitiesQuery, ClientError>) {
      return useSWR<GetCitiesQuery, ClientError>(genKey<GetCitiesQueryVariables>('GetCities', variables), () => sdk.getCities(variables), config);
    },
    useGetClapStore(variables: GetClapStoreQueryVariables, config?: SWRConfigInterface<GetClapStoreQuery, ClientError>) {
      return useSWR<GetClapStoreQuery, ClientError>(genKey<GetClapStoreQueryVariables>('GetClapStore', variables), () => sdk.getClapStore(variables), config);
    }
  };
}
export type SdkWithHooks = ReturnType<typeof getSdkWithHooks>;
