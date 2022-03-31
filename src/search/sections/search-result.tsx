import {
    ConnectionNode,
    SWRInfiniteKeyLoader,
    VendorSearchQuery,
    VendorSearchQueryVariables
} from "../../http/generated";
import sdk from "../../http/sdk";
import { VendorCard } from "./vendor-card";
import { searchState } from "../../state";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { LoadingPage } from "../../comps/loading";
import { End } from "../comps/End";
import { Helmet } from "react-helmet";
import { getVendorTypeInfo } from "../../utils/other";
import styled from "styled-components";


const getKey: SWRInfiniteKeyLoader<VendorSearchQuery, VendorSearchQueryVariables> = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.vendorSearchWithExtra.pageInfo.hasNextPage)
        return null;
    if (!pageIndex) return ["after", previousPageData ? previousPageData.vendorSearchWithExtra.pageInfo.endCursor : ""];
    return [
        "after",
        previousPageData ? previousPageData.vendorSearchWithExtra.pageInfo.endCursor : ""
    ];
};

type ConNodesProps = {
    conNodes: ConnectionNode[]
}

type SearchResultProps = {
    initialData?: VendorSearchQuery[]
}

function ConnectionNodes(props: ConNodesProps) {

    const headerContainerEl = useRef(null);
    const [width, setWidth] = useState<any>();

    useEffect(() => {
        setTimeout(() => {
            if (headerContainerEl?.current?.offsetWidth) {
                setWidth(headerContainerEl.current.offsetWidth);
            }
        }, 100);

    }, [headerContainerEl]);

    const getHeight = () => {
        if (width && typeof width === "number") {

            let d = width / 3 - 25;
            if (width < 800) {
                d = width / 1 - 5;
            }
            let ddd = `${d * 0.65}px`;
            // console.log(ddd);
            return ddd;
        }
        return undefined;
    };

    return (
        <div className="content">
            <div className="container">
                <div ref={headerContainerEl} className="row">
                    {
                        !props.conNodes.length && <p className={"text-danger"}>No listing Available</p>
                    }
                    {props.conNodes.map((value, index) => (
                        <VendorCard key={index}
                                    photoUrl={value.gallery_photos[0]?.id || ""}
                                    vType={value.vendor_type}
                                    businessName={value.business_name}
                                    businessSlug={value.business_name_slug}
                                    districtDisplayName={value.district_display_name}
                                    vid={value.id}
                                    height={getHeight()}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export function SearchResult(props: SearchResultProps) {

    const [vType, setVType] = searchState.useGlobalState("vendorType");
    const [districtId, setDistrictId] = searchState.useGlobalState("districtId");

    const [, setVTypeSec] = searchState.useGlobalState("vTypeSec");
    const [, setDisIdSec] = searchState.useGlobalState("disKeySec");
    const [districtKey, setDisKey] = searchState.useGlobalState("districtKey");
    const param = useParams<{ id?: string; }>();
    const [id, setId] = useState(typeof param.id === "string" ? param.id : undefined);

    const locHook = sdk.useLocations();
    const location = useLocation();


    useEffect(() => {
        return () => {
            setVType(null);
            setDistrictId(null);
            setDisIdSec(null);
            setVTypeSec(null);
            searchState.setGlobalState("districtKey", null);
        };
    }, []);

    useEffect(() => {
        let no = false;
        setTimeout(() => {
            if (no) return;
            setId(param.id || "");
            if (!param.id) {
                setVType(undefined);
                setDistrictId(undefined);
            }
        }, 45);
        return () => {
            no = true;
        };
    }, [location]);

    const { data, size, setSize, isValidating } = sdk.useVendorSearchInfinite(getKey, {
        vendorType: undefined,
        districtID: undefined,
        searchQuery: id?.replace("jewellery", "band") || ""
    }, {
        // initialData: props.initialData,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateAll: false
    });

    useEffect(() => {
        if (!param.id) {
            // console.log('changed');
            setVTypeSec(undefined);
            setVType(undefined);
            setDisIdSec(undefined);
        } else {

            if (data && data[0].vendorSearchWithExtra.vendor_type) {
                setVType(data[0].vendorSearchWithExtra.vendor_type);
                setVTypeSec(data[0].vendorSearchWithExtra.vendor_type);
            }

            if (data && data[0].vendorSearchWithExtra.district_key) {
                setDisIdSec(data[0].vendorSearchWithExtra.district_key);
                setDisKey(data[0].vendorSearchWithExtra.district_key);
            }
        }
        // if (!vType && !districtId && param.id) {
        //     if (data && data[0].vendorSearchWithExtra.vendor_type) {
        //         console.log(data[0].vendorSearchWithExtra.vendor_type);
        //         setVType(data[0].vendorSearchWithExtra.vendor_type);
        //         setVTypeSec(data[0].vendorSearchWithExtra.vendor_type);
        //     }
        //
        //     if (data && data[0].vendorSearchWithExtra.district_key) {
        //         setDisIdSec(data[0].vendorSearchWithExtra.district_key);
        //         setDisKey(data[0].vendorSearchWithExtra.district_key);
        //     }
        // }
    }, [data]);

    // const { data, size, setSize, isValidating } = sdk.useVendorSearchInfinite(getKey, {
    //     vendorType: vType,
    //     districtID: districtId,
    //     searchQuery: id || ""
    // }, {
    //     initialData: props.initialData
    // });
    const isDisable = () => {
        if (!data) return false;
        return !data[data?.length - 1]?.vendorSearchWithExtra.pageInfo.hasNextPage;
    };

    const getConNodes = () => {
        let conNodes: ConnectionNode[] = [];
        data?.forEach((value) => (
            value.vendorSearchWithExtra.edges.forEach((value) => {
                conNodes.push(value.node);
            }))
        );
        return conNodes;
    };

    if (!data) return <LoadingPage />;

    const getHeaderText = () => {
        let name;
        let district;
        if (vType) {
            name = getVendorTypeInfo(vType).headerTextPlural;
        }
        if (districtKey) {
            locHook?.data?.districts.forEach(v => {
                if (v.key === districtKey) {
                    district = v.name;
                }
            });
        }

        let header = `${name ? `${name}` : "Wedding Vendors & Suppliers"}${district ? ` in ${district}, Sri Lanka` : " in Sri Lanka - Moments.lk"}`;
        return header;
    };

    const getTitleText = () => {
        let name;
        let district;
        if (vType) {
            name = getVendorTypeInfo(vType).headerTextPlural;
        }
        if (districtKey) {
            locHook?.data?.districts.forEach(v => {
                if (v.key === districtKey) {
                    district = v.name;
                }
            });
        }

        let header = `${name ? `${name}` : "Wedding Vendors & Suppliers"}${district ? ` in ${district}, Sri Lanka` : " in Sri Lanka"}`;
        return header;
    };

    const Title = styled.h1`
      font-family: poynter-oldstyle-display, serif;
      font-size: 32px;
      font-weight: 500;
      margin-top: 0.48em;
      margin-bottom: 18px;
      color: #21201f;
    `;

    return (
        <>
            <Helmet>
                <title>{getHeaderText()}</title>
            </Helmet>
            <div style={{ paddingBottom: "15px" }} className="content">
                <div className="container">
                    <Title>{getTitleText()}</Title>
                </div>
            </div>
            <ConnectionNodes conNodes={getConNodes()} />
            <div className={"container"}>
                {
                    !!getConNodes().length && !isDisable() && getConNodes().length < 20 &&
                    <div className={"row"} style={{
                        // marginTop: getWindowDimensions().width > 768 ? -90 : -10,
                    }}>
                        <div style={{ display: (isDisable() && getConNodes().length < 20) ? "none" : null }}
                             className={"col pb-5 justify-content-center text-center"}>
                            <button className={"btn btn-primary"} disabled={isDisable() || isValidating}
                                    onClick={() => setSize(size + 1)}>Load More
                            </button>
                        </div>
                    </div>
                }
                {
                    (isDisable() && getConNodes().length < 20) &&
                    <End />
                }
            </div>
        </>
    );
}
