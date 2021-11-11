import { PackageObject, PriceObject, PriceType, Spp, VendorDetailsBQuery, VendorType } from "../../http/generated";
import styled from "styled-components";


export default function SppView({ data }: { data: VendorDetailsBQuery }) {

    return (
        <div>
            {
                data.vendorDetailsB.vendor_type === VendorType.BeautyProfessional &&
                PackageContainer(data.vendorDetailsB.vendorTypes.beauty_professionals_type.pricing, data.vendorDetailsB.business_name)
            }
            {
                data.vendorDetailsB.vendor_type === VendorType.Photographer &&
                PackageContainer(data.vendorDetailsB.vendorTypes.photographer_type.pricing, data.vendorDetailsB.business_name)
            }
            {
                data.vendorDetailsB.vendor_type === VendorType.Caterer &&
                PackageContainer(data.vendorDetailsB.vendorTypes.caterer_type.pricing, data.vendorDetailsB.business_name)
            }
            {
                data.vendorDetailsB.vendor_type === VendorType.Videographer &&
                PackageContainer(data.vendorDetailsB.vendorTypes.videographer_type.pricing, data.vendorDetailsB.business_name)
            }
            {
                data.vendorDetailsB.vendor_type === VendorType.BandsDj &&
                PackageContainer(data.vendorDetailsB.vendorTypes.band_djs_type.pricing, data.vendorDetailsB.business_name)
            }
            {
                data.vendorDetailsB.vendor_type === VendorType.Florist &&
                PackageContainer(data.vendorDetailsB.vendorTypes.florists_type.pricing, data.vendorDetailsB.business_name)
            }
            {
                data.vendorDetailsB.vendor_type === VendorType.CakesDessert &&
                PackageContainer(data.vendorDetailsB.vendorTypes.cakes_desserts_type.pricing, data.vendorDetailsB.business_name)
            }
            {
                data.vendorDetailsB.vendor_type === VendorType.Venue &&
                PackageContainer(data.vendorDetailsB.vendorTypes.venue_type.pricing, data.vendorDetailsB.business_name, data.vendorDetailsB.vendor_type)
            }
        </div>
    );
}

const priceRow = (sppPrice: PriceObject, packageObject: PackageObject) => {
    const Container = styled.div`
      font-weight: 400;
      //color: #000a;
      .pricing.lg {
        font-size: 1.2rem;
        color: #000c;
        margin-top: 5px;
        display: inline-block;
      }
    `;

    const isName = () => sppPrice.name && sppPrice.name !== "-" && sppPrice.name.length > 2;
    const Space = (<>&nbsp;&nbsp;</>);

    const Fixed = () => {
        if (packageObject.price.length === 1 && !isName()) {
            return (
                <span
                    // className={"pricing lg"}>රු {sppPrice.fixed.price.toLocaleString()}/= {sppPrice.unit}</span>
                    className={"pricing lg"}>Rs. {sppPrice.fixed.price.toLocaleString()}/= {sppPrice.unit}</span>
            );
        }
        return (
            <span
                className={"pricing"}>{!isName() && "Pricing"} at {sppPrice.fixed.price.toLocaleString()}/= {sppPrice.unit}</span>
        );
    };
    /*
    * රු
    * */
    return (
        <Container>
            <p>
                {
                    isName() &&
                    <span className={"name"}>{sppPrice.name} {" "}</span>
                }
                {
                    sppPrice.price_type === PriceType.Starting &&
                    <span
                        className={"pricing"}>{isName()} Pricing start at {sppPrice.starting.price.toLocaleString()}/= {sppPrice.unit}</span>
                }
                {
                    sppPrice.price_type === PriceType.Fixed &&
                    <Fixed />
                }
                {
                    sppPrice.price_type === PriceType.Range &&
                    <span
                        className={"pricing"}> at {Space}රු {sppPrice.range.from_price.toLocaleString()} - {sppPrice.range.to_price.toLocaleString()}/= {sppPrice.unit}</span>
                }
            </p>
        </Container>
    );
};

const Package = (sppPackage: PackageObject) => {
    const Container = styled.div`
      //box-shadow: rgb(0 0 0 / 10%) 1px 2px 5px 0px;
      max-width: 400px;
      min-width: 350px;
      min-height: 300px;
      border: 1px solid #0002;
      border-radius: 2px;

      & > .name {
        font-family: Serif;
        margin-bottom: 0;
      }

      & > .short {
        color: #000b;
        //color: #0008;
        //font-weight: 500;
      }

      & > .prices {
        margin-top: ${sppPackage.short ? "12px" : "8px"};
      }

      .dsc {
        color: #000000aa;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .dsc-title {
        margin-top: 20px;
        font-weight: bold;
        margin-bottom: 0;
      }
    `;

    return (
        <Container className={"p-2 mb-4 mr-4 p-4 pr-5"}>
            <h4 className={"name"}>{sppPackage.name}</h4>
            {
                sppPackage.short &&
                <div className={"short"}>{sppPackage.short}</div>
            }
            {
                !!sppPackage.min_price &&
                !sppPackage?.price?.length &&
                <div className={"min"}>Minimum Spend Rs.{sppPackage.min_price.toLocaleString()}</div>
            }
            <div className={"prices"}>
                {sppPackage.price.map((value, index) => <div key={index}>{priceRow(value, sppPackage)}</div>)}
            </div>
            <div className={"dsc-title"}>Description</div>
            {
                sppPackage.description &&
                <div className={"dsc"}
                     dangerouslySetInnerHTML={{ __html: sppPackage.description.replaceAll("\n", "<br/>") }} />
            }
        </Container>
    );
};

const PackageContainer = (pricing: Spp, name: string, vType?: VendorType) => {
    const Title = styled.h1`
      font-family: serif;
      margin-bottom: 27px;
      @media (max-width: 767px) {
        text-align: center;
      }
    `;

    if (!pricing?.packages?.length) {
        return null;
    }
    return (
        <div style={{ marginTop: 10 }}>
            <div className={"container"}>
                <div className="row">
                    <div className="col-sm-12">
                        <Title>
                            {name}{vType === VendorType.Venue && " Venue"} Packages
                        </Title>
                        <div className={"d-flex flex-wrap"}>
                            {
                                pricing.packages.map(((value, index) => (
                                    <div key={index}>{Package(value)}</div>
                                )))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
