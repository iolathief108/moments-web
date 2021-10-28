import {PropsWithChildren} from 'react';
import {commonState} from '../state';
import {useHistory, Link} from 'react-router-dom';
import React from 'react'


export function LinkWrap(props: PropsWithChildren<{link: string, comp?: any}>) {
    const [isMobile] = commonState.useGlobalState('isMobile');
    const [isMobileWidth] = commonState.useGlobalState('isMobileWidth');

    if (!isMobileWidth && isMobile === undefined) {
        return null;
    }

    if (isMobileWidth || isMobile ) {
        if (props.comp) {
            return (
                <Link to={props.link} component={props.comp} />
            );
        }

        return <Link to={props.link}>
            {props.children}
        </Link>
    }
    return (<>{props.children}</>);
}
