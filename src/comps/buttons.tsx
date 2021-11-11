import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";


export function BlueButton(props: ButtonHTMLAttributes<any>) {
    const Button = styled.button`
      align-items: center;
      border: 1px solid transparent;
      border-radius: 4px;
      box-shadow: 0 0 8px 0 rgba(0, 59, 88, .1);
      cursor: pointer;
      display: inline-flex;
      font-family: proxima-nova, Helvetica, Arial, sans-serif;
      font-size: 16px;
      font-weight: 600;
      height: 52px;
      justify-content: center;
      padding-left: 16px;
      padding-right: 16px;
      text-align: center;
      text-transform: capitalize;
      height: 44px;
      background-color: #003b58;
      color: #fff;
    `;
    return (
        <Button {...props}>{props.children}</Button>
    );
}
