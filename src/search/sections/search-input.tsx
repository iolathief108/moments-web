import SelectSearch, { fuzzySearch } from "react-select-search/dist/cjs";
import { getDistrictId, getVendorTypeInfo, localVendorTypes } from "../../utils/other";
import sdk from "../../http/sdk";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { VendorType } from "../../http/generated";
import { useEffect, useState } from "react";
import { searchState } from "../../state";
import { SearchView } from "../../comps/SearchView";
import styled from "styled-components";


export function SearchInput() {

    const locHook = sdk.useLocations();

    const [vTypeG, setVTypeG] = searchState.useGlobalState("vendorType");
    const [districtKey, setDistrictKey] = searchState.useGlobalState("districtKey");

    const [vendorTypeLocal, setVendorTypeLocal] = useState<VendorType | null>(searchState.getGlobalState("vendorType") || null);
    const [districtKeyLocal, setDistrictKeyLocal] = useState<string>(searchState.getGlobalState("districtKey") || "");

    const [vTypeSec, setVTypeSec] = searchState.useGlobalState("vTypeSec");
    const location = useLocation();

    const param = useParams<{ id?: string; }>(); // param.id === wedding-venue--colombo-1-15

    useEffect(() => {
        if (!param.id) {
            setDistrictKeyLocal(undefined);
            setVendorTypeLocal(undefined);
        } else {
            setDistrictKeyLocal(locHook.data?.districts.length ? searchState.getGlobalState("districtKey") || "" : "");
            setVendorTypeLocal(searchState.getGlobalState("vendorType") || null);
        }
    }, [location, vTypeG, districtKey]);

    const router = useHistory();

    async function onSearchClick() {

        let searchString: string = getVendorTypeInfo(vendorTypeLocal)?.slugPlural || "";
        searchString = searchString + (searchString && districtKeyLocal ? "--" + districtKeyLocal : "");
        if (!searchString)
            searchString = searchString || districtKeyLocal || "";

        if (vTypeG) {
            searchState.setGlobalState("vendorType", vendorTypeLocal);
        }
        if (districtKey && locHook.data) {
            searchState.setGlobalState("districtKey", districtKeyLocal);
        }

        await router.push("/search/" + searchString);
    }

    const Line = styled.div`
      @media (min-width: 767px) {
        width: 70%;
      }
      border-bottom: 2px #e6e5e7 solid;
      margin-top: 20px;
    `;

    const ModP = styled.p`
      color: #767676;
      font-weight: 500;
      margin-left: 3px;
      margin-bottom: 8px;
    `

    return (
        <div className="filter-form" style={{
            padding: "20px",
            paddingBottom: '5px'
        }}>
            <div className="container">
                <div style={{ maxWidth: "750px" }}>
                    <ModP>Search Our Pre-Screened Vendors</ModP>
                    <SearchView
                        onClick={onSearchClick}
                        districts={locHook.data?.districts}
                        vType={vendorTypeLocal}
                        districtKey={districtKeyLocal}
                        setDistrictKey={setDistrictKeyLocal}
                        setVType={setVendorTypeLocal}
                    />
                </div>
                <Line />
            </div>
        </div>
    );
}
