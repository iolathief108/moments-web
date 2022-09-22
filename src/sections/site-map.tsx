import styled from "styled-components";
import { getBaseUrl, getCategoryUrl, getProductUrl, getVendorTypeInfo } from "../utils/other";
import { VendorType } from "../http/generated";
import {Link} from 'react-router-dom';
import sdk from "../http/sdk";
import { useParams } from "react-router-dom";
import { LinkWrap } from "../utils/link-wrap";


export function SiteMapContainer({ children }) {
    const Cont = styled.div`
      margin-top: 50px;
      margin-bottom: 150px;
      min-height: 450px;

      a {
        color: #005cbf;
        text-decoration: underline;
      }

    `;
    return (
        <Cont className={"container"}>
            {children}
        </Cont>
    );
}

export function SiteMapGenerator({ links }: { links: { name: string, link: string }[] }) {
    return (
        <ul>
            {
                links.map(value => <li><a href={value.link}>{value.name}</a></li>)
            }
        </ul>
    );
}

function linkify(link: string) {
    // return `${getBaseUrl()}${link}`
    return `${link}`;
}

function getSiteMapObjects() {
    return [
        { name: "Home", link: linkify("/") },
        {
            name: "All Vendors",
            link: linkify("/site-map/vendors")
        },
        {
            name: "Find Vendors",
            link: linkify("/search")
        },
        {
            name: getVendorTypeInfo(VendorType.CakesDessert).headerTextPlural,
            link: linkify(getCategoryUrl(VendorType.CakesDessert))
        },
        {
            name: getVendorTypeInfo(VendorType.Videographer).headerTextPlural,
            link: linkify(getCategoryUrl(VendorType.Videographer))
        },
        {
            name: getVendorTypeInfo(VendorType.Venue).headerTextPlural,
            link: linkify(getCategoryUrl(VendorType.Venue))
        },
        {
            name: getVendorTypeInfo(VendorType.Caterer).headerTextPlural,
            link: linkify(getCategoryUrl(VendorType.Caterer))
        },
        {
            name: getVendorTypeInfo(VendorType.BeautyProfessional).headerTextPlural,
            link: linkify(getCategoryUrl(VendorType.BeautyProfessional))
        },
        {
            name: getVendorTypeInfo(VendorType.Photographer).headerTextPlural,
            link: linkify(getCategoryUrl(VendorType.Photographer))
        },
        {
            name: getVendorTypeInfo(VendorType.Florist).headerTextPlural,
            link: linkify(getCategoryUrl(VendorType.Florist))
        },
        {
            name: getVendorTypeInfo(VendorType.Jewellery).headerTextPlural,
            link: linkify(getCategoryUrl(VendorType.Jewellery))
        }
    ];
}

export function SiteMap() {

    return (
        <SiteMapContainer>
            <h2>Site Map</h2>
            <SiteMapGenerator links={getSiteMapObjects()} />
        </SiteMapContainer>
    );
}

export function SiteMapVendors() {

    const param = useParams<{ id: string }>();
    const { data } = sdk.useVendorSearch({ after: param?.id || null });

    return (
        <SiteMapContainer>
            <h2>Site Map - Vendors</h2>
            <ul>
                {
                    data?.vendorSearchWithExtra.edges.map(value =>
                        <li>
                            <a href={getProductUrl(value.node.business_name_slug, value.node.vendor_type)}>{value.node.business_name}</a>
                        </li>
                    )
                }
            </ul>

            {
                data?.vendorSearchWithExtra.pageInfo.hasNextPage &&
                <Link to={`/site-map/vendors/${data?.vendorSearchWithExtra.pageInfo.endCursor}`}>Next - {data.vendorSearchWithExtra.pageInfo.endCursor}</Link>
            }
        </SiteMapContainer>
    );
}
