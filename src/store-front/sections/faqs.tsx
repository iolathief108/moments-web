import {useState} from 'react';
import {VendorDetailsBQuery} from '../../http/generated';
import styled from "styled-components";


const AccortionBtn = styled.button`
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  text-align: left;
  padding: 0;
  margin: 0;
  color: #21201f;
  font-weight: 600;
  border: none;
  outline: none;
  width: 100%;
  background-color: transparent;
  cursor: pointer;
`

function Question({qn, ans}: {qn: string, ans: string}) {
    const [open, setOpen] = useState(false);

    return (
        <div style={{
            paddingBottom: '8px',
            paddingTop: '12px',
            // borderTop: '2px solid #d9d9d9',
            borderBottom: '1.5px solid #d9d9d9',
        }}>
            <AccortionBtn onClick={() => setOpen(!open)}>
                <h5 style={{fontWeight: 400}}>{open ? '- ' : '+ '} {qn}</h5>
            </AccortionBtn>
            <p style={{
                display: open ? 'block' : 'none',
                paddingBottom: '10px',
            }}>{ans}</p>
        </div>
    );
}

export function Faqs({data}: {data: VendorDetailsBQuery}) {
    if (!data.vendorDetailsB?.frequent_questions.length)
        return null;

    return (
        <div style={{
            marginTop: '70px',
            marginBottom: '60px',
        }}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-lg-7 '}>

                        <h2>Frequently Asked Question</h2>
                        <p>{data.vendorDetailsB.frequent_questions.length} Answers</p>
                        <div style={{borderTop: '1.5px solid #d9d9d9', marginBottom: '5px'}}/>
                        {
                            data.vendorDetailsB?.frequent_questions.map((item, index) => (
                                <Question key={index} qn={item.question} ans={item.answer}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
