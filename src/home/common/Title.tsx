import { HTMLAttributes } from "react";


interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
}

export function Title(props: HeadingProps) {
    return (
        <h3 {...props} className={"text-center text-md-left serif pb-2 " + props.className}>
            {props.children}
        </h3>
    );
}
