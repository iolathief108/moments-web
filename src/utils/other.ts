import { LocationsQuery, VendorType } from "../http/generated";
import { isDev } from "./pageUtils";


type LocalVendorTypes = {
    key: string;
    vendorType: VendorType;
    displayName: string;
    slug: string;
    slugPlural: string;
    headerText: string
    headerTextPlural: string;
}

export const localVendorTypes: LocalVendorTypes[] = [
    {
        key: "wedding-caterer",
        displayName: "Caterer",
        vendorType: VendorType.Caterer,
        slug: "catering",
        slugPlural: "caterings",
        headerText: "Catering",
        headerTextPlural: "Caterings"
    },
    {
        key: "wedding-venue",
        displayName: "Venue",
        vendorType: VendorType.Venue,
        slug: "venue",
        slugPlural: "venues-and-banquet-halls",
        headerText: "Venue, Banquet Hall",
        headerTextPlural: "Venues & Banquet Halls"
    },
    {
        key: "wedding-photographer",
        displayName: "Photographer",
        vendorType: VendorType.Photographer,
        slug: "photographer",
        slugPlural: "photographers",
        headerText: "Photographer",
        headerTextPlural: "Photographers"
    },
    {
        key: "wedding-videographer",
        displayName: "Videographer",
        vendorType: VendorType.Videographer,
        slug: "wedding-videographer",
        slugPlural: "videographers",
        headerText: "Videographer",
        headerTextPlural: "Videographers"
    },
    {
        key: "jewellery",
        displayName: "Jewelleries",
        vendorType: VendorType.Jewellery,
        slug: "jewellery-store",
        slugPlural: "jewellery-stores",
        headerText: "Jewellery Store",
        headerTextPlural: "Jewellery Stores"
    },
    // {
    //     key: "wedding-bands-dj",
    //     displayName: "Bands & DJs",
    //     vendorType: VendorType.BandsDj,
    //     slug: "wedding-bands-djs",
    //     headerText: "Bands and DJs",
    // },
    {
        key: "wedding-beauty-professionals",
        displayName: "Beauty Professionals",
        vendorType: VendorType.BeautyProfessional,
        slug: "hair-bridal-makeup-artist",
        slugPlural: "hair-bridal-makeup-artists",
        headerText: "Hair and Bridal Makeup Artist",
        headerTextPlural: "Hair and Bridal Makeup Artists"
    },
    {
        key: "wedding-cakes-desserts",
        displayName: "Cakes Desserts",
        vendorType: VendorType.CakesDessert,
        slug: "baker",
        slugPlural: "wedding-cakes-desserts",
        headerText: "Cake & Dessert, Baker",
        headerTextPlural: "Cakes & Desserts"
    },
    {
        key: "wedding-florists",
        displayName: "Florists",
        vendorType: VendorType.Florist,
        slug: "wedding-florist",
        slugPlural: "florists",
        headerText: "Florist",
        headerTextPlural: "Florists"
    }
];


export function getVendorTypeInfo(vType?: VendorType | null): LocalVendorTypes | null {
    return localVendorTypes.find(value => value.vendorType === vType) ?? null;
}

export function getDistrictId(l: LocationsQuery, key: string): string | null {
    for (const district of l.districts) {
        if (district.key === key) return district.id;
    }
    return null;
}

export function getImageUrl(
    ...args:
        | [string, boolean?]
        | [string, number, boolean?]
        | [string, number, number, boolean?]
        | [string, number, number, number, boolean?]
) {
    let urlStr = args[0];
    urlStr = "/p/" + urlStr;
    if (typeof args[1] === "number") {
        if (typeof args[2] === "number") {
            urlStr += "_" + args[1] + "x" + args[2];
            if (typeof args[3] === "number") {
                urlStr += "q" + args[3];
            }
        } else {
            urlStr += "q" + args[1];
        }
    }

    if (typeof args[args.length - 1] === "boolean") {
        if (args[args.length - 1]) {
            return urlStr + ".webp";
        }
    }
    return urlStr + ".jpg";
}

export function getCategoryUrl(cat: VendorType): string {
    return `/search/${getVendorTypeInfo(cat)?.slugPlural}`;
}

export function getProductUrl(businessName: string, vType: VendorType, vid?: string) {
    return `/wedding-vendors/${getVendorTypeInfo(vType)?.slug}/${businessName}?vid=${vid}`;
}

export function getPlaceholder(vType: VendorType): string {
    if (vType === VendorType.Venue) {
        return "Behind the Venue";
    }
    if (vType === VendorType.Photographer) {
        return "Behind the Photo";
    }
    if (vType === VendorType.Caterer) {
        return "Behind the Cook";
    }
    return "";
}

export function titleCase(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export function getBaseUrl() {
    if (isDev) {
        return "https://www.moments.lk";
        // return "";
    }
    return "";
}

export function getVendorTypeIcon(vType: VendorType) {
    switch (vType) {
        case VendorType.Jewellery:
            return "/images/cat/bands_dj.svg";
        case VendorType.Florist:
            return "/images/cat/bouquet.svg";
        case VendorType.Photographer:
            return "/images/cat/camera.svg";
        case VendorType.BeautyProfessional:
            return "/images/cat/hair_makeup.svg";
        case VendorType.Caterer:
            return "/images/cat/mixer.svg";
        case VendorType.Venue:
            return "/images/cat/venue.svg";
        case VendorType.Videographer:
            return "/images/cat/video.svg";
        case VendorType.CakesDessert:
            return "/images/cat/wedding_cake.svg";
    }
    return "/images/cat/wedding_cake.svg";
}






