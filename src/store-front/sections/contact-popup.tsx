import { contactPopupState } from "../../state";
import { getSdk, VendorDetailsBQuery } from "../../http/generated";
import { isMobile } from "react-device-detect";
import { createGlobalState } from "react-hooks-global-state";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { client } from "../../http/sdk";
import { isNumeric, parseSLPhone, validateStandardSLPhone } from "../../shared";
import { BlueButton } from "../../comps/buttons";
import axios from "axios";
import { getProductUrl } from "../../utils/other";
import { DARK_BLUE_COLOR, LIGHT_BLUE_COLOR } from "../../utils/colors";


type propsThing = {
    iconClassName: string,
    title: string, val: any
}

const Indicator = () => {

    const [step] = formState.useGlobalState("step");
    const get = () => {
        switch (step) {
            case 1:
                return 33;
            case 2:
                return 66;
            case 3:
                return 100;
        }
        return 0;
    };
    // const [cc, setCc] = useState<number>(0);
    //
    // useEffect(() => {
    //     if (percentage > 100) {
    //         setCc(10);
    //         return;
    //     }
    //     if (percentage < 0) {
    //         setCc(0);
    //         return;
    //     }
    //     setCc(Math.round(percentage / 10));
    // }, []);
    //
    // const ffff = () => {
    //     let res = [];
    //     for (let i = 0; i < cc; i++) {
    //         res.push(i);
    //     }
    //     return res;
    // };
    const Bar = styled.div`
      .bar {
        //width: 100%;
        //height: 10px;
        //position: relative;
        //background-color: #aaa;

        height: 4px;
        width: 100%;
        background-color: #f5f7fa;
        position: relative;
        border-radius: 10px;
        margin-bottom: 20px;

        div {
          background-color: #0b2e13;
          width: ${get()}%;
          z-index: 4;
          height: 100%;

          height: 100%;
          background-color: #003b58;
          position: absolute;
          left: 0;
          top: 0;
          border-radius: 10px;
        }
      }

      .name {
        font-size: 13.5px;
        margin-bottom: 10px;

        .step.active {
          font-weight: 500;
        }

        > div {
          display: inline-block;
          margin-right: 30px;
        }
      }
    `;
    return (
        <Bar>
            <div className={"name"}>
                <div className={`step ${step === 1 && "active"}`}>1.Videographer Fit</div>
                <div className={`step ${step === 2 && "active"}`}>2.Wedding Details</div>
                <div className={`step ${step === 3 && "active"}`}>3.Your Message</div>
            </div>
            <div className={"bar"}>
                <div></div>
            </div>
        </Bar>
    );
};

const FormInput = styled.input`
  background-color: #fff;
  border: 2px solid #d9d9d9;
  border-radius: 4px;
  box-sizing: border-box;
  color: #505050;
  font-size: 16px;
  font-weight: 400;
  height: 44px;
  width: 100%;
  padding: 14px 12px;
`;

type Steps = 1 | 2 | 3
type Event = "party" | "wedding"
type gProp = {
    step: Steps;
    businessName?: string;
    showMessage?: boolean;
    warningMessage?: string;
    content: {
        events: Array<Event>
        firstName: string
        phone: string;
        lastName: string
        from: string
        budget: number
        message: string
    }
}
const initState: gProp = {
    step: 1,
    showMessage: false,
    businessName: null,
    warningMessage: "",
    content: {
        events: [],
        from: "",
        budget: null,
        phone: "",
        firstName: "",
        lastName: "",
        message: ""
    }
};
export const formState = createGlobalState<gProp>(initState);

const onSubmit = async () => {
    let content = formState.getGlobalState("content");
    await axios.post("/api/mail", content);
    formState.setGlobalState("showMessage", true);
    formState.setGlobalState("content", initState.content);
};

const validate = () => {
    // return true;
    const content = formState.getGlobalState("content");
    const step = formState.getGlobalState("step");
    const set = (msg?: string) => {
        formState.setGlobalState("warningMessage", msg || "");
    };
    if (step === 1) {
        if (!content.events.length) {
            set("select at least one ");
            return false;
        }
    }
    if (step === 2) {
        if (!content.firstName.length) {
            set("first name cannot be empty");
            return false;
        }
        if (!content.phone.length) {
            set("phone cannot be empty");
            let phone = parseSLPhone(content.phone);
            if (!validateStandardSLPhone(phone || "")) {
                set("Not a valid phone");
                return false;
            }
            return false;
        }
        if (!content.lastName.length) {
            set("last name cannot be empty");
            return false;
        }
        if (!content.from.length) {
            set("please select a location");
            return false;
        }
    }

    set();
    return true;
};

const Navigator = () => {
    const [step, setStep] = formState.useGlobalState("step");
    const Container = styled.div`
      margin-top: 20px;
      margin-bottom: 20px;
      display: inline-flex;
      flex-direction: row-reverse;
      align-items: center;
      width: 100%;
    `;
    const A = styled.a`
      padding: 8px;
      margin-right: auto;
      padding-right: 12px !important;

      color: #0075ae;
      cursor: pointer;
      font-family: proxima-nova, Helvetica, Arial, sans-serif;
      font-size: inherit;
      font-stretch: normal;
      font-style: normal;
      font-weight: 600;
      letter-spacing: normal;
      line-height: normal;
      text-decoration: none;
      text-transform: capitalize;
    `;

    return (
        <Container>


            <BlueButton onClick={() => {
                switch (step) {
                    case 1:
                        if (validate()) {
                            setStep(2);
                        }
                        break;
                    case 2:
                        if (validate()) {
                            setStep(3);
                        }
                        break;
                    case 3:
                        if (validate()) {
                            onSubmit();
                        }
                        break;
                }
            }}>{step === 3 ? "Submit" : "Next"}</BlueButton>

            {
                step !== 1 &&
                <A onClick={() => {
                    switch (step) {
                        case 2:
                            setStep(1);
                            break;
                        case 3:
                            setStep(2);
                            break;
                    }
                }}><i className={"fa fa-arrow-left mr-2"} style={{ fontSize: 14 }} />Back</A>
            }
        </Container>
    );
};

const Drop = ({ ar, selected, onClick }: { ar: string[], selected?: string, onClick: (v: string) => void }) => {
    const [active, setActive] = useState<boolean>(false);
    const Container = styled.div`
      position: relative;
      display: inline-block;
      min-width: 190px;
      @media (max-width: 767px) {
        min-width: 100%;
      }

      .dropdown-btn {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        padding: 9px 4px 9px 12px;

        background-color: #fff;
        border: 2px solid ${active ? "#0075ae" : "#d9d9d9"};
        border-radius: 4px;
        box-sizing: border-box;
        color: ${active || selected ? "#505049" : "#aaa"};
        font-size: 16px;
        font-weight: 400;
        height: 44px;
        width: 100%;

        .arrow {
          color: #0075ae;
        }
      }

      .list {
        background: #fff;
        border: 2px solid #d9d9d9;
        border-radius: 4px;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .1);
        cursor: pointer;
        margin-top: 4px;
        max-height: 250px;
        overflow: auto;
        position: absolute;
        width: 100%;
        z-index: 20;

        li {
          font-size: 14px;
          line-height: 21px;
          text-decoration: none;
          display: block;
          font-weight: 500;
          padding: 8px 14px;

          &:hover {
            background-color: #eee;
            color: #21201f;
          }
        }
      }
    `;

    const toggle = (override?: boolean) => () => {
        if (override !== undefined) {
            setActive(override);
            return;
        }
        setActive(!active);
    };

    useEffect(() => {
        function dd(event) {
            if (!event.target.matches(".dropdown-btn, .dropdown-btn span")) {
                toggle(false)();
            }
        }

        window.addEventListener("click", dd);
        return () => {
            window.removeEventListener("click", dd);
        };
    }, []);
    return (
        <Container>
            <div onClick={toggle()} className="dropdown-btn">
                <span className={"d-flex align-items-center"}>{selected || "Select Your Location"}</span>
                <span className={`arrow mr-1 fa fa-chevron-${active ? "up" : "down"} d-flex align-items-center`}></span>
            </div>
            {
                active &&
                <div onClick={toggle()} className={`list`}>
                    <ul>
                        {
                            ar.map(v => <li key={v} onClick={() => onClick(v)}>{v}</li>)
                        }
                    </ul>
                </div>
            }
        </Container>
    );
};

const Title = styled.h3`
  font-family: serif;
  font-weight: 600;
  font-size: 30px;
  margin-bottom: 5px;
`;

const TitleOnly = styled.h3`
  font-family: serif;
  font-weight: 600;
  font-size: 30px;
  margin-bottom: 20px;
`;

const Dsc = styled.p`
  color: #000b;
`;

const FieldsetName = styled.div`
  font-weight: bold;
  margin-bottom: 3px;
`;
const Step2 = () => {
    const [content, setContent] = formState.useGlobalState("content");
    const [locations, setLocations] = useState<string[]>([]);

    useEffect(() => {
        getSdk(client).Locations().then(e => {
            setLocations(e.districts.map(s => s.name));
        });
    }, []);

    return (
        <div>
            <TitleOnly>Almost there!</TitleOnly>
            {/*<Title>Almost there! Just tell Joseph Edwards Films a bit more about you.</Title>*/}
            {/*<Dsc>Add your wedding details below so you can have fewer back-and-forths with this vendor later.</Dsc>*/}

            <div className={"mb-4"}>
                <FieldsetName>Your Name</FieldsetName>
                <div className={"row mx-0"}>
                    <FormInput placeholder={"First"} className={"col-5 col-lg-4 mr-2"} type={"text"}
                               value={content.firstName}
                               onChange={(e) => setContent({ ...content, firstName: e.target.value })} />
                    <FormInput placeholder={"Last"} className={"col-5 col-lg-4"} type={"text"} value={content.lastName}
                               onChange={(e) => setContent({ ...content, lastName: e.target.value })} />
                </div>
            </div>
            <div className={"mb-4"}>
                <FieldsetName>Phone</FieldsetName>
                <div className={"row"}>
                    <FormInput placeholder={"Phone Number"} name={"phone"} className={"col-12 col-lg-6"} type={"text"}
                               value={content.phone}
                               onChange={(e) => setContent({ ...content, phone: e.target.value })} />
                </div>
            </div>
            <div>
                <FieldsetName>Select Your City</FieldsetName>
                <Drop ar={locations} selected={content.from} onClick={v => {
                    setContent({ ...content, from: v });
                }} />
            </div>

            {/*<p>*/}
            {/*    What’s your estimated budget for these services?*/}
            {/*</p>*/}
            {/*<FormInput type={"number"} value={content.budget || ""}*/}
            {/*           onChange={(e) => {*/}
            {/*               if (isNumeric(e.target.value)) {*/}
            {/*                   setContent({ ...content, budget: parseInt(e.target.value) });*/}
            {/*               }*/}
            {/*           }} />*/}

        </div>
    );
};
const Txt = styled.div`
  textarea {

    border: 2px solid #d9d9d9;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #505050;
    font-size: 16px;
    font-weight: 400;
    padding: 14px 12px;
    margin-top: 3px;
    width: 100%;
    max-width: 100%;
    height: 88px;
    resize: vertical;

    vertical-align: top;
    height: 130px;

    &:focus {
      outline: none;
      border: 2px solid #0075ae;
    }
  }
`;
const Step3 = () => {
    const [content, setContent] = formState.useGlobalState("content");
    const [name] = formState.useGlobalState("businessName");


    return (
        <Txt>

            <TitleOnly>Write a message to {name || "This Vendor"}</TitleOnly>
            {/*<Title>Write a message to Joseph Edwards Films</Title>*/}
            {/*<Dsc>Tell them why you'd love to work together. What about Joseph Edwards Films caught your eye? Do you have a vision for your video? Any special requests?</Dsc>*/}

            <textarea value={content.message} onChange={e => setContent({ ...content, message: e.target.value })} />
        </Txt>
    );
};


const SelectCard = ({ event }: { event: Event }) => {
    const [content, setContent] = formState.useGlobalState("content");
    const onClick = () => {
        if (content.events.includes(event)) {
            let ne = content.events.filter(e => e !== event);
            setContent({ ...content, events: ne });
        } else {
            setContent({ ...content, events: [...content.events, event] });
        }
    };
    const Container = styled.div`
      outline: none;
      flex-grow: 1;
      flex-basis: 25%;
      //margin: 12px;
      margin-right: 8px !important;
      margin-bottom: 10px !important;
      min-height: 100%;
      height: 115px;
      cursor: pointer;

      & > div {
        position: relative;
        min-width: 80px;
        min-height: 90px;
        height: 100%;
        width: auto;
        border-radius: 4px;
        border: 2px solid #d9d9d9;
        background-color: #fff;
        box-shadow: none;

        &.selected {
          border: 2px solid #0075ae;
          background-color: #ebf4f9;
        }

        & > .wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 12px;
          width: 100%;
          height: 100%;
        }
      }
    `;

    return (
        <Container onClick={onClick}>
            <div className={content.events.includes(event) && "selected"}>
                <div className={"wrap"}>
                    <div>{event}</div>
                </div>
            </div>
        </Container>
    );
};

const Step1 = () => {
    const Container = styled.div`
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      height: auto;
    `;
    return (
        <div>
            <TitleOnly>For what events?</TitleOnly>
            {/*<Title>Which events would you like to be captured?</Title>*/}
            {/*<Dsc>Select as many as you want?</Dsc>*/}
            <Container>
                <SelectCard event={"party"} />
                <SelectCard event={"wedding"} />
            </Container>

        </div>
    );
};

const MainForm = () => {
    const [step] = formState.useGlobalState("step");

    // return <Step2 />;

    if (step === 1) {
        return <Step1 />;
        // return Step3();
    }
    if (step === 2) {
        return <Step2 />;
    }
    return (
        <Step3 />
    );
};

export const ContactInfor = {
    FieldRow(props: propsThing) {
        return (
            <div className="dbox mb-3 w-100 d-flex align-items-start">
                <div className="icon d-flex align-items-center justify-content-center" style={{
                    marginTop: "6px"
                }}>
                    <span className={props.iconClassName}></span>
                </div>
                <div className="text pl-3">
                    <p className={"font-weight-normal"} style={{}}>
                        <span className={"font-weight-bold"}>{props.title}:</span> {props.val}
                    </p>
                </div>
            </div>
        );
    },
    Content({}: { data: VendorDetailsBQuery }) {
        return (
            <div>
                <div style={{ fontSize: "1.1rem", fontFamily: "sans-serif,Roboto" }}>
                    {/*<Thing iconClassName={'fa fa-map-marker'} title={'Address'}*/}
                    {/*       val={'91/16, Dematagoda Road, Colombo-10.'}/>*/}
                    <ContactInfor.FieldRow iconClassName={"fa fa-phone"} title={"Phone"}
                                           val={<a style={{ color: "rgb(34 124 255 / 91%)" }} href="tel://+94775737981">077
                                               5737
                                               981</a>} />
                    <ContactInfor.FieldRow iconClassName={"fa fa-paper-plane"}
                                           title={"Email"}
                                           val={
                                               <a style={{ color: "rgb(34 124 255 / 91%)" }}
                                                  href="mailto:support@moments.lk">support@moments.lk</a>
                                           } />
                    {/*<Thing iconClassName={'fa fa-globe'} title={'Website'} val={<a href="#">yoursite.com</a>}/>*/}
                </div>
            </div>
        );
    },
    Detail({ data }: { data: VendorDetailsBQuery }) {

        return (
            <div>
                <div style={{
                    marginTop: "15px"
                }}>
                    {/*<h4>Contact Us</h4>*/}
                    <p style={{
                        color: "#0009"
                    }}>You can contact us in any of the following ways</p>
                    <ContactInfor.Content data={data} />
                </div>
            </div>
        );
    }
};

// export function ContactInfo({data}: {data: VendorDetailsBQuery}) {
//
//     const Content = ({data}: {data: VendorDetailsBQuery}) => {
//     };
//
//
// }

const Content = ({}: { data: VendorDetailsBQuery }) => {
    return (
        <>
            <MainForm />
            <Navigator />
        </>
    );
};

const CloseButton = () => {
    const Button = styled.button`
      position: absolute;
      height: 32px;
      width: 32px;
      top: 10px;
      right: 30px;

      a {
        width: 100%;
        height: 100%;
        opacity: 0.3;
      }

      @media (max-width: 767px) {
        top: 20px;
        right: 0px;
      }

    `;

    return (
        <Button
            style={{
                fontWeight: 400,
                background: "none",
                border: "none",
                cursor: "pointer"
            }}
            onClick={() => {
                formState.setGlobalState("showMessage", false);
                contactPopupState.setGlobalState("contactPopupActive", false);
            }}>
            <a href="#" className="my-close-btn" />
        </Button>
    );
};

function SuccessMessage() {
    const Container = styled.div`
      text-align: center;
      margin-top: 40px;
      padding-right: 15px;
      padding-left: 15px;
      padding-bottom: 30px;
      color: #000b !important;

      h2 {
        color: #000b !important;
        margin-bottom: 15px;
        font-weight: bold;
      }

      .check {
        margin-bottom: 20px;
      }
    `;

    return (
        <>
            <Container>
                <div className={"check"}><i className={"fa fa-check-circle fa-5x"}></i></div>
                <h2>Message Sent!</h2>
                <p>Your message has been sent successfully, We hope to response within 24 hours. You can also contact us
                    through social media, links can be found below!</p>
            </Container>
        </>
    );
}

export function ContactPopup({ data }: { data: VendorDetailsBQuery }) {
    const [warning] = formState.useGlobalState("warningMessage");
    const [step] = formState.useGlobalState("step");
    const [showMessage] = formState.useGlobalState("showMessage");

    useEffect(() => {
        formState.setGlobalState("showMessage", false);
        formState.setGlobalState("warningMessage", "");
        formState.setGlobalState("step", 1);
        formState.setGlobalState("businessName", data?.vendorDetailsB?.business_name);
    }, []);

    const Container = styled.div`
      position: fixed;
      background-color: white;
      z-index: 90;
      top: 40px;
      outline: none;
      left: 50%;
      transform: translateX(-50%);
      box-shadow: 0 5px 15px rgb(0 0 0 / 50%);
      overflow: auto;
      padding: 40px;

      width: 670px;
      //max-width: 80%;
      //min-width: 65%;
      max-height: 85%;
      //top: 100px;

      @media (max-width: 900px) {
        top: 0;
        left: 0;
        right: 0;
        transform: none;
      }
      @media (max-width: 769px) {
        max-width: 100%;
        min-width: 100%;
        max-height: 100%;
        height: 100%;
        top: 0px;
        padding-left: 20px;
        padding-right: 20px;
      }

      .content {
        //margin-top: 15px;
        //padding: 30px 40px 30px 40px;
        //width: 640px;
        //min-height: 300px;
        //max-height: 90vh;
        //padding: 25px;
      }
    `;
    const Pada = styled.div`
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 89;
      background-color: #0004;
    `;

    return (
        <>
            <Container>
                <CloseButton />
                {
                    showMessage ?
                        <SuccessMessage />
                        :
                        <div className={"content"}>
                            <Indicator />
                            <Content data={data} />
                        </div>
                }
                {
                    step === 1 &&
                    <ContactInfor.Detail data={data} />
                }
                {
                    warning &&
                    <span className={"text-danger"}>{warning}</span>
                }
            </Container>

            <Pada onClick={() => contactPopupState.setGlobalState("contactPopupActive", false)} />

        </>
    );
}
