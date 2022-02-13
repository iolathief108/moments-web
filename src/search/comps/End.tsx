import styled from "styled-components";


export function End() {
    const Cont = styled.div`
      padding-top: 35px;
      padding-bottom: 35px;
      opacity: 0.5;
      text-align: center;
    `;
    return (
        <Cont>
            <p>Looks like you've reached the end.</p>
        </Cont>
    );
}
