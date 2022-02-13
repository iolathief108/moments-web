import { CarouselFull } from "../common/carousel";
import { commonState } from "../../state";
import styled from "styled-components";


type ContentProps = {
    imgLink: string
    title: string
    description: string
}
const Content = (props: ContentProps) => {
    return (
        <div className={"text-center pl-3 pr-3 pl-4 pr-4 m-auto"} style={{ maxWidth: "450px" }}>
            <img className={"m-auto pb-2"} src={props.imgLink} />
            <p className={"font-weight-bold mb-2"}>{props.title}</p>
            <p className={""} style={{ color: "#444", fontFamily: "roboto, sans-serif" }}>{props.description}</p>
        </div>
    );
};
const dd = [
    <Content imgLink={"https://d1tntvpcrzvon2.cloudfront.net/vmassets/static/media/polaroid.9042945e.svg"}
             title={"Browse With Peace of Mind"}
             description={"Moments.lk is a unique concept which make easy to everyone to browse in one site and get the all wedding vendors with your choice."} />,
    // description={"All vendors at Moments are proven to deliver outstanding wedding experiences and pledge to have your best interests at heart."} />,
    <Content imgLink={"https://d1tntvpcrzvon2.cloudfront.net/vmassets/static/media/heart_in_hands.ca2c4139.svg"}
             title={"Cut Out the Clutter"}
    description={"Treat your eyes to sleek listings with big photos and all the details you need. No ads. No info overload."} />,
    <Content imgLink={"https://d1tntvpcrzvon2.cloudfront.net/vmassets/static/media/play_pause.3021cd4a.svg"}
             title={"Fast-Track Every Step"}
             description={"In Moments.lk your free to select and communicate with any vendors as per you're requirement. And we're open for you around the clock."} />
    // description={"Skip back-and-forth with vendors who aren’t right for you. We’ll recommend ones who fit your style, budget, and more, and streamline all inquiries."} />
];

const Container = styled.div`
  padding-top: 70px;
  padding-bottom: 70px;
`;

const Mobile = () => {
    return (
        <Container>
            <CarouselFull content={dd} />
        </Container>
    );
};

const Desktop = () => {
    return (
        <Container className={"container"}>
            <div className={"row"}>
                {
                    dd.map(((value, index) => <div key={index} className={"col-12 col-md-4 pb-5"}>{value}</div>))
                }
            </div>
        </Container>
    );
};

export const Explore = () => {

    const [isMobile] = commonState.useGlobalState("isMobile");

    if (isMobile) {
        return <Mobile />;
    }

    return <Desktop />;
};
