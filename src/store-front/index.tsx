import { Link, useLocation, useParams } from "react-router-dom";
import sdk from "../http/sdk";
import { VendorIntro } from "./sections/vendor-intro";
import { Faqs } from "./sections/faqs";
import { OverviewSection } from "./sections/overview-section";
import { GallerySection } from "./sections/gallery-section";
import { ContactBottom } from "./sections/contact-bottom";
import { ContactPopup } from "./sections/contact-popup";
import { contactPopupState } from "../state";
import { VendorDetailsBQuery } from "../http/generated";
import { getCategoryUrl, getVendorTypeInfo } from "../utils/other";
import SppView from "./sections/spp";
import { isMobile } from "react-device-detect";
import * as queryString from "querystring";


type Props = {
    data: VendorDetailsBQuery
}

function Breadcrumb(
    props: Props
) {
    return (
        <div>
            <div className={'container'}>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb" style={{
                        backgroundColor: 'transparent',
                        paddingLeft: 0,
                    }}>
                        <li className="breadcrumb-item">
                            <Link to={'/search'}>
                                Wedding Vendors
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={props.data.vendorDetailsB?.vendor_type ? getCategoryUrl(props.data.vendorDetailsB?.vendor_type) : '/search'}>
                                {getVendorTypeInfo(props.data.vendorDetailsB?.vendor_type)?.displayName}
                            </Link>
                        </li>
                        {
                            <li className="breadcrumb-item active" aria-current="page">{props.data.vendorDetailsB?.business_name}</li>
                        }
                    </ol>
                </nav>
            </div>
        </div>
    );
}

export default function WeddingVendor() {

    const [popupActive] = contactPopupState.useGlobalState('contactPopupActive');

    let param = useParams<{ id: string}>();

    const name = param.id as any;



    let his = useLocation();
    const getThat = () => queryString.parse(his.search);
    const vid = getThat().vid as any;


    const {data} = sdk.useVendorDetailsB({
        businessName: name || '',
        vid: vid || null,
    });

    if (!data?.vendorDetailsB) {
        return <div>Oh dear, this link isn't working.</div>;
    }

    return (
        <>
            {
                !isMobile &&
                <Breadcrumb data={data}/>
            }
            <OverviewSection data={data}/>
            <GallerySection data={data}/>
            {popupActive ? <ContactPopup data={data}/> : null}
            <VendorIntro data={data}/>
            <Faqs data={data}/>
            <SppView data={data}/>
            <ContactBottom data={data}/>
        </>
    );
}

