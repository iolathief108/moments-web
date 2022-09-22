import { ServicePriceType, ServicePricing, VendorDetailsBQuery, VendorType } from "../../http/generated";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import { getVendorTypeInfo } from "../../utils/other";
import { contactPopupState } from "../../state";
import styled from "styled-components";


const Inquiry = styled.div`
  max-width: 350px;
  margin-top: -20px;
  margin-left: auto;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 rgb(0 0 0 / 10%);
  text-align: center;
  padding: 20px;
`;
const OverviewButton = styled.button`
  height: 44px;
  border: 1px solid transparent;
  text-align: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
  font-family: proxima-nova, Helvetica, Arial, sans-serif;
  padding-left: 16px;
  padding-right: 16px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  box-shadow: 0 0 8px 0 rgb(0 59 88 / 10%);
  width: 100%;
  background-color: #003b58;
  color: #fff;
`;

function getPrice(price: number, option?: { noSlash?: boolean, noRs?: boolean }) {
    let dd = "";
    if (!option?.noRs) {
        dd += "Rs.";
        // return "Rs." + price.toLocaleString();
    }
    dd += price.toLocaleString();
    if (!option?.noSlash) {
        dd += "/=";
    }
    return dd;
    // return "Rs." + price.toLocaleString() + "/=";
    // return 'Rs.' + price + 'Rs'
}

function testFunction(duma: ServicePricing, _?: VendorType) {
    let thing = "";
    for (let i = 0; i < duma.service_prices.length; i++) {
        const sp = duma.service_prices[i];

        if (thing && !thing.endsWith(" "))
            thing += " ";
        if (sp.product)
            thing += sp.product;
        else {
            if (!thing) {
                thing += "Pricing";
            }
        }

        switch (sp.price_type) {
            case ServicePriceType.Fixed:
                thing += (thing ? " " : "") + "at " + getPrice(sp.fixed.price);
                break;
            case ServicePriceType.Starting:
                thing += (thing ? " " : "") + "starts at " + getPrice(sp.starting.price);
                break;
            case ServicePriceType.Range:
                if (i !== 0)
                    thing += (thing ? " " : "");
                if (i === 0 || sp.product) thing += " at ";
                thing += "Rs " + getPrice(sp.range.from_price, {
                    noSlash: true,
                    noRs: true
                }) + " - " + getPrice(sp.range.to_price, { noRs: true, noSlash: true });
                break;
        }
        if (sp.unit) {
            thing += " per " + sp.unit.toLowerCase();
        }
        if (sp.class) {
            thing += " for " + sp.class.toLowerCase();
        }
        if ((i + 1) < duma.service_prices.length) {
            thing += " and";
        }
    }
    if (duma.min_spend) {
        thing += ".";
        thing += " The minimum spend is " + getPrice(duma.min_spend) + " Total.";
    }
    thing = thing.replace(/ +/g, " ");
    return thing;
}

const getServicePricing = (vDetails: VendorDetailsBQuery): ServicePricing[] => {

    if (!vDetails.vendorDetailsB || !vDetails.vendorDetailsB.vendor_type) return [];
    switch (vDetails.vendorDetailsB.vendor_type) {
        case VendorType.Videographer:
            return vDetails.vendorDetailsB.vendorTypes.videographer_type?.servicePricing?.pricings;
        case VendorType.Jewellery:
            return vDetails.vendorDetailsB.vendorTypes.band_djs_type?.servicePricing?.pricings;
        case VendorType.Photographer:
            return vDetails.vendorDetailsB.vendorTypes.photographer_type?.servicePricing?.pricings;
        case VendorType.Venue:
            return vDetails.vendorDetailsB.vendorTypes.venue_type?.servicePricing?.pricings;
        case VendorType.Florist:
            return vDetails.vendorDetailsB.vendorTypes.florists_type?.servicePricing?.pricings;
        case VendorType.Caterer:
            return vDetails.vendorDetailsB.vendorTypes.caterer_type?.servicePricing?.pricings;
        case VendorType.CakesDessert:
            return vDetails.vendorDetailsB.vendorTypes.cakes_desserts_type?.servicePricing?.pricings;
        case VendorType.BeautyProfessional:
            return vDetails.vendorDetailsB.vendorTypes.beauty_professionals_type?.servicePricing?.pricings;
    }
    return [];
};
const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
  margin-bottom: 8px;
  @media(max-width: 767px) {
    margin-bottom: 5px;
  }
  i {
    width: 25px;
  }
`;
const Text = styled.div`
  font-size: 17px;
  font-weight: 400;
  //line-height: 22px;
  line-height: 23px;
  margin-left: 6px;
  color: #5b5b5b;
  @media(max-width: 767px) {
    font-family: sans-serif;
  }
`;


const ServicePricingComp = ({ s, i }: { s: ServicePricing, i: number }) => {

    const Icon = () => {
        if (s.name.toLowerCase().includes("full wedding"))
            return <i className={"moments-icon-two-hearts"} />;
        return <i className={"moments-icon-dollar-sign"} />;
    };

    return (
        <div style={{ marginTop: i !== 0 ? "26px" : "auto" }}>
            <Title><Icon /> {s.name}</Title>
            <Text>{testFunction(s)}</Text>
        </div>
    );
};

const GuestCapacityComp = ({ s, i }: { s: number, i: number }) => {
    // const Title = styled.div`
    //   font-size: 20px;
    //   font-weight: 600;
    //   line-height: 24px;
    //   margin-bottom: 12px;
    // `;
    // const Text = styled.div`
    //   font-size: 16px;
    //   font-weight: 400;
    //   line-height: 20px;
    //   color: #505050;
    // `;

    return (
        <div style={{ marginTop: i !== 0 ? "26px" : "auto" }}>
            <Title><i className={"moments-icon-2-people"} /> Guest Capacity</Title>
            <Text>Up to {s} seated guests</Text>
        </div>
    );
};

export function OverviewSection({ data }: { data: VendorDetailsBQuery }) {
    return (
        <div>
            <div className={"container"}>
                <div className="row"
                    // style={{ marginBottom: isMobile ? "30px" : "50px" }}
                >
                    <div className="col-md-8 col-sm-12">
                        <h6 style={{
                            marginBottom: 0,
                            display: "none",
                            fontWeight: "lighter",
                            color: "rgb(162 162 162)"
                        }}>{getVendorTypeInfo(data.vendorDetailsB?.vendor_type).displayName}</h6>
                        <h1 className="h1"
                            style={{
                                marginBottom: 0,
                                marginTop: 0,
                                fontFamily: "serif"
                            }}
                        >{data.vendorDetailsB?.business_name}
                            {
                                data.vendorDetailsB?.vendor_type === VendorType.Venue && " Venue"
                            }
                        </h1>
                        <h6 className="location"
                            style={{ fontWeight: "normal", marginTop: "7px", color: "rgb(112 112 112)" }}>
                            {getVendorTypeInfo(data.vendorDetailsB?.vendor_type)?.displayName.replaceAll("Wedding", "")}
                            {" "}Based in {data.vendorDetailsB?.searchLocations[0].name.replace('Colombo (1 - 15)', 'Colombo')}
                            {
                                (data.vendorDetailsB?.searchLocations.length || 0) > 1 ?
                                    <Tooltip
                                        placement="top"
                                        trigger={["click", "hover"]}
                                        overlay={
                                            <span>
                                                {
                                                    (data.vendorDetailsB?.searchLocations.slice(1) ?? []).map(item => (
                                                        <span key={item.name}>
                                                            <span>{item.name}</span><br />
                                                        </span>)
                                                    )
                                                }
                                            </span>
                                        }
                                        arrowContent={<div className="rc-tooltip-arrow-inner" />}
                                    >
                                        <a style={{
                                            color: "#0075ae",
                                            fontWeight: "bold"
                                        }}> +{(data.vendorDetailsB?.searchLocations.length || 0) - 1} locations</a>
                                    </Tooltip> : null
                            }
                        </h6>
                        <hr className={"mt-4"} />
                        <div>
                            {
                                getServicePricing(data)?.map((value, index) => <ServicePricingComp key={index} i={index}
                                                                                                   s={value} />)
                            }
                        </div>
                        {
                            data.vendorDetailsB.vendor_type === VendorType.Venue &&
                            data.vendorDetailsB.vendorTypes?.venue_type?.guestCapacity &&
                            <GuestCapacityComp s={data.vendorDetailsB.vendorTypes?.venue_type?.guestCapacity}
                                               i={getServicePricing(data)?.length || 0} />
                        }

                    </div>
                    <div className="col-md-4 mt-3 hidden-sm hidden-xs">
                        <Inquiry>
                            <div style={{
                                textAlign: "left"
                            }}>
                                {/*<h5>Contact Us</h5>*/}
                                {/*<div><span*/}
                                {/*    style={{fontWeight: 'bold'}}>Phone:</span> {data.vendorDetailsB?.phone.replace('+94', '0')}*/}
                                {/*</div>*/}
                                {/*<div><span style={{fontWeight: 'bold'}}>Address:</span> {data.vendorDetailsB?.address}*/}
                                {/*</div>*/}
                            </div>
                            <div style={{ marginBottom: "12px" }}>Want this vendor to be part of your wedding?</div>
                            <OverviewButton type="button" role="button"
                                            style={{ visibility: "visible" }}
                                            onClick={() => contactPopupState.setGlobalState("contactPopupActive", true)}
                            >Learn More & Inquire
                            </OverviewButton>
                        </Inquiry>
                    </div>
                </div>
            </div>
        </div>
    );
}
