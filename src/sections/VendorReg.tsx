import { createGlobalState } from "react-hooks-global-state";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { BlueButton } from "../comps/buttons";
import { parseSLPhone, validateStandardSLPhone } from "../shared";
import axios from "axios";
import { commonState } from "../state";

////// STATE
// Step One
interface StepOneType {
    businessName: Text;
    fullName: Text;
    designation: Text;
    email: Text;
    phone: Text;
    website: Text
    address: Textbox
    type: Dropdown;
}

const StepOne = createGlobalState<StepOneType>({
    website: {
      type: 'text',
      label: 'Website (Optional)',
    },
    type: {
        list: [
            { value: "caterer", label: "Caterer" },
            { value: "hotels", label: "Hotels" },
            { value: "photo", label: "Photographer" },
            { value: "videographer", label: "Videographer" },
            { value: "band", label: "Bands & DJs" },
            { value: "beauty", label: "Beauty Professionals" },
            { value: "florist", label: "Florists" },
            { value: "cakes-desserts", label: "Cakes & Desserts" }
        ],
        selected: null,
        type: "dropdown",
        label: "Vendor Type"
    },
    address: {
        type: 'textbox',
        label: 'Address',
        placeholder: ''
    },
    businessName: {
        type: "text",
        label: "Business Name"
    },
    email: {
        type: "text",
        label: "Email"
    },
    phone: {
        type: "text",
        label: "Phone"
    },
    fullName: {
        type: "text",
        label: "Contact Person"
    },
    designation: {
        label: "Designation",
        type: "text"
    }
});

// Step Two
interface StepTwoType {
    why: Textbox;
}

const StepTwo = createGlobalState<StepTwoType>({
    why: {
        type: "textbox",
        label: "Remarks / Comments",
        placeholder: 'Comments...'
    }
});
// reg state
const RegState = createGlobalState<{
    step: 1 | 2,
    warningMessage: string,
    success: boolean
}>({ step: 1, warningMessage: "", success: false });


const StepOneForm = () => {
    return (
        // <div style={{height: '100%'}}>
        <div className={"row"}>
            <TextField stepOneField={"businessName"} />
            <TextField stepOneField={"fullName"} />
            <TextField stepOneField={"designation"} />
            <TextboxField stepOneField={"address"} />
            <Drop stepOneField={"type"} />
            <TextField stepOneField={"website"} />
            <TextField stepOneField={"email"} />
            <TextField stepOneField={"phone"} />
        </div>
    );
};
const StepTwoForm = () => {
    return (
        // <div style={{height: '100%'}}>

        <div className={"row"}>
            <TextboxField stepTwoField={"why"} />
        </div>
    );
};

interface Text {
    type: "text";
    label?: string;
    kind?: "email" | "phone";
    value?: string;
}

interface Textbox {
    type: "textbox";
    label?: string;
    value?: string;
    placeholder?: string
}

interface Dropdown {
    type: "dropdown";
    label?: string;
    list: { value: string, label: string }[];
    selected?: string;
}

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
const FormTextarea = styled.textarea`

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
`;
const FieldsetName = styled.div`
  font-weight: bold;
  margin-bottom: 3px;
`;

const TextField = (props: { stepOneField?: "businessName" | "fullName" | "designation" | "email" | "phone" | "website", stepTwoField?: "why", h?: boolean }) => {

    const [stepOneText, setSOText] = StepOne.useGlobalState(props?.stepOneField || "designation");
    const [stepTwoText, setSTText] = StepTwo.useGlobalState(props?.stepTwoField || "why");
    const [hel, setHel] = useState<string>("");


    const getVal = () => {
        if (props.stepOneField) {
            return stepOneText.value;
        }
        return stepTwoText.value;
    };

    const getLabel = () => {
        if (props.stepOneField) {
            return stepOneText.label;
        }
        return stepTwoText.label;
    };

    const setValue = (val) => {

        if (props.stepOneField) {
            setSOText({ ...stepOneText, value: val });
        }
        // setSTText({ ...stepTwoText, [props.stepTwoField]: val })
    };

    return (
        <div className={`p-0 ${props.h ? "col-6" : "col-12"} mb-4`}>
            {
                getLabel() &&
                <FieldsetName>{getLabel()}</FieldsetName>
            }
            <div className={"row mx-0"}>
                <FormInput placeholder={getLabel()} className={"mr-2"} type={"text"}
                           value={getVal()}
                           onChange={(e) => setValue(e.target.value)} />
            </div>

        </div>
    );
};

function TextboxField(props: { stepOneField?: 'address', stepTwoField?: "why", h?: boolean }) {

    const [stepOneText, setSOText] = StepOne.useGlobalState(props?.stepOneField || "address");
    const [stepTwoText, setSTText] = StepTwo.useGlobalState(props?.stepTwoField || 'why');

    const FieldsetName = styled.div`
      font-weight: bold;
      margin-bottom: 3px;
    `;

    const getVal = () => {
        if (props.stepOneField) {
            return stepOneText.value;
        }
        return stepTwoText.value;
    };

    const getLabel = () => {
        if (props.stepOneField) {
            return stepOneText.label;
        }
        return stepTwoText.label;
    };

    const getPlaceholder = () => {
        if (props.stepOneField) {
            return stepOneText.placeholder || stepOneText.label;
        }
        return stepTwoText.placeholder || stepTwoText.label
    }

    const setValue = (val) => {

        if (props.stepOneField) {
            setSOText({ ...stepOneText, value: val });
            return;
        }
        setSTText({ ...stepTwoText, value: val });
    };

    return (
        <div className={`p-0 ${props.h ? "col-6" : "col-12"} mb-4`}>
            {
                getLabel() &&
                <FieldsetName>{getLabel()}</FieldsetName>
            }
            <div className={"row mx-0"}>
                <FormTextarea placeholder={getPlaceholder()} className={"mr-2"}
                              value={getVal()}
                              onChange={(e) => setValue(e.target.value)} />
            </div>
        </div>
    );
}

const Drop = (props: { stepOneField?: "type", h?: boolean }) => {
    // { ar, selected, onClick }: { ar: string[], selected?: string, onClick: (v: string) => void }

    const [stepOneText, setSOText] = StepOne.useGlobalState(props?.stepOneField || "type");
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
        color: ${active || stepOneText.selected ? "#505049" : "#aaa"};
        font-size: 16px;
        font-weight: 400;
        height: 44px;
        //width: 100%;

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

    const getLabel = () => {
        return stepOneText.label;
    };

    const getText = () => {
        for (const i of stepOneText.list) {
            if (stepOneText.selected === i.value)
                return i.label
        }
        return null;
    }

    return (
        <Container className={`${props.h ? "col-6" : "col-12"} mb-4 p-0`}>
            {
                getLabel() &&
                <FieldsetName>{getLabel()}</FieldsetName>
            }
            <div onClick={toggle()} className="dropdown-btn mr-2">
                <span className={`d-flex align-items-center ${stepOneText.selected && 'font-weight-bold'}`}>{getText() || "Select Your Choice"}</span>
                <span className={`arrow mr-1 fa fa-chevron-${active ? "up" : "down"} d-flex align-items-center`}/>
            </div>
            {
                active &&
                <div onClick={toggle()} className={`list`}>
                    <ul>
                        {
                            stepOneText.list.map(v => <li key={v.value} onClick={() => {
                                setSOText({ ...stepOneText, selected: v.value });
                            }}>{v.label}</li>)
                        }
                    </ul>
                </div>
            }
        </Container>
    );
};


const validate = () => {
    const step = RegState.getGlobalState("step");
    const set = (msg?: string) => {
        RegState.setGlobalState("warningMessage", msg || "");
    };
    if (step === 1) {

    }
    if (step === 2) {

    }
    set();
    return true;
};
const onSubmit = async () => {
    //step 1
    const firstName = StepOne.getGlobalState("fullName");
    const lastName = StepOne.getGlobalState("designation");
    const phone = StepOne.getGlobalState("phone");
    const email = StepOne.getGlobalState("email");
    const vendorName = StepOne.getGlobalState("businessName");
    //step 2
    const why = StepTwo.getGlobalState("why");

    await axios.post("https://www.moments.lk/api/mail", {
        firstName,
        lastName,
        phone,
        email,
        vendorName,
        why
    });

    RegState.setGlobalState("success", true);
    //todo: set to initial state

    // formState.setGlobalState("content", initState.content);
};
const Navigator = () => {
    const [step, setStep] = RegState.useGlobalState("step");

    const Container = styled.div`
      margin-top: 20px;
      margin-bottom: 5px;
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
        <Container className={"navigator"}>


            <BlueButton onClick={() => {
                switch (step) {
                    case 1:
                        window.scrollTo(0,0);
                        if (validate()) {
                            setStep(2);
                        }
                        break;
                    case 2:
                        if (validate()) {
                            onSubmit();
                        }
                        break;
                }
            }}>{step === 2 ? "Submit" : "Next"}</BlueButton>

            {
                step !== 1 &&
                <A onClick={() => {
                    switch (step) {
                        case 2:
                            setStep(1);
                            break;
                    }
                }}><i className={"fa fa-arrow-left mr-2"} style={{ fontSize: 14 }} />Back</A>
            }
        </Container>
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

export default function VendorReg() {
    const [step] = RegState.useGlobalState("step");
    const [showMessage] = RegState.useGlobalState("success");
    const [isMob] = commonState.useGlobalState("isMobile");

    const headerContainerEl = useRef(null);
    const [height, setHeight] = useState(undefined);

    const Container = styled.div`
      .bg {
        margin: 15px;
        width: calc(100% - 15px);
        height: calc(100% - 15px);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50%;
      }
      
      h2 {
        @media (max-width: 767px) {
          text-align: center;
        }
      }

      .navigator {
        position: absolute;
        bottom: 0;
        padding-right: 15px;
        padding-left: 15px;
      }

      .sam {
        //min-height: calc(100vh - 108px);
        padding: 15px 5px 5px;
      }

      .container {
        padding-top: 40px;
        padding-bottom: 45px;
      }
    `;

    useEffect(() => {
        setTimeout(() => {
            if (!height && headerContainerEl?.current?.offsetHeight) {
                setHeight(headerContainerEl.current.offsetHeight);
            }
        }, 100);

    }, []);

    return (
        <Container>
            {
                showMessage ?
                    <SuccessMessage />
                    :
                    <div className={"container"}
                         style={{
                             maxWidth: "1000px"
                             // minHeight: height
                         }}
                    >
                        <h2>Vendors Registration Form</h2>
                        <div className={"row"} style={{ height: "100%", marginLeft: 0, marginRight: 0 }}>
                            <div className={"col"} style={{ height: "100%" }}>
                                <div className={"sam"}
                                     style={{
                                         // minHeight: ((height || 650) > 900 ? (height || 650) : 700) + 80 ,
                                         height: ((height || 650) > 700 ? (height || 650) : 700) + 120
                                     }}
                                >
                                    <div style={{ minHeight: "100%" }} ref={headerContainerEl}>
                                        {
                                            step === 1 &&
                                            <StepOneForm />
                                        }
                                        {
                                            step === 2 &&
                                            <StepTwoForm />
                                        }
                                        <div style={{ height: 60 }} />
                                    </div>
                                    <Navigator />
                                </div>
                            </div>
                            {
                                !isMob &&
                                <div className={"col"}>
                                    <div className={"bg"}
                                         style={{ backgroundImage: "url(\"https://www.talentedladiesclub.com/site/wp-content/uploads/Three-factors-to-consider-when-choosing-a-wedding-venue.jpg\")" }} />
                                </div>
                            }
                        </div>
                    </div>
            }
        </Container>
    );
}
