import { Carousel } from "../common/carousel";
import { commonState, searchState } from "../../state";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import sdk from "../../http/sdk";
import { getDistrictId, getVendorTypeInfo, localVendorTypes } from "../../utils/other";


import SelectSearch, { fuzzySearch } from "react-select-search/dist/cjs";
import { VendorType } from "../../http/generated";
import "react-select-search/style.css";
import styled from "styled-components";
import { SearchView } from "../../comps/SearchView";


const SearchThing = () => {
    const [vType, setVType] = useState<VendorType | null>(null);
    const locHook = sdk.useLocations();
    const [districtKey, setDistrictKey] = useState<string>("");

    const router = useHistory();

    async function onSearchClick() {
        let searchString: string = getVendorTypeInfo(vType)?.key ?? "";
        searchString = searchString + (districtKey ? (vType ? "--" : "" + districtKey) : "");
        if (vType)
            searchState.setGlobalState("vendorType", vType);
        else
            searchState.setGlobalState("vendorType", null);

        if (districtKey && locHook.data) {
            searchState.setGlobalState("districtKey", districtKey);
            searchState.setGlobalState("districtId", getDistrictId(locHook.data, districtKey));
        } else {
            searchState.setGlobalState("districtKey", null);
            searchState.setGlobalState("districtId", null);
        }
        await router.push("/search/" + searchString);
    }

    return (
        <div className="search-form mx-2"
             style={{ maxWidth: "750px", backgroundColor: "transparent", margin: "unset" }}>
            <div className="row justify-content-left">
                <SearchView vType={vType} onClick={onSearchClick} districtKey={districtKey}
                            setDistrictKey={setDistrictKey} districts={locHook.data?.districts} setVType={setVType} />
                {/*<div className="mb-2 mb-1 col-12">*/}
                {/*    <SelectSearch*/}
                {/*        options={localVendorTypes.map(value => ({*/}
                {/*            name: value.displayName.replace("Wedding", ""),*/}
                {/*            value: value.vendorType*/}
                {/*        })) || []}*/}
                {/*        value={vType || undefined}*/}
                {/*        onChange={(v: any) => setVType(v)}*/}
                {/*        filterOptions={fuzzySearch}*/}
                {/*        placeholder="Photographers, Hotels & More."*/}
                {/*        search={true}*/}
                {/*    />*/}
                {/*</div>*/}
                {/*<div className="mb-2 mb-1 col-12">*/}
                {/*    <SelectSearch*/}
                {/*        options={locHook.data?.districts?.map(value => ({*/}
                {/*            name: value.name,*/}
                {/*            value: value.key*/}
                {/*        })) || []}*/}
                {/*        filterOptions={fuzzySearch}*/}
                {/*        onChange={(v: any) => setDistrictKey(v)}*/}
                {/*        value={districtKey}*/}
                {/*        placeholder="Colombo, Gampaha & Many location"*/}
                {/*        search={true}*/}
                {/*    />*/}
                {/*</div>*/}
                {/*<div className="mb-2 mb-1 col-12">*/}
                {/*    <button className="p-0 btn btn-default btn-block py-1" style={{ height: "100%", width: "100%" }}*/}
                {/*            onClick={onSearchClick}>Search*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

const SideText = () => {
    const [isMobile] = commonState.useGlobalState("isMobile");

    const Container = styled.div`
      @media (max-width: 767px) {
        max-width: 480px;
        margin: auto;
        padding-left: 10px;
        padding-right: 10px;
      }

      h3 {
        font-size: 32px;
        font-weight: 200;
        margin-bottom: 25px;
      }

      p {
        font-size: 20px;
        margin-bottom: 24px;
        color: #21201f;
        font-family: proxima-nova, Helvetica, Arial, sans-serif;
      }

      .search {
        display: none;
        @media (max-width: 767px) {
          display: block;
        }
      }

      > a {
        @media (max-width: 767px) {
          display: none;
        }
      }
    `;

    return (
        <Container className={isMobile ? "text-center text-md-left pr-xl-2" : "pl-xl-5"}
                   style={{ maxWidth: "480px", margin: "auto" }}>
            <h3 className={"serif h-75 mb-3"}>Your Stress-Free Vendor Search</h3>
            {
                isMobile &&
                <p>We’ll help you find vendors for your location, style, and more — all pre-screened to save you
                    time.</p>
            }
            {
                !isMobile &&
                <>
                    <p style={{marginBottom: '10px'}}>
                        {/*There is a moment in everyone’s life which is very close to the heart and unforgettable.*/}
                        The day you feel you are the most important person, is not only because you are
                        getting married, but also because you are going to be bound to each other for the rest of your
                        life.

                        {/*The day when the you feel the most important human on this planet*/}
                        {/*not only because you are just going to marry but you are going to bind each other to a*/}
                        {/*lifetime commitments.*/}
                    </p>
                    <p>We’ll help you find vendors for your location, style, and more — all pre-screened to save you
                        time.</p>
                    {/*<p>*/}
                    {/*    Moments.lk making easy to search all your wedding suppliers under our website.*/}
                    {/*</p>*/}
                </>
            }
            <div className={"search"}>
                <SearchThing />
            </div>
            <Link to="/search">
                <a className="ctaButton__LPaQx primary-button v2-button">Find Vendors in
                    Your
                    Area</a>
            </Link>
        </Container>
    );

};

const CarWrap = () => {

    const [isMobile] = commonState.useGlobalState("isMobile");

    const heroImageUrls = [
        "/images/hero/hero (1).jpg",
        "/images/hero/hero (2).jpg",
        "/images/hero/hero (3).jpg",
        "/images/hero/hero (4).jpg",
        "/images/hero/hero (5).jpg",
        "/images/hero/hero (6).jpg"
    ];

    const mobileThing = [
        "/images/hero/hero (1).jpg",
        "/images/hero/hero (2).jpg",
        "/images/hero/hero (3).jpg",
        "/images/hero/hero (4).jpg"
    ];

    if (isMobile === undefined) return null;

    return (
        <Carousel urls={isMobile ? mobileThing : heroImageUrls} />
    );
};

const HeroMobile = () => {
    return (
        <div className={"mb-5 mb-md-0"}>
            <div className={"row"}>
                <div className={"col-12 col-md-6 col-lg-8"}>
                    <CarWrap />
                </div>
                <div className={"mt-4 col-12 col-md-6 col-lg-4"}>
                    <SideText />
                </div>
            </div>
        </div>
    );
};

export function Hero() {

    const [isMobile] = commonState.useGlobalState("isMobile");


    if (isMobile === undefined)
        return null;

    if (!isMobile)
        return (
            <span>
                <div className={"row"}>
                    <div className={"col-12 col-md-6 col-lg-5 col-xl-4 p-4 px-sm-5 px-xl-2 pt-xl-5 pr-md-2"}>
                        <SideText />
                    </div>
                    <div className={"col-12 col-md-6 col-lg-7 col-xl-8"}>
                        <CarWrap />
                    </div>
                </div>
            </span>
        );

    return (
        <HeroMobile />
    );
    return null;
}
