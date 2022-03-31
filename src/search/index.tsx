import { SearchInput } from "./sections/search-input";
import { SearchResult } from "./sections/search-result";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { VendorType } from "../http/generated";
import { searchState } from "../state";
import { getVendorTypeInfo } from "../utils/other";


export default () => {

    const [vType, setVType] = useState<VendorType | null>(searchState.getGlobalState("vendorType") || null);

    const getHeaderText = () => {
        if (vType) {
            let name = getVendorTypeInfo(vType).headerTextPlural
            return `Search for ${name} in Sri Lanka | Wedding Supplier in Sri Lanka - Moments.lk`
        }
        return "Search Wedding Vendors and Suppliers - Moments.lk"
    }

    return (
        <>
            <Helmet>
                <title>{getHeaderText()}</title>
            </Helmet>
            <SearchInput/>
            <SearchResult/>
        </>
    );
};
