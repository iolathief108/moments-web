import { useState } from "react";
import { VendorDetailsBQuery } from "../../http/generated";
import styled from "styled-components";


import { FunctionComponent } from "react";
import { commonState } from "../../state";
import { DARK_BLUE_COLOR, DARK_BLUE_HOVER_COLOR } from "../../utils/colors";
import { isMobile } from "react-device-detect";

//
// const AccortionBtn = styled.button`
//   display: -ms-flexbox;
//   display: flex;
//   -ms-flex-pack: justify;
//   justify-content: space-between;
//   text-align: left;
//   padding: 0;
//   margin: 0;
//   color: #21201f;
//   font-weight: 600;
//   border: none;
//   outline: none;
//   width: 100%;
//   background-color: transparent;
//   cursor: pointer;
// `;
//
// function Question2({ qn, ans }: { qn: string, ans: string }) {
//     const [open, setOpen] = useState(false);
//
//     return (
//         <div style={{
//             paddingBottom: "8px",
//             paddingTop: "12px",
//             // borderTop: '2px solid #d9d9d9',
//             borderBottom: "1.5px solid #d9d9d9"
//         }}>
//             <AccortionBtn onClick={() => setOpen(!open)}>
//                 <h5 style={{ fontWeight: 400 }}>{open ? "- " : "+ "} {qn}</h5>
//             </AccortionBtn>
//             <p style={{
//                 display: open ? "block" : "none",
//                 paddingBottom: "10px"
//             }}>{ans}</p>
//         </div>
//     );
// }
//
// export function Faqs_({ data }: { data: VendorDetailsBQuery }) {
//     if (!data.vendorDetailsB?.frequent_questions.length)
//         return null;
//
//     return (
//         <div style={{
//             marginTop: "70px",
//             marginBottom: "60px"
//         }}>
//             <div className={"container"}>
//                 <div className={"row"}>
//                     <div className={"col-lg-7 "}>
//
//                         <h2>Frequently Asked Question2</h2>
//                         <p>{data.vendorDetailsB.frequent_questions.length} Answers</p>
//                         <div style={{ borderTop: "1.5px solid #d9d9d9", marginBottom: "5px" }} />
//                         {
//                             data.vendorDetailsB?.frequent_questions.map((item, index) => (
//                                 <Question2 key={index} qn={item.question} ans={item.answer} />
//                             ))
//                         }
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


export function Line() {
    return (
        <div style={{ borderBottom: "2px solid #d9d9d9", marginBottom: "17px", marginTop: "17px" }}></div>
    );
}

type AnswerProps = {
    isClosed: boolean
    answer: FunctionComponent | string
}
const Answer = (props: AnswerProps) => {
    return (
        <div style={{
            maxHeight: props.isClosed ? 0 : "1000px",
            overflow: "hidden",
            transition: `all ${props.isClosed ? 0.3 : 1.2}s ease`
            // transition: `${props.isClosed ? 'height' : 'max-height'} 0.7s ease`,
        }}>
            <p style={{
                fontFamily: "roboto, sans-serif",
                color: "#666f",
                lineHeight: "22px",
                fontWeight: 400,
                paddingTop: "16px"
            }}>
                {props.answer}
            </p>
        </div>
    );
};

type QuestionProps = {
    isClosed: boolean
    question: string
    clickAction: () => void
}
const Question = (props: QuestionProps) => {
    return (
        <div style={{
            display: "flex",
            cursor: "pointer"
        }}
             onClick={props.clickAction}
        >
            <i style={{ alignSelf: "flex-start", marginTop: "5px", marginRight: "19px" }}
               className={props.isClosed ? "fa fa-angle-down" : "fa fa-angle-up"}></i>
            <div><p className={""} style={{
                fontWeight: 'bold',
                lineHeight: "21px",
                color: DARK_BLUE_HOVER_COLOR,
            }}>{props.question}</p></div>
        </div>
    );
};

type QaProps = {
    question: string
    answer: FunctionComponent | string
}
export const Qa = (props: QaProps) => {
    const [isMobile] = commonState.useGlobalState("isMobile");
    const [open, setOpen] = useState<boolean>(!isMobile);

    return (
        <div >
            <Question isClosed={open} question={props.question} clickAction={() => setOpen(!open)} />
            <Answer isClosed={open} answer={props.answer} />
            <Line />
        </div>
    );
};


export const Faqs = ({ data }: { data: VendorDetailsBQuery }) => {
    if (!data.vendorDetailsB?.frequent_questions.length)
        return null;
    return (
        <div className={"container"} style={{marginTop: 40}}>
            <div>
                <h1 className={"serif text-center text-sm-left pb-3 mt-0"}>Frequently Asked Questions</h1>
                <span className={'pt-0'} style={{fontSize: '15px', color: '#444', paddingBottom: '-10px', display: "inline-block"}}>{data.vendorDetailsB?.frequent_questions.length} Questions</span>
                <div>
                    <Line />
                    {
                        data.vendorDetailsB?.frequent_questions.map((item, index) => (
                            <Qa key={index} question={item.question} answer={item.answer} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

