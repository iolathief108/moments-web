import SelectSearch, { fuzzySearch } from "react-select-search/dist/cjs";
import { getDistrictId, getVendorTypeInfo, localVendorTypes } from "../../utils/other";
import { useState } from "react";
import { VendorType } from "../../http/generated";
import sdk from "../../http/sdk";
import { useHistory, Link } from "react-router-dom";
import { searchState } from "../../state";
import "react-select-search/style.css";
import { CarouselMulti } from "../common/carousel-multi";
import styled from "styled-components";
import { SearchView } from "../../comps/SearchView";
import { Title } from "../common/Title";


const SearchThing = () => {
    const [vTypeG, setVTypeG] = useState<VendorType | null>(null);
    const locHook = sdk.useLocations();
    const [districtKey, setDistrictKey] = useState<string>("");

    const [vendorTypeLocal, setVendorTypeLocal] = useState<VendorType | null>(searchState.getGlobalState("vendorType") || null);
    const [districtKeyLocal, setDistrictKeyLocal] = useState<string>(searchState.getGlobalState("districtKey") || "");

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

    return (
        <div className="search-form" style={{ maxWidth: "750px", backgroundColor: "transparent", margin: "unset" }}>
                <SearchView vType={vTypeG} onClick={onSearchClick} districtKey={districtKey} setDistrictKey={setDistrictKey} districts={locHook.data?.districts} setVType={setVTypeG}/>
        </div>
    );
};

const LocationCarousel = () => {
    return (
        <div>
            <div className={"mb-3"}></div>
            <CarouselMulti urls={[
                {
                    icon: "/images/cat/venue.svg",
                    url: "https://cinnamonweb.blob.core.windows.net/cinnamonweb-prd/events/CG-GrandWay-D-335X380.jpg",
                    name: "Venues / Hotels",
                    link: "/search/wedding-venues"
                },
                {
                    icon: "/images/cat/camera.svg",
                    // url: "/images/loc/loc (2).jpg",
                    url: "https://im.indiatimes.in/content/2021/Sep/wwp_6155a217e52d2.jpg?w=725&h=362",
                    name: "Photographers",
                    link: "/search/wedding-photographers"
                },
                {
                    icon: "/images/cat/hair_makeup.svg",
                    url: "https://media.istockphoto.com/photos/theres-no-such-thing-as-basic-with-bridal-makeup-picture-id1174368166?k=20&m=1174368166&s=612x612&w=0&h=JzvHI4v16WXlSsuhTk_cwN8AWqm6rhnHBw04u567OQA=",
                    name: "Beauty Professionals",
                    link: "/search/wedding-beauty-professionals"
                },
                {
                    icon: "/images/cat/bands_dj.svg",
                    url: "/images/jew.jpg",
                    name: "Jewelleries",
                    // name: "Musics & DJs",
                    link: "/search/wedding-bands-djs"
                },
                {
                    icon: "/images/cat/video.svg",
                    url: "https://content1.getnarrativeapp.com/static/afd918b5-c6c5-446d-b741-4e55d30f1a30/weddingvideographer.jpg?w=750",
                    name: "Videographers",
                    link: "/search/wedding-videographers"
                },
                {
                    icon: "/images/cat/bouquet.svg",
                    // url: "/images/loc/loc (4).jpg",
                    url: "https://www.brides.com/thmb/HZD32yVXfdgASE6_LkLs4dayQ_M=/4707x3138/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__brides__public__brides-services__production__2018__11__30__5c01ac6434add444488813ab_taylor-and-joe-wedding24-5d8102901d3e4b50bbb1773e9df73eda.jpg",
                    name: "Florists",
                    link: "/search/wedding-florists"
                },
                {
                    icon: "/images/cat/wedding_cake.svg",
                    url: "https://i.pinimg.com/736x/07/3e/2c/073e2ca9ea95bf9301df350e410623ad--wedding-foods-wedding-things.jpg",
                    name: "Cakes & Desserts",
                    link: "/search/wedding-cakes-desserts"
                },
                {
                    icon: "/images/cat/mixer.svg",
                    // url: "/images/loc/loc (7).jpg",
                    url: "https://i.pinimg.com/originals/b9/7c/f3/b97cf3aa1f97659cc305407dfa2c166d.jpg",
                    name: "Caterers",
                    link: "/search/wedding-caterer"
                }
            ]} />
            <div className={"mb-4"}></div>
        </div>
    );
};

type Props = {
    url: string
    img: string
    name: string
};

export function Damn(props: Props) {

    const LinkA = styled(Link)`
        &:hover{
          span {
            color: #0075ae;
          }
        }
    `;

    return (
        <LinkA style={{
            display: "inline-flex",
            borderRadius: "40px",
            backgroundColor: "#fff",
            color: "#555f",
            margin: "4px",
            paddingLeft: "8px",
            paddingRight: "14px",
            fontWeight: 500,
            fontSize: "14px",
            fontFamily: "roboto, sans-serif"
        }} to={props.url}
        >
            <img
                src={props.img}
                height="35px"
                width="35px"
                style={{ marginRight: "3px" }}
            />
            <span style={{ alignSelf: "center" }}>{props.name}</span>
        </LinkA>
    );
}

const Hello = () => {
    return (
        <div>
            <div className="vendor-chips">
                <h5 className="sub-hed mb-4">Our Vendor Types</h5>
                <Damn url={"/search/wedding-venues"} name={"Venues"}
                      img={"https://d1tntvpcrzvon2.cloudfront.net/vmassets/static/media/agnostic_venue.5d386156.svg"} />
                <Damn url={"/search/wedding-photographers"} name={"Photographers"}
                      img={"https://d1tntvpcrzvon2.cloudfront.net/vmassets/static/media/camera.ed2453b0.svg"} />
                <Damn url={"/search/wedding-videographers"} name={"Videographers"}
                      img={"https://d1tntvpcrzvon2.cloudfront.net/vmassets/static/media/video.a10c29da.svg"} />
                <Damn url={"/search/wedding-florists"} name={"Florists"}
                      img={"https://d1tntvpcrzvon2.cloudfront.net/vmassets/static/media/bouquet.042d7ec1.svg"} />
                <Damn url={"/search/wedding-bands-djs"} name={"Bands & DJs"}
                      img={"https://d1tntvpcrzvon2.cloudfront.net/vmassets/static/media/bands_dj.3ef941c6.svg"} />
                <Damn url={"/search/wedding-beauty-professionals"} name={"Beauty Professionals"}
                      img={"https://d1tntvpcrzvon2.cloudfront.net/vmassets/static/media/hair_makeup.4a45a7cd.svg"} />
                <Damn url={"/search/wedding-caterer"} name={"Caterers"}
                      img={"https://d1tntvpcrzvon2.cloudfront.net/vmassets/static/media/mixer.e1323459.svg"} />
                <Damn url={"/search/wedding-cakes-desserts"} name={"Cakes & Desserts"}
                      img={"https://d1tntvpcrzvon2.cloudfront.net/vmassets/static/media/wedding_cake.72922602.svg"} />
            </div>
        </div>
    );
};

export const Search = () => {
    const SearchThingContainer = styled.div`
      display: block;
      @media(max-width: 767px) {
        display: none;
      }
    `;

    const Container = styled.div`
      @media(max-width: 767px) {
        padding-top: 20px;
        padding-bottom: 20px;
      }
      padding-top: 50px;
      padding-bottom: 50px;
      background-color: #ecf7f9;
    `;


    return (
        <Container>
            <div className={"container"}>
                <div className={"row"}>
                    <div className="col">
                        {/* <h3 className={'text-center text-md-left serif pb-2'}>Browse Vendors by Location</h3> */}
                        {/*<h3 className={"text-center text-md-left serif pb-2"}>Your Vendor Search</h3>*/}
                        <Title>Your Vendor Search</Title>
                        <SearchThingContainer>
                            <SearchThing/>
                        </SearchThingContainer>
                        <LocationCarousel />
                        {/*<Hello />*/}
                    </div>
                </div>
            </div>
        </Container>
    );
};
