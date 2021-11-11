import { Link, useLocation, useParams } from "react-router-dom";
import sdk from "../http/sdk";
import { VendorIntro } from "./sections/vendor-intro";
import { Faqs } from "./sections/faqs";
import { OverviewSection } from "./sections/overview-section";
import { GallerySection } from "./sections/gallery-section";
import { ContactBottom } from "./sections/contact-bottom";
import { VendorDetailsBQuery, VendorType } from "../http/generated";
import { getCategoryUrl, getVendorTypeInfo } from "../utils/other";
import SppView from "./sections/spp";
import { isMobile } from "react-device-detect";
import * as queryString from "querystring";
import { LoadingPage } from "../comps/loading";
import { Highlight } from "./sections/highlight";
import { VideoGallery } from "./sections/video-gallery";
import { PopupGlobal } from "./sections/PopupGlobal";


type Props = {
    data: VendorDetailsBQuery
}

function Breadcrumb(
    props: Props
) {
    return (
        <div>
            <div className={"container"}>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb" style={{
                        backgroundColor: "transparent",
                        paddingLeft: 0
                    }}>
                        <li className="breadcrumb-item">
                            <Link to={"/search"}>
                                Wedding Vendors
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link
                                to={props.data.vendorDetailsB?.vendor_type ? getCategoryUrl(props.data.vendorDetailsB?.vendor_type) : "/search"}>
                                {getVendorTypeInfo(props.data.vendorDetailsB?.vendor_type)?.displayName}
                            </Link>
                        </li>
                        {
                            <li className="breadcrumb-item active"
                                aria-current="page">{props.data.vendorDetailsB?.business_name}
                                {
                                    props.data.vendorDetailsB?.vendor_type === VendorType.Venue && ' Venue'
                                }
                            </li>
                        }
                    </ol>
                </nav>
            </div>
        </div>
    );
}

export default function WeddingVendor() {

    let param = useParams<{ id: string }>();

    const name = param.id as any;


    let his = useLocation();
    const getThat = () => queryString.parse(his.search);
    const vid = getThat().vid as any;

    const { data } = sdk.useVendorDetailsB({
        businessName: name || "",
        vid: vid || null
    });

    if (!data) {
        return <LoadingPage />;
    }
    if (!data?.vendorDetailsB) {
        // return (
        //     <NotFound/>
        // )
        return (
            <div>Oh dear, this link isn't working.</div>
        );
    }

    return (
        <>
            {
                !isMobile &&
                <Breadcrumb data={data} />
            }
            <OverviewSection data={data} />
            {
                (data.vendorDetailsB.vendor_type === VendorType.BandsDj ||
                    data.vendorDetailsB.vendor_type === VendorType.Videographer) &&
                <Highlight data={data} />
            }
            {
                data.vendorDetailsB.vendor_type === VendorType.BandsDj &&
                <VideoGallery data={data} />
            }
            {
                (data.vendorDetailsB.vendor_type !== VendorType.BandsDj && data.vendorDetailsB.vendor_type !== VendorType.Videographer) &&
                <GallerySection data={data} />
            }
            {
                (data.vendorDetailsB.vendor_type === VendorType.Venue
                ) &&
                <Highlight data={data} />
            }
            <VendorIntro data={data} />
            {
                data.vendorDetailsB.vendor_type === VendorType.Videographer &&
                <VideoGallery data={data} />
            }
            {
                data.vendorDetailsB.vendor_type === VendorType.BandsDj &&
                <GallerySection data={data} />
            }
            <SppView data={data} />
            <Faqs data={data} />
            <ContactBottom data={data} />
            <PopupGlobal data={data}/>
        </>
    );
}

