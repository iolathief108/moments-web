import styled from "styled-components";
import { Title } from "../common/Title";


export const Vendor = () => {
    const Container = styled.div`
      padding-top: 80px;
      padding-bottom: 80px;
      background-color: #ecf7f9;
    `;

    return (
        <Container>
            <div className={"container"}>
                <div className="row">
                    <div className="col-sm-12 text-center col-md-8 col-lg-5 text-md-left">
                        {/*<h3 className={"serif pb-2"}>Are you a wedding vendor?</h3>*/}
                        <Title className={"serif pb-2"}>Are you a wedding vendor?</Title>
                        <p className={"pb-2"} style={{ color: "#444", fontFamily: "roboto, sans-serif" }}>The old-school
                            way that vendors and couples find each other isn’t cutting it. So we’re building something
                            new, helping you get discovered by your ideal couples without breaking a sweat.</p>
                        <a className="v2-button secondary-button" target="_blank" href="/become-a-vendor">Register to Become a Member</a>
                    </div>
                </div>
            </div>
        </Container>
    );
};
