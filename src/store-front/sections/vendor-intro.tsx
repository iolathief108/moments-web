import { PersonInfo, VendorDetailsBQuery, VendorType } from "../../http/generated";
import { contactPopupState } from "../../state";
import styled from "styled-components";
import { getBaseUrl } from "../../utils/other";


type Weapon = {
    name: string
    tings: string[]
}

type Weapons = Weapon[]

function getOptions(data: VendorDetailsBQuery) {
    let thanosWeapons: Weapons = [];

    for (const clap of data.vendorDetailsB?.claps || []) {
        thanosWeapons.push({
            name: clap.name,
            tings: clap.values
        });
    }
    return thanosWeapons;
}

const OptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  > div {
    max-width: 200px;
    padding-right: 40px;
    margin-bottom: 10px;
  }

  li {
    list-style-type: none;
  }
`;

export function VendorIntro({ data }: { data: VendorDetailsBQuery }) {


    function SocialMedia() {
        const Container = styled.div`

          margin-top: 20px;
          @media (max-width: 767px) {
            margin-top: 16px;
          }
          font-size: 14px;
          //color: #21201f; #767676
          font-family: proxima-nova, Helvetica, Arial, sans-serif;
          line-height: 1.42857143;

          a {
            margin-right: .25em;
            margin-left: .25em;
            color: #767676;
            font-size: 20px;
            text-decoration: none;
          }
        `;
        return (
            <Container>
                {
                    data.vendorDetailsB?.links?.instagram &&
                    <a target={"_blank"} href={`${data.vendorDetailsB?.links?.instagram}`}><span
                        className={"moments-icon-instagram"} /></a>
                }
                {
                    data.vendorDetailsB?.links?.facebook &&
                    <a target={"_blank"} href={`${data.vendorDetailsB?.links?.facebook}`}><span
                        className={"moments-icon-facebook"} /></a>
                }
                {
                    data.vendorDetailsB?.links?.pinterest &&
                    <a target={"_blank"} href={`${data.vendorDetailsB?.links?.pinterest}`}><span
                        className={"moments-icon-pinterest"} /></a>
                }
                {
                    data.vendorDetailsB?.links?.website &&
                    <a target={"_blank"} href={`${data.vendorDetailsB?.links?.website}`}><span
                        className={"moments-icon-globe"} /></a>
                }
            </Container>
        );
    }


    const Options = () => {
        return (
            <OptionContainer style={{
                marginTop: !getPersonInfo() ? "27px" : "40px"
            }}>
                {
                    getOptions(data).map((item, index) => (
                        <div className="services-section__service-block" key={index}>
                            <h6 className="services-section__heading h6">{item.name}</h6>
                            <ul className="services-section__list">
                                {
                                    item.tings.map((item, index) => (
                                        <li style={{
                                            fontFamily: "proxima-nova,Helvetica,Arial,sans-serif",
                                            fontSize: "14px",
                                            fontWeight: 400,
                                            lineHeight: 1.8,
                                            color: "#21201f"
                                        }} className="mt-quaternary" key={index}>{item}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    ))
                }
            </OptionContainer>
        );
    };

    const getDescription = () => {
        if (!data?.vendorDetailsB.description) {
            return null;
        }
        let wow = data?.vendorDetailsB.description;
        wow = wow.replace("\n\n\n", "\n\n");
        const sep = wow.split("\n");
        let final: string[][] = [[]];
        for (let ss of sep) {
            if (ss !== "") {
                final[final.length - 1].push(ss);
            } else {
                final.push([]);
            }
        }
        return (
            final.map((i, index) => (
                <p key={index}>
                    {
                        i.map(
                            (r, index) =>
                                <span key={index}>
                                    {r}
                                    <br />
                                </span>
                        )
                    }
                </p>
            ))
        );
    };

    const getPersonInfo = (): PersonInfo => {
        switch (data.vendorDetailsB.vendor_type) {
            case VendorType.Caterer:
                return data.vendorDetailsB.vendorTypes.caterer_type.personInfo;
            case VendorType.Photographer:
                return data.vendorDetailsB.vendorTypes.photographer_type.personInfo;
            case VendorType.BeautyProfessional:
                return data.vendorDetailsB.vendorTypes.beauty_professionals_type.personInfo;
            case VendorType.CakesDessert:
                return data.vendorDetailsB.vendorTypes.cakes_desserts_type.personInfo;
            case VendorType.Florist:
                return data.vendorDetailsB.vendorTypes.florists_type.personInfo;
            case VendorType.BandsDj:
                return data.vendorDetailsB.vendorTypes.band_djs_type.personInfo;
            case VendorType.Videographer:
                return data.vendorDetailsB.vendorTypes.videographer_type.personInfo;
        }
    };

    const isVenue = (): boolean => {
        return data.vendorDetailsB?.vendor_type === VendorType.Venue;
    };

    const Title = styled.h1`
      font-family: serif;
      margin-top: 5px;
      line-height: 40px;
    `;

    return (
        <div style={{
            marginTop: "75px",
            backgroundColor: "rgb(246 248 250)",
            paddingTop: "10px",
            paddingBottom: " 65px"
        }}>
            <div className={"container"}>
                <div className="row" style={{
                    marginTop: "50px"
                }}>
                    {
                        getPersonInfo() &&
                        <div className={"col-xs-12 col-sm-4 text-center"}>
                            <div style={{
                                backgroundImage: `url("${getBaseUrl()}/p/${getPersonInfo().person_photo.id}_q95.jpg")`,
                                backgroundSize: "cover",
                                borderRadius: "50%",
                                width: "172px",
                                height: "172px",
                                margin: "auto"
                            }} />
                            <h3 style={{fontSize: '1.6rem'}} className={"mt-3 mb-0"}>{getPersonInfo().name}</h3>
                            <div><span>{getPersonInfo().position}</span></div>
                            <SocialMedia />
                            <button className="mt-3 mb-4 v2-button primary-button footer-button" type="button"
                                    role="button"
                                    style={{ visibility: "visible" }}
                                    onClick={() => contactPopupState.setGlobalState("contactPopupActive", true)}
                            >Learn More &amp; Inquire
                            </button>
                        </div>
                    }
                    <div className={`col-xs-12 col-sm-${!getPersonInfo() ? "6" : "8"}`}>
                        <div className="vendor-intro-section__container ml-secondary">
                            <Title
                                className="marketplace__h2">About{isVenue() && " This Venue"} {!isVenue() && data.vendorDetailsB?.business_name}</Title>
                            <div style={{
                                color: "rgb(0 0 0 / 70%)",
                                paddingRight: "18px"
                            }} className="vendor-intro-section__body">
                                <div className="mt-tertiary" style={{
                                    // fontFamily: "proxima-nova,Helvetica,Arial,sans-serif",
                                    fontSize: "14px",
                                    fontWeight: 400,
                                    lineHeight: 1.7,
                                    color: "rgb(66 66 66)"
                                }}>{getDescription()}</div>
                                {
                                    !getPersonInfo() &&
                                    <button className="mt-3 v2-button primary-button footer-button" type="button"
                                            role="button"
                                            style={{ visibility: "visible" }}
                                            onClick={() => contactPopupState.setGlobalState("contactPopupActive", true)}
                                    >Learn More &amp; Inquire
                                    </button>
                                }
                                {
                                    // (data.vendorDetailsB.vendor_type === VendorType.Venue || !getPersonInfo()) &&
                                    !getPersonInfo() &&
                                    <SocialMedia />
                                }
                            </div>
                            {
                                getPersonInfo() &&
                                <Options />
                            }
                        </div>
                    </div>
                    {
                        !getPersonInfo() &&
                        <div className="col-xs-12 col-sm-6">
                            <Options />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
